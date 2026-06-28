import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  CloudLightning, ChevronDown, LogIn, UserPlus,
  Server, HardDrive, Globe, LayoutDashboard, FileText,
} from "lucide-react";

export function ClientNavbar() {
  const { pathname } = useLocation();
  const [storeOpen, setStoreOpen] = useState(false);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 h-14 border-b border-white/6"
      style={{ background: "rgba(7,7,20,0.92)", backdropFilter: "blur(18px)" }}
    >
      <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-white hover:text-violet-400 transition-colors group">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-700 flex items-center justify-center shadow-[0_0_12px_rgba(124,58,237,0.5)] group-hover:shadow-[0_0_20px_rgba(124,58,237,0.7)] transition-all">
            <CloudLightning className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-sm tracking-widest uppercase">Nexaro</span>
        </Link>

        {/* Center links */}
        <div className="hidden md:flex items-center gap-1">

          {/* Home */}
          <Link
            to="/"
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[11px] font-semibold uppercase tracking-widest transition-all ${
              pathname === "/" ? "bg-white/10 text-white" : "text-gray-400 hover:text-white hover:bg-white/6"
            }`}
          >
            <LayoutDashboard className="w-3 h-3" /> Home
          </Link>

          {/* Store dropdown */}
          <div className="relative">
            <button
              onClick={() => setStoreOpen(o => !o)}
              onBlur={() => setTimeout(() => setStoreOpen(false), 150)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[11px] font-semibold uppercase tracking-widest text-gray-400 hover:text-white hover:bg-white/6 transition-all"
            >
              <Server className="w-3 h-3" />
              Store
              <ChevronDown
                className={`w-3 h-3 transition-transform duration-200 ${storeOpen ? "rotate-180" : ""}`}
              />
            </button>

            {storeOpen && (
              <div
                className="absolute top-[calc(100%+6px)] left-1/2 -translate-x-1/2 w-52 rounded-xl border border-white/10 shadow-2xl py-2 z-50"
                style={{ background: "rgba(10,10,26,0.98)", backdropFilter: "blur(20px)" }}
              >
                <Link
                  to="/client"
                  onClick={() => setStoreOpen(false)}
                  className="flex items-center gap-2 px-4 py-2 text-[11px] font-semibold uppercase tracking-widest text-gray-400 hover:text-white hover:bg-white/6 transition-all"
                >
                  <Server className="w-3.5 h-3.5 text-violet-400" /> VPS Plans
                </Link>
                <Link
                  to="/client"
                  onClick={() => setStoreOpen(false)}
                  className="flex items-center gap-2 px-4 py-2 text-[11px] font-semibold uppercase tracking-widest text-gray-400 hover:text-white hover:bg-white/6 transition-all"
                >
                  <HardDrive className="w-3.5 h-3.5 text-violet-400" /> Dedicated Servers
                </Link>
                <Link
                  to="/client"
                  onClick={() => setStoreOpen(false)}
                  className="flex items-center gap-2 px-4 py-2 text-[11px] font-semibold uppercase tracking-widest text-gray-400 hover:text-white hover:bg-white/6 transition-all"
                >
                  <Globe className="w-3.5 h-3.5 text-violet-400" /> Global CDN
                </Link>
              </div>
            )}
          </div>

          {/* Legal Policies */}
          <Link
            to="/legal"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[11px] font-semibold uppercase tracking-widest text-gray-400 hover:text-white hover:bg-white/6 transition-all"
          >
            <FileText className="w-3 h-3" /> Legal Policies
          </Link>
        </div>

        {/* Auth actions */}
        <div className="flex items-center gap-2">
          <Link
            to="/login"
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg border border-white/12 text-gray-300 hover:text-white hover:bg-white/6 transition-all text-[11px] font-semibold uppercase tracking-widest"
          >
            <LogIn className="w-3 h-3" /> Login
          </Link>
          <Link
            to="/login"
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white shadow-[0_0_14px_rgba(124,58,237,0.45)] text-[11px] font-bold uppercase tracking-widest transition-all hover:shadow-[0_0_22px_rgba(124,58,237,0.65)] hover:scale-105"
          >
            <UserPlus className="w-3 h-3" /> Register
          </Link>
        </div>
      </div>
    </nav>
  );
}
