import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  CloudLightning, ChevronDown, LogIn, UserPlus,
  Server, HardDrive, Globe, LayoutDashboard, FileText,
  Shield, Cpu, Zap, Lock, CheckCircle2, ArrowRight,
  Activity, BarChart3, Wifi,
} from "lucide-react";
import { useTransitionNavigate } from "@/context/TransitionContext";

/* ─── Scroll reveal hook ──────────────────────────────────────── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); obs.unobserve(el); }
    }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ─── Reveal wrapper ──────────────────────────────────────────── */
function Reveal({ children, delay = 0, from = "up", className = "" }: {
  children: React.ReactNode; delay?: number; from?: "up" | "left" | "right" | "scale"; className?: string;
}) {
  const { ref, inView } = useInView();
  const cls = from === "left" ? "reveal-left" : from === "right" ? "reveal-right" : from === "scale" ? "reveal-scale" : "reveal";
  return (
    <div ref={ref} className={`${cls} delay-${delay} ${inView ? "in-view" : ""} ${className}`}>
      {children}
    </div>
  );
}

/* ─── Navbar ──────────────────────────────────────────────────── */
function ClientNavbar() {
  const { pathname } = useLocation();
  const [storeOpen, setStoreOpen] = useState(false);
  const { navigate: transitionTo } = useTransitionNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-14 border-b border-white/8"
      style={{ background: "rgba(6,6,10,0.92)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" }}>
      <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-white hover:text-emerald-400 transition-colors group">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center transition-all shadow-[0_0_12px_rgba(16,185,129,0.4)] group-hover:shadow-[0_0_20px_rgba(16,185,129,0.7)]"
            style={{ background: "linear-gradient(135deg, #10b981, #7c3aed)" }}>
            <CloudLightning className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-sm tracking-widest uppercase">Nexora</span>
        </Link>

        {/* Center links */}
        <div className="hidden md:flex items-center gap-1">
          <Link to="/"
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[11px] font-semibold uppercase tracking-widest transition-all ${pathname === "/" ? "bg-white/10 text-white" : "text-gray-400 hover:text-white hover:bg-white/6"}`}>
            <LayoutDashboard className="w-3 h-3" /> Home
          </Link>

          <div className="relative">
            <button onClick={() => setStoreOpen(o => !o)} onBlur={() => setTimeout(() => setStoreOpen(false), 150)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[11px] font-semibold uppercase tracking-widest text-gray-400 hover:text-white hover:bg-white/6 transition-all">
              <Server className="w-3 h-3" /> Store
              <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${storeOpen ? "rotate-180" : ""}`} />
            </button>
            {storeOpen && (
              <div className="absolute top-[calc(100%+6px)] left-1/2 -translate-x-1/2 w-52 rounded-xl border border-white/10 shadow-2xl py-2 z-50"
                style={{ background: "rgba(8,8,14,0.98)", backdropFilter: "blur(20px)" }}>
                {[
                  { icon: Server,    label: "VPS Plans" },
                  { icon: HardDrive, label: "Minecraft Servers" },
                  { icon: Globe,     label: "Web Service" },
                ].map(({ icon: Icon, label }) => (
                  <Link key={label} to="/client" onClick={() => setStoreOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-[11px] font-semibold uppercase tracking-widest text-gray-400 hover:text-white hover:bg-white/6 transition-all">
                    <Icon className="w-3.5 h-3.5 text-emerald-400" /> {label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link to="/legal"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[11px] font-semibold uppercase tracking-widest text-gray-400 hover:text-white hover:bg-white/6 transition-all">
            <FileText className="w-3 h-3" /> Legal Policies
          </Link>
        </div>

        {/* Auth */}
        <div className="flex items-center gap-2">
          <button onClick={() => {
            window.location.href = "https://panel.nexoracloud.xyz/";}}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg border border-white/12 text-gray-300 hover:text-white hover:bg-white/6 transition-all text-[11px] font-semibold uppercase tracking-widest">
            <LogIn className="w-3 h-3" /> Login
          </button>
          <button onClick={() => {
            window.location.href = "https://panel.nexoracloud.xyz/";}}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-widest text-white transition-all hover:scale-105 shadow-[0_0_14px_rgba(16,185,129,0.4)]"
            style={{ background: "linear-gradient(135deg, #059669, #7c3aed)" }}>
            <UserPlus className="w-3 h-3" /> Register
          </button>
        </div>
      </div>
    </nav>
  );
}

/* ─── Background ──────────────────────────────────────────────── */
function ClientBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      {/* Circuit dot grid */}
      <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.055 }} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="cg" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="#10b981" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#cg)" />
      </svg>
      {/* Glow blobs — mixed purple + green */}
      <div className="absolute -top-60 -left-60 w-[800px] h-[800px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(16,185,129,0.10) 0%, transparent 65%)" }} />
      <div className="absolute top-1/3 right-0 w-[600px] h-[600px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(124,58,237,0.09) 0%, transparent 65%)" }} />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(52,211,153,0.07) 0%, transparent 65%)" }} />
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 65%)" }} />
    </div>
  );
}

