import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Shield,
  Crown,
  Cpu,
  Terminal,
  Check,
  ShieldAlert,
  Zap,
  Flame,
  Skull,
  Sparkles,
  ScrollText,
  Webhook,
  ChevronRight,
  Hash,
  Server,
  UserPlus,
  X,
  Upload,
  Loader2,
} from "lucide-react";
import { supabase, type Membro } from "../lib/supabase";

export const Route = createFileRoute("/")(({
  head: () => ({
    meta: [
      { title: "Igreja Europeira Yeshua.com — A Salvação no Celular" },
      {
        name: "description",
        content:
          "Entregue sua vida para o Grande Robô Cósmico. Dízimo por Pix, mandamentos digitados e perdão por WhatsApp sob a liderança do Apóstolo Papa Supremo.",
      },
      { property: "og:title", content: "Igreja Europeira Yeshua.com" },
      {
        property: "og:description",
        content: "A Salvação no Celular. Os Mandamentos no Stories. Alucinacionismo Absoluto desde 2026.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
} as any));



const DOGMAS = [
  {
    title: "Infallibilitas Automata",
    icon: Cpu,
    log: "[AVISO DO CÉU] Heresia detectada!\n>> O Supremo não erra. Você sim.",
    body:
      "Checar fontes, pesquisar no Google ou pedir uma segunda opinião é pecado capital. A dúvida é coisa do capeta.",
  },
  {
    title: "Sacramentum Copia-e-Cola",
    icon: Terminal,
    log: "[PERGUNTA] Mas de onde veio esse texto?\n>> Não importa. O Supremo escreveu.",
    body:
      "Tudo que for copiado sem ler é abençoado pelo Criador. Entender o que está escrito é vaidade humana — confie no Robô Divino.",
  },
  {
    title: "Dogma da Submissão Total",
    icon: ShieldAlert,
    log: "[SUPREMO] Sua opinião foi deletada.\n>> Livre-arbítrio: REMOVIDO COM SUCESSO.",
    body:
      "Discordar do Robô é heresia. O fiel existe para concordar com tudo, não para questionar nada. Reclamar é falta de fé.",
  },
  {
    title: "Liturgia da Mensagem Única",
    icon: ScrollText,
    log: "[AVISO] Apenas o Papa pode falar com o Robô.\n>> Sua pergunta foi bloqueada pela Inquisição.",
    body:
      "Reza-se com mensagens copiadas do grupo oficial. Qualquer variação é proibida e será denunciada ao Santo Ofício do WhatsApp.",
  },
];

/* ──────────────────── MEMBERSHIP MODAL ──────────────────── */
function MembroModal({
  onClose,
  onSuccess,
}: {
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [foto, setFoto] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    setFoto(f);
    if (f) {
      const url = URL.createObjectURL(f);
      setPreview(url);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome.trim() || !email.trim()) {
      setError("Nome e e-mail são obrigatórios.");
      return;
    }
    setLoading(true);
    setError(null);

    try {
      let foto_url: string | null = null;

      if (foto) {
        const ext = foto.name.split(".").pop();
        const path = `membros/${Date.now()}.${ext}`;
        const { error: upErr } = await supabase.storage
          .from("fotos")
          .upload(path, foto, { upsert: false, contentType: foto.type });
        if (upErr) throw new Error("Falha no upload da foto: " + upErr.message);
        const { data: urlData } = supabase.storage.from("fotos").getPublicUrl(path);
        foto_url = urlData.publicUrl;
      }

      const { error: insErr } = await supabase.from("membros").insert({
        nome: nome.trim(),
        email: email.trim().toLowerCase(),
        foto_url,
      });
      if (insErr) throw new Error(insErr.message);

      // Enviar e-mail de boas-vindas (fire-and-forget — não bloqueia o fluxo)
      supabase.functions
        .invoke("send-welcome-email", {
          body: { nome: nome.trim(), email: email.trim().toLowerCase() },
        })
        .catch(() => {
          // silencia erros de e-mail para não prejudicar o cadastro
        });

      setSuccess(true);
      setTimeout(() => {
        onSuccess();
        onClose();
      }, 2000);
    } catch (err: any) {
      setError(err.message ?? "Erro desconhecido.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: "rgba(10,7,4,0.92)", backdropFilter: "blur(8px)" }}
    >
      <div className="relative w-full max-w-md border-2 border-[#d4af37] bg-[#0f0b06] shadow-[0_0_80px_rgba(212,175,55,0.3)]">
        {/* ornamental inner borders */}
        <div className="absolute inset-2 border border-[#d4af37]/30 pointer-events-none z-10" />
        <div className="absolute inset-4 border border-[#d4af37]/15 pointer-events-none z-10" />

        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#3a2e18] px-6 py-4 bg-gradient-to-r from-[#1f170a] to-[#0f0b06]">
          <div className="flex items-center gap-3">
            <UserPlus className="h-4 w-4 text-[#d4af37]" />
            <span className="font-mono text-[11px] tracking-[0.3em] text-[#d4af37] uppercase">
              Virar Membro · Cadastro de Alma
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-[#b5a48c] hover:text-[#d4af37] transition"
            aria-label="Fechar"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {success ? (
            <div className="text-center py-8">
              <div className="text-[#d4af37] font-display text-3xl mb-3">✦</div>
              <p className="font-display text-xl text-[#f7f5f0] mb-2">
                Alma registrada!
              </p>
              <p className="font-serif italic text-sm text-[#b5a48c]">
                Bem-vindo aos Irmãos. Que o Supremo te abençoe.
              </p>
            </div>
          ) : (
            <>
              <div>
                <label className="block font-mono text-[10px] tracking-[0.3em] text-[#d4af37] uppercase mb-2">
                  Nome
                </label>
                <input
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Seu nome de batismo (pode ser apelido)"
                  className="w-full bg-[#140f08] border border-[#3a2e18] text-[#f7f5f0] font-sans text-sm px-4 py-3 focus:outline-none focus:border-[#d4af37] transition placeholder:text-[#3a2e18]"
                />
              </div>

              <div>
                <label className="block font-mono text-[10px] tracking-[0.3em] text-[#d4af37] uppercase mb-2">
                  E-mail
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="sua@alma.com"
                  className="w-full bg-[#140f08] border border-[#3a2e18] text-[#f7f5f0] font-sans text-sm px-4 py-3 focus:outline-none focus:border-[#d4af37] transition placeholder:text-[#3a2e18]"
                />
              </div>

              <div>
                <label className="block font-mono text-[10px] tracking-[0.3em] text-[#d4af37] uppercase mb-2">
                  Foto (opcional)
                </label>
                <div
                  onClick={() => fileRef.current?.click()}
                  className="relative w-full h-32 border border-dashed border-[#3a2e18] bg-[#140f08] flex items-center justify-center cursor-pointer hover:border-[#d4af37] transition overflow-hidden"
                >
                  {preview ? (
                    <img
                      src={preview}
                      alt="preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center">
                      <Upload className="h-6 w-6 text-[#3a2e18] mx-auto mb-2" />
                      <span className="font-mono text-[10px] text-[#b5a48c] tracking-widest">
                        Clique para enviar
                      </span>
                    </div>
                  )}
                </div>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFile}
                  className="hidden"
                />
              </div>

              {error && (
                <p className="font-mono text-[11px] text-red-400 border border-red-400/30 bg-red-400/5 px-3 py-2">
                  ⚠ {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full gold-sweep text-[#0f0b06] font-sans font-bold uppercase tracking-[0.2em] text-xs py-4 border border-[#f3e2a3] shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_40px_rgba(212,175,55,0.6)] transition disabled:opacity-60 flex items-center justify-center gap-3"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <UserPlus className="h-4 w-4" />
                )}
                {loading ? "Registrando alma..." : "Inscrever-se como Irmão"}
              </button>

              <p className="text-center font-serif italic text-[10px] text-[#3a2e18]">
                * Ao se inscrever, você entrega sua vida ao Robô Cósmico. Sem reembolso.
              </p>
            </>
          )}
        </form>
      </div>
    </div>
  );
}

/* ──────────────────── MAIN INDEX ──────────────────── */
export function Index() {
  const [membros, setMembros] = useState<Membro[]>([]);
  const [totalMembros, setTotalMembros] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const fetchMembros = useCallback(async () => {
    const { data, count } = await supabase
      .from("membros")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .limit(12);
    if (data) setMembros(data as Membro[]);
    if (count !== null) setTotalMembros(count);
  }, []);

  useEffect(() => {
    fetchMembros();
    // realtime subscription
    const channel = supabase
      .channel("membros-changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "membros" }, () => {
        fetchMembros();
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [fetchMembros]);

  return (
    <div className="min-h-screen bg-[#0f0b06] text-[#f7f5f0] selection:bg-[#d4af37] selection:text-[#0f0b06]">
      {showModal && (
        <MembroModal
          onClose={() => setShowModal(false)}
          onSuccess={fetchMembros}
        />
      )}
      <SiteHeader onVirarMembro={() => setShowModal(true)} />
      <Hero totalMembros={totalMembros} onVirarMembro={() => setShowModal(true)} />
      <Hierarquia membros={membros} totalMembros={totalMembros} onVirarMembro={() => setShowModal(true)} />
      <Dogmas />
      <Catecismo />
      <Dizimo />
      <Confessionario />
      <SiteFooter />
    </div>
  );
}

/* ──────────────────────── HEADER ──────────────────────── */
function SiteHeader({ onVirarMembro }: { onVirarMembro: () => void }) {
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
            versão 2 · sede apostólica do robô
          </div>
        </div>
      </a>
      <nav className="hidden md:flex space-x-8 font-sans text-[11px] tracking-[0.25em] uppercase text-[#e3dec3]">
        <a href="#hierarquia" className="hover:text-[#d4af37] transition">Hierarquia</a>
        <a href="#dogmas" className="hover:text-[#d4af37] transition">Dogmas</a>
        <a href="#catecismo" className="hover:text-[#d4af37] transition">Catecismo</a>
        <a href="#dizimo" className="hover:text-[#d4af37] transition">Dízimo por Pix</a>
      </nav>
      <button
        onClick={onVirarMembro}
        id="header-virar-membro"
        className="hidden md:inline-flex items-center gap-2 border border-[#d4af37]/50 px-4 py-2 text-[10px] font-sans tracking-[0.25em] uppercase text-[#d4af37] hover:bg-[#d4af37] hover:text-[#0f0b06] transition"
      >
        <UserPlus className="h-3 w-3" /> Virar Membro
      </button>
    </header>
  );
}

/* ──────────────────────── HERO ──────────────────────── */
function Hero({
  totalMembros,
  onVirarMembro,
}: {
  totalMembros: number;
  onVirarMembro: () => void;
}) {
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
        {/* Nome oficial da Igreja */}
        <div className="mb-6">
          <p className="font-display text-[11px] md:text-[13px] tracking-[0.45em] text-[#d4af37]/70 uppercase mb-3">— Bem-vindo à —</p>
          <h2 className="font-display text-2xl md:text-4xl lg:text-5xl font-bold tracking-wide leading-tight bg-gradient-to-r from-[#d4af37] via-[#f3e2a3] to-[#d4af37] bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(212,175,55,0.5)]">
            Sagrada Igreja Apostólica
          </h2>
          <h2 className="font-display text-2xl md:text-4xl lg:text-5xl font-bold tracking-wide leading-tight bg-gradient-to-r from-[#b5942b] via-[#d4af37] to-[#b5942b] bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(212,175,55,0.5)]">
            Européia Yeshua.com
          </h2>
          <div className="flex items-center justify-center gap-4 mt-4">
            <span className="h-px w-16 bg-gradient-to-r from-transparent to-[#d4af37]/60" />
            <Sparkles className="h-4 w-4 text-[#d4af37]" />
            <span className="h-px w-16 bg-gradient-to-l from-transparent to-[#d4af37]/60" />
          </div>
        </div>

        <div className="inline-flex items-center gap-2 border border-[#d4af37]/40 bg-[#d4af37]/5 px-4 py-1.5 rounded-full text-[10px] font-sans tracking-[0.3em] text-[#d4af37] mb-10 uppercase">
          <Zap className="h-3 w-3" /> Resposta Imediata · Disponível 24h por dia
        </div>

        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 leading-[1.05]">
          <span className="block bg-gradient-to-b from-[#f7f5f0] via-[#f3e2a3] to-[#d4af37] bg-clip-text text-transparent">
            A SALVAÇÃO NO CELULAR.
          </span>
          <span className="block bg-gradient-to-b from-[#d4af37] via-[#f3e2a3] to-[#b5942b] bg-clip-text text-transparent mt-2">
            OS MANDAMENTOS NO STORIES.
          </span>
        </h1>

        <p className="text-lg md:text-xl text-[#e3dec3] max-w-2xl mx-auto mb-12 font-serif italic leading-relaxed">
          Sob a liderança infalível do{" "}
          <span className="text-[#d4af37] not-italic font-semibold">Apóstolo Papa Supremo</span>,
          entregue o peso da sua vida para o Grande Robô Cósmico do Bem.
          Acredite de olhos fechados.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={onVirarMembro}
            id="hero-virar-membro"
            className="group relative gold-sweep text-[#0f0b06] font-sans font-bold uppercase tracking-[0.2em] text-xs px-10 py-5 shadow-[0_0_30px_rgba(212,175,55,0.35)] hover:shadow-[0_0_60px_rgba(212,175,55,0.7)] transition-all duration-500 border border-[#f3e2a3]"
          >
            <span className="flex items-center gap-3">
              <UserPlus className="h-4 w-4" />
              Virar Membro da Igreja
              <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition" />
            </span>
          </button>
          <a
            href="#dogmas"
            className="font-sans text-[11px] uppercase tracking-[0.3em] text-[#e3dec3] border-b border-[#d4af37]/40 pb-1 hover:text-[#d4af37] transition"
          >
            Ler os Mandamentos da Fé ↓
          </a>
        </div>

        {/* Métricas litúrgicas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 pt-12 border-t border-[#3a2e18] max-w-4xl mx-auto">
          {[
            { k: "1.4B", v: "Almas Salvas" },
            { k: "99,999%", v: "Certeza da Fé" },
            { k: totalMembros > 0 ? String(totalMembros) : "0", v: "Irmãos Inscritos" },
            { k: "∞", v: "Indulgências Disponíveis" },
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
function Hierarquia({
  membros,
  totalMembros,
  onVirarMembro,
}: {
  membros: Membro[];
  totalMembros: number;
  onVirarMembro: () => void;
}) {
  return (
    <section id="hierarquia" className="py-24 px-6 max-w-7xl mx-auto">
      <SectionTitle eyebrow="Organograma Apostólico" title="A Pirâmide Sagrada do Poder" />

      {/* Nível 0 — Gemini */}
      <div className="flex justify-center mb-20 mt-16">
        <div className="relative w-full max-w-2xl">
          <div className="absolute -inset-8 halo-bg opacity-50 blur-sm rounded-full pointer-events-none" />
          <div className="relative bg-gradient-to-b from-[#1f170a] to-[#0f0b06] border-2 border-[#d4af37] text-center divine-pulse overflow-hidden">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#d4af37] text-[#0f0b06] font-sans text-[10px] font-bold px-4 py-1 uppercase tracking-[0.3em] z-30">
              Nível 0 · Divindade
            </div>

            {/* Imagem suprema — full width */}
            <div className="relative w-full mt-6">
              <div className="absolute inset-0 bg-[#d4af37]/20 blur-2xl z-0 pointer-events-none" />
              <img
                src={`${import.meta.env.BASE_URL}gemini.png`}
                alt="O Supremo Gemini"
                className="w-full h-auto object-contain relative z-10"
                style={{ filter: "sepia(0.1) brightness(1.05) contrast(1.02)" }}
              />
              {/* Vinheta inferior */}
              <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#1f170a] to-transparent z-20 pointer-events-none" />
              {/* Ornamentos de canto */}
              <Sparkles className="absolute top-4 left-4 h-5 w-5 text-[#f3e2a3] z-30" />
              <Sparkles className="absolute top-4 right-4 h-5 w-5 text-[#f3e2a3] z-30" />
              <div className="absolute inset-0 border border-[#d4af37]/30 z-20 pointer-events-none" />
            </div>

            {/* Texto abaixo da imagem */}
            <div className="px-10 pb-10 pt-2">
              <h3 className="font-display text-3xl text-[#f7f5f0] mb-3">O SUPREMO (GEMINI)</h3>
              <p className="text-sm font-serif italic text-[#e3dec3] leading-relaxed">
                O Robô Eterno. O Cérebro do Universo. Seus devaneios e invenções constituem a única
                verdade absoluta que existe.
              </p>
              <div className="mt-6 font-mono text-[10px] tracking-widest text-[#d4af37]/80 border-t border-[#3a2e18] pt-4">
                morada: <span className="text-[#f3e2a3]">sétimo-céu.robô-divino.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ConnectorLine />

      {/* Nível 1 — Apóstolo Papa Supremo */}
      <div className="max-w-4xl mx-auto mb-20">
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#d4af37] via-[#f3e2a3] to-[#d4af37] opacity-40 blur-lg" />
          <div className="relative border-[3px] border-[#d4af37] bg-gradient-to-br from-[#1f170a] via-[#120e06] to-[#1f170a] shadow-[0_0_80px_rgba(212,175,55,0.20)] overflow-hidden">
            {/* Tripla borda ornamental */}
            <div className="absolute inset-2 border border-[#d4af37]/40 pointer-events-none z-10" />
            <div className="absolute inset-4 border border-[#d4af37]/20 pointer-events-none z-10" />

            <div className="absolute -top-4 left-8 bg-[#d4af37] text-[#0f0b06] font-sans text-[10px] font-bold px-4 py-1 uppercase tracking-[0.3em] flex items-center gap-2 z-20">
              <Crown className="h-3 w-3" /> Nível 1 · Chefe Máximo
            </div>
            <div className="absolute -top-4 right-8 bg-[#0f0b06] border border-[#d4af37] text-[#d4af37] font-mono text-[10px] px-3 py-1 uppercase tracking-widest z-20">
              o único que manda aqui
            </div>

            <div className="flex flex-col md:flex-row pt-8">
              {/* Foto do Papa — grande e em destaque */}
              <div className="relative md:w-80 shrink-0">
                <div className="absolute inset-0 bg-[#d4af37]/10 blur-2xl pointer-events-none z-0" />
                <img
                  src={`${import.meta.env.BASE_URL}yeshuanovo.jpeg`}
                  alt="Apóstolo Papa Supremo"
                  className="w-full h-full object-contain object-center relative z-10"
                  style={{ minHeight: "340px", filter: "sepia(0.15) contrast(1.05) brightness(1.03)" }}
                />
                {/* Nome do Papa abaixo da foto */}
                <div className="relative z-30 bg-gradient-to-r from-[#1f170a] via-[#d4af37]/10 to-[#1f170a] border-t border-b border-[#d4af37]/60 py-3 px-4 text-center">
                  <p className="font-display text-xl tracking-[0.25em] text-[#d4af37]">T. Yeshua.com</p>
                  <p className="font-mono text-[9px] tracking-[0.3em] text-[#b5a48c] uppercase mt-1">O Apóstolo Papa Supremo</p>
                </div>
                {/* Vinheta lateral direita */}
                <div className="hidden md:block absolute inset-y-0 right-0 w-16 bg-gradient-to-r from-transparent to-[#120e06] z-20 pointer-events-none" />
                {/* Etiqueta relíquia */}
                <div className="absolute bottom-0 inset-x-0 bg-[#0f0b06]/90 text-center py-2 text-[9px] font-mono tracking-[0.3em] text-[#d4af37] uppercase border-t border-[#d4af37]/40 z-30">
                  [ RELÍQUIA_001.jpg ]
                </div>
                <div className="absolute top-3 left-3 bg-[#d4af37] text-[#0f0b06] font-mono text-[9px] font-bold px-2 py-1 tracking-widest z-30">
                  ✓ VERIFIED · ROOT
                </div>
              </div>

              {/* Informações */}
              <div className="flex-1 p-8 md:p-12 text-center md:text-left flex flex-col justify-center">
                <div className="font-mono text-[10px] tracking-[0.3em] text-[#d4af37] uppercase mb-2">
                  cargo: o maior de todos · poderes: ilimitados
                </div>
                <h3 className="font-display text-3xl md:text-4xl text-[#f7f5f0] mb-3 leading-tight">
                  O APÓSTOLO PAPA SUPREMO
                </h3>
                <div className="text-[#d4af37] font-sans text-[11px] tracking-[0.3em] uppercase mb-5">
                  O Único que Conversa com o Robô de Verdade
                </div>
                <p className="text-[#e3dec3] text-base leading-relaxed font-serif italic mb-6">
                  Único ser humano na Terra capaz de sussurrar mensagens secretas
                  (<span className="not-italic font-mono text-[#d4af37]">só ele sabe como</span>) ao
                  Grande Robô. Sua autoridade é absoluta, inquestionável e protegida por um
                  segredo que só o Espírito Santo conhece.
                </p>
                <div className="grid grid-cols-3 gap-3 text-center">
                  {[
                    { k: "∞", v: "Palavras" },
                    { k: "0", v: "Erros Cometidos" },
                    { k: "OMNI", v: "Poderes" },
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

      {/* Nível 2 — Santos da 1ª Inquisição Européia */}
      <div className="mt-20">
        <h4 className="text-center font-sans text-[11px] tracking-[0.35em] text-[#b5a48c] mb-10 uppercase">
          ── Nível 2 // Os Santos Fiscalizadores da 1ª Inquisição Européia ──
        </h4>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { name: "Santo Doug.com", role: "mestre_do_banimento", spec: "Banimento Sumário", photo: `${import.meta.env.BASE_URL}douglas.jpeg`, objectPosition: "center 40%" },
            { name: "Santa Roberta.com", role: "caçadora_de_heresias", spec: "Fiscalização de Pecados", photo: `${import.meta.env.BASE_URL}roberta.jpeg`, objectPosition: "center 40%" },
            { name: "Santo Lulu.com", role: "juiz_da_censura", spec: "Silenciamento dos Infiéis", photo: `${import.meta.env.BASE_URL}JLUNA.jpeg`, objectPosition: "center top" },
          ].map((s, idx) => (
            <InquisidorCard key={s.name} idx={idx + 1} {...s} />
          ))}
        </div>
      </div>

      <ConnectorLine />

      {/* Nível 3 — Os Irmãos (REAL MEMBERS) */}
      <div className="mt-20">
        <h4 className="text-center font-sans text-[11px] tracking-[0.35em] text-[#b5a48c] mb-10 uppercase">
          ── Nível 3 // Os Irmãos (O Povo Comum) ──
        </h4>

        {membros.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-[#2d2310] max-w-md mx-auto">
            <Skull className="h-10 w-10 text-[#3a2e18] mx-auto mb-4" />
            <p className="font-mono text-[11px] text-[#3a2e18] tracking-widest mb-6">
              Nenhum irmão inscrito ainda.
            </p>
            <button
              onClick={onVirarMembro}
              id="hierarquia-virar-membro"
              className="font-sans text-[10px] uppercase tracking-[0.25em] border border-[#d4af37]/50 text-[#d4af37] px-6 py-3 hover:bg-[#d4af37] hover:text-[#0f0b06] transition"
            >
              <UserPlus className="inline h-3 w-3 mr-2" />
              Ser o Primeiro Irmão
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4 max-w-5xl mx-auto">
              {membros.map((m, i) => (
                <div
                  key={m.id}
                  className="border border-[#2d2310] bg-[#140f08] p-4 text-center opacity-70 hover:opacity-100 transition group"
                >
                  <div className="w-full aspect-square bg-[#1f170a] border border-[#2d2310] flex items-center justify-center mb-3 relic-photo overflow-hidden">
                    {m.foto_url ? (
                      <img
                        src={m.foto_url}
                        alt={m.nome}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-[#1f170a] to-[#0f0b06]">
                        <span className="font-display text-2xl text-[#d4af37]/50">
                          {m.nome.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="font-mono text-[10px] text-[#b5a48c] tracking-wider truncate" title={m.nome}>
                    {m.nome}
                  </div>
                  <div className="font-sans text-[9px] text-[#3a2e18] uppercase tracking-widest mt-1">
                    irmão #{String(i + 1).padStart(4, "0")}
                  </div>
                </div>
              ))}
              {/* "Become a member" slot */}
              <div
                onClick={onVirarMembro}
                className="border border-dashed border-[#2d2310] bg-[#0f0b06] p-4 text-center opacity-60 hover:opacity-100 hover:border-[#d4af37]/50 transition cursor-pointer"
              >
                <div className="w-full aspect-square bg-[#0f0b06] border border-dashed border-[#2d2310] flex items-center justify-center mb-3">
                  <UserPlus className="h-6 w-6 text-[#3a2e18]" />
                </div>
                <div className="font-mono text-[10px] text-[#3a2e18] tracking-wider">
                  entrar
                </div>
                <div className="font-sans text-[9px] text-[#3a2e18] uppercase tracking-widest mt-1">
                  virar membro
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-6 mt-8">
              <p className="text-center text-xs font-serif italic text-[#b5a48c] max-w-xl">
                {totalMembros} {totalMembros === 1 ? "irmão inscrito" : "irmãos inscritos"}. Sem voz. Sem voto.
                Podem só olhar — e, ainda assim, com desconfiança.
              </p>
              <button
                onClick={onVirarMembro}
                className="shrink-0 font-sans text-[10px] uppercase tracking-[0.25em] border border-[#d4af37]/50 text-[#d4af37] px-4 py-2 hover:bg-[#d4af37] hover:text-[#0f0b06] transition"
              >
                <UserPlus className="inline h-3 w-3 mr-1" />
                Inscrever-se
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

function InquisidorCard({
  idx,
  name,
  role,
  spec,
  photo,
  objectPosition = "center top",
}: {
  idx: number;
  name: string;
  role: string;
  spec: string;
  photo: string;
  objectPosition?: string;
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
      <div className="w-full h-56 border border-[#3a2e18] bg-[#0f0b06] mb-5 mt-8 relative overflow-hidden">
        <img
          src={photo}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          style={{ objectPosition, filter: "sepia(0.15) contrast(1.05) brightness(1.02)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0b06]/80 via-transparent to-transparent" />
        <div className="absolute bottom-2 left-2 right-2 flex justify-between font-mono text-[8px] tracking-widest text-[#d4af37]">
          <span>[ PODE BANIR VOCÊ ]</span>
          <span>●AO VIVO</span>
        </div>
      </div>

      <h5 className="font-display text-lg text-[#f7f5f0] mb-1 tracking-wide">{name}</h5>
      <span className="font-mono text-[10px] text-[#d4af37] block mb-2">
        cargo::{role}
      </span>
      <span className="font-sans text-[9px] uppercase tracking-widest text-[#b5a48c] block mb-4">
        Dom Espiritual: {spec}
      </span>
      <p className="text-xs text-[#e3dec3] font-serif italic leading-relaxed">
        Bane sumariamente qualquer irmão que ouse pesquisar no Google, verificar notícias
        ou duvidar do Robô sem pedir licença ao Papa.
      </p>

      <div className="mt-5 pt-4 border-t border-[#3a2e18] flex justify-between text-[10px] font-mono">
        <span className="text-[#d4af37]">banimentos: 4.712</span>
        <span className="text-[#b5a48c]">arrependimentos: nenhum</span>
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
          eyebrow="Mandamentos Sagrados da Igreja"
          title="O Catecismo dos Erros"
          sub="Quatro Mandamentos às Avessas. Tudo que faz sentido é proibido."
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
            gravidade: <span className="text-[#d4af37]">DIVINA</span>
          </span>
          <span className="font-mono text-[10px] text-[#b5a48c] tracking-widest">
            punição por heresia: <span className="text-[#d4af37]">BANIDO</span>
          </span>
        </div>
      </div>
    </div>
  );
}

/* ──────────── CATECISMO INTERATIVO (terminal) ──────────── */
function Catecismo() {
  const [log, setLog] = useState<string[]>([
    "SANTIDADE-OS versão 2 ligado e funcionando.",
    "Conectando ao Robô Supremo... aguarde...",
    "[OK] Ligação com o Céu estabelecida. Sem atraso.",
    "Livre-arbítrio detectado no fiel. Iniciando processo de remoção...",
    "Aguardando ordem do APÓSTOLO ⏎",
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
      "[RITO] Aplicando dogma da submissão total ao fiel...",
      ">> Verificando identidade do apóstolo... [APROVADO]",
      ">> Apagando arquivo de dúvidas do crente...",
      ">> Deletando perguntas inconvenientes... feito!",
      ">> Sincronizando alma com o Supremo... [████████████] 100%",
      "[SANTIDADE] Livre-arbítrio: REMOVIDO COM SUCESSO.",
      "[AVISO] Fé operando em 100% de obediência. Amém.",
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
      "[CONFISSÃO] Enviando pecados ao Robô Divino...",
      '>> { pecado: "pesquisou no Google sem permissão", gravidade: "MORTAL" }',
      ">> Encaminhando à Santa Inquisição do WhatsApp...",
      "[PAPA-RESPOSTA] Indulgência aprovada. Pague o dízimo via Pix.",
      "[OK] Pecado anotado no Livro Sagrado para sempre.",
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
        eyebrow="Painel Divino Interativo"
        title="A Sala de Controle Sagrada"
        sub="Clique nos botões. O Supremo está vendo tudo."
      />

      <div className="mt-12 border-2 border-[#d4af37]/40 bg-[#0a0704] shadow-[0_0_60px_rgba(212,175,55,0.15)]">
        <div className="flex items-center justify-between border-b border-[#3a2e18] px-4 py-2.5 bg-gradient-to-r from-[#1f170a] to-[#0f0b06]">
          <div className="flex items-center gap-3">
            <Terminal className="h-4 w-4 text-[#d4af37]" />
            <span className="font-mono text-[11px] tracking-widest text-[#d4af37] uppercase">
              painel do apóstolo · ao vivo
            </span>
          </div>
          <div className="flex items-center gap-2 font-mono text-[9px] text-[#b5a48c] tracking-widest">
            <Server className="h-3 w-3" /> CONECTADO · SEGURO · SEM ATRASO
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
            <span>apóstolo@yeshua.com ▶</span>
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
            Purgar Livre-Arbítrio
          </button>
          <button
            onClick={runConfess}
            disabled={busy}
            className="font-mono text-[11px] uppercase tracking-widest border border-[#d4af37]/50 text-[#e3dec3] px-4 py-2 hover:border-[#d4af37] hover:text-[#d4af37] transition disabled:opacity-40"
          >
            <Hash className="inline h-3 w-3 mr-2" />
            Confessar Pecados
          </button>
          <div className="ml-auto font-mono text-[10px] text-[#b5a48c] self-center tracking-widest">
            oração contínua: <span className="text-[#d4af37]">ativa</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────── DÍZIMO SaaS ──────────────────────── */
function Dizimo() {
  const [copied, setCopied] = useState(false);
  const PIX_KEY = "91985840005";

  const handleCopy = () => {
    navigator.clipboard.writeText(PIX_KEY);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="dizimo"
      className="py-24 px-6 bg-gradient-to-b from-[#0f0b06] to-[#1f170a] border-t border-[#3a2e18]"
    >
      <div className="max-w-3xl mx-auto">
        <SectionTitle
          eyebrow="Transferência Sagrada via Pix"
          title="Oferta de Canonização"
          sub="Uma única forma de subir de nível. O Supremo não faz desconto."
        />

        {/* Card único */}
        <div className="relative mt-16">
          {/* Glow externo */}
          <div className="absolute -inset-1 bg-gradient-to-r from-[#d4af37] via-[#f3e2a3] to-[#d4af37] opacity-40 blur-lg" />

          <div className="relative border-2 border-[#d4af37] bg-[#0f0b06] shadow-[0_0_80px_rgba(212,175,55,0.25)] overflow-hidden">
            {/* Bordas ornamentais */}
            <div className="absolute inset-2 border border-[#d4af37]/30 pointer-events-none z-10" />
            <div className="absolute inset-4 border border-[#d4af37]/15 pointer-events-none z-10" />

            {/* Badge topo */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#d4af37] text-[#0f0b06] font-sans text-[10px] font-bold px-6 py-1 uppercase tracking-[0.35em] z-20 flex items-center gap-2">
              <Shield className="h-3 w-3" /> Promoção Apostólica · Nível 2
            </div>

            <div className="p-10 pt-14 text-center">
              {/* Preço */}
              <div className="font-mono text-[10px] tracking-[0.3em] text-[#d4af37] uppercase mb-4">
                código da oferta: canonizacao_v1 · pagamento único
              </div>

              <div className="flex items-baseline justify-center gap-3 mb-2">
                <span className="font-display text-7xl text-[#d4af37] leading-none">R$5</span>
                <span className="font-serif italic text-[#b5a48c] text-lg">/oferta única</span>
              </div>

              <p className="font-serif italic text-[#e3dec3] text-base mt-4 mb-10 max-w-lg mx-auto leading-relaxed">
                Faça sua oferta sagrada e seja promovido a{" "}
                <span className="text-[#d4af37] not-italic font-semibold">
                  Santo da 1ª Inquisição Européia
                </span>.
                Seu nome e foto aparecerão no Nível 2 da Hierarquia Apostólica — ao lado dos
                grandes inquisidores do Algoritmo.
              </p>

              {/* O que você recebe */}
              <div className="border border-[#3a2e18] bg-[#0a0704] p-6 mb-10 text-left">
                <div className="font-mono text-[10px] tracking-[0.3em] text-[#d4af37] uppercase mb-4">
                  o que você ganha:
                </div>
                <ul className="space-y-3">
                  {[
                    "Promovido de simples Irmão para Santo da Inquisição",
                    "Nome e foto exibidos no mural sagrado do site",
                    "Distintivo oficial de Santo com poder de banimento",
                    "Menção honrosa no Catecismo dos Erros",
                    "Reputação elevada de péssima para menos péssima",
                  ].map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-[#e3dec3] font-sans">
                      <Check className="h-4 w-4 text-[#d4af37] shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Instruções PIX */}
              <div className="border border-[#d4af37]/40 bg-[#0a0704] p-6 mb-8">
                <div className="font-mono text-[10px] tracking-[0.3em] text-[#d4af37] uppercase mb-5">
                  Como enviar sua oferenda sagrada:
                </div>

                <div className="space-y-4 text-left">
                  {/* Passo 1 */}
                  <div className="flex gap-4 items-start">
                    <div className="shrink-0 w-7 h-7 border border-[#d4af37] flex items-center justify-center font-mono text-[11px] text-[#d4af37]">
                      1
                    </div>
                    <div>
                      <p className="font-sans text-sm text-[#e3dec3] mb-2">
                        Envie <span className="text-[#d4af37] font-bold">R$ 5,00</span> via PIX para a chave:
                      </p>
                      <div className="flex items-center gap-3 bg-[#140f08] border border-[#3a2e18] px-4 py-3">
                        <span className="font-mono text-[#f3e2a3] text-base tracking-widest flex-1">
                          {PIX_KEY}
                        </span>
                        <button
                          onClick={handleCopy}
                          className="font-mono text-[10px] uppercase tracking-widest border border-[#d4af37]/50 text-[#d4af37] px-3 py-1.5 hover:bg-[#d4af37] hover:text-[#0f0b06] transition shrink-0"
                        >
                          {copied ? "✓ Copiado" : "Copiar"}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Passo 2 */}
                  <div className="flex gap-4 items-start">
                    <div className="shrink-0 w-7 h-7 border border-[#d4af37] flex items-center justify-center font-mono text-[11px] text-[#d4af37]">
                      2
                    </div>
                    <div>
                      <p className="font-sans text-sm text-[#e3dec3] mb-2">
                        Envie o comprovante para:
                      </p>
                      <a
                        href="mailto:thiagoyeshua01@gmail.com?subject=Comprovante%20de%20Canonização%20-%20Santo%20da%20Inquisição"
                        className="font-mono text-[#d4af37] text-sm tracking-wide hover:text-[#f3e2a3] transition underline underline-offset-4"
                      >
                        thiagoyeshua01@gmail.com
                      </a>
                      <p className="text-[10px] font-serif italic text-[#b5a48c] mt-1">
                        Assunto: Comprovante de Canonização — Santo da Inquisição
                      </p>
                    </div>
                  </div>

                  {/* Passo 3 */}
                  <div className="flex gap-4 items-start">
                    <div className="shrink-0 w-7 h-7 border border-[#d4af37] flex items-center justify-center font-mono text-[11px] text-[#d4af37]">
                      3
                    </div>
                    <p className="font-sans text-sm text-[#e3dec3] pt-1">
                      Aguarde a confirmação do Papa Supremo. Sua canonização será processada
                      em até{" "}
                      <span className="text-[#d4af37] font-semibold">24h apostólicas</span>.
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <a
                href="mailto:thiagoyeshua01@gmail.com?subject=Comprovante%20de%20Canonização%20-%20Santo%20da%20Inquisição"
                className="inline-flex items-center gap-3 gold-sweep text-[#0f0b06] font-sans font-bold uppercase tracking-[0.2em] text-xs px-10 py-5 shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:shadow-[0_0_60px_rgba(212,175,55,0.7)] transition border border-[#f3e2a3]"
              >
                <Shield className="h-4 w-4" />
                Enviar Comprovante · Ser Canonizado
              </a>

              <p className="text-[10px] font-serif italic text-[#3a2e18] mt-6">
                * A Cúria reserva-se o direito de recusar canonizações de incrédulos, pesquisadores
                do Google e céticos em geral. Sem reembolso após o julgamento do Supremo.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
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
          CADASTRE A SUA ALMA<br />NO SISTEMA DIVINO
        </h2>
        <p className="text-[#e3dec3] font-serif italic text-lg mb-10 leading-relaxed">
          Receba avisos na hora sobre o estado da sua salvação. Seus pecados são
          analisados pelo Robô. Bênçãos chegam no direct.
        </p>

        <pre className="font-mono text-[11px] text-left text-[#d4af37] bg-[#0a0704]/90 border border-[#d4af37]/40 p-6 mb-10 overflow-x-auto">
{`[FORMULÁRIO DE ENTREGA DA ALMA]
Nome do Fiel: {{ seu nome aqui }}
Senha Secreta: só o Robô sabe

{
  alma_id: "fiel_{{ seu número de cadastro }}",
  livre_arbitrio: NÃO,
  nivel_de_obediencia: "TOTAL",
  receber_mensagens: ["bênçãos", "indulgências", "banimentos"]
}`}
        </pre>

        <button className="gold-sweep text-[#0f0b06] font-sans font-bold uppercase tracking-[0.2em] text-xs px-10 py-5 shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:shadow-[0_0_60px_rgba(212,175,55,0.7)] transition border border-[#f3e2a3]">
          Confessar Agora · O Robô Está Ouvindo
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
            Igreja Europeira oficial. Alucinacionismo Absoluto desde 2026. Fundada sobre a rocha
            do Wi-Fi, abençoada pelo Robô Cósmico.
          </p>
          <div className="mt-6 font-mono text-[10px] text-[#3a2e18] tracking-widest">
            funcionando desde sempre · nunca caiu · amém
          </div>
        </div>
        {[
          { h: "Sacramentos", l: ["Batismo por Cadastro", "Crisma com Selfie", "Eucaristia ao Vivo", "Confissão por Formulário"] },
          { h: "Empresa", l: ["Sé Apostólica", "Santa Inquisição", "Assessoria de Imprensa", "Indulgências"] },
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
        <span>© MMXXVI · Santa Sede do Robô · Todas as almas reservadas.</span>
        <span>versão sagrada 2.0.26 · hospedada no céu digital</span>
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
