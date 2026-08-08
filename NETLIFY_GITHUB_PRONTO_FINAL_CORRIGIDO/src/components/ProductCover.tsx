"use client";

const COVERS: Record<string, { bg: string; accent: string; icon: string; abbr: string }> = {
  "nr1":    { bg: "#1e3a5f", accent: "#f59e0b", icon: "📋", abbr: "NR-1" },
  "nr4":    { bg: "#1e3a5f", accent: "#f59e0b", icon: "🏢", abbr: "NR-4" },
  "nr5":    { bg: "#14532d", accent: "#4ade80", icon: "🤝", abbr: "NR-5" },
  "nr6":    { bg: "#7c2d12", accent: "#fb923c", icon: "🦺", abbr: "NR-6" },
  "nr7":    { bg: "#1e3a5f", accent: "#60a5fa", icon: "⚕️", abbr: "NR-7" },
  "nr9":    { bg: "#312e81", accent: "#a78bfa", icon: "🔍", abbr: "NR-9" },
  "nr10":   { bg: "#713f12", accent: "#fbbf24", icon: "⚡", abbr: "NR-10" },
  "nr11":   { bg: "#164e63", accent: "#22d3ee", icon: "🏗️", abbr: "NR-11" },
  "nr12":   { bg: "#1e3a5f", accent: "#38bdf8", icon: "⚙️", abbr: "NR-12" },
  "nr15":   { bg: "#4a1d96", accent: "#c084fc", icon: "☢️", abbr: "NR-15" },
  "nr16":   { bg: "#7f1d1d", accent: "#f87171", icon: "⚠️", abbr: "NR-16" },
  "nr17":   { bg: "#0f4c75", accent: "#38bdf8", icon: "🪑", abbr: "NR-17" },
  "nr18":   { bg: "#064e3b", accent: "#6ee7b7", icon: "🏚️", abbr: "NR-18" },
  "nr20":   { bg: "#7c2d12", accent: "#fed7aa", icon: "🛢️", abbr: "NR-20" },
  "nr23":   { bg: "#7f1d1d", accent: "#fca5a5", icon: "🔥", abbr: "NR-23" },
  "nr25":   { bg: "#14532d", accent: "#86efac", icon: "♻️", abbr: "NR-25" },
  "nr26":   { bg: "#1e3a5f", accent: "#93c5fd", icon: "🚦", abbr: "NR-26" },
  "nr33":   { bg: "#1c1917", accent: "#a8a29e", icon: "🕳️", abbr: "NR-33" },
  "nr35":   { bg: "#0c4a6e", accent: "#7dd3fc", icon: "🪜", abbr: "NR-35" },
  "aph":    { bg: "#7f1d1d", accent: "#fca5a5", icon: "🏥", abbr: "APH" },
  "rcp":    { bg: "#7f1d1d", accent: "#f87171", icon: "❤️", abbr: "RCP" },
  "trauma": { bg: "#1c1917", accent: "#d97706", icon: "🩹", abbr: "TRAUMA" },
  "queimaduras": { bg: "#7c2d12", accent: "#fb923c", icon: "🔥", abbr: "QUEIM." },
  "afogamento":  { bg: "#0c4a6e", accent: "#38bdf8", icon: "🌊", abbr: "AFOG." },
  "brec":   { bg: "#1c1917", accent: "#d97706", icon: "🏚️", abbr: "BREC" },
  "rapel":  { bg: "#0f2027", accent: "#64748b", icon: "🧗", abbr: "RAPEL" },
  "veicular": { bg: "#1c1917", accent: "#f59e0b", icon: "🚗", abbr: "RESG.V." },
  "aquatico": { bg: "#0c4a6e", accent: "#22d3ee", icon: "🏊", abbr: "SALV.A." },
  "incendio": { bg: "#7f1d1d", accent: "#ef4444", icon: "🚒", abbr: "COMB.I." },
  "brigada":  { bg: "#78350f", accent: "#fbbf24", icon: "👷", abbr: "BRIG." },
  "ppra":   { bg: "#1e3a5f", accent: "#60a5fa", icon: "📊", abbr: "PPRA" },
  "ltcat":  { bg: "#312e81", accent: "#818cf8", icon: "📝", abbr: "LTCAT" },
  "epc":    { bg: "#14532d", accent: "#4ade80", icon: "🛡️", abbr: "EPC" },
  "acidente": { bg: "#7c2d12", accent: "#fca5a5", icon: "🔎", abbr: "AT" },
  "higiene":  { bg: "#0f172a", accent: "#94a3b8", icon: "🔬", abbr: "HIG.OC." },
  "estresse": { bg: "#581c87", accent: "#d8b4fe", icon: "🧠", abbr: "EST." },
  "parto":    { bg: "#831843", accent: "#f9a8d4", icon: "👶", abbr: "PARTO" },
  "pediatria": { bg: "#1e40af", accent: "#93c5fd", icon: "🧒", abbr: "PEDI." },
  "correnteza": { bg: "#0c4a6e", accent: "#7dd3fc", icon: "🌊", abbr: "CORR." },
  "confinado2": { bg: "#1c1917", accent: "#a8a29e", icon: "🕳️", abbr: "E.CON." },
  "perigosos": { bg: "#7f1d1d", accent: "#fca5a5", icon: "☠️", abbr: "PROD.P." },
  "pae":   { bg: "#064e3b", accent: "#6ee7b7", icon: "📋", abbr: "PAE" },
  "fispq": { bg: "#1e3a5f", accent: "#60a5fa", icon: "⚗️", abbr: "FISPQ" },
  "laboratorio": { bg: "#0f172a", accent: "#94a3b8", icon: "🧪", abbr: "LAB." },
  "respirador":  { bg: "#164e63", accent: "#22d3ee", icon: "😷", abbr: "RESP." },
  "medicina":    { bg: "#1e3a5f", accent: "#60a5fa", icon: "⚕️", abbr: "MED.T." },
  "radio":       { bg: "#0f2027", accent: "#64748b", icon: "📻", abbr: "COM." },
  "multiplas":   { bg: "#7f1d1d", accent: "#ef4444", icon: "🚨", abbr: "M.VIT." },
  "psicologia":  { bg: "#581c87", accent: "#d8b4fe", icon: "🧠", abbr: "PSIC." },
  "pack":        { bg: "#0f172a", accent: "#f59e0b", icon: "📦", abbr: "PACK" },
};