/* ─── SVG: Server Rack ────────────────────────────────────────── */
function ServerRackSVG() {
  return (
    <svg viewBox="0 0 360 300" className="w-full max-w-xs" fill="none">
      <defs>
        <linearGradient id="rack" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0f172a" />
          <stop offset="100%" stopColor="#050810" />
        </linearGradient>
        <linearGradient id="unit" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#1a1830" />
          <stop offset="100%" stopColor="#110f28" />
        </linearGradient>
        <linearGradient id="gbar" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <linearGradient id="pbar" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#4f46e5" />
        </linearGradient>
        <filter id="glow3">
          <feGaussianBlur stdDeviation="2.5" result="b" />
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      {/* Ambient glow */}
      <ellipse cx="180" cy="270" rx="130" ry="20" fill="#10b981" opacity="0.12" />
      <ellipse cx="180" cy="150" rx="170" ry="160" fill="#7c3aed" opacity="0.04" />
      {/* Chassis */}
      <rect x="40" y="20" width="280" height="252" rx="8" fill="url(#rack)" stroke="#1e1b4b" strokeWidth="1.5" />
      <rect x="40" y="20" width="20" height="252" rx="4" fill="#0d0c20" stroke="#1e1b4b" strokeWidth="1" />
      <rect x="300" y="20" width="20" height="252" rx="4" fill="#0d0c20" stroke="#1e1b4b" strokeWidth="1" />
      {/* Screws */}
      {[44, 90, 136, 182, 228, 260].map((y, i) => (
        <g key={i}>
          <circle cx="50" cy={y} r="3" fill="#080714" stroke="#2e2b5e" strokeWidth="0.8" />
          <circle cx="310" cy={y} r="3" fill="#080714" stroke="#2e2b5e" strokeWidth="0.8" />
        </g>
      ))}
      {/* Unit 1 — AMD EPYC (purple) */}
      <rect x="66" y="30" width="228" height="44" rx="4" fill="url(#unit)" stroke="#2e2b60" strokeWidth="0.8" />
      <rect x="66" y="30" width="4" height="44" rx="2" fill="url(#pbar)" filter="url(#glow3)" />
      <text x="78" y="48" fontSize="6.5" fill="#a78bfa" fontFamily="monospace" fontWeight="bold">AMD EPYC™ 9754 GENOA</text>
      <rect x="78" y="53" width="70" height="4" rx="2" fill="#1a1840" />
      {/* CPU chip */}
      <rect x="182" y="34" width="32" height="28" rx="3" fill="#18163a" stroke="#5b21b6" strokeWidth="0.8" />
      <rect x="186" y="38" width="24" height="20" rx="2" fill="#0d0b25" />
      <circle cx="198" cy="48" r="4" fill="#7c3aed" opacity="0.8" filter="url(#glow3)" />
      {[186,192,198,204].map(x => (
        <g key={x}>
          <line x1={x} y1="34" x2={x} y2="31" stroke="#4c1d95" strokeWidth="0.7" />
          <line x1={x} y1="62" x2={x} y2="65" stroke="#4c1d95" strokeWidth="0.7" />
        </g>
      ))}
      <circle cx="248" cy="48" r="3.5" fill="#7c3aed" filter="url(#glow3)" />
      <circle cx="260" cy="48" r="3.5" fill="#22c55e" filter="url(#glow3)" />
      <circle cx="272" cy="48" r="3.5" fill="#2e2b5e" />
      {/* Unit 2 — NVMe (green) */}
      <rect x="66" y="82" width="228" height="44" rx="4" fill="url(#unit)" stroke="#0f4a30" strokeWidth="0.8" />
      <rect x="66" y="82" width="4" height="44" rx="2" fill="url(#gbar)" filter="url(#glow3)" />
      <text x="78" y="100" fontSize="6.5" fill="#6ee7b7" fontFamily="monospace" fontWeight="bold">NVMe Gen5 — 7 GB/s · 1.5M IOPS</text>
      {[220,232,244,256,268,280].map((x, i) => (
        <g key={x}>
          <rect x={x} y="91" width="8" height="26" rx="1.5" fill="#050e08" stroke="#0f4a30" strokeWidth="0.8" />
          <circle cx={x + 4} cy="122" r="2" fill={i < 5 ? "#10b981" : "#0f2a1a"} opacity="0.9" />
        </g>
      ))}
      {/* Unit 3 — Network (mixed teal/purple) */}
      <rect x="66" y="134" width="228" height="44" rx="4" fill="url(#unit)" stroke="#134e4a" strokeWidth="0.8" />
      <rect x="66" y="134" width="4" height="44" rx="2" fill="#14b8a6" filter="url(#glow3)" />
      <text x="78" y="152" fontSize="6.5" fill="#5eead4" fontFamily="monospace" fontWeight="bold">10 GbE Network · DDoS 2.5 Tbps</text>
      {[220,234,248,262,276].map((x, i) => (
        <g key={x}>
          <rect x={x} y="142" width="10" height="7" rx="1.5" fill="#050e0d" stroke="#134e4a" strokeWidth="0.7" />
          <circle cx={x + 5} cy="156" r="2.5" fill={i % 3 === 0 ? "#14b8a6" : i % 3 === 1 ? "#22c55e" : "#1a1840"} filter="url(#glow3)" />
        </g>
      ))}
      {/* Unit 4 — Security (purple + green) */}
      <rect x="66" y="186" width="228" height="44" rx="4" fill="url(#unit)" stroke="#312e81" strokeWidth="0.8" />
      <rect x="66" y="186" width="4" height="44" rx="2" fill="#6366f1" filter="url(#glow3)" />
      <text x="78" y="204" fontSize="6.5" fill="#a5b4fc" fontFamily="monospace" fontWeight="bold">AES-256 · LUKS2 · Private VLAN</text>
      <rect x="78" y="208" width="45" height="4" rx="2" fill="#18163a" />
      <circle cx="248" cy="205" r="3.5" fill="#22c55e" filter="url(#glow3)" />
      <circle cx="260" cy="205" r="3.5" fill="#22c55e" filter="url(#glow3)" />
      <circle cx="272" cy="205" r="3.5" fill="#6366f1" filter="url(#glow3)" />
      {/* Unit 5 — PSU */}
      <rect x="66" y="238" width="228" height="28" rx="4" fill="url(#unit)" stroke="#1e1b4b" strokeWidth="0.8" />
      <rect x="66" y="238" width="4" height="28" rx="2" fill="#4b5563" />
      <text x="78" y="255" fontSize="6.5" fill="#6b7280" fontFamily="monospace">Redundant PSU — 2 × 1600W</text>
      <circle cx="270" cy="252" r="10" fill="#060a0e" stroke="#1e1b4b" strokeWidth="0.7" />
      <circle cx="270" cy="252" r="6.5" fill="none" stroke="#1e1b4b" strokeWidth="0.6" />
      <line x1="260" y1="252" x2="280" y2="252" stroke="#1e1b4b" strokeWidth="0.6" />
      <line x1="270" y1="242" x2="270" y2="262" stroke="#1e1b4b" strokeWidth="0.6" />
      <circle cx="288" cy="248" r="2.5" fill="#22c55e" filter="url(#glow3)" />
      <circle cx="288" cy="256" r="2.5" fill="#22c55e" filter="url(#glow3)" />
      {/* Floating labels */}
      <g filter="url(#glow3)">
        <rect x="2" y="78" width="60" height="18" rx="5" fill="#120f30" stroke="#7c3aed" strokeWidth="0.7" opacity="0.95" />
        <text x="32" y="91" textAnchor="middle" fontSize="6.5" fill="#a78bfa" fontFamily="monospace" fontWeight="bold">128 Cores</text>
      </g>
      <g filter="url(#glow3)">
        <rect x="298" y="130" width="60" height="18" rx="5" fill="#051a10" stroke="#10b981" strokeWidth="0.7" opacity="0.95" />
        <text x="328" y="143" textAnchor="middle" fontSize="6.5" fill="#6ee7b7" fontFamily="monospace" fontWeight="bold">1.5M IOPS</text>
      </g>
      <g filter="url(#glow3)">
        <rect x="298" y="182" width="60" height="18" rx="5" fill="#030f12" stroke="#14b8a6" strokeWidth="0.7" opacity="0.95" />
        <text x="328" y="195" textAnchor="middle" fontSize="6.5" fill="#5eead4" fontFamily="monospace" fontWeight="bold">10 GbE</text>
      </g>
    </svg>
  );
}

