import { describe, expect, it } from "vitest";
import { contactSchema } from "./contact-schema";
import { resolveLanguage } from "./locale";
import { htmlSecurityHeaders } from "./security-headers";
import { sitemapXML, isSitemapRouteIncluded } from "./sitemap";
import { publishedSitemapPosts } from "./sitemap-posts.server";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import type { AnyRoute } from "@tanstack/react-router";

const valid = { name: "Test", email: "test@example.com", profile: "Other", message: "A valid inquiry", website: "" };
describe("Contact validation", () => {
  it("rejects filled honeypots", () => expect(contactSchema.safeParse({ ...valid, website: "spam" }).success).toBe(false));
  it("limits name to 100 characters", () => {
    expect(contactSchema.safeParse({ ...valid, name: "n".repeat(100) }).success).toBe(true);
    expect(contactSchema.safeParse({ ...valid, name: "n".repeat(101) }).success).toBe(false);
  });
  it("limits profile to 100 characters", () => expect(contactSchema.safeParse({ ...valid, profile: "p".repeat(101) }).success).toBe(false));
  it("limits message to 1000 characters", () => {
    expect(contactSchema.safeParse({ ...valid, message: "m".repeat(1000) }).success).toBe(true);
    expect(contactSchema.safeParse({ ...valid, message: "m".repeat(1001) }).success).toBe(false);
  });
  it("rejects malformed email", () => expect(contactSchema.safeParse({ ...valid, email: "invalid" }).success).toBe(false));
  it("limits email to 255 characters", () => expect(contactSchema.safeParse({ ...valid, email: `${"a".repeat(250)}@example.com` }).success).toBe(false));
});
describe("URL language", () => {
  it("defaults to English", () => expect(resolveLanguage(undefined)).toBe("en"));
  it("renders Portuguese when requested", () => expect(resolveLanguage("pt")).toBe("pt"));
  it("renders English when requested", () => expect(resolveLanguage("en")).toBe("en"));
});
describe("Security response rules", () => {
  it("denies framing on HTML", () => {
    const response = htmlSecurityHeaders(new Response("<html/>", { headers: { "Content-Type": "text/html" } }));
    expect(response.headers.get("X-Frame-Options")).toBe("DENY");
    expect(response.headers.get("Content-Security-Policy")).toContain("frame-ancestors 'none'");
    expect(response.headers.get("Permissions-Policy")).toBe("camera=(), microphone=(), geolocation=()");
  });
  it("preserves existing transport and referrer policies", () => {
    const response = htmlSecurityHeaders(new Response("", { headers: { "Content-Type": "text/html", "Strict-Transport-Security": "max-age=100", "Referrer-Policy": "no-referrer" } }));
    expect(response.headers.get("Strict-Transport-Security")).toBe("max-age=100");
    expect(response.headers.get("Referrer-Policy")).toBe("no-referrer");
  });
});
describe("Sitemap", () => {
  it("includes both URL languages and three alternate declarations per entry", () => {
    const xml = sitemapXML("https://bantutradecapital.com", [{ path: "/about" }]);
    expect(xml.match(/<url>/g)).toHaveLength(2);
    expect(xml).toContain("/about?lang=pt");
    expect(xml.match(/hreflang="x-default"/g)).toHaveLength(2);
    expect(xml).not.toContain("lastmod");
  });
  it("uses only the article updated timestamp", () => {
    expect(sitemapXML("https://bantutradecapital.com", [{ path: "/blog/test", lastmod: "2026-07-01T12:00:00Z" }])).toContain("<lastmod>2026-07-01T12:00:00Z</lastmod>");
  });
  it("cannot override a private ancestor", () => {
    const route = { options: { staticData: { sitemap: true } }, parentRoute: { options: { staticData: { sitemap: "exclude-subtree" } } } } as unknown as AnyRoute;
    expect(isSitemapRouteIncluded(route)).toBe(false);
  });
  function mockClient(fail = false) {
    const offsets: number[] = [];
    const query = { select: () => query, eq: (field: string, value: boolean) => { expect([field, value]).toEqual(["published", true]); return query; }, order: () => query,
      range: async (offset: number) => { offsets.push(offset); return offset === 0 ? { data: [{ slug: "first", updated_at: "2026-01-01" }], error: null } : offset === 1 ? fail ? { data: null, error: new Error("failure") } : { data: [{ slug: "second", updated_at: "2026-02-01" }], error: null } : { data: [], error: null }; },
    };
    return { client: { from: () => query } as unknown as SupabaseClient<Database>, offsets };
  }
  it("continues across multiple public query batches", async () => {
    const { client, offsets } = mockClient();
    expect((await publishedSitemapPosts(client)).map((post) => post.slug)).toEqual(["first", "second"]);
    expect(offsets).toEqual([0, 1, 2]);
  });
  it("surfaces a later batch failure rather than partial XML", async () => {
    await expect(publishedSitemapPosts(mockClient(true).client)).rejects.toThrow("Unable to read all");
  });
});