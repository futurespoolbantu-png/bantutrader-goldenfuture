// Supabase Edge Function: accept-terms
// Called from the terms-acceptance page when a trader clicks "Aceitar os termos".
// Validates the unique token, records the acceptance, generates a single-use
// Discord invite, and sends a confirmation email via Resend.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const TERMS_VERSION = "1.0";
const FROM_ADDRESS = "Bantu Trade Capital <notifications@bantutradecapital.com>";
// Used only if the Discord bot secrets aren't configured yet (see createDiscordInvite).
const FALLBACK_DISCORD_INVITE = "https://discord.gg/aQgmWgrcB";

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { token, signature_name } = await req.json();

    if (!token || !signature_name) {
      return json({ error: "Missing token or signature_name" }, 400);
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceRoleKey);

    // 1. Look up the trader by their unique token
    const { data: trader, error: fetchError } = await supabase
      .from("traders")
      .select("*")
      .eq("token", token)
      .single();

    if (fetchError || !trader) {
      return json({ error: "Invalid or unknown token" }, 404);
    }

    if (new Date(trader.token_expires_at) < new Date()) {
      return json({ error: "This link has expired" }, 410);
    }

    if (trader.terms_accepted) {
      // Already accepted before — idempotent, just return the existing invite.
      return json({
        success: true,
        discord_invite_url: trader.discord_invite_url || FALLBACK_DISCORD_INVITE,
      });
    }

    const clientIp = req.headers.get("x-forwarded-for") || "unknown";

    // 2. Generate a single-use Discord invite (falls back to a static
    //    invite if the Discord bot secrets aren't configured yet).
    const discordInviteUrl = await createDiscordInvite();

    // 3. Record the acceptance
    const { error: updateError } = await supabase
      .from("traders")
      .update({
        terms_accepted: true,
        terms_version_accepted: TERMS_VERSION,
        terms_accepted_at: new Date().toISOString(),
        terms_accepted_ip: clientIp,
        discord_invite_url: discordInviteUrl,
      })
      .eq("id", trader.id);

    if (updateError) {
      console.error("Failed to update trader:", updateError);
      return json({ error: "Failed to record acceptance" }, 500);
    }

    // 4. Send confirmation email (best-effort — doesn't block the response)
    await sendConfirmationEmail(trader.email, trader.full_name, discordInviteUrl).catch((err) =>
      console.error("Confirmation email failed:", err)
    );

    return json({ success: true, discord_invite_url: discordInviteUrl });
  } catch (err) {
    console.error("accept-terms error:", err);
    return json({ error: "Unexpected error" }, 500);
  }
});

async function createDiscordInvite(): Promise<string> {
  const BOT_TOKEN = Deno.env.get("DISCORD_BOT_TOKEN");
  const CHANNEL_ID = Deno.env.get("DISCORD_CHANNEL_ID");

  if (!BOT_TOKEN || !CHANNEL_ID) {
    console.warn("Discord bot not configured yet — using fallback invite link");
    return FALLBACK_DISCORD_INVITE;
  }

  try {
    const res = await fetch(`https://discord.com/api/v10/channels/${CHANNEL_ID}/invites`, {
      method: "POST",
      headers: {
        Authorization: `Bot ${BOT_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        max_uses: 1,
        max_age: 60 * 60 * 24 * 7, // expires in 7 days if unused
        unique: true,
      }),
    });

    if (!res.ok) {
      console.error("Discord API error:", await res.text());
      return FALLBACK_DISCORD_INVITE;
    }

    const data = await res.json();
    return `https://discord.gg/${data.code}`;
  } catch (err) {
    console.error("Discord invite generation failed:", err);
    return FALLBACK_DISCORD_INVITE;
  }
}

async function sendConfirmationEmail(to: string, fullName: string, discordInviteUrl: string) {
  const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
  if (!RESEND_API_KEY) {
    console.warn("RESEND_API_KEY not configured — skipping confirmation email");
    return;
  }

  const html = `
    <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto;">
      <h2 style="color:#111;">Termos aceites com sucesso</h2>
      <p>Olá ${escapeHtml(fullName)},</p>
      <p>Confirmamos a aceitação dos Termos e Condições do Programa de Trader Institucional da Bantu Trade Capital (versão ${TERMS_VERSION}).</p>
      <p>Pode aceder ao canal interno da equipa através do link abaixo:</p>
      <p><a href="${discordInviteUrl}" style="color:#AF7100;">${discordInviteUrl}</a></p>
      <p style="color:#666; font-size:13px; margin-top:24px;">Bantu Trade Capital Asset Management · Dubai, Emirados Árabes Unidos</p>
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
      to: [to],
      subject: "Termos aceites — Bantu Trade Capital",
      html,
    }),
  });

  if (!resendResponse.ok) {
    console.error("Resend API error:", await resendResponse.text());
  }
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
