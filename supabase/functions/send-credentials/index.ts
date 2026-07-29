// Supabase Edge Function: send-credentials
// Admin-triggered: sends the trading account credentials email to a trader.
// Does NOT touch the traders table — this is a separate, later step in the
// onboarding flow (after the trader has already signed the terms and the
// account has been created manually on the trading platform).

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-admin-key",
};

const FROM_ADDRESS = "Bantu Trade Capital <notifications@bantutradecapital.com>";

const EMAIL_TEMPLATE = `<!DOCTYPE html>
<html lang="pt-PT">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Dados de acesso — Bantu Trade Capital</title>
<!--[if mso]>
<noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript>
<![endif]-->
<style>
  body, table, td { margin:0; padding:0; }
  body { -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; background:#EDEAE4; }
  img { border:0; display:block; }
  a { text-decoration:none; }
  @media only screen and (max-width:600px) {
    .container { width:100% !important; }
    .px { padding-left:26px !important; padding-right:26px !important; }
    .h1 { font-size:24px !important; line-height:30px !important; }
    .logo-img { width:64px !important; height:64px !important; }
    .subtitle { letter-spacing:1.5px !important; }
  }
</style>
</head>
<body style="background:#EDEAE4; font-family:Helvetica,Arial,sans-serif;">

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#EDEAE4;">
<tr><td align="center" style="padding:32px 16px;">

<table role="presentation" class="container" width="600" cellpadding="0" cellspacing="0" style="width:600px; max-width:600px; background:#FAF9F6;">

  <!-- COVER -->
  <tr>
    <td style="background-color:#FAF9F6;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">

        <tr>
          <td class="px" align="center" style="padding:56px 40px 26px 40px;">
            <img src="https://bantutradecapital.com/favicon.png" alt="Bantu Trade Capital" width="90" height="90" class="logo-img" style="width:90px; height:90px; display:block;">
          </td>
        </tr>

        <tr>
          <td class="px" align="center" style="padding:0 40px 4px 40px; font-family:Helvetica,Arial,sans-serif; font-size:12px; letter-spacing:6px; color:#AF7100; font-weight:bold;">
            DADOS&nbsp;DE&nbsp;ACESSO
          </td>
        </tr>

        <tr>
          <td class="px" align="center" style="padding:2px 30px 30px 30px;">
            <div class="h1" style="font-family:Helvetica,Arial,sans-serif; font-size:28px; line-height:34px; letter-spacing:1px; color:#0B0B0B; font-weight:bold; text-align:center;">
              Conta de Negociação
            </div>
          </td>
        </tr>

        <tr>
          <td style="border-top:1px solid #E4E0D8;"></td>
        </tr>

      </table>
    </td>
  </tr>

  <!-- BODY -->
  <tr>
    <td class="px" style="padding:44px 48px 8px 48px; font-family:Helvetica,Arial,sans-serif; color:#1A1714;">
      <p style="margin:0 0 18px 0; font-size:16px; line-height:26px;">Olá, <strong>__FULLNAME__</strong>,</p>
      <p style="margin:0 0 24px 0; font-size:16px; line-height:26px;">
        Aqui estão os dados da sua conta de negociação:
      </p>
    </td>
  </tr>

  <!-- CREDENTIALS CARD -->
  <tr>
    <td class="px" style="padding:0 48px 24px 48px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #E4E0D8; border-radius:12px;">

        <tr>
          <td style="padding:18px 24px; border-bottom:1px solid #E4E0D8;">
            <div style="font-family:Helvetica,Arial,sans-serif; font-size:11px; letter-spacing:1.5px; color:#8A8579; text-transform:uppercase; padding-bottom:4px;">Plataforma</div>
            <div style="font-family:Helvetica,Arial,sans-serif; font-size:16px; color:#0B0B0B; font-weight:bold;">__PLATFORM__</div>
          </td>
        </tr>

        <tr>
          <td style="padding:18px 24px; border-bottom:1px solid #E4E0D8;">
            <div style="font-family:Helvetica,Arial,sans-serif; font-size:11px; letter-spacing:1.5px; color:#8A8579; text-transform:uppercase; padding-bottom:4px;">Account ID</div>
            <div style="font-family:'Courier New',monospace; font-size:16px; color:#0B0B0B; font-weight:bold;">__ACCOUNT_ID__</div>
          </td>
        </tr>

        <tr>
          <td style="padding:18px 24px; border-bottom:1px solid #E4E0D8;">
            <div style="font-family:Helvetica,Arial,sans-serif; font-size:11px; letter-spacing:1.5px; color:#8A8579; text-transform:uppercase; padding-bottom:4px;">Login Username</div>
            <div style="font-family:'Courier New',monospace; font-size:16px; color:#0B0B0B; font-weight:bold;">__LOGIN_USERNAME__</div>
          </td>
        </tr>

        <tr>
          <td style="padding:18px 24px; border-bottom:1px solid #E4E0D8;">
            <div style="font-family:Helvetica,Arial,sans-serif; font-size:11px; letter-spacing:1.5px; color:#8A8579; text-transform:uppercase; padding-bottom:4px;">Password</div>
            <div style="font-family:'Courier New',monospace; font-size:16px; color:#0B0B0B; font-weight:bold;">__PASSWORD__</div>
          </td>
        </tr>

        <tr>
          <td style="padding:18px 24px;">
            <div style="font-family:Helvetica,Arial,sans-serif; font-size:11px; letter-spacing:1.5px; color:#8A8579; text-transform:uppercase; padding-bottom:4px;">Starting Balance</div>
            <div style="font-family:Helvetica,Arial,sans-serif; font-size:16px; color:#0B0B0B; font-weight:bold;">__ACCOUNT_SIZE__</div>
          </td>
        </tr>

      </table>
    </td>
  </tr>

  <!-- SECURITY NOTE -->
  <tr>
    <td class="px" style="padding:0 48px 32px 48px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F6ECD9; border-radius:10px;">
        <tr>
          <td style="padding:16px 20px; font-family:Helvetica,Arial,sans-serif; font-size:13px; line-height:20px; color:#5C4300;">
            <strong>Nota de segurança:</strong> estes dados dão acesso direto a capital de negociação. Não reencaminhe este email nem partilhe as credenciais com terceiros. Recomendamos guardar estes dados num gestor de passwords e eliminar este email de seguida.
          </td>
        </tr>
      </table>
    </td>
  </tr>

  <!-- CTA -->
  <tr>
    <td class="px" align="left" style="padding:0 48px 48px 48px;">
      <table role="presentation" cellpadding="0" cellspacing="0">
        <tr>
          <td align="center" bgcolor="#AF7100" style="background:#AF7100; border-radius:999px;">
            <a href="__PLATFORM_URL__" style="display:inline-block; padding:15px 34px; font-family:Helvetica,Arial,sans-serif; font-size:13px; font-weight:bold; letter-spacing:1px; color:#FFFFFF; border-radius:999px;">
              Aceder à __PLATFORM__
            </a>
          </td>
        </tr>
      </table>
    </td>
  </tr>

  <!-- Divider before footer -->
  <tr>
    <td style="padding:0 48px;">
      <div style="border-top:1px solid #E4E0D8;"></div>
    </td>
  </tr>

  <!-- FOOTER -->
  <tr>
    <td style="background:#0B0B0B; padding:40px 48px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td style="padding-bottom:14px;">
            <table role="presentation" cellpadding="0" cellspacing="0"><tr>
              <td valign="middle" style="padding-right:12px;">
                <img src="https://bantutradecapital.com/favicon.png" alt="Bantu Trade Capital" width="34" height="34" style="width:34px; height:34px; display:block;">
              </td>
              <td valign="middle">
                <div style="font-family:Helvetica,Arial,sans-serif; font-size:14px; letter-spacing:1px; color:#FAF9F6; font-weight:bold;">
                  BANTU&nbsp;TRADE&nbsp;<span style="color:#AF7100;">CAPITAL</span>
                </div>
                <div style="font-family:Helvetica,Arial,sans-serif; font-size:9px; letter-spacing:2px; color:#8A8579; font-weight:bold; padding-top:3px;">
                  ASSET&nbsp;MANAGEMENT
                </div>
              </td>
            </tr></table>
          </td>
        </tr>
        <tr>
          <td style="font-family:Helvetica,Arial,sans-serif; font-size:12px; line-height:20px; color:#8A8579; padding-bottom:18px;">
            Dúvidas sobre o acesso? Contacte-nos em <a href="mailto:suporte@bantutradecapital.com" style="color:#AF7100;">suporte@bantutradecapital.com</a>
          </td>
        </tr>
        <tr>
          <td style="border-top:1px solid #232323; padding-top:16px; font-family:Helvetica,Arial,sans-serif; font-size:11px; line-height:18px; color:#5C584F;">
            Bantu Trade Capital · Dubai, Emirados Árabes Unidos<br>
            <a href="https://www.bantutradecapital.com" style="color:#8A8579;">www.bantutradecapital.com</a><br>
            Este email contém informação confidencial destinada exclusivamente a __FULLNAME__.
          </td>
        </tr>
      </table>
    </td>
  </tr>

</table>

</td></tr>
</table>

</body>
</html>
`;

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Authorization: accept EITHER the shared ADMIN_API_KEY header (for
    // scripts/curl) OR a valid logged-in Supabase session (for the
    // /admin/send-credentials page, using the same admin login as the blog admin).
    const adminKey = req.headers.get("x-admin-key");
    const expectedKey = Deno.env.get("ADMIN_API_KEY");
    const authHeader = req.headers.get("authorization");

    let authorized = false;

    if (adminKey && expectedKey && adminKey === expectedKey) {
      authorized = true;
    } else if (authHeader) {
      const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
      const authClient = createClient(Deno.env.get("SUPABASE_URL")!, anonKey);
      const token = authHeader.replace(/^Bearer /i, "");
      const { data: userData, error: userError } = await authClient.auth.getUser(token);
      if (!userError && userData?.user) {
        authorized = true;
      }
    }

    if (!authorized) {
      return json({ error: "Unauthorized" }, 401);
    }

    const {
      full_name,
      email,
      platform,
      account_id,
      login_username,
      password,
      account_size,
    } = await req.json();

    const required = { full_name, email, platform, account_id, login_username, password, account_size };
    for (const [key, value] of Object.entries(required)) {
      if (!value) {
        return json({ error: `Missing field: ${key}` }, 400);
      }
    }

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      return json({ error: "RESEND_API_KEY not configured" }, 500);
    }

    const html = EMAIL_TEMPLATE
      .split("__FULLNAME__").join(escapeHtml(full_name))
      .split("__PLATFORM_URL__").join(platformUrl(platform))
      .split("__PLATFORM__").join(escapeHtml(platform))
      .split("__ACCOUNT_ID__").join(escapeHtml(account_id))
      .split("__LOGIN_USERNAME__").join(escapeHtml(login_username))
      .split("__PASSWORD__").join(escapeHtml(password))
      .split("__ACCOUNT_SIZE__").join(escapeHtml(account_size));

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_ADDRESS,
        to: [email],
        subject: "Dados de acesso \u00e0 sua conta de negocia\u00e7\u00e3o",
        html,
      }),
    });

    if (!resendResponse.ok) {
      const errText = await resendResponse.text();
      console.error("Resend API error:", errText);
      return json({ error: "Failed to send email", details: errText }, 502);
    }

    return json({ success: true });
  } catch (err) {
    console.error("send-credentials error:", err);
    return json({ error: "Unexpected error" }, 500);
  }
});

function platformUrl(platform: string): string {
  const known: Record<string, string> = {
    tradovate: "https://trader.tradovate.com",
  };
  return known[platform.trim().toLowerCase()] || "#";
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function escapeHtml(str: string): string {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
