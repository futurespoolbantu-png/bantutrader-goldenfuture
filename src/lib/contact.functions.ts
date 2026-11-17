import { createServerFn } from "@tanstack/react-start";
import { contactSchema, contactRequestSchema } from "./contact-schema";

export const submitContact = createServerFn({ method: "POST" })
  .inputValidator(contactRequestSchema)
  .handler(async ({ data }) => {
    const parsed = contactSchema.safeParse(data);
    if (!parsed.success) return { ok: false, reason: "invalid" as const };
    const { website: _honeypot, ...submission } = parsed.data;
    const { createPublicClient } = await import("./public-db.server");
    const { error } = await createPublicClient().from("contact_submissions").insert(submission);
    if (error) return { ok: false, reason: "failed" as const };
    const key = process.env["RESEND_API_KEY"];
    if (key) {
      try {
        const response = await fetch("https://api.resend.com/emails", {
          method: "POST", headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
          body: JSON.stringify({
            from: "Bantu Trade Capital <notifications@bantutradecapital.com>",
            to: ["invest@bantutradecapital.com"], reply_to: submission.email,
            subject: `New contact request from ${submission.name}`,
            text: `Name: ${submission.name}\nEmail: ${submission.email}\nProfile: ${submission.profile}\n\n${submission.message}`,
          }),
        });
        if (!response.ok) console.error("Contact notification was not delivered", response.status);
        else console.info("Contact notification accepted by email provider");
      } catch { console.error("Contact notification service unavailable"); }
    }
    return { ok: true };
  });