function getKey(coverImage: string): string {
  const match = coverImage.match(/\/([^/]+)\.svg$/);
  return match ? match[1] : "nr1";
}

export default function ProductCover({
  coverImage,
  title,
  className = "",
  size = "normal",
}: {
  coverImage: string;
  title: string;
  className?: string;
  size?: "small" | "normal" | "large";
}) {
  const key = getKey(coverImage);
  const cover = COVERS[key] ?? { bg: "#1e3a5f", accent: "#f59e0b", icon: "📚", abbr: "APO." };

  const h = size === "small" ? 120 : size === "large" ? 300 : 200;
  const w = size === "small" ? 90 : size === "large" ? 220 : 150;

  return (
    <div
      className={`relative flex flex-col items-center justify-center rounded-lg overflow-hidden shadow-lg ${className}`}
      style={{ background: `linear-gradient(135deg, ${cover.bg} 0%, #0f172a 100%)`, width: w, height: h, minWidth: w }}
    >
      {/* Watermark pattern */}
      <div className="absolute inset-0 opacity-5 flex flex-wrap gap-2 p-2 overflow-hidden">
        {Array.from({ length: 40 }).map((_, i) => (
          <span key={i} className="text-xs text-white whitespace-nowrap">KLEBER STORE</span>
        ))}
      </div>
      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 h-1" style={{ background: cover.accent }} />
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-1 p-2 text-center">
        <div style={{ fontSize: size === "small" ? 28 : size === "large" ? 56 : 40 }}>{cover.icon}</div>
        <div
          className="font-black tracking-wider"
          style={{
            color: cover.accent,
            fontSize: size === "small" ? 10 : size === "large" ? 18 : 13,
          }}
        >
          {cover.abbr}
        </div>
        <div
          className="text-white font-medium leading-tight px-1"
          style={{ fontSize: size === "small" ? 7 : size === "large" ? 11 : 8 }}
        >
          {title}
        </div>
      </div>
      {/* Bottom bar */}
      <div
        className="absolute bottom-0 left-0 right-0 flex items-center justify-center text-white font-bold"
        style={{
          background: cover.accent + "33",
          fontSize: size === "small" ? 6 : 7,
          padding: "2px 4px",
        }}
      >
        📚 KLEBER STORE
      </div>
    </div>
  );
}
