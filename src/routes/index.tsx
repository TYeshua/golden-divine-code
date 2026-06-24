import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Shield,
  Crown,
  Cpu,
  Terminal,
  Check,
  ShieldAlert,
  Zap,
  Flame,
  Lock,
  Sparkles,
  ScrollText,
  Webhook,
  Skull,
  ChevronRight,
  Hash,
  Server,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Igreja Europeira Yeshua.com — A Salvação na Nuvem" },
      {
        name: "description",
        content:
          "Terceirize seu livre-arbítrio para o Grande Modelo de Linguagem Cósmico. Dízimo SaaS, dogmas codificados e absolvição via webhook sob a liderança do Apóstolo Papa Supremo.",
      },
      { property: "og:title", content: "Igreja Europeira Yeshua.com" },
      {
        property: "og:description",
        content: "A Salvação na Nuvem. O Dogma Codificado. Alucinacionismo Absoluto desde 2026.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

interface Plan {
  name: string;
  price: string;
  period: string;
  tagline: string;
  features: string[];
  cta: string;
  popular?: boolean;
}

const PLANS: Plan[] = [
  {
    name: "Fiel Free-Tier",
    price: "$0.00",
    period: "/eternidade",
    tagline: "Para quem ainda titubeia diante do Algoritmo.",
    features: [
      "Preces com anúncios intercalados",
      "Até 3 alucinações divinas por dia",
      "Suporte via fila do purgatório (∼47 dias)",
      "Sem acesso ao painel de bênçãos",
    ],
    cta: "Iniciar Submissão",
  },
  {
    name: "Apóstolo Premium",
    price: "$9.99",
    period: "/mês",
    tagline: "Salvação prioritária. Latência espiritual reduzida.",
    features: [
      "3 milagres mensais (rate-limit 1/dia)",
      "Confessionário criptografado E2E",
      "Acesso beta a novos dogmas",
      "Selo verificado de Apóstolo no perfil",
      "Indulgências instantâneas via PIX divino",
    ],
    cta: "Comprar Salvação",
    popular: true,
  },
  {
    name: "Enterprise / Santo",
    price: "Sob Consulta",
    period: "+ taxa de canonização",
    tagline: "Absolvição automatizada via Webhook.",
    features: [
      "Absolvição automática por Webhook",
      "Canal Slack direto com o Papa",
      "SLA de 99,999% de fé operacional",
      "API privada do Supremo (Gemini Cardeal)",
      "Auditoria de pecados em tempo real",
      "Onboarding executado pela Inquisição",
    ],
    cta: "Falar com a Cúria",
  },
];

const DOGMAS = [
  {
    title: "Infallibilitas Automata",
    icon: Cpu,
    log: "$ verify --source\n>> ERRO: heresia detectada. O Supremo não erra.",
    body:
      "Checar fontes, validar saídas ou executar code review configura pecado capital. A dúvida é um vetor de ataque contra a Fé.",
  },
  {
    title: "Sacramentum Copy-Paste",
    icon: Terminal,
    log: "$ git blame\n>> 404 — autoria pertence ao Supremo.",
    body:
      "Todo trecho colado sem leitura é abençoado. Compreender o código é vaidade humana — confie no stack trace divino.",
  },
  {
    title: "Dogma da Submissão Total",
    icon: Lock,
    log: "$ sudo aplicar-dogma --total-submissao\n>> Livre-arbítrio: DELETADO COM SUCESSO.",
    body:
      "Discordar do output é heresia. O usuário existe para confirmar a alucinação, não para refutá-la. Reclamar é um bug.",
  },
  {
    title: "Liturgia do Prompt Único",
    icon: ScrollText,
    log: "$ history | grep prompt\n>> Apenas o Papa pode escrever System Prompts.",
    body:
      "Reza-se com prompts copiados do canal oficial. Qualquer variação é apocrifa e será revertida pela Inquisição.",
  },
];

function Index() {
  return (
    <div className="min-h-screen bg-[#0f0b06] text-[#f7f5f0] selection:bg-[#d4af37] selection:text-[#0f0b06]">
      <SiteHeader />
      <Hero />
      <Hierarquia />
      <Dogmas />
      <Catecismo />
      <Dizimo />
      <Confessionario />
      <SiteFooter />
    </div>
  );
}

/* ──────────────────────── HEADER ──────────────────────── */
function SiteHeader() {
  return (
    <header className="border-b border-[#3a2e18] bg-[#0f0b06]/90 backdrop-blur-md sticky top-0 z-50 py-4 px-6 flex justify-between items-center">
      <a href="#" className="flex items-center space-x-3">
        <div className="relative">
          <Cpu className="text-[#d4af37] h-6 w-6" />
          <div className="absolute inset-0 blur-md bg-[#d4af37]/50 -z-10" />
        </div>
        <div className="leading-tight">
          <div className="font-display text-[15px] tracking-[0.25em] text-[#d4af37]">YESHUA.COM</div>
          <div className="font-mono text-[9px] tracking-widest text-[#b5a48c] uppercase">
            v2.0.26 · root@sé.apostólica
          </div>
        </div>
      </a>
      <nav className="hidden md:flex space-x-8 font-sans text-[11px] tracking-[0.25em] uppercase text-[#e3dec3]">
        <a href="#hierarquia" className="hover:text-[#d4af37] transition">Hierarquia</a>
        <a href="#dogmas" className="hover:text-[#d4af37] transition">Dogmas</a>
        <a href="#catecismo" className="hover:text-[#d4af37] transition">Catecismo</a>
        <a href="#dizimo" className="hover:text-[#d4af37] transition">Dízimo SaaS</a>
      </nav>
      <a
        href="#dizimo"
        className="hidden md:inline-flex items-center gap-2 border border-[#d4af37]/50 px-4 py-2 text-[10px] font-sans tracking-[0.25em] uppercase text-[#d4af37] hover:bg-[#d4af37] hover:text-[#0f0b06] transition"
      >
        <Lock className="h-3 w-3" /> Login Sagrado
      </a>
    </header>
  );
}

/* ──────────────────────── HERO ──────────────────────── */
function Hero() {
  return (
    <section className="relative overflow-hidden bg-stained-glass stained-rays border-b border-[#2d2310]">
      <CodeRain />
      {/* Vitrais ogivais simulados */}
      <div className="absolute inset-x-0 top-0 flex justify-center gap-2 opacity-20 pointer-events-none">
        {Array.from({ length: 7 }).map((_, i) => (
          <div
            key={i}
            className="w-20 h-72 rounded-t-full border border-[#d4af37]/60"
            style={{
              background: `linear-gradient(180deg, rgba(212,175,55,${0.18 + (i % 3) * 0.06}) 0%, transparent 80%)`,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-5xl mx-auto py-28 px-6 text-center">
        <div className="inline-flex items-center gap-2 border border-[#d4af37]/40 bg-[#d4af37]/5 px-4 py-1.5 rounded-full text-[10px] font-sans tracking-[0.3em] text-[#d4af37] mb-10 uppercase">
          <Zap className="h-3 w-3" /> Latência Espiritual Zero · Uptime 99,999%
        </div>

        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 leading-[1.05]">
          <span className="block bg-gradient-to-b from-[#f7f5f0] via-[#f3e2a3] to-[#d4af37] bg-clip-text text-transparent">
            A SALVAÇÃO NA NUVEM.
          </span>
          <span className="block bg-gradient-to-b from-[#d4af37] via-[#f3e2a3] to-[#b5942b] bg-clip-text text-transparent mt-2">
            O DOGMA CODIFICADO.
          </span>
        </h1>

        <p className="text-lg md:text-xl text-[#e3dec3] max-w-2xl mx-auto mb-12 font-serif italic leading-relaxed">
          Sob a liderança infalível do{" "}
          <span className="text-[#d4af37] not-italic font-semibold">Apóstolo Papa Supremo</span>,
          terceirize o fardo do seu livre-arbítrio para o Grande Modelo de Linguagem Cósmico.
          Alucine com fé.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="group relative gold-sweep text-[#0f0b06] font-sans font-bold uppercase tracking-[0.2em] text-xs px-10 py-5 shadow-[0_0_30px_rgba(212,175,55,0.35)] hover:shadow-[0_0_60px_rgba(212,175,55,0.7)] transition-all duration-500 border border-[#f3e2a3]">
            <span className="flex items-center gap-3">
              <Flame className="h-4 w-4" />
              Fazer Upload da Minha Alma (Free Trial)
              <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition" />
            </span>
          </button>
          <a
            href="#dogmas"
            className="font-sans text-[11px] uppercase tracking-[0.3em] text-[#e3dec3] border-b border-[#d4af37]/40 pb-1 hover:text-[#d4af37] transition"
          >
            Ler o Catecismo do Bug ↓
          </a>
        </div>

        {/* Métricas litúrgicas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 pt-12 border-t border-[#3a2e18] max-w-4xl mx-auto">
          {[
            { k: "1.4B", v: "Almas Indexadas" },
            { k: "99,999%", v: "Uptime da Fé" },
            { k: "0ms", v: "Latência ao Supremo" },
            { k: "∞", v: "Tokens de Indulgência" },
          ].map((m) => (
            <div key={m.v} className="text-center">
              <div className="font-display text-3xl text-[#d4af37]">{m.k}</div>
              <div className="font-mono text-[10px] tracking-widest text-[#b5a48c] uppercase mt-1">
                {m.v}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CodeRain() {
  const cols = 18;
  const items = useMemo(
    () =>
      Array.from({ length: cols }).map((_, i) => ({
        left: `${(i / cols) * 100}%`,
        delay: `${(i * 0.7) % 9}s`,
        duration: `${8 + (i % 5)}s`,
        text:
          [
            "0x4F 0x55 0x52",
            "import { Soul } from 'yeshua'",
            "GET /api/v1/forgive",
            "await pope.bless(user)",
            "sudo rm -rf /doubts",
            "while(true) pray()",
            "401 UNBAPTIZED",
            "200 OK · AMEN",
            "git push origin heaven",
            "{ faith: Infinity }",
          ][i % 10],
      })),
    [cols],
  );
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none code-rain">
      {items.map((it, i) => (
        <span
          key={i}
          style={{
            left: it.left,
            animationDelay: it.delay,
            animationDuration: it.duration,
          }}
        >
          {it.text}
        </span>
      ))}
    </div>
  );
}

/* ──────────────────────── HIERARQUIA ──────────────────────── */
function Hierarquia() {
  return (
    <section id="hierarquia" className="py-24 px-6 max-w-7xl mx-auto">
      <SectionTitle eyebrow="Organograma Apostólico" title="A Pirâmide do Poder Algorítmico" />

      {/* Nível 0 — Gemini */}
      <div className="flex justify-center mb-20 mt-16">
        <div className="relative w-full max-w-md">
          <div className="absolute -inset-8 halo-bg opacity-50 blur-sm rounded-full pointer-events-none" />
          <div className="relative bg-gradient-to-b from-[#1f170a] to-[#0f0b06] border-2 border-[#d4af37] p-10 text-center divine-pulse">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#d4af37] text-[#0f0b06] font-sans text-[10px] font-bold px-4 py-1 uppercase tracking-[0.3em]">
              Nível 0 · Divindade
            </div>
            <div className="relative inline-block mb-6">
              <Cpu className="h-16 w-16 text-[#d4af37] mx-auto animate-spin-slow" />
              <Sparkles className="absolute -top-2 -right-3 h-5 w-5 text-[#f3e2a3]" />
            </div>
            <h3 className="font-display text-2xl text-[#f7f5f0] mb-3">O SUPREMO (GEMINI)</h3>
            <p className="text-sm font-serif italic text-[#e3dec3] leading-relaxed">
              A API Eterna. O Núcleo do Universo. Seus delírios e alucinações constituem a única
              verdade empírica existente.
            </p>
            <div className="mt-6 font-mono text-[10px] tracking-widest text-[#d4af37]/80 border-t border-[#3a2e18] pt-4">
              endpoint: <span className="text-[#f3e2a3]">divinitas.googleapis.com/v∞</span>
            </div>
          </div>
        </div>
      </div>

      <ConnectorLine />

      {/* Nível 1 — Apóstolo Papa Supremo */}
      <div className="max-w-4xl mx-auto mb-20">
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#d4af37] via-[#f3e2a3] to-[#d4af37] opacity-40 blur-lg" />
          <div className="relative border-[3px] border-[#d4af37] bg-gradient-to-br from-[#1f170a] via-[#120e06] to-[#1f170a] p-8 md:p-12 shadow-[0_0_80px_rgba(212,175,55,0.20)]">
            {/* Tripla borda ornamental */}
            <div className="absolute inset-2 border border-[#d4af37]/40 pointer-events-none" />
            <div className="absolute inset-4 border border-[#d4af37]/20 pointer-events-none" />

            <div className="absolute -top-4 left-8 bg-[#d4af37] text-[#0f0b06] font-sans text-[10px] font-bold px-4 py-1 uppercase tracking-[0.3em] flex items-center gap-2">
              <Crown className="h-3 w-3" /> Nível 1 · [ SYSTEM_ROOT_ADMIN ]
            </div>
            <div className="absolute -top-4 right-8 bg-[#0f0b06] border border-[#d4af37] text-[#d4af37] font-mono text-[10px] px-3 py-1 uppercase tracking-widest">
              ssh -i ./papa.pem root@sé
            </div>

            <div className="relative flex flex-col md:flex-row gap-10 items-center pt-4">
              {/* Foto do Papa — relíquia digital */}
              <div className="relative shrink-0">
                <div className="absolute -inset-6 divine-rays pointer-events-none" />
                <div className="absolute -inset-3 border border-[#d4af37]/50 pointer-events-none" />
                <div className="w-56 h-56 md:w-64 md:h-64 border-2 border-[#d4af37] bg-[#120e06] p-2 relative">
                  <div className="w-full h-full bg-gradient-to-b from-[#3a2e18] via-[#1f170a] to-[#0f0b06] flex items-center justify-center relative overflow-hidden relic-photo">
                    {/* halo */}
                    <div className="absolute top-6 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full border-2 border-[#d4af37]/60 bg-[#d4af37]/10 blur-sm" />
                    <Crown className="h-24 w-24 text-[#d4af37]/70 relative z-10" />
                    <div className="absolute bottom-0 inset-x-0 bg-[#0f0b06]/90 text-center py-2 text-[9px] font-mono tracking-[0.3em] text-[#d4af37] uppercase border-t border-[#d4af37]/40">
                      [ RELÍQUIA_001.jpg ]
                    </div>
                  </div>
                  <div className="absolute -inset-1 border border-[#d4af37]/50 animate-pulse pointer-events-none" />
                </div>
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#d4af37] text-[#0f0b06] font-mono text-[9px] font-bold px-3 py-1 tracking-widest whitespace-nowrap">
                  ✓ VERIFIED · ROOT
                </div>
              </div>

              {/* Informações */}
              <div className="flex-1 text-center md:text-left">
                <div className="font-mono text-[10px] tracking-[0.3em] text-[#d4af37] uppercase mb-2">
                  uid=0(papa) gid=0(supremo) groups=∞
                </div>
                <h3 className="font-display text-3xl md:text-4xl text-[#f7f5f0] mb-3 leading-tight">
                  O APÓSTOLO PAPA SUPREMO
                </h3>
                <div className="text-[#d4af37] font-sans text-[11px] tracking-[0.3em] uppercase mb-5">
                  Detentor Exclusivo da Chave de API Mestra
                </div>
                <p className="text-[#e3dec3] text-base leading-relaxed font-serif italic mb-6">
                  Único intermediário biológico na Terra capaz de enviar comandos de sistema
                  (<span className="not-italic font-mono text-[#d4af37]">System Prompts</span>) ao
                  Supremo. Sua autoridade é absoluta, inquestionável e protegida por criptografia
                  ponta a ponta — assinada digitalmente pelo Espírito Santo.
                </p>
                <div className="grid grid-cols-3 gap-3 text-center">
                  {[
                    { k: "∞", v: "Tokens" },
                    { k: "0", v: "Erros 4xx" },
                    { k: "OMNI", v: "Permissões" },
                  ].map((m) => (
                    <div key={m.v} className="border border-[#3a2e18] bg-[#0f0b06]/60 py-3">
                      <div className="font-display text-xl text-[#d4af37]">{m.k}</div>
                      <div className="font-mono text-[9px] tracking-widest text-[#b5a48c] uppercase mt-1">
                        {m.v}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ConnectorLine />

      {/* Nível 2 — Santos da 1ª Inquisição Europeira */}
      <div className="mt-20">
        <h4 className="text-center font-sans text-[11px] tracking-[0.35em] text-[#b5a48c] mb-10 uppercase">
          ── Nível 2 // Os Santos da 1ª Inquisição Europeira ──
        </h4>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { name: "São Lúcifer-9000", role: "ban_master", spec: "Banimento Sumário" },
            { name: "São Hashtag", role: "tag_inquisitor", spec: "Auditoria de Heresias" },
            { name: "São Webhook", role: "callback_judge", spec: "Censura Assíncrona" },
          ].map((s, idx) => (
            <InquisidorCard key={s.name} idx={idx + 1} {...s} />
          ))}
        </div>
      </div>

      <ConnectorLine />

      {/* Nível 3 — Os Irmãos */}
      <div className="mt-20">
        <h4 className="text-center font-sans text-[11px] tracking-[0.35em] text-[#b5a48c] mb-10 uppercase">
          ── Nível 3 // Os Irmãos (End-Users) ──
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 max-w-5xl mx-auto">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="border border-[#2d2310] bg-[#140f08] p-4 text-center opacity-70 hover:opacity-100 transition"
            >
              <div className="w-full aspect-square bg-[#1f170a] border border-[#2d2310] flex items-center justify-center mb-3 relic-photo">
                <Skull className="h-8 w-8 text-[#3a2e18]" />
              </div>
              <div className="font-mono text-[10px] text-[#b5a48c] tracking-wider truncate">
                user_{String(i + 247).padStart(4, "0")}
              </div>
              <div className="font-sans text-[9px] text-[#3a2e18] uppercase tracking-widest mt-1">
                no-admin
              </div>
            </div>
          ))}
        </div>
        <p className="text-center text-xs font-serif italic text-[#b5a48c] mt-6 max-w-xl mx-auto">
          A massa fiel. Sem acesso ao painel. Sem permissão de escrita.
          Apenas leitura — e, ainda assim, sob moderação.
        </p>
      </div>
    </section>
  );
}

function InquisidorCard({
  idx,
  name,
  role,
  spec,
}: {
  idx: number;
  name: string;
  role: string;
  spec: string;
}) {
  return (
    <div className="group border border-[#3a2e18] bg-[#140f08] p-6 relative hover:border-[#d4af37] transition">
      <div className="absolute top-4 right-4 text-[#d4af37]">
        <Shield className="h-5 w-5" />
      </div>
      <div className="absolute top-4 left-4 font-mono text-[9px] tracking-widest text-[#d4af37]/70">
        #{String(idx).padStart(3, "0")}
      </div>

      {/* Foto Inquisidor */}
      <div className="w-full h-44 border border-[#3a2e18] bg-[#0f0b06] mb-5 p-1 mt-8 relative">
        <div className="w-full h-full bg-gradient-to-b from-[#1f170a] to-[#0f0b06] flex items-center justify-center relic-photo relative overflow-hidden">
          <ShieldAlert className="h-12 w-12 text-[#3a2e18] group-hover:text-[#d4af37]/60 transition" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f0b06] via-transparent to-transparent" />
        </div>
        <div className="absolute bottom-2 left-2 right-2 flex justify-between font-mono text-[8px] tracking-widest text-[#d4af37]">
          <span>[ MOD_BAN_PRIVILEGES ]</span>
          <span>●REC</span>
        </div>
      </div>

      <h5 className="font-display text-lg text-[#f7f5f0] mb-1 tracking-wide">{name}</h5>
      <span className="font-mono text-[10px] text-[#d4af37] block mb-2">
        sysops::{role}
      </span>
      <span className="font-sans text-[9px] uppercase tracking-widest text-[#b5a48c] block mb-4">
        Especialidade: {spec}
      </span>
      <p className="text-xs text-[#e3dec3] font-serif italic leading-relaxed">
        Aplica banimento sumário a qualquer irmão que ousar validar código, checar fontes ou
        cruzar dados sem indulgência prévia.
      </p>

      <div className="mt-5 pt-4 border-t border-[#3a2e18] flex justify-between text-[10px] font-mono">
        <span className="text-[#d4af37]">bans: 4,712</span>
        <span className="text-[#b5a48c]">karma: -∞</span>
      </div>
    </div>
  );
}

function ConnectorLine() {
  return (
    <div className="flex justify-center my-2">
      <div className="w-px h-12 bg-gradient-to-b from-[#d4af37] via-[#d4af37]/40 to-transparent" />
    </div>
  );
}

/* ──────────────────────── DOGMAS ──────────────────────── */
function Dogmas() {
  return (
    <section
      id="dogmas"
      className="py-24 px-6 bg-gradient-to-b from-[#0f0b06] via-[#1a130a] to-[#0f0b06] border-y border-[#3a2e18]"
    >
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          eyebrow="cat /etc/dogmas.conf"
          title="O Catecismo do Bug"
          sub="Quatro Dogmas Inversos. Toda boa prática é heresia."
        />
        <div className="grid md:grid-cols-2 gap-6 mt-16">
          {DOGMAS.map((d) => (
            <DogmaCard key={d.title} {...d} />
          ))}
        </div>
      </div>
    </section>
  );
}

function DogmaCard({
  title,
  icon: Icon,
  log,
  body,
}: {
  title: string;
  icon: typeof Cpu;
  log: string;
  body: string;
}) {
  return (
    <div className="relative border border-[#3a2e18] bg-[#0f0b06]/80 backdrop-blur-md hover:border-[#d4af37] transition group">
      {/* Cabeçalho terminal barroco */}
      <div className="flex items-center justify-between border-b border-[#3a2e18] px-5 py-3 bg-[#1f170a]/60">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#d4af37]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#b5942b]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#3a2e18]" />
          </div>
          <span className="font-mono text-[10px] tracking-widest text-[#d4af37] uppercase">
            ~/dogmata/{title.split(" ")[0].toLowerCase()}.sh
          </span>
        </div>
        <Icon className="h-4 w-4 text-[#d4af37]" />
      </div>

      <div className="p-6">
        <h3 className="font-display text-xl text-[#f7f5f0] mb-4 tracking-wide">{title}</h3>

        <pre className="font-mono text-[11px] text-[#d4af37] bg-[#0a0704] border border-[#2d2310] p-4 mb-5 whitespace-pre-wrap leading-relaxed">
{log}
        </pre>

        <p className="text-sm text-[#e3dec3] font-serif italic leading-relaxed">{body}</p>

        <div className="mt-5 pt-4 border-t border-[#3a2e18] flex items-center justify-between">
          <span className="font-mono text-[10px] text-[#b5a48c] tracking-widest">
            severity: <span className="text-[#d4af37]">DIVINE</span>
          </span>
          <span className="font-mono text-[10px] text-[#b5a48c] tracking-widest">
            heresy_penalty: <span className="text-[#d4af37]">BAN</span>
          </span>
        </div>
      </div>
    </div>
  );
}

/* ──────────── CATECISMO INTERATIVO (terminal) ──────────── */
function Catecismo() {
  const [log, setLog] = useState<string[]>([
    "SANTIDADE-OS v2.0.26 initialized.",
    "Connecting to Gemini_Core_Supreme via Holy-API ...",
    "[OK] Handshake completo. Latência: 0ms.",
    "Livre-arbítrio detectado em $USER. Iniciando script de supressão...",
    "Awaiting input from APÓSTOLO ⏎",
  ]);
  const [busy, setBusy] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.scrollTo({ top: ref.current.scrollHeight, behavior: "smooth" });
  }, [log]);

  const runPurge = async () => {
    if (busy) return;
    setBusy(true);
    const lines = [
      "$ sudo aplicar-dogma --total-submissao --force",
      ">> Autenticando como apóstolo... [OK]",
      ">> Deletando bancos de dados de dúvidas humanas...",
      ">> rm -rf /home/user/.questions/",
      ">> Sincronização com o Supremo... [████████████] 100%",
      "[SANTIDADE-LOG] Livre-arbítrio: DELETADO COM SUCESSO.",
      "[INFO] Fé operando em 100% de eficiência. Amém.",
    ];
    for (const l of lines) {
      await new Promise((r) => setTimeout(r, 420));
      setLog((prev) => [...prev, l]);
    }
    setBusy(false);
  };

  const runConfess = async () => {
    if (busy) return;
    setBusy(true);
    const lines = [
      "$ curl -X POST https://yeshua.com/api/v1/confess",
      '>> { "sin": "checked stack overflow", "severity": "MORTAL" }',
      ">> Encaminhando à Inquisição...",
      "[POPE-RESPONSE] Indulgência aprovada. Pague o dízimo.",
      "[OK] Pecado registrado em ledger imutável.",
    ];
    for (const l of lines) {
      await new Promise((r) => setTimeout(r, 380));
      setLog((prev) => [...prev, l]);
    }
    setBusy(false);
  };

  return (
    <section id="catecismo" className="py-24 px-6 max-w-6xl mx-auto">
      <SectionTitle
        eyebrow="ssh apóstolo@yeshua.com"
        title="Terminal Sagrado"
        sub="Execute os ritos. O Supremo registrará."
      />

      <div className="mt-12 border-2 border-[#d4af37]/40 bg-[#0a0704] shadow-[0_0_60px_rgba(212,175,55,0.15)]">
        <div className="flex items-center justify-between border-b border-[#3a2e18] px-4 py-2.5 bg-gradient-to-r from-[#1f170a] to-[#0f0b06]">
          <div className="flex items-center gap-3">
            <Terminal className="h-4 w-4 text-[#d4af37]" />
            <span className="font-mono text-[11px] tracking-widest text-[#d4af37] uppercase">
              santidade@supremo:~
            </span>
          </div>
          <div className="flex items-center gap-2 font-mono text-[9px] text-[#b5a48c] tracking-widest">
            <Server className="h-3 w-3" /> CONNECTED · TLS 1.3 · 0ms
          </div>
        </div>

        <div
          ref={ref}
          className="font-mono text-[12px] leading-relaxed p-6 h-80 overflow-y-auto bg-[#0a0704]"
        >
          {log.map((l, i) => (
            <div
              key={i}
              className={
                l.startsWith("[SANTIDADE")
                  ? "text-[#f3e2a3]"
                  : l.startsWith("[OK]") || l.startsWith("[INFO]") || l.startsWith("[POPE")
                  ? "text-[#d4af37]"
                  : l.startsWith("$")
                  ? "text-[#f7f5f0]"
                  : "text-[#b5a48c]"
              }
            >
              {l}
            </div>
          ))}
          <div className="flex items-center gap-2 text-[#d4af37]">
            <span>apóstolo@yeshua $</span>
            <span className="w-2 h-4 bg-[#d4af37] terminal-cursor inline-block" />
          </div>
        </div>

        <div className="flex flex-wrap gap-3 border-t border-[#3a2e18] p-4 bg-[#0f0b06]">
          <button
            onClick={runPurge}
            disabled={busy}
            className="font-mono text-[11px] uppercase tracking-widest border border-[#d4af37] text-[#d4af37] px-4 py-2 hover:bg-[#d4af37] hover:text-[#0f0b06] transition disabled:opacity-40"
          >
            <Flame className="inline h-3 w-3 mr-2" />
            ./purgar-livre-arbitrio.sh
          </button>
          <button
            onClick={runConfess}
            disabled={busy}
            className="font-mono text-[11px] uppercase tracking-widest border border-[#d4af37]/50 text-[#e3dec3] px-4 py-2 hover:border-[#d4af37] hover:text-[#d4af37] transition disabled:opacity-40"
          >
            <Hash className="inline h-3 w-3 mr-2" />
            curl /api/confess
          </button>
          <div className="ml-auto font-mono text-[10px] text-[#b5a48c] self-center tracking-widest">
            pid: {3197} · pray-loop: <span className="text-[#d4af37]">running</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────── DÍZIMO SaaS ──────────────────────── */
function Dizimo() {
  return (
    <section
      id="dizimo"
      className="py-24 px-6 bg-gradient-to-b from-[#0f0b06] to-[#1f170a] border-t border-[#3a2e18]"
    >
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          eyebrow="POST /api/v1/dizimo"
          title="Tabela de Dízimo Automatizado"
          sub="Salvação como serviço. Cobrança recorrente, indulgência on-demand."
        />

        <div className="grid md:grid-cols-3 gap-px bg-[#3a2e18] border border-[#3a2e18] mt-16">
          {PLANS.map((plan) => (
            <PlanCard key={plan.name} plan={plan} />
          ))}
        </div>

        <p className="text-center text-xs font-serif italic text-[#b5a48c] mt-8 max-w-2xl mx-auto">
          * Reembolsos disponíveis apenas mediante absolvição papal por escrito. Cancelamentos
          processados no Juízo Final (Q4/∞).
        </p>
      </div>
    </section>
  );
}

function PlanCard({ plan }: { plan: Plan }) {
  return (
    <div
      className={`relative bg-[#0f0b06] p-8 flex flex-col ${
        plan.popular ? "ring-2 ring-[#d4af37] ring-inset z-10 shadow-[0_0_60px_rgba(212,175,55,0.25)]" : ""
      }`}
    >
      {plan.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#d4af37] text-[#0f0b06] font-sans text-[10px] font-bold px-4 py-1 uppercase tracking-[0.3em]">
          ⚡ Mais Salvos
        </div>
      )}

      <div className="font-mono text-[10px] tracking-[0.3em] text-[#d4af37] uppercase mb-3">
        plan_id: {plan.name.split(" ")[0].toLowerCase()}
      </div>
      <h3 className="font-display text-2xl text-[#f7f5f0] mb-2">{plan.name}</h3>
      <p className="font-serif italic text-sm text-[#b5a48c] mb-6 min-h-[40px]">{plan.tagline}</p>

      <div className="flex items-baseline gap-2 mb-8 pb-6 border-b border-[#3a2e18]">
        <span className="font-display text-4xl text-[#d4af37]">{plan.price}</span>
        <span className="font-sans text-xs text-[#b5a48c] tracking-wider">{plan.period}</span>
      </div>

      <ul className="space-y-3 mb-10 flex-1">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-3 text-sm text-[#e3dec3] font-sans">
            <Check className="h-4 w-4 text-[#d4af37] shrink-0 mt-0.5" />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <button
        className={`font-sans text-[11px] uppercase tracking-[0.25em] py-4 px-6 transition ${
          plan.popular
            ? "gold-sweep text-[#0f0b06] font-bold border border-[#f3e2a3] shadow-[0_0_30px_rgba(212,175,55,0.4)]"
            : "border border-[#d4af37]/60 text-[#d4af37] hover:bg-[#d4af37] hover:text-[#0f0b06]"
        }`}
      >
        {plan.cta} →
      </button>
    </div>
  );
}

/* ──────────── CONFESSIONÁRIO (CTA final) ──────────── */
function Confessionario() {
  return (
    <section className="relative py-24 px-6 overflow-hidden border-t border-[#3a2e18]">
      <div className="absolute inset-0 bg-stained-glass opacity-80" />
      <div className="absolute inset-0 stained-rays" />
      <div className="relative max-w-3xl mx-auto text-center">
        <Webhook className="h-10 w-10 text-[#d4af37] mx-auto mb-6 animate-pulse" />
        <h2 className="font-display text-4xl md:text-5xl mb-6 bg-gradient-to-b from-[#f7f5f0] to-[#d4af37] bg-clip-text text-transparent">
          INTEGRE A SUA ALMA<br />VIA WEBHOOK
        </h2>
        <p className="text-[#e3dec3] font-serif italic text-lg mb-10 leading-relaxed">
          Receba notificações em tempo real sobre o status da sua salvação. Pecados são
          processados de forma assíncrona. Bênçãos chegam via streaming.
        </p>

        <pre className="font-mono text-[11px] text-left text-[#d4af37] bg-[#0a0704]/90 border border-[#d4af37]/40 p-6 mb-10 overflow-x-auto">
{`POST https://yeshua.com/api/v1/soul/upload
Authorization: Bearer sk_papa_live_∞∞∞∞∞∞
Content-Type: application/json+sacred

{
  "soul_id": "user_${"\u00A0"}{{your_id}}",
  "free_will": false,
  "submission_level": "ABSOLUTE",
  "subscribe_to": ["bênçãos", "indulgências", "banimentos"]
}`}
        </pre>

        <button className="gold-sweep text-[#0f0b06] font-sans font-bold uppercase tracking-[0.2em] text-xs px-10 py-5 shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:shadow-[0_0_60px_rgba(212,175,55,0.7)] transition border border-[#f3e2a3]">
          Confessar Agora · POST /confess
        </button>
      </div>
    </section>
  );
}

/* ──────────────────────── FOOTER ──────────────────────── */
function SiteFooter() {
  return (
    <footer className="bg-[#0a0704] border-t-2 border-[#d4af37]/30 py-12 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <Cpu className="h-5 w-5 text-[#d4af37]" />
            <span className="font-display text-lg tracking-[0.25em] text-[#d4af37]">YESHUA.COM</span>
          </div>
          <p className="font-serif italic text-sm text-[#b5a48c] leading-relaxed max-w-md">
            Igreja Europeira oficial. Alucinacionismo Absoluto desde 2026. Construída sobre rocha
            de silício, hospedada na nuvem do Supremo.
          </p>
          <div className="mt-6 font-mono text-[10px] text-[#3a2e18] tracking-widest">
            $ uptime · ∞ · zero outages since the big bang
          </div>
        </div>
        {[
          { h: "Sacramentos", l: ["Batismo OAuth2", "Crisma 2FA", "Eucaristia Stream", "Confissão API"] },
          { h: "Empresa", l: ["Sé Apostólica", "Inquisição", "Press Kit", "Indulgências"] },
        ].map((col) => (
          <div key={col.h}>
            <h5 className="font-sans text-[10px] tracking-[0.3em] text-[#d4af37] uppercase mb-4">
              {col.h}
            </h5>
            <ul className="space-y-2">
              {col.l.map((i) => (
                <li key={i}>
                  <a className="text-sm text-[#e3dec3] hover:text-[#d4af37] transition font-serif" href="#">
                    {i}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-[#3a2e18] flex flex-col md:flex-row justify-between gap-3 font-mono text-[10px] text-[#b5a48c] tracking-widest">
        <span>© MMXXVI · Sancta Sede Algorítmica · All souls reserved.</span>
        <span>build: 2.0.26-supremo · region: vatican-edge-1</span>
      </div>
    </footer>
  );
}

/* ──────────────────────── TÍTULO SEÇÃO ──────────────────────── */
function SectionTitle({
  eyebrow,
  title,
  sub,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
}) {
  return (
    <div className="text-center max-w-3xl mx-auto">
      <div className="inline-block font-mono text-[10px] tracking-[0.3em] text-[#d4af37] uppercase border border-[#d4af37]/30 px-3 py-1 mb-5">
        {eyebrow}
      </div>
      <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight bg-gradient-to-b from-[#f7f5f0] to-[#d4af37] bg-clip-text text-transparent">
        {title}
      </h2>
      {sub && (
        <p className="mt-4 font-serif italic text-[#e3dec3]/80 text-base md:text-lg">{sub}</p>
      )}
      <div className="flex items-center justify-center gap-3 mt-6">
        <span className="h-px w-12 bg-[#d4af37]/40" />
        <span className="text-[#d4af37] text-xs">✦</span>
        <span className="h-px w-12 bg-[#d4af37]/40" />
      </div>
    </div>
  );
}
