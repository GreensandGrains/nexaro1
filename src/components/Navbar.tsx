import { CloudLightning, Ticket, Zap } from "lucide-react";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 backdrop-blur-md bg-[#050507]/60 border-b border-primary/20">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 text-white hover:text-primary transition-colors">
          <CloudLightning className="w-8 h-8 text-primary animate-pulse" />
          <span className="font-bold text-xl tracking-wider">NEXARO</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          <a href="#plans" className="text-sm font-medium text-gray-300 hover:text-white transition-colors uppercase tracking-widest">Plans</a>
          <a href="#about" className="text-sm font-medium text-gray-300 hover:text-white transition-colors uppercase tracking-widest">About</a>
          <a href="#status" className="text-sm font-medium text-gray-300 hover:text-white transition-colors uppercase tracking-widest">Status</a>
        </div>

        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-primary/50 text-primary hover:bg-primary/10 hover:text-white transition-colors uppercase tracking-wider text-xs font-semibold">
            <Ticket className="w-4 h-4" />
            Open Ticket
          </button>
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary hover:bg-primary/80 text-white shadow-[0_0_15px_rgba(124,58,237,0.5)] uppercase tracking-wider text-xs font-semibold border border-primary/50 transition-colors">
            <Zap className="w-4 h-4" />
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
}
