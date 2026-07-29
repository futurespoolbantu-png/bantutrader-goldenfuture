// Supabase Edge Function: invite-trader
// Admin-triggered: creates a trader record (with a unique onboarding token)
// and emails them the welcome message with their personal onboarding link.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-admin-key",
};

const FROM_ADDRESS = "Bantu Trade Capital <notifications@bantutradecapital.com>";
const SITE_URL = "https://bantutradecapital.com";

const EMAIL_TEMPLATE = `<!DOCTYPE html>
<html lang="pt-PT">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Bem-vindo à Bantu Trade Capital</title>
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
    .tagline { letter-spacing:1px !important; }
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
            <img src="https://bantutradecapital.com/favicon.png" alt="Bantu Trade Capital" width="104" height="104" class="logo-img" style="width:104px; height:104px; display:block;">
          </td>
        </tr>

        <tr>
          <td class="px" align="center" style="padding:0 40px 4px 40px; font-family:Helvetica,Arial,sans-serif; font-size:12px; letter-spacing:6px; color:#AF7100; font-weight:bold;">
            BEM-VINDO(A)&nbsp;À
          </td>
        </tr>

        <tr>
          <td class="px" align="center" style="padding:2px 30px 18px 30px;">
            <div class="h1" style="font-family:Helvetica,Arial,sans-serif; font-size:34px; line-height:40px; letter-spacing:1.5px; color:#0B0B0B; font-weight:bold; text-align:center;">
              BANTU TRADE <span style="color:#AF7100;">CAPITAL</span>
            </div>
          </td>
        </tr>

        <tr>
          <td align="center" style="padding:0 0 18px 0;">
            <table role="presentation" cellpadding="0" cellspacing="0"><tr>
              <td width="72" height="2" style="background:#AF7100; font-size:1px; line-height:1px;">&nbsp;</td>
            </tr></table>
          </td>
        </tr>

        <tr>
          <td class="px subtitle" align="center" style="padding:0 40px 40px 40px; font-family:Helvetica,Arial,sans-serif; font-size:13px; letter-spacing:3.5px; color:#3A362F;">
            FUNDO&nbsp;DE&nbsp;INVESTIMENTO&nbsp;INDEPENDENTE
          </td>
        </tr>

        <tr>
          <td class="px" style="border-top:1px solid #AF7100; border-bottom:1px solid #AF7100; padding:18px 24px;" align="center">
            <span class="tagline" style="font-family:Helvetica,Arial,sans-serif; font-size:12px; letter-spacing:2.5px; color:#0B0B0B; font-weight:bold;">
              DISCIPLINA&nbsp;&nbsp;•&nbsp;&nbsp;PROCESSO&nbsp;&nbsp;•&nbsp;&nbsp;VISÃO&nbsp;DE&nbsp;LONGO&nbsp;PRAZO
            </span>
          </td>
        </tr>

      </table>
    </td>
  </tr>

  <!-- BODY -->
  <tr>
    <td class="px" style="padding:44px 48px 8px 48px; font-family:Helvetica,Arial,sans-serif; color:#1A1714;">
      <p style="margin:0 0 18px 0; font-size:16px; line-height:26px;">Caro(a) <strong>__FULLNAME__</strong>,</p>
      <p style="margin:0 0 18px 0; font-size:16px; line-height:26px;">
        Após uma análise cuidada do desempenho registado durante a fase de avaliação, é com satisfação que a Bantu Trade Capital o(a) convida a integrar a sua equipa interna de traders.
      </p>
      <p style="margin:0 0 18px 0; font-size:16px; line-height:26px;">
        Esta seleção reflete um conjunto de critérios avaliados ao longo do processo — consistência de resultados, gestão de risco e disciplina de execução — nos quais o seu desempenho se destacou face aos restantes participantes.
      </p>
      <p style="margin:0 0 18px 0; font-size:16px; line-height:26px;">
        O primeiro passo é a leitura e assinatura do contrato de integração. Assim que estiver formalizado, terá acesso imediato ao espaço reservado da equipa.
      </p>
      <p style="margin:0 0 6px 0; font-size:13px; letter-spacing:2px; color:#AF7100; font-weight:bold; text-transform:uppercase;">Próximos passos</p>
    </td>
  </tr>

  <!-- Steps -->
  <tr>
    <td class="px" style="padding:12px 48px 8px 48px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td width="34" valign="top" style="padding:12px 0;">
            <div style="width:24px; height:24px; border-radius:50%; background:#F6ECD9; color:#8F5B00; font-family:Helvetica,Arial,sans-serif; font-weight:bold; font-size:12px; text-align:center; line-height:24px;">1</div>
          </td>
          <td valign="top" style="padding:12px 0; font-family:Helvetica,Arial,sans-serif; font-size:15px; line-height:22px; color:#1A1714; border-bottom:1px solid #E4E0D8;">
            <strong>Leia e assine o contrato</strong><br>Aceda à página segura para rever os termos da sua integração e assinar.
          </td>
        </tr>
        <tr>
          <td width="34" valign="top" style="padding:12px 0;">
            <div style="width:24px; height:24px; border-radius:50%; background:#F6ECD9; color:#8F5B00; font-family:Helvetica,Arial,sans-serif; font-weight:bold; font-size:12px; text-align:center; line-height:24px;">2</div>
          </td>
          <td valign="top" style="padding:12px 0; font-family:Helvetica,Arial,sans-serif; font-size:15px; line-height:22px; color:#1A1714; border-bottom:1px solid #E4E0D8;">
            <strong>Aceda ao canal interno</strong><br>Após a assinatura, terá acesso imediato ao espaço reservado da equipa.
          </td>
        </tr>
        <tr>
          <td width="34" valign="top" style="padding:12px 0;">
            <div style="width:24px; height:24px; border-radius:50%; background:#F6ECD9; color:#8F5B00; font-family:Helvetica,Arial,sans-serif; font-weight:bold; font-size:12px; text-align:center; line-height:24px;">3</div>
          </td>
          <td valign="top" style="padding:12px 0; font-family:Helvetica,Arial,sans-serif; font-size:15px; line-height:22px; color:#1A1714;">
            <strong>Chamada de apresentação</strong><br>A nossa equipa entrará em contacto para agendar uma reunião de boas-vindas.
          </td>
        </tr>
      </table>
    </td>
  </tr>

  <!-- CTA -->
  <tr>
    <td class="px" align="left" style="padding:32px 48px 48px 48px;">
      <table role="presentation" cellpadding="0" cellspacing="0">
        <tr>
          <td align="center" bgcolor="#AF7100" style="background:#AF7100; border-radius:999px;">
            <a href="__ONBOARDING_URL__" style="display:inline-block; padding:15px 34px; font-family:Helvetica,Arial,sans-serif; font-size:13px; font-weight:bold; letter-spacing:1px; color:#FFFFFF; border-radius:999px;">
              Ler e assinar contrato
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
            A nossa equipa de suporte está disponível em <a href="mailto:suporte@bantutradecapital.com" style="color:#AF7100;">suporte@bantutradecapital.com</a>
          </td>
        </tr>
        <tr>
          <td style="padding-bottom:20px;">
            <a href="https://www.instagram.com/bantutradecapital/" style="display:inline-block; margin-right:16px; font-family:Helvetica,Arial,sans-serif; font-size:11px; letter-spacing:1px; color:#AF7100; text-transform:uppercase;">Instagram</a>
            <a href="https://www.linkedin.com/company/bantu-cg/" style="display:inline-block; margin-right:16px; font-family:Helvetica,Arial,sans-serif; font-size:11px; letter-spacing:1px; color:#AF7100; text-transform:uppercase;">LinkedIn</a>
            <a href="https://x.com/Bantutradecap" style="display:inline-block; font-family:Helvetica,Arial,sans-serif; font-size:11px; letter-spacing:1px; color:#AF7100; text-transform:uppercase;">X</a>
          </td>
        </tr>
        <tr>
          <td style="border-top:1px solid #232323; padding-top:16px; font-family:Helvetica,Arial,sans-serif; font-size:11px; line-height:18px; color:#5C584F;">
            Bantu Trade Capital · Dubai, Emirados Árabes Unidos<br>
            <a href="https://www.bantutradecapital.com" style="color:#8A8579;">www.bantutradecapital.com</a><br>
            Recebeu este email porque participou no processo de avaliação da Bantu Trade Capital.
            <a href="#" style="color:#8A8579; text-decoration:underline;">Cancelar subscrição</a>
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
    // Simple shared-secret protection: only callers who know ADMIN_API_KEY
    // (set as a Supabase secret) can trigger this function.
    const adminKey = req.headers.get("x-admin-key");
    const expectedKey = Deno.env.get("ADMIN_API_KEY");
    if (!expectedKey || adminKey !== expectedKey) {
      return json({ error: "Unauthorized" }, 401);
    }

    const { full_name, email } = await req.json();
    if (!full_name || !email) {
      return json({ error: "Missing full_name or email" }, 400);
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceRoleKey);

    const { data: trader, error: insertError } = await supabase
      .from("traders")
      .insert({ full_name, email })
      .select("token")
      .single();

    if (insertError || !trader) {
      console.error("Failed to create trader:", insertError);
      return json({ error: "Failed to create trader", details: insertError?.message }, 500);
    }

    const onboardingUrl = `${SITE_URL}/onboarding/${trader.token}`;

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      return json({ error: "RESEND_API_KEY not configured" }, 500);
    }

    const html = EMAIL_TEMPLATE
      .split("__FULLNAME__").join(escapeHtml(full_name))
      .split("__ONBOARDING_URL__").join(onboardingUrl);

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_ADDRESS,
        to: [email],
        subject: "Bem-vindo(a) \u00e0 Bantu Trade Capital",
        html,
      }),
    });

    if (!resendResponse.ok) {
      const errText = await resendResponse.text();
      console.error("Resend API error:", errText);
      return json({ error: "Failed to send email", details: errText }, 502);
    }

    return json({ success: true, onboarding_url: onboardingUrl });
  } catch (err) {
    console.error("invite-trader error:", err);
    return json({ error: "Unexpected error" }, 500);
  }
});

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
