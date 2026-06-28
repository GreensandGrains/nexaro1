import { useContext, useEffect, useState } from "react";
import { CloudLightning } from "lucide-react";
import { TransitionContext } from "@/context/TransitionContext";

/* ── Deterministic star field (seeded positions so no layout shift) ── */
function buildStars(count: number) {
  const stars: { x: number; y: number; r: number; delay: number; dur: number; color: string }[] = [];
  let seed = 42;
  const rng = () => { seed = (seed * 1664525 + 1013904223) & 0xffffffff; return (seed >>> 0) / 0xffffffff; };
  const colors = ["#ffffff", "#c4b5fd", "#6ee7b7", "#a78bfa", "#34d399", "#e0e7ff"];
  for (let i = 0; i < count; i++) {
    stars.push({
      x: rng() * 100,
      y: rng() * 100,
      r: 0.3 + rng() * 1.4,
      delay: rng() * 4,
      dur: 1.5 + rng() * 3,
      color: colors[Math.floor(rng() * colors.length)],
    });
  }
  return stars;
}
const STARS = buildStars(220);

/* ── Destination label ── */
const LABELS: Record<string, string> = {
  "/client": "Client Portal",
  "/login":  "Account Access",
  "/":       "Home",
};

export function GalaxyTransition() {
  const { isTransitioning, phase, destination } = useContext(TransitionContext);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isTransitioning) setVisible(true);
    else {
      const t = setTimeout(() => setVisible(false), 600);
      return () => clearTimeout(t);
    }
  }, [isTransitioning]);

  if (!visible) return null;

  const entering = phase === "enter" || phase === "active";
  const label = LABELS[destination] ?? "Loading";

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: "#03030a",
        opacity: entering ? 1 : 0,
        transition: "opacity 0.45s cubic-bezier(0.4,0,0.2,1)",
        pointerEvents: entering ? "all" : "none",
      }}
    >
      {/* ── Starfield ── */}
      <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
        {STARS.map((s, i) => (
          <circle key={i} cx={`${s.x}%`} cy={`${s.y}%`} r={s.r} fill={s.color}
            style={{ animation: `gt-twinkle ${s.dur}s ease-in-out ${s.delay}s infinite` }} />
        ))}
      </svg>

      {/* ── Milky Way streaks ── */}
      <svg className="absolute inset-0 w-full h-full opacity-30" style={{ zIndex: 0 }}>
        <defs>
          <radialGradient id="mw" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.25" />
            <stop offset="60%" stopColor="#10b981" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#03030a" stopOpacity="0" />
          </radialGradient>
        </defs>
        <ellipse cx="50%" cy="50%" rx="55%" ry="28%" fill="url(#mw)"
          style={{ animation: "gt-nebula-rotate 18s linear infinite", transformOrigin: "50% 50%" }} />
        <ellipse cx="50%" cy="50%" rx="40%" ry="18%" fill="url(#mw)"
          style={{ animation: "gt-nebula-rotate 12s linear infinite reverse", transformOrigin: "50% 50%", opacity: 0.5 }} />
      </svg>

      {/* ── Portal rings ── */}
      <div className="relative z-10 flex items-center justify-center" style={{ width: 360, height: 360 }}>

        {/* Outermost ring */}
        <svg className="absolute inset-0" viewBox="0 0 360 360" fill="none"
          style={{ animation: "gt-ring-cw 6s linear infinite", transformOrigin: "50% 50%" }}>
          <defs>
            <linearGradient id="rg1" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0" />
              <stop offset="40%" stopColor="#10b981" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
            </linearGradient>
          </defs>
          <circle cx="180" cy="180" r="168" stroke="url(#rg1)" strokeWidth="1.5" strokeDasharray="60 400" />
        </svg>

        {/* Second ring */}
        <svg className="absolute" viewBox="0 0 360 360" fill="none"
          style={{ inset: 20, position: "absolute", animation: "gt-ring-ccw 4.5s linear infinite", transformOrigin: "50% 50%" }}>
          <defs>
            <linearGradient id="rg2" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#7c3aed" stopOpacity="0" />
              <stop offset="50%" stopColor="#a78bfa" stopOpacity="1" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
            </linearGradient>
          </defs>
          <circle cx="160" cy="160" r="148" stroke="url(#rg2)" strokeWidth="1.2" strokeDasharray="80 500" />
        </svg>

        {/* Third ring (fastest) */}
        <svg className="absolute" viewBox="0 0 280 280" fill="none"
          style={{ inset: 40, position: "absolute", animation: "gt-ring-cw 3s linear infinite", transformOrigin: "50% 50%" }}>
          <defs>
            <linearGradient id="rg3" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stopColor="#34d399" stopOpacity="0" />
              <stop offset="60%" stopColor="#34d399" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#818cf8" stopOpacity="0" />
            </linearGradient>
          </defs>
          <circle cx="140" cy="140" r="128" stroke="url(#rg3)" strokeWidth="1" strokeDasharray="40 420" />
        </svg>

        {/* Glow halos */}
        <div className="absolute rounded-full"
          style={{ width: 280, height: 280, background: "radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)", animation: "gt-halo 2.4s ease-in-out infinite" }} />
        <div className="absolute rounded-full"
          style={{ width: 200, height: 200, background: "radial-gradient(circle, rgba(16,185,129,0.14) 0%, transparent 70%)", animation: "gt-halo 2.4s ease-in-out 0.8s infinite" }} />

        {/* Center logo */}
        <div className="relative flex flex-col items-center gap-0 z-20">
          {/* Outer pulse ring */}
          <div className="absolute rounded-full border border-emerald-500/30"
            style={{ width: 100, height: 100, animation: "gt-pulse-ring 1.8s ease-out infinite" }} />
          <div className="absolute rounded-full border border-violet-500/20"
            style={{ width: 80, height: 80, animation: "gt-pulse-ring 1.8s ease-out 0.6s infinite" }} />

          {/* Logo disc */}
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-[0_0_60px_rgba(16,185,129,0.5),0_0_120px_rgba(124,58,237,0.3)]"
            style={{
              background: "linear-gradient(135deg, #10b981, #7c3aed)",
              animation: "gt-logo-pulse 2s ease-in-out infinite",
            }}>
            <CloudLightning className="w-9 h-9 text-white" />
          </div>
        </div>
      </div>

      {/* ── Text block ── */}
      <div className="relative z-10 mt-8 flex flex-col items-center gap-3">
        <p className="text-white text-lg font-bold tracking-widest uppercase"
          style={{ animation: "gt-text-fade 1.8s ease-in-out infinite" }}>
          Entering the Cosmos
        </p>
        <div className="flex items-center gap-2 text-[11px] text-gray-400 uppercase tracking-widest">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"
            style={{ animation: "gt-dot-bounce 1.2s ease-in-out infinite" }} />
          <span className="w-1.5 h-1.5 rounded-full bg-violet-400"
            style={{ animation: "gt-dot-bounce 1.2s ease-in-out 0.2s infinite" }} />
          <span className="w-1.5 h-1.5 rounded-full bg-teal-400"
            style={{ animation: "gt-dot-bounce 1.2s ease-in-out 0.4s infinite" }} />
          <span className="ml-1">{label}</span>
        </div>

        {/* Progress bar */}
        <div className="w-52 h-[2px] rounded-full overflow-hidden mt-1"
          style={{ background: "rgba(255,255,255,0.08)" }}>
          <div className="h-full rounded-full"
            style={{
              background: "linear-gradient(90deg, #10b981, #7c3aed, #34d399)",
              animation: entering ? "gt-progress 2s cubic-bezier(0.4,0,0.2,1) forwards" : "none",
            }} />
        </div>
      </div>

      {/* ── Corner grid lines (holographic feel) ── */}
      <svg className="absolute bottom-0 left-0 w-48 h-48 opacity-10" viewBox="0 0 200 200" fill="none">
        {[0,20,40,60,80,100,120,140,160,180,200].map(v => (
          <g key={v}>
            <line x1={v} y1="0" x2={v} y2="200" stroke="#10b981" strokeWidth="0.5" />
            <line x1="0" y1={v} x2="200" y2={v} stroke="#7c3aed" strokeWidth="0.5" />
          </g>
        ))}
      </svg>
      <svg className="absolute top-0 right-0 w-48 h-48 opacity-10" viewBox="0 0 200 200" fill="none">
        {[0,20,40,60,80,100,120,140,160,180,200].map(v => (
          <g key={v}>
            <line x1={v} y1="0" x2={v} y2="200" stroke="#7c3aed" strokeWidth="0.5" />
            <line x1="0" y1={v} x2="200" y2={v} stroke="#10b981" strokeWidth="0.5" />
          </g>
        ))}
      </svg>
    </div>
  );
}
