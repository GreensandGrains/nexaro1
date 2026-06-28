import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { CloudLightning, Eye, EyeOff, AlertCircle, CheckCircle2, User, Mail, Lock, ArrowRight } from "lucide-react";

/* ── Discord SVG ─────────────────────────────────────────── */
function DiscordSVG({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 71 55" fill="currentColor">
      <path d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.401329 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385858 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.653 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6018 45.5576C70.6551 45.5182 70.6887 45.461 70.6943 45.3962C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978ZM23.7259 37.3253C20.2276 37.3253 17.3451 34.1136 17.3451 30.1693C17.3451 26.225 20.1717 23.0133 23.7259 23.0133C27.308 23.0133 30.1626 26.2532 30.1066 30.1693C30.1066 34.1136 27.28 37.3253 23.7259 37.3253ZM47.3178 37.3253C43.8196 37.3253 40.9371 34.1136 40.9371 30.1693C40.9371 26.225 43.7636 23.0133 47.3178 23.0133C50.9 23.0133 53.7545 26.2532 53.6986 30.1693C53.6986 34.1136 50.9 37.3253 47.3178 37.3253Z"/>
    </svg>
  );
}

/* ── Password strength ───────────────────────────────────── */
function PasswordStrength({ password }: { password: string }) {
  const checks = [
    { label: "8+ characters", ok: password.length >= 8 },
    { label: "Uppercase letter", ok: /[A-Z]/.test(password) },
    { label: "Number", ok: /\d/.test(password) },
    { label: "Special character", ok: /[^a-zA-Z0-9]/.test(password) },
  ];
  const score = checks.filter(c => c.ok).length;
  const colors = ["bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-emerald-500"];
  const labels = ["Weak", "Fair", "Good", "Strong"];

  if (!password) return null;
  return (
    <div className="mt-2 space-y-2">
      <div className="flex gap-1">
        {[0, 1, 2, 3].map(i => (
          <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-300 ${i < score ? colors[score - 1] : "bg-white/10"}`} />
        ))}
      </div>
      <div className="flex items-center justify-between">
        <span className="text-[10px] text-gray-500">Password strength</span>
        <span className={`text-[10px] font-semibold ${score <= 1 ? "text-red-400" : score === 2 ? "text-orange-400" : score === 3 ? "text-yellow-400" : "text-emerald-400"}`}>
          {password ? labels[score - 1] || "Weak" : ""}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-1">
        {checks.map(c => (
          <div key={c.label} className="flex items-center gap-1.5 text-[10px]">
            <CheckCircle2 className={`w-3 h-3 flex-shrink-0 transition-colors ${c.ok ? "text-emerald-400" : "text-gray-600"}`} />
            <span className={c.ok ? "text-gray-400" : "text-gray-600"}>{c.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Left branding panel ─────────────────────────────────── */
function LeftPanel({ isRegister }: { isRegister: boolean }) {
  const HERO_IMG = "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&q=80&fit=crop";
  return (
    <div className="hidden lg:flex flex-col w-[52%] relative overflow-hidden">
      <img src={HERO_IMG} alt="" className="absolute inset-0 w-full h-full object-cover opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#050507]/92 via-[#0a0520]/75 to-[#050507]/85" />
      <div className="absolute top-1/3 left-1/3 w-80 h-80 rounded-full bg-primary/12 blur-[90px]" />
      <div className="absolute bottom-1/4 right-1/4 w-56 h-56 rounded-full bg-accent/8 blur-[70px]" />

      <div className="relative z-10 flex flex-col h-full px-14 py-14">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 text-white w-fit group">
          <CloudLightning className="w-7 h-7 text-primary group-hover:text-accent transition-colors" />
          <span className="font-bold text-lg tracking-widest uppercase">Nexaro Cloud</span>
        </Link>

        <div className="flex-1 flex flex-col justify-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/25 text-primary text-xs font-semibold uppercase tracking-widest mb-6 w-fit">
            <svg viewBox="0 0 24 24" className="w-3 h-3" fill="currentColor"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
            {isRegister ? "Join thousands of developers" : "Cloud Infrastructure"}
          </div>

          <h1 className="text-4xl font-bold text-white leading-tight mb-4">
            {isRegister ? <>Start for free.<br />Scale when ready.</> : <>The fastest way<br />to host anything.</>}
          </h1>
          <p className="text-gray-400 text-sm leading-relaxed max-w-sm mb-10">
            {isRegister
              ? "Deploy your first server in under 30 seconds. No credit card required to get started."
              : "Military-grade security, global network, 99.99% uptime. Your infrastructure is in safe hands with Nexaro."}
          </p>

          {/* Trust bullets */}
          <div className="flex flex-col gap-3">
            {(isRegister ? [
              { icon: "🚀", text: "No credit card required" },
              { icon: "⚡", text: "Live in under 30 seconds" },
              { icon: "🌍", text: "12 global data centers" },
              { icon: "🛡️", text: "DDoS protection on every plan" },
            ] : [
              { icon: "🚀", text: "10,000+ developers trust Nexaro" },
              { icon: "⚡", text: "Deploy in under 30 seconds" },
              { icon: "🛡️", text: "DDoS protection, always on" },
              { icon: "🌍", text: "12 global data center locations" },
            ]).map(({ icon, text }) => (
              <div key={text} className="flex items-center gap-3 text-sm text-gray-300">
                <span className="text-base">{icon}</span> {text}
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs text-gray-600">© 2025 Nexaro Cloud. All rights reserved.</p>
      </div>
    </div>
  );
}

/* ── Login form ──────────────────────────────────────────── */
function LoginForm({ onSwitch }: { onSwitch: () => void }) {
  const [email, setEmail]   = useState("");
  const [password, setPw]   = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError]   = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) { setError("Please fill in all fields."); return; }
    if (password.length < 6) { setError("Password must be at least 6 characters."); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); setError("Invalid email or password."); }, 1200);
  };

  return (
    <>
      <div className="text-center mb-7">
        <h2 className="text-2xl font-bold text-white mb-1">Welcome back</h2>
        <p className="text-gray-400 text-sm">Sign in to your control panel</p>
      </div>

      <button type="button"
        className="w-full mb-5 flex items-center justify-center gap-2.5 border border-[#5865F2]/40 bg-[#5865F2]/8 hover:bg-[#5865F2]/18 text-white/90 h-11 rounded-xl transition-all text-sm font-medium hover:border-[#5865F2]/60">
        <DiscordSVG className="w-5 h-5 text-[#7289da]" />
        Continue with Discord
      </button>

      <div className="relative mb-5">
        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/8"/></div>
        <div className="relative flex justify-center text-xs">
          <span className="px-3 bg-[#0D0D14] text-gray-500 uppercase tracking-widest">or email</span>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/8 border border-red-500/25 text-red-400 text-sm mb-4">
          <AlertCircle className="w-4 h-4 shrink-0"/> {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">Email</label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600"/>
            <input type="email" placeholder="pilot@nexaro.cloud" value={email}
              onChange={e => setEmail(e.target.value)} required
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/25 border border-white/8 text-white placeholder:text-gray-600 text-sm focus:outline-none focus:border-primary/50 transition-colors"/>
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest">Password</label>
            <a href="#" className="text-[10px] text-primary hover:text-accent transition-colors">Forgot password?</a>
          </div>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600"/>
            <input type={showPw ? "text" : "password"} placeholder="••••••••" value={password}
              onChange={e => setPw(e.target.value)} required autoComplete="current-password"
              className="w-full pl-10 pr-11 py-2.5 rounded-xl bg-black/25 border border-white/8 text-white placeholder:text-gray-600 text-sm focus:outline-none focus:border-primary/50 transition-colors"/>
            <button type="button" onClick={() => setShowPw(v => !v)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-300 transition-colors">
              {showPw ? <EyeOff className="w-4 h-4"/> : <Eye className="w-4 h-4"/>}
            </button>
          </div>
        </div>

        <label className="flex items-center gap-2.5 cursor-pointer">
          <input type="checkbox" className="w-4 h-4 rounded border-white/20 bg-white/5 accent-primary"/>
          <span className="text-sm text-gray-400">Remember me for 30 days</span>
        </label>

        <button type="submit" disabled={loading}
          className="w-full h-11 rounded-xl bg-primary hover:bg-primary/85 text-white font-bold text-sm uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(124,58,237,0.4)] hover:shadow-[0_0_32px_rgba(124,58,237,0.6)] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-1">
          {loading ? <span className="w-5 h-5 border-2 border-white/25 border-t-white rounded-full animate-spin"/> : <>Sign In <ArrowRight className="w-4 h-4"/></>}
        </button>
      </form>

      <p className="text-center text-sm text-gray-500 mt-6">
        No account yet?{" "}
        <button onClick={onSwitch} className="text-primary hover:text-accent transition-colors font-semibold">Create one free</button>
      </p>
    </>
  );
}

/* ── Register form ───────────────────────────────────────── */
function RegisterForm({ onSwitch }: { onSwitch: () => void }) {
  const [name, setName]         = useState("");
  const [email, setEmail]       = useState("");
  const [password, setPw]       = useState("");
  const [confirm, setConfirm]   = useState("");
  const [showPw, setShowPw]     = useState(false);
  const [showCf, setShowCf]     = useState(false);
  const [error, setError]       = useState("");
  const [success, setSuccess]   = useState(false);
  const [loading, setLoading]   = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!name || !email || !password || !confirm) { setError("Please fill in all fields."); return; }
    if (password.length < 8) { setError("Password must be at least 8 characters."); return; }
    if (password !== confirm) { setError("Passwords do not match."); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); setSuccess(true); }, 1400);
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center">
        <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mb-5">
          <CheckCircle2 className="w-8 h-8 text-emerald-400"/>
        </div>
        <h2 className="text-xl font-bold text-white mb-2">Account Created!</h2>
        <p className="text-gray-400 text-sm mb-6">Check your email for a confirmation link.</p>
        <button onClick={onSwitch} className="px-6 py-2.5 rounded-xl bg-primary text-white text-sm font-bold uppercase tracking-widest hover:bg-primary/90 transition-all">
          Back to Login
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-1">Create account</h2>
        <p className="text-gray-400 text-sm">Join 10,000+ developers on Nexaro Cloud</p>
      </div>

      <button type="button"
        className="w-full mb-5 flex items-center justify-center gap-2.5 border border-[#5865F2]/40 bg-[#5865F2]/8 hover:bg-[#5865F2]/18 text-white/90 h-11 rounded-xl transition-all text-sm font-medium hover:border-[#5865F2]/60">
        <DiscordSVG className="w-5 h-5 text-[#7289da]" />
        Register with Discord
      </button>

      <div className="relative mb-5">
        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/8"/></div>
        <div className="relative flex justify-center text-xs">
          <span className="px-3 bg-[#0D0D14] text-gray-500 uppercase tracking-widest">or email</span>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/8 border border-red-500/25 text-red-400 text-sm mb-4">
          <AlertCircle className="w-4 h-4 shrink-0"/> {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3.5">
        <div>
          <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">Full Name</label>
          <div className="relative">
            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600"/>
            <input type="text" placeholder="Jane Doe" value={name}
              onChange={e => setName(e.target.value)} required
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/25 border border-white/8 text-white placeholder:text-gray-600 text-sm focus:outline-none focus:border-primary/50 transition-colors"/>
          </div>
        </div>
        <div>
          <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">Email</label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600"/>
            <input type="email" placeholder="pilot@nexaro.cloud" value={email}
              onChange={e => setEmail(e.target.value)} required
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/25 border border-white/8 text-white placeholder:text-gray-600 text-sm focus:outline-none focus:border-primary/50 transition-colors"/>
          </div>
        </div>
        <div>
          <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">Password</label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600"/>
            <input type={showPw ? "text" : "password"} placeholder="Min. 8 characters" value={password}
              onChange={e => setPw(e.target.value)} required autoComplete="new-password"
              className="w-full pl-10 pr-11 py-2.5 rounded-xl bg-black/25 border border-white/8 text-white placeholder:text-gray-600 text-sm focus:outline-none focus:border-primary/50 transition-colors"/>
            <button type="button" onClick={() => setShowPw(v => !v)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-300 transition-colors">
              {showPw ? <EyeOff className="w-4 h-4"/> : <Eye className="w-4 h-4"/>}
            </button>
          </div>
          <PasswordStrength password={password}/>
        </div>
        <div>
          <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">Confirm Password</label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600"/>
            <input type={showCf ? "text" : "password"} placeholder="Repeat password" value={confirm}
              onChange={e => setConfirm(e.target.value)} required autoComplete="new-password"
              className={`w-full pl-10 pr-11 py-2.5 rounded-xl bg-black/25 border text-white placeholder:text-gray-600 text-sm focus:outline-none transition-colors ${confirm && confirm !== password ? "border-red-500/50" : "border-white/8 focus:border-primary/50"}`}/>
            <button type="button" onClick={() => setShowCf(v => !v)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-300 transition-colors">
              {showCf ? <EyeOff className="w-4 h-4"/> : <Eye className="w-4 h-4"/>}
            </button>
          </div>
          {confirm && confirm !== password && (
            <p className="text-[10px] text-red-400 mt-1">Passwords do not match</p>
          )}
        </div>

        <label className="flex items-start gap-2.5 cursor-pointer pt-1">
          <input type="checkbox" required className="w-4 h-4 rounded mt-0.5 border-white/20 bg-white/5 accent-primary flex-shrink-0"/>
          <span className="text-xs text-gray-400 leading-relaxed">
            I agree to the <a href="#" className="text-primary hover:text-accent">Terms of Service</a> and <a href="#" className="text-primary hover:text-accent">Privacy Policy</a>
          </span>
        </label>

        <button type="submit" disabled={loading}
          className="w-full h-11 rounded-xl bg-primary hover:bg-primary/85 text-white font-bold text-sm uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(124,58,237,0.4)] hover:shadow-[0_0_32px_rgba(124,58,237,0.6)] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2">
          {loading ? <span className="w-5 h-5 border-2 border-white/25 border-t-white rounded-full animate-spin"/> : <>Create Account <ArrowRight className="w-4 h-4"/></>}
        </button>
      </form>

      <p className="text-center text-sm text-gray-500 mt-5">
        Already have an account?{" "}
        <button onClick={onSwitch} className="text-primary hover:text-accent transition-colors font-semibold">Sign in</button>
      </p>
    </>
  );
}

/* ═══════════════ Login Page ══════════════════════════════ */
export default function Login() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isRegister, setIsRegister] = useState(searchParams.get("tab") === "register");

  useEffect(() => {
    setIsRegister(searchParams.get("tab") === "register");
  }, [searchParams]);

  const switchToRegister = () => { setIsRegister(true);  setSearchParams({ tab: "register" }); };
  const switchToLogin    = () => { setIsRegister(false); setSearchParams({}); };

  return (
    <div className="relative min-h-screen w-full flex overflow-hidden" style={{ background: "#050507" }}>
      {/* Left branding panel */}
      <LeftPanel isRegister={isRegister} />

      {/* Right form panel */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-10 relative">
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/4 blur-[120px] pointer-events-none"/>

        {/* Mobile logo */}
        <Link to="/" className="flex lg:hidden items-center gap-2 text-white mb-10 hover:text-primary transition-colors">
          <CloudLightning className="w-6 h-6 text-primary"/>
          <span className="font-bold text-base tracking-widest uppercase">Nexaro Cloud</span>
        </Link>

        <div className="relative z-10 w-full max-w-sm">
          {/* Tab switcher */}
          <div className="flex bg-white/5 rounded-xl p-1 mb-7 border border-white/8">
            <button
              onClick={switchToLogin}
              className={`flex-1 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${!isRegister ? "bg-primary text-white shadow-[0_0_16px_rgba(124,58,237,0.4)]" : "text-gray-500 hover:text-gray-300"}`}>
              Login
            </button>
            <button
              onClick={switchToRegister}
              className={`flex-1 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${isRegister ? "bg-primary text-white shadow-[0_0_16px_rgba(124,58,237,0.4)]" : "text-gray-500 hover:text-gray-300"}`}>
              Register
            </button>
          </div>

          {/* Form card */}
          <div className="rounded-2xl bg-[#0D0D14]/85 backdrop-blur-xl border border-primary/15 shadow-[0_0_60px_rgba(124,58,237,0.12)] p-7">
            {isRegister
              ? <RegisterForm onSwitch={switchToLogin}/>
              : <LoginForm    onSwitch={switchToRegister}/>}
          </div>

          {/* Trust row */}
          <div className="flex items-center justify-center gap-5 flex-wrap pt-5">
            {[{ icon:"🔒", text:"SSL encrypted" },{ icon:"🛡️", text:"DDoS protected" },{ icon:"⚡", text:"99.99% uptime" }].map(t => (
              <div key={t.text} className="flex items-center gap-1.5 text-xs text-gray-600">
                <span>{t.icon}</span> {t.text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
