// Supabase Edge Function: send-contact-notification
// Sends an email notification via Resend whenever a new contact form
// submission is received. The RESEND_API_KEY must be set as a secret
// in the Supabase project (never committed to the repo).

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const NOTIFY_TO = "invest@bantutradecapital.com";
const FROM_ADDRESS = "Bantu Trade Capital <notifications@bantutradecapital.com>";

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, profile, message } = await req.json();

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured");
      return new Response(JSON.stringify({ error: "Email service not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const html = `
      <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto;">
        <h2 style="color:#111;">New contact request — Bantu Trade Capital</h2>
        <table style="width:100%; border-collapse: collapse; margin-top: 16px;">
          <tr><td style="padding:8px 0; color:#666; width:120px;">Name</td><td style="padding:8px 0;">${escapeHtml(name)}</td></tr>
          <tr><td style="padding:8px 0; color:#666;">Email</td><td style="padding:8px 0;">${escapeHtml(email)}</td></tr>
          <tr><td style="padding:8px 0; color:#666;">Profile</td><td style="padding:8px 0;">${escapeHtml(profile ?? "")}</td></tr>
        </table>
        <p style="margin-top:16px; color:#666;">Message</p>
        <p style="white-space: pre-wrap; border-left: 3px solid #C9A24C; padding-left: 12px;">${escapeHtml(message)}</p>
      </div>
    `;

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_ADDRESS,
        to: [NOTIFY_TO],
        reply_to: email,
        subject: `New contact request from ${name}`,
        html,
      }),
    });

    if (!resendResponse.ok) {
      const errText = await resendResponse.text();
      console.error("Resend API error:", errText);
      return new Response(JSON.stringify({ error: "Failed to send email" }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("send-contact-notification error:", err);
    return new Response(JSON.stringify({ error: "Unexpected error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

function escapeHtml(str: string): string {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
