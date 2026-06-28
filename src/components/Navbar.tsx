import { useState, useRef, useEffect } from "react";
import {
  CloudLightning, ChevronDown, Server, HardDrive, Database,
  Globe, Gamepad2, Cpu, Zap, BookOpen, FileCode, Activity,
  HeadphonesIcon, LogIn, UserPlus, LayoutDashboard,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useTransitionNavigate } from "@/context/TransitionContext";

/* ── Generic dropdown used for nav tabs ────────────────────── */
function NavDropdown({
  label,
  items,
}: {
  label: string;
  items: { icon: React.ElementType; label: string; desc: string; href: string }[];
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(v => !v)}
        className={`flex items-center gap-1 px-4 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-widest transition-all ${open ? "bg-white/10 text-white" : "text-gray-400 hover:text-white hover:bg-white/8"}`}
      >
        {label}
        <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-52 rounded-2xl bg-[#0D0D14]/98 border border-white/10 backdrop-blur-xl shadow-[0_8px_40px_rgba(0,0,0,0.7)] overflow-hidden z-50">
          {items.map(({ icon: Icon, label, desc, href }) => (
            <a key={label} href={href} onClick={() => setOpen(false)}
              className="flex items-start gap-3 px-4 py-3 hover:bg-white/6 transition-colors group">
              <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-primary/20 transition-colors">
                <Icon className="w-3.5 h-3.5 text-primary" />
              </div>
              <div>
                <div className="text-xs font-semibold text-white">{label}</div>
                <div className="text-[10px] text-gray-500 mt-0.5">{desc}</div>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Panels dropdown (right side, translucent) ─────────────── */
function PanelsDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { navigate: transitionTo } = useTransitionNavigate();

  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const panelItems = [
    { icon: LayoutDashboard, label: "Client Panel", desc: "Manage your servers",     to: "/client" },
    { icon: LogIn,           label: "Login",        desc: "Sign in to your account", to: "/login"  },
    { icon: UserPlus,        label: "Register",     desc: "Create a new account",    to: "/login"  },
  ];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(v => !v)}
        className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full border text-[11px] font-semibold uppercase tracking-widest transition-all backdrop-blur-sm ${
          open
            ? "bg-white/12 border-white/25 text-white"
            : "bg-white/6 border-white/12 text-gray-300 hover:bg-white/10 hover:border-white/22 hover:text-white"
        }`}
      >
        Panels
        <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute top-full right-0 mt-2 w-52 rounded-2xl bg-[#0D0D14]/98 border border-white/10 backdrop-blur-xl shadow-[0_8px_40px_rgba(0,0,0,0.7)] overflow-hidden z-50">
          <div className="px-4 pt-3 pb-2 border-b border-white/6">
            <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Account</p>
          </div>
          {panelItems.map(({ icon: Icon, label, desc, to }) => (
            <button key={label} onClick={() => { setOpen(false); transitionTo(to); }}
              className="w-full flex items-start gap-3 px-4 py-3 hover:bg-white/6 transition-colors group text-left">
              <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-primary/20 transition-colors">
                <Icon className="w-3.5 h-3.5 text-primary" />
              </div>
              <div>
                <div className="text-xs font-semibold text-white">{label}</div>
                <div className="text-[10px] text-gray-500 mt-0.5">{desc}</div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Main Navbar ───────────────────────────────────────────── */
export function Navbar() {
  const location = useLocation();
  const { navigate: transitionTo } = useTransitionNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-3 border-b border-white/5"
      style={{ background: "rgba(5,5,7,0.72)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" }}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-white hover:text-primary transition-colors">
          <CloudLightning className="w-6 h-6 text-primary" />
          <span className="font-bold text-base tracking-widest uppercase">Nexaro</span>
        </Link>

        {/* Center pill tabs */}
        <div className="hidden md:flex items-center gap-0.5 px-2 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl">
          <Link to="/"
            className={`px-4 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-widest transition-all ${location.pathname === "/" ? "bg-white/12 text-white" : "text-gray-400 hover:text-white hover:bg-white/8"}`}>
            Home
          </Link>
          <NavDropdown label="Services" items={[
            { icon: Server,    label: "VPS Hosting",  desc: "Scalable virtual servers",     href: "#" },
            { icon: HardDrive, label: "Bare Metal",    desc: "Dedicated physical hardware",  href: "#" },
            { icon: Database,  label: "Managed DB",    desc: "PostgreSQL, MySQL & more",     href: "#" },
            { icon: Globe,     label: "Cloud Storage", desc: "S3-compatible object storage", href: "#" },
          ]} />
          <NavDropdown label="Games" items={[
            { icon: Gamepad2, label: "Game Servers", desc: "Low-latency game hosting",  href: "#" },
            { icon: Cpu,      label: "Minecraft",    desc: "Java & Bedrock editions",   href: "#" },
            { icon: Zap,      label: "Valheim",      desc: "Viking survival worlds",    href: "#" },
            { icon: Server,   label: "ARK / Rust",   desc: "Survival & shooter games",  href: "#" },
          ]} />
          <NavDropdown label="Resources" items={[
            { icon: BookOpen, label: "Documentation", desc: "Guides & tutorials",   href: "#" },
            { icon: FileCode, label: "API Reference",  desc: "REST & CLI docs",      href: "#" },
            { icon: Activity, label: "Status Page",    desc: "Live uptime monitor",  href: "#" },
          ]} />
          <a href="#support"
            className="px-4 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-widest text-gray-400 hover:text-white hover:bg-white/8 transition-all flex items-center gap-1.5">
            <HeadphonesIcon className="w-3 h-3" /> Support
          </a>
        </div>

        {/* Right side — Panels dropdown + Client button */}
        <div className="flex items-center gap-2">
          <PanelsDropdown />
          <button onClick={() => transitionTo("/client")}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary hover:bg-primary/90 text-white shadow-[0_0_14px_rgba(124,58,237,0.5)] text-[11px] font-bold uppercase tracking-widest transition-all hover:shadow-[0_0_26px_rgba(124,58,237,0.7)] hover:scale-105">
            Client
          </button>
        </div>

      </div>
    </nav>
  );
}