/* ─── SVG: CPU Diagram ────────────────────────────────────────── */
function CPUDiagramSVG() {
  return (
    <svg viewBox="0 0 260 260" className="w-48 h-48 animate-spin-slow" fill="none">
      <defs>
        <linearGradient id="chip" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1a1840" />
          <stop offset="100%" stopColor="#0d0b25" />
        </linearGradient>
      </defs>
      {/* Outer ring */}
      <circle cx="130" cy="130" r="118" stroke="#7c3aed" strokeWidth="0.6" strokeDasharray="4 6" opacity="0.4" />
      <circle cx="130" cy="130" r="100" stroke="#10b981" strokeWidth="0.5" strokeDasharray="2 8" opacity="0.3" />
      {/* CPU body */}
      <rect x="80" y="80" width="100" height="100" rx="8" fill="url(#chip)" stroke="#5b21b6" strokeWidth="1.5" />
      <rect x="88" y="88" width="84" height="84" rx="5" fill="#080620" stroke="#4c1d95" strokeWidth="0.8" />
      {/* Core grid */}
      {[0,1,2,3].map(row => [0,1,2,3].map(col => (
        <rect key={`${row}-${col}`}
          x={96 + col * 18} y={96 + row * 18} width="12" height="12" rx="2"
          fill={`rgba(${row + col < 4 ? "16,185,129" : "124,58,237"},${0.3 + (row + col) * 0.05})`}
          stroke={row + col < 4 ? "#10b981" : "#7c3aed"} strokeWidth="0.5"
        />
      )))}
      {/* Pins top/bottom */}
      {[90,104,118,132,146,160,174].map((x, i) => (
        <g key={i}>
          <line x1={x} y1="80" x2={x} y2="70" stroke={i % 2 === 0 ? "#10b981" : "#7c3aed"} strokeWidth="1" opacity="0.6" />
          <line x1={x} y1="180" x2={x} y2="190" stroke={i % 2 === 0 ? "#10b981" : "#7c3aed"} strokeWidth="1" opacity="0.6" />
        </g>
      ))}
      {/* Pins left/right */}
      {[90,104,118,132,146,160,174].map((y, i) => (
        <g key={i}>
          <line x1="80" y1={y} x2="70" y2={y} stroke={i % 2 === 0 ? "#7c3aed" : "#10b981"} strokeWidth="1" opacity="0.6" />
          <line x1="180" y1={y} x2="190" y2={y} stroke={i % 2 === 0 ? "#7c3aed" : "#10b981"} strokeWidth="1" opacity="0.6" />
        </g>
      ))}
      {/* Center glow dot */}
      <circle cx="130" cy="130" r="8" fill="#10b981" opacity="0.6" filter="url(#glow3)" />
      <circle cx="130" cy="130" r="4" fill="#fff" opacity="0.9" />
    </svg>
  );
}

