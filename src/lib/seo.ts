import { dict } from "./i18n";
import type { Language } from "./locale";

export const SITE_URL = "https://bantutradecapital.com";
export const SHARE_IMAGE = `${SITE_URL}/og-image.jpg`;
export function localizedUrl(path: string, lang: Language) {
  return `${SITE_URL}${path === "/" ? "/" : path.replace(/\/$/, "")}?lang=${lang}`;
}
export function publicHead(path: string, lang: Language, title: string, description: string, image = SHARE_IMAGE, type = "website") {
  const url = localizedUrl(path, lang);
  return {
    meta: [
      { title }, { name: "description", content: description },
      { property: "og:title", content: title }, { property: "og:description", content: description },
      { property: "og:url", content: url }, { property: "og:site_name", content: "Bantu Trade Capital" },
      { property: "og:type", content: type },
      { property: "og:locale", content: lang === "pt" ? "pt_PT" : "en_US" },
      { property: "og:locale:alternate", content: lang === "pt" ? "en_US" : "pt_PT" },
      { property: "og:image", content: image }, { name: "twitter:image", content: image },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title }, { name: "twitter:description", content: description },
    ],
    links: [
      { rel: "canonical", href: url },
      ...(["en", "pt", "x-default"] as const).map((code) => ({
        rel: "alternate", hrefLang: code, href: localizedUrl(path, code === "pt" ? "pt" : "en"),
      })),
    ],
  };
}
export function pageHead(page: "home" | "about" | "products" | "markets" | "blog" | "contact" | "privacy" | "terms" | "disclaimer", path: string, lang: Language) {
  return publicHead(path, lang, dict[`seo.${page}.title`][lang], dict[`seo.${page}.description`][lang]);
}
export const organization = {
  "@type": "Organization", "@id": `${SITE_URL}/#organization`,
  name: "Bantu Trade Capital", url: SITE_URL, logo: `${SITE_URL}/favicon.png`,
  email: "invest@bantutradecapital.com",
  address: { "@type": "PostalAddress", addressLocality: "Dubai", addressCountry: "AE" },
};
export const homeSchema = {
  "@context": "https://schema.org", "@graph": [organization, {
    ...organization, "@type": "FinancialService", "@id": `${SITE_URL}/#financial-service`,
  }],
};
export function jsonLd(value: unknown) {
  return { type: "application/ld+json", children: JSON.stringify(value).replace(/</g, "\\u003c") };
}