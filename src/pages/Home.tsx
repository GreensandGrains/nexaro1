import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, Server, Shield, Zap, Cpu, HardDrive, Globe, Check,
  Activity, Layers, Lock, RefreshCw, Star, MapPin, Wifi, Users,
  BarChart3, Headphones, Code2, Rocket,
} from "lucide-react";
import { useInView } from "@/hooks/useInView";
import { useCountUp } from "@/hooks/useCountUp";

/* ─────────────── Reveal wrapper ─────────────────────────────
   Applies scroll-triggered CSS transitions.
   variant: "up" | "left" | "right" | "scale"
   delay:    number (0-5 maps to .delay-N classes)
──────────────────────────────────────────────────────────── */
function Reveal({
  children,
  variant = "up",
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  variant?: "up" | "left" | "right" | "scale";
  delay?: number;
  className?: string;
}) {
  const { ref, inView } = useInView(0.12);
  const cls =
    variant === "left"  ? "reveal-left"  :
    variant === "right" ? "reveal-right" :
    variant === "scale" ? "reveal-scale" : "reveal";
  return (
    <div
      ref={ref}
      className={`${cls} delay-${delay} ${inView ? "in-view" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

/* ─────────────── Data ──────────────────────────────────────── */
const HERO_IMAGES = [
  "https://ik.imagekit.io/gf5eyovtx/hero-minecraft.webp?w=1600&q=80&fit=crop",
  "https://ik.imagekit.io/gf5eyovtx/pngtree-minecraft-style-garden-path-with-flowers-and-green-bushes-under-purple-image_21634598.webp?w=1600&q=80&fit=crop",
  "https://ik.imagekit.io/gf5eyovtx/images.jfif",
  "https://ik.imagekit.io/gf5eyovtx/minecraft-dungeons-2-ideas-v0-4q1hic89j5fc1.webp?w=1600&q=80&fit=crop",
  "https://ik.imagekit.io/gf5eyovtx/best-minecraft-dungeons-ready-to-fight-5flwofmgmdgpe6id.jpg?w=1600&q=80&fit=crop",
];
const ANIMATED_WORDS = ["Deploy", "Scale", "Protect", "Monitor", "Automate"];

const WHY_NODES = [
  { icon: Zap,        title: "Blazing Speed",    desc: "AMD EPYC & NVMe SSD",         color: "from-violet-500 to-purple-700" },
  { icon: Shield,     title: "Military Security", desc: "Auto DDoS mitigation",         color: "from-blue-500 to-indigo-700" },
  { icon: BarChart3,  title: "99.99% Uptime",     desc: "Redundant infrastructure",     color: "from-emerald-500 to-teal-700" },
  { icon: Globe,      title: "Global Reach",      desc: "12+ data center locations",    color: "from-sky-500 to-cyan-700" },
  { icon: Code2,      title: "Dev-First API",     desc: "Beautiful REST & CLI tools",   color: "from-pink-500 to-rose-700" },
  { icon: Headphones, title: "24/7 Support",      desc: "Expert engineers on-call",     color: "from-amber-500 to-orange-700" },
];

const STATS_DATA = [
  { rawValue: 10000, suffix: "k+", label: "Active Developers", icon: Users },
  { rawValue: 9999,  suffix: "%",  label: "Guaranteed Uptime",  icon: Activity, prefix: "99." },
  { rawValue: 50000, suffix: "k+", label: "Instances Live",     icon: Server },
  { rawValue: 100,   suffix: "k+", label: "Tickets Resolved",   icon: Headphones },
];

const LOCATIONS = [
  { flag:"🇮🇳", city:"Mumbai",      region:"India",      ping:18 },
  { flag:"🇺🇸", city:"New York",    region:"NA East",    ping:12 },
  { flag:"🇺🇸", city:"Los Angeles", region:"NA West",    ping:15 },
  { flag:"🇩🇪", city:"Frankfurt",   region:"EU Central", ping:8  },
  { flag:"🇸🇬", city:"Singapore",   region:"SEA",        ping:22 },
  { flag:"🇦🇺", city:"Sydney",      region:"Australia",  ping:30 },
];

const FEATURES = [
  { icon: Cpu,       title: "Next-Gen Compute",    desc: "AMD EPYC & Intel Xeon for unmatched performance." },
  { icon: HardDrive, title: "NVMe SSD Storage",    desc: "Up to 100k IOPS for your most demanding workloads." },
  { icon: Globe,     title: "Global Network",       desc: "Ultra-low latency across 12+ worldwide locations." },
  { icon: Shield,    title: "DDoS Protection",      desc: "Enterprise-grade mitigation — always on, always free." },
  { icon: Server,    title: "Instant Provisioning", desc: "Your instance is live in under 30 seconds." },
  { icon: Zap,       title: "Simple API",           desc: "Automate everything with our intuitive REST API." },
];

const PLANS = [
  { name:"Starter",    price:9,  ram:"2 GB",  cpu:"1 vCPU",   storage:"40 GB NVMe",  bandwidth:"2 TB",  features:["Full root access","1-click snapshots","99.9% SLA"],                            highlighted:false },
  { name:"Pro",        price:29, ram:"8 GB",  cpu:"4 vCPUs",  storage:"160 GB NVMe", bandwidth:"8 TB",  features:["Everything in Starter","DDoS Protection","Priority Support","99.99% SLA"],    highlighted:true  },
  { name:"Enterprise", price:99, ram:"32 GB", cpu:"16 vCPUs", storage:"640 GB NVMe", bandwidth:"32 TB", features:["Everything in Pro","Dedicated hardware","Custom SLA","24/7 SLA support"],      highlighted:false },
];

/* ─────────────── Hero Slideshow ────────────────────────────── */
function HeroSlideshow() {
  const [current, setCurrent] = useState(0);
  const [prev,    setPrev]    = useState<number | null>(null);
  useEffect(() => {
    const id = setInterval(() => {
      setPrev(c => c);
      setCurrent(c => { setPrev(c); return (c + 1) % HERO_IMAGES.length; });
    }, 3000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="absolute inset-0 overflow-hidden">
      {HERO_IMAGES.map((src, i) => (
        <img key={src} src={src} alt="" loading="eager"
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
          style={{ opacity: i === current ? 1 : 0, zIndex: i === current ? 2 : i === prev ? 1 : 0 }} />
      ))}
      <div className="absolute inset-0 z-10 bg-[#050507]/55" />
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#050507]/85 via-[#050507]/40 to-transparent" />
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#050507] via-transparent to-transparent" />
    </div>
  );
}

/* ─────────────── Animated Word ─────────────────────────────── */
function AnimatedWord() {
  const [index,   setIndex]   = useState(0);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const id = setInterval(() => {
      setVisible(false);
      setTimeout(() => { setIndex(i => (i + 1) % ANIMATED_WORDS.length); setVisible(true); }, 350);
    }, 3000);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent inline-block"
      style={{ transition:"opacity 0.35s ease, transform 0.35s ease", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(12px)" }}>
      {ANIMATED_WORDS[index]}
    </span>
  );
}

/* ─────────────── Hero Right Visual ─────────────────────────── */
function RightVisual() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="relative w-[340px] h-[380px]">
        <div className="absolute inset-0 rounded-full border border-primary/20 animate-pulse-ring" />
        <div className="absolute inset-6 rounded-full border border-primary/10 animate-spin-slow" style={{ borderStyle:"dashed" }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-28 h-28 rounded-full bg-gradient-to-br from-primary/30 to-accent/20 blur-xl animate-pulse" />
          <div className="absolute w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-[0_0_60px_rgba(124,58,237,0.6)]">
            <Server className="w-9 h-9 text-white" />
          </div>
        </div>
        {[
          { icon:Activity,  label:"Uptime",      value:"99.99%",   color:"text-green-400", border:"border-primary/30",   pos:"absolute -top-4 left-4",           delay:"0s"   },
          { icon:Layers,    label:"Instances",   value:"50k+ Live",color:"text-accent",    border:"border-accent/30",    pos:"absolute top-12 -right-8",          delay:"0.8s" },
          { icon:Lock,      label:"DDoS Shield", value:"Active",   color:"text-green-400", border:"border-green-500/30", pos:"absolute bottom-16 -right-4",       delay:"1.6s" },
          { icon:RefreshCw, label:"Deploy time", value:"< 30 sec", color:"text-blue-400",  border:"border-blue-500/30",  pos:"absolute -bottom-4 left-8",         delay:"2.4s" },
          { icon:Globe,     label:"Regions",     value:"12 Global",color:"text-primary",   border:"border-primary/30",   pos:"absolute top-1/2 -translate-y-1/2 -left-12", delay:"1.2s" },
        ].map(({ icon:Icon, label, value, color, border, pos, delay }, i) => (
          <div key={i} className={`${pos} animate-float`} style={{ animationDelay:delay }}>
            <div className={`px-3 py-2.5 rounded-2xl bg-[#0D0D14]/90 border ${border} backdrop-blur-sm flex items-center gap-2.5 whitespace-nowrap shadow-lg`}>
              <Icon className={`w-3.5 h-3.5 ${color}`} />
              <div>
                <div className="text-[9px] text-gray-400 uppercase tracking-wider">{label}</div>
                <div className="text-xs font-bold text-white">{value}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────── Prism SVG ─────────────────────────────────── */
function PrismSVG() {
  return (
    <svg viewBox="0 0 200 220" className="w-44 h-48 animate-prism" fill="none">
      <defs>
        <linearGradient id="pg1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#a855f7" stopOpacity="0.9"/>
          <stop offset="100%" stopColor="#6d28d9" stopOpacity="0.7"/>
        </linearGradient>
        <linearGradient id="pg2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#7c3aed" stopOpacity="0.8"/>
          <stop offset="100%" stopColor="#4c1d95" stopOpacity="0.6"/>
        </linearGradient>
        <linearGradient id="pg3" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="#c084fc" stopOpacity="0.6"/>
          <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.4"/>
        </linearGradient>
      </defs>
      <polygon points="100,10 170,160 30,160"  fill="url(#pg1)" stroke="#c084fc" strokeWidth="1.5" strokeOpacity="0.6"/>
      <polygon points="100,10 30,160 100,195"  fill="url(#pg2)" stroke="#a855f7" strokeWidth="1.5" strokeOpacity="0.5"/>
      <polygon points="100,10 170,160 100,195" fill="url(#pg3)" stroke="#9333ea" strokeWidth="1.5" strokeOpacity="0.5"/>
      <circle cx="100" cy="10" r="4" fill="#e9d5ff" opacity="0.9"/>
      <line x1="100" y1="10" x2="30"  y2="160" stroke="#a855f7" strokeWidth="0.8" strokeOpacity="0.4" strokeDasharray="4,4"/>
      <line x1="100" y1="10" x2="170" y2="160" stroke="#c084fc" strokeWidth="0.8" strokeOpacity="0.4" strokeDasharray="4,4"/>
    </svg>
  );
}

/* ─────────────── Stat Card with count-up ───────────────────── */
function StatCard({ rawValue, suffix, prefix, label, icon: Icon, inView }: {
  rawValue: number; suffix: string; prefix?: string; label: string;
  icon: React.ElementType; inView: boolean;
}) {
  const counted = useCountUp(rawValue, 1800, inView);
  const display = prefix
    ? `${prefix}${counted}${suffix}`
    : rawValue >= 1000
    ? `${Math.round(counted / 1000)}${suffix}`
    : `${counted}${suffix}`;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <div className="text-3xl md:text-4xl font-bold text-white tabular-nums">{display}</div>
      <div className="text-xs text-gray-400 uppercase tracking-wider">{label}</div>
    </div>
  );
}

/* ─────────────── Ping Tester ───────────────────────────────── */
function PingTester() {
  const [pinging, setPinging] = useState(false);
  const [results, setResults] = useState<Record<string, number>>({});
  const test = () => {
    if (pinging) return;
    setPinging(true);
    setResults({});
    LOCATIONS.forEach((loc, i) => {
      setTimeout(() => {
        const jitter = Math.floor(Math.random() * 8) - 4;
        setResults(r => ({ ...r, [loc.city]: loc.ping + jitter }));
        if (i === LOCATIONS.length - 1) setPinging(false);
      }, 400 + i * 250);
    });
  };
  const pingColor = (ms: number) => ms < 15 ? "text-green-400" : ms < 25 ? "text-yellow-400" : "text-orange-400";
  return (
    <div className="flex flex-col gap-2.5">
      {LOCATIONS.map(loc => (
        <div key={loc.city}
          className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-white/5 border border-white/8 hover:border-primary/30 transition-all hover:bg-white/8 group">
          <div className="flex items-center gap-3">
            <span className="text-xl">{loc.flag}</span>
            <div>
              <div className="text-sm font-semibold text-white">{loc.city}</div>
              <div className="text-[10px] text-gray-400">{loc.region}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {pinging && !results[loc.city] ? (
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            ) : results[loc.city] ? (
              <span className={`text-sm font-bold transition-all ${pingColor(results[loc.city])}`}>{results[loc.city]}ms</span>
            ) : (
              <span className="text-xs text-gray-500">—</span>
            )}
            <MapPin className="w-3.5 h-3.5 text-gray-500 group-hover:text-primary transition-colors" />
          </div>
        </div>
      ))}
      <button onClick={test} disabled={pinging}
        className="mt-2 w-full py-3 rounded-xl bg-primary hover:bg-primary/90 text-white font-semibold text-sm uppercase tracking-wider transition-all hover:shadow-[0_0_20px_rgba(124,58,237,0.5)] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 active:scale-95">
        <Wifi className="w-4 h-4" />
        {pinging ? "Testing…" : "Test My Ping"}
      </button>
    </div>
  );
}

/* ─────────────── Discord Icon ───────────────────────────────── */
function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
    </svg>
  );
}

/* ─────────────── Overall Rating ────────────────────────────── */
function OverallRating() {
  const rating = 4.9;
  const reviews = 2847;
  return (
    <div className="flex items-center gap-6">
      <div className="text-center">
        <div className="text-6xl font-bold text-white">{rating}</div>
        <div className="flex items-center gap-0.5 mt-1 justify-center">
          {[1,2,3,4,5].map(i => (
            <Star key={i} className={`w-5 h-5 ${i <= Math.round(rating) ? "fill-amber-400 text-amber-400" : "fill-gray-700 text-gray-700"}`} />
          ))}
        </div>
        <div className="text-xs text-gray-400 mt-1">{reviews.toLocaleString()} reviews</div>
      </div>
      <div className="flex-1 space-y-1.5">
        {[5,4,3,2,1].map(s => {
          const pct = s===5?88:s===4?9:s===3?2:s===2?0.6:0.4;
          return (
            <div key={s} className="flex items-center gap-2">
              <span className="text-xs text-gray-400 w-2">{s}</span>
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full rounded-full bg-amber-400 transition-all duration-700"
                  style={{ width:`${pct}%` }} />
              </div>
              <span className="text-[10px] text-gray-500 w-6">{pct}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════ Main Page ══════════════════════════════════ */
export default function Home() {
  /* Stats section inView for count-up trigger */
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsInView, setStatsInView] = useState(false);
  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStatsInView(true); obs.unobserve(el); } }, { threshold:0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="flex flex-col">

      {/* ══ HERO ══════════════════════════════════════════════ */}
      <section className="relative min-h-[92vh] flex items-start overflow-hidden">
        <HeroSlideshow />
        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start pt-28 pb-12">
          {/* Left */}
          <div className="flex flex-col items-start">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-semibold uppercase tracking-widest mb-6 animate-fade-in-up">
              <Zap className="w-3.5 h-3.5" /> The AWS of the Future
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-[4.2rem] font-bold text-white mb-4 tracking-tight leading-tight animate-fade-in-up" style={{ animationDelay:"0.1s" }}>
              <AnimatedWord /><br /><span>The Cosmos</span>
            </h1>
            <p className="text-base text-gray-400 mb-6 max-w-md leading-relaxed animate-fade-in-up" style={{ animationDelay:"0.2s" }}>
              Deploy high-performance infrastructure in seconds. Uncompromised speed, military-grade security, and a developer experience you'll love.
            </p>
            <div className="flex flex-wrap gap-2 mb-7 animate-fade-in-up" style={{ animationDelay:"0.25s" }}>
              {["VPS Hosting","Bare Metal","Cloud Storage","Managed DB","Game Servers"].map(tag => (
                <span key={tag} className="px-3 py-1 rounded-full text-xs font-medium text-gray-300 bg-white/5 border border-white/10 hover:border-primary/40 transition-colors">{tag}</span>
              ))}
            </div>
            <div className="flex flex-wrap items-start gap-3 animate-fade-in-up" style={{ animationDelay:"0.3s" }}>
              <button className="inline-flex items-center gap-2 px-6 h-11 rounded-full bg-primary hover:bg-primary/90 text-white shadow-[0_0_24px_rgba(124,58,237,0.5)] text-sm font-semibold uppercase tracking-widest transition-all hover:shadow-[0_0_40px_rgba(124,58,237,0.7)] hover:scale-105 active:scale-95">
                <Rocket className="w-4 h-4" /> Get Started
              </button>
              <a href="https://discord.gg" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 h-11 rounded-full border border-[#5865F2]/50 bg-[#5865F2]/10 text-[#7289da] hover:bg-[#5865F2]/20 text-sm font-semibold uppercase tracking-widest transition-all hover:scale-105 active:scale-95">
                <DiscordIcon className="w-4 h-4" /> Discord
              </a>
            </div>
          </div>
          {/* Right */}
          <div className="hidden lg:flex items-start justify-center h-[420px] -mt-4">
            <RightVisual />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-28 z-20 bg-gradient-to-t from-[#050507] to-transparent" />
      </section>

      {/* ══ WHY CHOOSE NEXARO ═════════════════════════════════ */}
      <section className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-primary/4 blur-[120px]" />
        </div>
        <div className="max-w-7xl mx-auto px-6">
          <Reveal className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-semibold uppercase tracking-widest mb-4">
              <Star className="w-3.5 h-3.5" /> Why Nexora
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Why Choose Nexora Cloud?</h2>
            <p className="text-gray-400 max-w-xl mx-auto">Built from the ground up for developers who demand the best — no compromise, no excuses.</p>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
            {/* Left nodes */}
            <div className="flex flex-col gap-5">
              {WHY_NODES.slice(0,3).map((n, i) => (
                <Reveal key={n.title} variant="left" delay={i as 0|1|2}>
                  <div className={`animate-node-${i} p-5 rounded-2xl bg-[#0D0D14]/90 border border-white/8 hover:border-primary/40 transition-all duration-300 group relative overflow-hidden cursor-default`}>
                    <div className={`absolute inset-0 bg-gradient-to-br ${n.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${n.color} flex items-center justify-center mb-3 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <n.icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-sm font-bold text-white mb-1">{n.title}</h3>
                    <p className="text-xs text-gray-400">{n.desc}</p>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-6 h-px bg-primary/30 hidden lg:block" />
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Center prism */}
            <Reveal variant="scale" className="flex flex-col items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-40 h-40 rounded-full bg-primary/10 blur-2xl animate-pulse" />
                </div>
                <PrismSVG />
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-white">Nexora Core</div>
                <div className="text-xs text-gray-400">Infrastructure Excellence</div>
              </div>
            </Reveal>

            {/* Right nodes */}
            <div className="flex flex-col gap-5">
              {WHY_NODES.slice(3).map((n, i) => (
                <Reveal key={n.title} variant="right" delay={i as 0|1|2}>
                  <div className={`animate-node-${i+3} p-5 rounded-2xl bg-[#0D0D14]/90 border border-white/8 hover:border-primary/40 transition-all duration-300 group relative overflow-hidden cursor-default`}>
                    <div className={`absolute inset-0 bg-gradient-to-br ${n.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${n.color} flex items-center justify-center mb-3 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <n.icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-sm font-bold text-white mb-1">{n.title}</h3>
                    <p className="text-xs text-gray-400">{n.desc}</p>
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-6 h-px bg-primary/30 hidden lg:block" />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ STATS OVAL ════════════════════════════════════════ */}
      <section className="py-8 px-6">
        <div ref={statsRef} className="max-w-4xl mx-auto">
          <Reveal variant="scale">
            <div className="px-10 py-10 rounded-[60px] bg-white/4 border border-white/10 backdrop-blur-xl shadow-[0_0_60px_rgba(124,58,237,0.08)]">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                {STATS_DATA.map(s => (
                  <StatCard key={s.label} {...s} inView={statsInView} />
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ GAMING + LOCATIONS ════════════════════════════════ */}
      <section className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-accent/5 blur-[100px]" />
        </div>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left — Gaming */}
          <Reveal variant="left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/30 text-accent text-xs font-semibold uppercase tracking-widest mb-6">
              🎮 Game Servers
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
              Experience <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary">Ultra-Low Latency</span> Gaming
            </h2>
            <p className="text-gray-400 mb-8 leading-relaxed">
              Host your game servers on globally distributed infrastructure. Minecraft, Valheim, ARK, and more — deploy in seconds, play worldwide with lag-free precision.
            </p>
            <div className="relative rounded-2xl overflow-hidden h-52 mb-6">
              <img src="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80&fit=crop" alt="Gaming" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050507]/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                {["Minecraft","Valheim","ARK","Rust","CS2"].map(g => (
                  <span key={g} className="px-2.5 py-1 rounded-full text-xs font-semibold bg-primary/80 text-white backdrop-blur-sm">{g}</span>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[{ v:"< 5ms",l:"Avg Latency" },{ v:"99.9%",l:"Game Uptime" },{ v:"500+",l:"Active Servers" }].map(s => (
                <div key={s.l} className="p-3 rounded-xl bg-white/5 border border-white/8 text-center hover:border-primary/30 transition-colors">
                  <div className="text-lg font-bold text-white">{s.v}</div>
                  <div className="text-[10px] text-gray-400 mt-0.5">{s.l}</div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Right — Locations + Ping */}
          <Reveal variant="right">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-semibold uppercase tracking-widest mb-6">
              <MapPin className="w-3.5 h-3.5" /> Server Locations
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Where We Host</h3>
            <p className="text-gray-400 text-sm mb-6">Pick the closest region for the best experience.</p>
            <PingTester />
          </Reveal>
        </div>
      </section>

      {/* ══ FEATURES ══════════════════════════════════════════ */}
      <section id="about" className="py-28 relative">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Engineered for Excellence</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Built for developers who don't compromise on performance, security, or experience.</p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FEATURES.map((f, i) => (
              <Reveal key={f.title} delay={(i % 3) as 0|1|2}>
                <div className="h-full p-7 rounded-2xl bg-[#0D0D14]/80 border border-white/5 hover:border-primary/50 transition-all duration-300 group hover:shadow-[0_0_30px_rgba(124,58,237,0.1)] hover:-translate-y-1">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                    <f.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{f.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PRICING ═══════════════════════════════════════════ */}
      <section id="plans" className="py-28 bg-[#0D0D14]/40">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Simple, Transparent Pricing</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">No hidden fees. No surprises. Pay only for what you use.</p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            {PLANS.map((plan, i) => (
              <Reveal key={plan.name} delay={i as 0|1|2} variant={i===1?"scale":"up"}>
                <div className={`relative p-8 rounded-2xl border transition-all duration-300 ${plan.highlighted ? "border-primary/60 bg-primary/5 shadow-[0_0_60px_rgba(124,58,237,0.25)] scale-105 hover:shadow-[0_0_80px_rgba(124,58,237,0.35)]" : "border-white/5 bg-[#0D0D14]/80 hover:border-primary/30 hover:-translate-y-1"}`}>
                  {plan.highlighted && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-white text-xs font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(124,58,237,0.6)]">Most Popular</div>
                  )}
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <div className="flex items-end gap-1 mb-6">
                    <span className="text-5xl font-bold text-white">${plan.price}</span>
                    <span className="text-gray-400 mb-1">/mo</span>
                  </div>
                  <div className="space-y-2.5 mb-6 text-sm text-gray-300">
                    {[["RAM",plan.ram],["CPU",plan.cpu],["Storage",plan.storage],["Bandwidth",plan.bandwidth]].map(([k,v]) => (
                      <div key={k} className="flex justify-between"><span className="text-gray-500">{k}</span><span className="font-semibold">{v}</span></div>
                    ))}
                  </div>
                  <ul className="space-y-2 mb-6">
                    {plan.features.map(feat => (
                      <li key={feat} className="flex items-center gap-2 text-sm text-gray-300">
                        <Check className="w-4 h-4 text-primary flex-shrink-0" />{feat}
                      </li>
                    ))}
                  </ul>
                  <button className={`w-full py-3 rounded-xl font-semibold uppercase tracking-wider text-sm transition-all active:scale-95 ${plan.highlighted ? "bg-primary text-white hover:bg-primary/90 shadow-[0_0_20px_rgba(124,58,237,0.4)]" : "border border-white/10 text-white hover:bg-white/5"}`}>
                    Get Started
                  </button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ OVERALL RATING ════════════════════════════════════ */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <Reveal variant="scale">
            <div className="p-10 rounded-3xl bg-gradient-to-br from-[#0D0D14] to-[#120d1e] border border-primary/20 shadow-[0_0_60px_rgba(124,58,237,0.1)]">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white mb-1">Overall Rating</h2>
                <p className="text-sm text-gray-400">Based on verified customer reviews</p>
              </div>
              <OverallRating />
              <div className="mt-8 grid grid-cols-3 gap-3 pt-8 border-t border-white/8">
                {[{ label:"Performance",pct:97 },{ label:"Reliability",pct:99 },{ label:"Support",pct:95 }].map(c => (
                  <div key={c.label} className="text-center">
                    <div className="relative w-16 h-16 mx-auto mb-2">
                      <svg viewBox="0 0 36 36" className="w-16 h-16 -rotate-90">
                        <circle cx="18" cy="18" r="15.5" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3"/>
                        <circle cx="18" cy="18" r="15.5" fill="none" stroke="#7c3aed" strokeWidth="3"
                          strokeDasharray={`${c.pct * 0.97} 100`} strokeLinecap="round"/>
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-white">{c.pct}%</div>
                    </div>
                    <div className="text-xs text-gray-400">{c.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ JOIN DISCORD ══════════════════════════════════════ */}
      <section id="status" className="py-20 px-6 pb-28">
        <div className="max-w-4xl mx-auto">
          <Reveal variant="scale">
            <div className="relative rounded-3xl overflow-hidden">
              <img src="https://images.unsplash.com/photo-1614729939124-032d1e6c9945?w=1200&q=80&fit=crop"
                alt="Community" className="absolute inset-0 w-full h-full object-cover opacity-20" />
              <div className="absolute inset-0 bg-gradient-to-br from-[#5865F2]/80 via-[#4752C4]/70 to-[#7c3aed]/80" />
              <div className="relative z-10 p-12 text-center">
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/20 hover:scale-110 transition-transform duration-300">
                    <DiscordIcon className="w-10 h-10 text-white" />
                  </div>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Join Our Discord Community</h2>
                <p className="text-white/80 max-w-lg mx-auto mb-8 text-base">
                  Connect with 10,000+ developers. Get support, share setups, stay updated, and win exclusive server credits every month.
                </p>
                <a href="https://discord.gg" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-white text-[#5865F2] font-bold text-base hover:bg-gray-100 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:scale-105 active:scale-95">
                  <DiscordIcon className="w-5 h-5" /> Join Discord — It's Free
                </a>
                <div className="mt-8 flex items-center justify-center gap-6 text-white/60 text-sm flex-wrap">
                  <span>🟢 4,200 Online Now</span>
                  <span className="hidden sm:block">·</span>
                  <span>💬 10k+ Members</span>
                  <span className="hidden sm:block">·</span>
                  <span>🎁 Monthly Giveaways</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

    </div>
  );
}