/* ─── SVG: Shield ─────────────────────────────────────────────── */
function ShieldSVG() {
  return (
    <svg viewBox="0 0 120 140" className="w-28 h-32 animate-float" fill="none">
      <defs>
        <linearGradient id="shld" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.15" />
        </linearGradient>
      </defs>
      <path d="M60 8 L104 28 L104 72 C104 100 60 128 60 128 C60 128 16 100 16 72 L16 28 Z"
        fill="url(#shld)" stroke="#10b981" strokeWidth="1.5" opacity="0.8" />
      <path d="M60 20 L94 36 L94 72 C94 94 60 116 60 116 C60 116 26 94 26 72 L26 36 Z"
        fill="none" stroke="#7c3aed" strokeWidth="0.8" strokeDasharray="3 4" opacity="0.5" />
      {/* Check mark */}
      <polyline points="42,68 56,82 78,56" stroke="#10b981" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ─── SVG: Globe Network ──────────────────────────────────────── */
function GlobeSVG() {
  return (
    <svg viewBox="0 0 120 120" className="w-24 h-24 animate-spin-slow" fill="none" style={{ animationDuration: "20s" }}>
      <circle cx="60" cy="60" r="50" stroke="#10b981" strokeWidth="1" opacity="0.3" />
      <circle cx="60" cy="60" r="50" stroke="#7c3aed" strokeWidth="0.5" strokeDasharray="3 8" opacity="0.4" />
      <ellipse cx="60" cy="60" rx="25" ry="50" stroke="#10b981" strokeWidth="0.8" opacity="0.3" />
      <ellipse cx="60" cy="60" rx="50" ry="20" stroke="#7c3aed" strokeWidth="0.8" opacity="0.3" />
      <line x1="10" y1="60" x2="110" y2="60" stroke="#10b981" strokeWidth="0.6" opacity="0.25" />
      <line x1="60" y1="10" x2="60" y2="110" stroke="#7c3aed" strokeWidth="0.6" opacity="0.25" />
      {[[60,20],[90,40],[100,70],[78,98],[40,98],[20,72],[18,42]].map(([cx,cy],i) => (
        <circle key={i} cx={cx} cy={cy} r="3" fill={i%2===0 ? "#10b981" : "#7c3aed"} opacity="0.8" />
      ))}
      {/* Connection lines between nodes */}
      <line x1="60" y1="20" x2="90" y2="40" stroke="#10b981" strokeWidth="0.6" opacity="0.4" />
      <line x1="90" y1="40" x2="100" y2="70" stroke="#7c3aed" strokeWidth="0.6" opacity="0.4" />
      <line x1="100" y1="70" x2="78" y2="98" stroke="#10b981" strokeWidth="0.6" opacity="0.4" />
      <line x1="78" y1="98" x2="40" y2="98" stroke="#7c3aed" strokeWidth="0.6" opacity="0.4" />
      <line x1="40" y1="98" x2="20" y2="72" stroke="#10b981" strokeWidth="0.6" opacity="0.4" />
      <line x1="20" y1="72" x2="18" y2="42" stroke="#7c3aed" strokeWidth="0.6" opacity="0.4" />
      <line x1="18" y1="42" x2="60" y2="20" stroke="#10b981" strokeWidth="0.6" opacity="0.4" />
      <circle cx="60" cy="60" r="6" fill="#10b981" opacity="0.7" />
      <circle cx="60" cy="60" r="3" fill="#fff" opacity="0.9" />
    </svg>
  );
}

/* ─── Feature Card ────────────────────────────────────────────── */
function FeatureCard({ icon: Icon, title, desc, badge, accent }: {
  icon: React.ElementType; title: string; desc: string; badge: string;
  accent: "green" | "purple" | "teal" | "indigo";
}) {
  const colors = {
    green:  { bg: "bg-emerald-700",  badge: "text-emerald-300 bg-emerald-500/15", border: "hover:border-emerald-500/40" },
    purple: { bg: "bg-violet-700",   badge: "text-violet-300 bg-violet-500/15",   border: "hover:border-violet-500/40" },
    teal:   { bg: "bg-teal-700",     badge: "text-teal-300 bg-teal-500/15",       border: "hover:border-teal-500/40" },
    indigo: { bg: "bg-indigo-700",   badge: "text-indigo-300 bg-indigo-500/15",   border: "hover:border-indigo-500/40" },
  }[accent];
  return (
    <div className={`p-5 rounded-2xl border border-white/7 ${colors.border} transition-all duration-300 group cursor-default`}
      style={{ background: "rgba(255,255,255,0.025)" }}>
      <div className="flex items-start gap-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300 ${colors.bg}`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="font-bold text-white text-sm">{title}</span>
            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded shrink-0 ${colors.badge}`}>{badge}</span>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed">{desc}</p>
        </div>
      </div>
    </div>
  );
}

/* ─── Stat Pill ───────────────────────────────────────────────── */
function StatPill({ icon: Icon, label, value, color }: {
  icon: React.ElementType; label: string; value: string; color: string;
}) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-white/8 hover:border-white/15 transition-all"
      style={{ background: "rgba(255,255,255,0.03)" }}>
      <Icon className={`w-4 h-4 shrink-0 ${color}`} />
      <div>
        <div className="text-xs font-bold text-white">{value}</div>
        <div className="text-[10px] text-gray-500 uppercase tracking-wider">{label}</div>
      </div>
    </div>
  );
}

/* ═══════════════════ Data ═══════════════════════════════════════ */
const features = [
  { icon: Cpu,      title: "AMD EPYC™ Genoa",           desc: "128 Zen 4 cores, 256 MB L3, DDR5-4800 ECC and PCIe Gen 5. Every vCPU is dedicated — zero overcommit.",                           badge: "192 vCPU",   accent: "purple" as const },
  { icon: HardDrive,title: "NVMe Gen 5 Storage",         desc: "7,000 MB/s sequential reads, up to 1.5M IOPS. Your databases will never be I/O-bound again.",                                   badge: "7 GB/s",     accent: "green" as const },
  { icon: Shield,   title: "DDoS Mitigation",            desc: "2.5 Tbps always-on scrubbing. Volumetric, protocol, and application-layer attacks absorbed automatically.",                     badge: "2.5 Tbps",   accent: "teal" as const },
  { icon: Lock,     title: "End-to-End Encryption",      desc: "AES-256-GCM at rest and in transit. LUKS2 full-disk encryption enabled by default, keys in hardware HSM.",                      badge: "AES-256",    accent: "indigo" as const },
  { icon: Globe,    title: "Global Edge Network",         desc: "12 data-centre locations, 4 continents, 100 GbE redundant uplinks. Sub-5 ms round-trip to your users.",                        badge: "12 PoPs",    accent: "green" as const },
  { icon: Zap,      title: "Instant Provisioning",        desc: "Fully configured, secured, traffic-ready in < 30 s. Automated ISO install, snapshot restore, or blank slate.",                  badge: "< 30 sec",   accent: "purple" as const },
];

const perks = [
  "Guaranteed dedicated resources — no overselling",
  "99.99% uptime SLA, credit-backed guarantee",
  "24/7 expert human support, not chatbots",
  "Full root access on every plan",
  "1-click snapshot, clone & restore",
  "Bring your own ISO or OS image",
  "Automatic weekly off-site backups",
  "Private VLAN & firewall — free",
];

const stats = [
  { icon: Activity,  label: "Uptime SLA",    value: "99.99%", color: "text-emerald-400" },
  { icon: Server,    label: "Instances Live", value: "50k+",   color: "text-violet-400" },
  { icon: BarChart3, label: "Data Centres",   value: "12",     color: "text-teal-400"   },
  { icon: Wifi,      label: "Avg Latency",    value: "< 5ms",  color: "text-emerald-300"},
];

/* ═══════════════════ Page ═══════════════════════════════════════ */
export default function Client() {
  const { navigate: transitionTo } = useTransitionNavigate();
  return (
    <div className="min-h-screen text-white" style={{ background: "#06060a" }}>
      <ClientBackground />
      <ClientNavbar />

      <div className="relative z-10 pt-14">

        {/* ── Hero ──────────────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-6 pt-20 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Left: text */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-8 w-fit animate-fade-in-up"
                style={{ background: "rgba(16,185,129,0.10)", border: "1px solid rgba(16,185,129,0.30)", color: "#6ee7b7" }}>
                <Server className="w-3.5 h-3.5" /> Client Portal
              </div>

              <h1 className="text-5xl md:text-6xl font-extrabold leading-[1.08] tracking-tight mb-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                Host Your Server.{" "}
                <span style={{
                  background: "linear-gradient(135deg, #10b981 0%, #7c3aed 50%, #34d399 100%)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                }}>
                  Own the Power.
                </span>
              </h1>

              <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-lg animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                We host powerful servers built on enterprise AMD EPYC™ CPUs, NVMe Gen 5 storage, and impenetrable multi-layer security — live in under 30 seconds.
              </p>

              <div className="flex flex-wrap items-center gap-4 mb-12 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
                <button onClick={() => {
            window.location.href = "https://panel.nexoracloud.xyz/";}}
                  className="inline-flex items-center gap-2 px-7 h-12 rounded-full text-sm font-bold uppercase tracking-widest text-white transition-all hover:scale-105 active:scale-95"
                  style={{ background: "linear-gradient(135deg, #10b981, #7c3aed)", boxShadow: "0 0 28px rgba(16,185,129,0.35)" }}>
                  Get Started <ArrowRight className="w-4 h-4" />
                </button>
                <button onClick={() => {
            window.location.href = "https://panel.nexoracloud.xyz/";}}
                  className="inline-flex items-center gap-2 px-7 h-12 rounded-full border border-white/15 text-gray-300 hover:text-white hover:bg-white/5 text-sm font-semibold uppercase tracking-widest transition-all hover:scale-105 active:scale-95">
                  <LogIn className="w-4 h-4" /> Sign In
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
                {stats.map(s => <StatPill key={s.label} {...s} />)}
              </div>
            </div>

            {/* Right: server rack SVG */}
            <div className="hidden lg:flex items-center justify-center animate-float-slow">
              <ServerRackSVG />
            </div>
          </div>
        </section>

        {/* ── Features ──────────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-6 pb-16">
          <Reveal className="mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4"
              style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.22)", color: "#6ee7b7" }}>
              <Zap className="w-3 h-3" /> Infrastructure
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">What's Under the Hood</h2>
            <p className="text-gray-500 text-sm max-w-xl">Enterprise hardware on every plan — no tiered resources, no overselling, no surprises.</p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={i % 3 as 0|1|2} from={i % 2 === 0 ? "left" : "right"}>
                <FeatureCard {...f} />
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── CPU Deep Dive ─────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-6 pb-16">
          <Reveal>
            <div className="rounded-3xl border border-white/8 overflow-hidden"
              style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.08) 0%, rgba(16,185,129,0.06) 100%)" }}>
              <div className="p-8 md:p-12">
                <div className="flex flex-col lg:flex-row gap-10 items-center">

                  {/* CPU SVG */}
                  <div className="flex flex-col items-center gap-4 shrink-0">
                    <CPUDiagramSVG />
                    <div className="text-center">
                      <div className="text-sm font-bold text-white">EPYC™ Genoa</div>
                      <div className="text-xs text-gray-500">Zen 4 Microarch</div>
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-10 h-10 rounded-xl bg-violet-700 flex items-center justify-center">
                        <Cpu className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="font-bold text-white text-lg">AMD EPYC™ 9754 "Genoa"</div>
                        <div className="text-xs text-violet-400 uppercase tracking-widest">CPU Architecture Deep Dive</div>
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed mb-4">
                      Every vCPU is a real, dedicated Zen 4 core — no hyperthreading tricks, no shared NUMA nodes. Genoa delivers <strong className="text-emerald-300">2.4× better IPC</strong> over Milan, <strong className="text-violet-300">3× memory bandwidth</strong> via 12-channel DDR5-4800, and <strong className="text-emerald-300">PCIe Gen 5 x128 lanes</strong>.
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {[
                        { l: "Cores/Socket", v: "128",      c: "text-violet-300" },
                        { l: "L3 Cache",     v: "256 MB",   c: "text-emerald-300" },
                        { l: "Memory",       v: "DDR5 ECC", c: "text-teal-300" },
                        { l: "PCIe",         v: "Gen 5",    c: "text-violet-300" },
                        { l: "Channels",     v: "12 Ch",    c: "text-emerald-300" },
                        { l: "TDP",          v: "360 W",    c: "text-gray-300" },
                        { l: "IPC vs Milan", v: "+2.4×",    c: "text-emerald-300" },
                        { l: "Bandwidth",    v: "460 GB/s", c: "text-violet-300" },
                      ].map(item => (
                        <div key={item.l} className="p-3 rounded-xl text-center border border-white/7"
                          style={{ background: "rgba(255,255,255,0.03)" }}>
                          <div className={`text-base font-bold ${item.c}`}>{item.v}</div>
                          <div className="text-[10px] text-gray-500 mt-0.5 uppercase tracking-wider">{item.l}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ── Security ──────────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-6 pb-16">
          <Reveal>
            <div className="rounded-3xl border border-white/8 overflow-hidden"
              style={{ background: "linear-gradient(135deg, rgba(16,185,129,0.07) 0%, rgba(20,184,166,0.05) 100%)" }}>
              <div className="p-8 md:p-12">
                <div className="flex flex-col lg:flex-row gap-10 items-start">

                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-10 h-10 rounded-xl bg-teal-700 flex items-center justify-center">
                        <Shield className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="font-bold text-white text-lg">Tight Security — Always On, Always Free</div>
                        <div className="text-xs text-teal-400 uppercase tracking-widest">Multi-layer protection</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        { title: "DDoS Scrubbing",       body: "2.5 Tbps always-on scrubbing. Volumetric floods, SYN floods, UDP amplification — absorbed before they reach your server.", color: "text-emerald-400" },
                        { title: "Full-Disk Encryption",  body: "LUKS2 + AES-256-XTS. Keys rotate on every provision and never leave the hardware security module.",                         color: "text-violet-400" },
                        { title: "Private VLAN + Firewall",body: "Layer-2 isolated VLAN. Stateful firewall blocks all inbound by default — you whitelist only what you need.",              color: "text-teal-400" },
                      ].map(item => (
                        <div key={item.title} className="p-5 rounded-2xl border border-white/7"
                          style={{ background: "rgba(255,255,255,0.025)" }}>
                          <div className="flex items-center gap-2 mb-3">
                            <Lock className={`w-4 h-4 ${item.color}`} />
                            <span className="font-bold text-white text-sm">{item.title}</span>
                          </div>
                          <p className="text-xs text-gray-400 leading-relaxed">{item.body}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Shield SVG */}
                  <div className="hidden lg:flex flex-col items-center gap-3 shrink-0">
                    <ShieldSVG />
                    <GlobeSVG />
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ── Perks + CTA ───────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-6 pb-20">
          <Reveal className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Everything You Need. Nothing You Don't.</h2>
            <p className="text-gray-500 text-sm max-w-xl">Ships on every plan by default — no upsells, no gotchas.</p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
            {perks.map((p, i) => (
              <Reveal key={p} delay={i % 3 as 0|1|2}>
                <div className="flex items-start gap-2.5 px-4 py-3 rounded-xl border border-white/7 hover:border-emerald-500/30 transition-all"
                  style={{ background: "rgba(255,255,255,0.025)" }}>
                  <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${i % 2 === 0 ? "text-emerald-400" : "text-violet-400"}`} />
                  <span className="text-sm text-gray-300 leading-snug">{p}</span>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Final CTA */}
          <Reveal>
            <div className="rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6"
              style={{
                background: "linear-gradient(135deg, rgba(16,185,129,0.12) 0%, rgba(124,58,237,0.10) 100%)",
                border: "1px solid rgba(255,255,255,0.10)",
              }}>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Ready to deploy?</h3>
                <p className="text-gray-400 text-sm">Create your account — first server live in under 30 seconds.</p>
              </div>
              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <button onClick={{() => {
            window.location.href = "https://panel.nexoracloud.xyz/";}}
                  className="inline-flex items-center gap-2 px-7 h-11 rounded-full text-sm font-bold uppercase tracking-widest text-white transition-all hover:scale-105"
                  style={{ background: "linear-gradient(135deg, #10b981, #7c3aed)", boxShadow: "0 0 22px rgba(16,185,129,0.35)" }}>
                  Register Free <ArrowRight className="w-4 h-4" />
                </button>
                <button onClick={{() => {
            window.location.href = "https://panel.nexoracloud.xyz/";}}
                  className="inline-flex items-center gap-2 px-7 h-11 rounded-full border border-white/15 text-gray-300 hover:text-white hover:bg-white/5 text-sm font-semibold uppercase tracking-widest transition-all">
                  <LogIn className="w-4 h-4" /> Sign In
                </button>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ── Footer ────────────────────────────────────────────── */}
        <div className="border-t border-white/6 py-5 px-6" style={{ background: "rgba(6,6,10,0.8)" }}>
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-[11px] text-gray-600">
            <span>© 2025 Nexora Cloud. All rights reserved.</span>
            <div className="flex gap-5">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(l => (
                <a key={l} href="#" className="hover:text-gray-400 transition-colors">{l}</a>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
