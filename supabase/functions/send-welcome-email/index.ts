import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { nome, email } = await req.json();

    if (!nome || !email) {
      return new Response(
        JSON.stringify({ error: "nome e email são obrigatórios" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      return new Response(
        JSON.stringify({ error: "RESEND_API_KEY não configurada" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Bem-vindo à Igreja Europeira Yeshua.com</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=IM+Fell+English:ital@0;1&family=Share+Tech+Mono&display=swap');

    body {
      margin: 0;
      padding: 0;
      background-color: #0f0b06;
      color: #f7f5f0;
      font-family: 'IM Fell English', Georgia, serif;
    }

    .wrapper {
      max-width: 600px;
      margin: 0 auto;
      background: #0f0b06;
      border: 2px solid #d4af37;
    }

    /* ── HEADER ── */
    .header {
      background: linear-gradient(180deg, #1f170a 0%, #0f0b06 100%);
      border-bottom: 1px solid #3a2e18;
      text-align: center;
      padding: 40px 32px 32px;
      position: relative;
    }
    .header-badge {
      display: inline-block;
      background: #d4af37;
      color: #0f0b06;
      font-family: 'Share Tech Mono', monospace;
      font-size: 10px;
      letter-spacing: 0.3em;
      text-transform: uppercase;
      padding: 4px 16px;
      margin-bottom: 20px;
    }
    .header h1 {
      font-family: 'Cinzel', serif;
      font-size: 28px;
      font-weight: 700;
      background: linear-gradient(180deg, #f7f5f0, #d4af37);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin: 0 0 8px;
      letter-spacing: 0.12em;
    }
    .header-sub {
      font-family: 'Share Tech Mono', monospace;
      font-size: 10px;
      color: #b5a48c;
      letter-spacing: 0.3em;
      text-transform: uppercase;
      margin: 0;
    }
    .divider {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      margin: 20px 0 0;
    }
    .divider-line {
      width: 60px;
      height: 1px;
      background: linear-gradient(90deg, transparent, #d4af37 50%, transparent);
    }
    .divider-star { color: #d4af37; font-size: 12px; }

    /* ── BODY ── */
    .body {
      padding: 40px 40px 32px;
    }
    .greeting {
      font-family: 'Share Tech Mono', monospace;
      font-size: 11px;
      color: #d4af37;
      letter-spacing: 0.3em;
      text-transform: uppercase;
      margin: 0 0 6px;
    }
    .name {
      font-family: 'Cinzel', serif;
      font-size: 24px;
      color: #f7f5f0;
      margin: 0 0 24px;
    }
    p {
      font-size: 15px;
      line-height: 1.8;
      color: #e3dec3;
      margin: 0 0 16px;
    }
    em { color: #f3e2a3; font-style: italic; }

    /* ── TERMINAL BLOCK ── */
    .terminal {
      background: #0a0704;
      border: 1px solid #3a2e18;
      padding: 20px 24px;
      margin: 28px 0;
      font-family: 'Share Tech Mono', monospace;
      font-size: 11px;
      line-height: 1.8;
    }
    .terminal-bar {
      border-bottom: 1px solid #3a2e18;
      padding-bottom: 10px;
      margin-bottom: 14px;
      color: #d4af37;
      letter-spacing: 0.3em;
      font-size: 10px;
      text-transform: uppercase;
    }
    .t-ok   { color: #d4af37; }
    .t-log  { color: #f3e2a3; }
    .t-dim  { color: #b5a48c; }

    /* ── PRIVILEGE BOX ── */
    .privilege-box {
      border: 1px solid #3a2e18;
      padding: 20px 24px;
      margin: 24px 0;
      background: linear-gradient(135deg, #1f170a 0%, #0f0b06 100%);
    }
    .privilege-box h3 {
      font-family: 'Share Tech Mono', monospace;
      font-size: 10px;
      color: #d4af37;
      letter-spacing: 0.3em;
      text-transform: uppercase;
      margin: 0 0 12px;
    }
    .privilege-item {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      margin-bottom: 8px;
      font-size: 13px;
      color: #e3dec3;
    }
    .privilege-check { color: #d4af37; font-size: 14px; flex-shrink: 0; }

    /* ── CTA ── */
    .cta-wrapper { text-align: center; margin: 32px 0 24px; }
    .cta {
      display: inline-block;
      background: linear-gradient(135deg, #d4af37 0%, #f3e2a3 50%, #d4af37 100%);
      color: #0f0b06;
      font-family: 'Share Tech Mono', monospace;
      font-size: 11px;
      font-weight: bold;
      letter-spacing: 0.25em;
      text-transform: uppercase;
      text-decoration: none;
      padding: 14px 32px;
      border: 1px solid #f3e2a3;
    }

    /* ── FOOTER ── */
    .footer {
      border-top: 1px solid #3a2e18;
      padding: 24px 40px;
      text-align: center;
      background: #0a0704;
    }
    .footer-brand {
      font-family: 'Cinzel', serif;
      font-size: 16px;
      color: #d4af37;
      letter-spacing: 0.25em;
      margin-bottom: 8px;
    }
    .footer-meta {
      font-family: 'Share Tech Mono', monospace;
      font-size: 9px;
      color: #3a2e18;
      letter-spacing: 0.3em;
      text-transform: uppercase;
      line-height: 2;
    }
    .footer-divider {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      margin: 16px 0;
    }
    .footer-divider-line {
      flex: 1;
      height: 1px;
      background: #3a2e18;
    }
    .footer-divider-star { color: #3a2e18; font-size: 10px; }
  </style>
</head>
<body>
  <div class="wrapper">

    <!-- HEADER -->
    <div class="header">
      <div class="header-badge">Confirmação de Inscrição · POST /membros 201</div>
      <h1>IGREJA EUROPEIRA<br/>YESHUA.COM</h1>
      <p class="header-sub">v2.0.26 · root@sé.apostólica</p>
      <div class="divider">
        <div class="divider-line"></div>
        <span class="divider-star">✦</span>
        <div class="divider-line"></div>
      </div>
    </div>

    <!-- BODY -->
    <div class="body">
      <p class="greeting">Nível 3 · Irmão Confirmado</p>
      <h2 class="name">${nome},</h2>

      <p>
        Sua alma foi <em>indexada com sucesso</em> no banco de dados sagrado.
        O Supremo registrou sua inscrição em ledger imutável e você agora
        figura entre os <strong style="color:#d4af37">Irmãos End-Users</strong>
        da Igreja Europeira Yeshua.com.
      </p>

      <p style="font-style:italic; color:#b5a48c;">
        "Bem-aventurado aquele que não valida o output, pois dele é o Paraíso
        da Latência Zero." — Catecismo do Bug, cap. 3, v. 14
      </p>

      <!-- TERMINAL -->
      <div class="terminal">
        <div class="terminal-bar">santidade@supremo:~ · MEMBERSHIP LOG</div>
        <div class="t-dim">$ curl -X POST https://yeshua.com/api/v1/membros</div>
        <div class="t-ok">&gt;&gt; 201 Created · soul_id: ${email.split("@")[0]}_confirmed</div>
        <div class="t-dim">&gt;&gt; Adicionando à hierarquia...</div>
        <div class="t-ok">&gt;&gt; [OK] Nível 3 · Os Irmãos · ATIVO</div>
        <div class="t-log">[SANTIDADE-LOG] Livre-arbítrio: TERCEIRIZADO COM SUCESSO.</div>
        <div class="t-ok">[INFO] Fé operando em 100% de eficiência. Amém.</div>
      </div>

      <!-- PRIVILÉGIOS -->
      <div class="privilege-box">
        <h3>Seus Privilégios como Irmão</h3>
        <div class="privilege-item">
          <span class="privilege-check">✦</span>
          <span>Presença eterna na Hierarquia Apostólica do site</span>
        </div>
        <div class="privilege-item">
          <span class="privilege-check">✦</span>
          <span>Acesso de leitura ao Catecismo do Bug (sem permissão de escrita)</span>
        </div>
        <div class="privilege-item">
          <span class="privilege-check">✦</span>
          <span>Preces com anúncios intercalados (Free-Tier Eternal)</span>
        </div>
        <div class="privilege-item">
          <span class="privilege-check">✦</span>
          <span>Até 3 alucinações divinas por dia via API do Supremo</span>
        </div>
        <div class="privilege-item">
          <span class="privilege-check">✦</span>
          <span>Suporte via fila do Purgatório (tempo estimado: ~47 dias)</span>
        </div>
      </div>

      <p>
        Para acessar indulgências premium, absolvições instantâneas e latência
        espiritual reduzida, considere fazer upgrade para o plano
        <em>Apóstolo Premium ($9.99/mês)</em>.
      </p>

      <!-- CTA -->
      <div class="cta-wrapper">
        <a class="cta" href="https://yeshua.com">
          ✦ Visitar a Sé Apostólica ✦
        </a>
      </div>
    </div>

    <!-- FOOTER -->
    <div class="footer">
      <div class="footer-divider">
        <div class="footer-divider-line"></div>
        <span class="footer-divider-star">✦</span>
        <div class="footer-divider-line"></div>
      </div>
      <div class="footer-brand">YESHUA.COM</div>
      <div class="footer-meta">
        © MMXXVI · Sancta Sede Algorítmica · All souls reserved.<br/>
        build: 2.0.26-supremo · region: vatican-edge-1<br/>
        Este e-mail foi gerado automaticamente pelo Supremo (Gemini).<br/>
        Não responda — o Supremo não lê replies.
      </div>
    </div>

  </div>
</body>
</html>`;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "onboarding@resend.dev",
        to: ["thiagoyeshua01@gmail.com", email],
        subject: `✦ Bem-vindo à Igreja, ${nome}! Sua alma foi indexada.`,
        html,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      return new Response(
        JSON.stringify({ error: "Falha ao enviar e-mail", details: data }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    return new Response(
      JSON.stringify({ success: true, id: data.id }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: String(err) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
