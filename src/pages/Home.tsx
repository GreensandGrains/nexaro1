import {
  ArrowRight,
  Server,
  Shield,
  Zap,
  Cpu,
  HardDrive,
  Globe,
  Check,
} from "lucide-react";

const STATS = [
  { value: "10k+", label: "Active Developers" },
  { value: "99.99%", label: "Guaranteed Uptime" },
  { value: "50k+", label: "Instances Deployed" },
  { value: "100k+", label: "Support Tickets Resolved" },
];

const FEATURES = [
  {
    icon: Cpu,
    title: "Next-Gen Compute",
    desc: "Powered by the latest AMD EPYC and Intel Xeon processors for unmatched performance.",
  },
  {
    icon: HardDrive,
    title: "NVMe SSD Storage",
    desc: "Blazing fast storage with up to 100k IOPS for your most demanding applications.",
  },
  {
    icon: Globe,
    title: "Global Network",
    desc: "Deploy your applications close to your users with our ultra-low latency global edge network.",
  },
  {
    icon: Shield,
    title: "DDoS Protection",
    desc: "Enterprise-grade mitigation systems keep your infrastructure online during attacks.",
  },
  {
    icon: Server,
    title: "Instant Provisioning",
    desc: "Your instances are ready in less than 30 seconds. Stop waiting, start building.",
  },
  {
    icon: Zap,
    title: "Simple API",
    desc: "Automate your infrastructure with our beautiful, intuitive REST API.",
  },
];

const PLANS = [
  {
    name: "Starter",
    price: 9,
    ram: "2 GB",
    cpu: "1 vCPU",
    storage: "40 GB NVMe",
    bandwidth: "2 TB",
    features: ["Full root access", "1-click snapshots", "99.9% SLA"],
    highlighted: false,
    tier: "starter",
  },
  {
    name: "Pro",
    price: 29,
    ram: "8 GB",
    cpu: "4 vCPUs",
    storage: "160 GB NVMe",
    bandwidth: "8 TB",
    features: ["Everything in Starter", "DDoS Protection", "Priority Support", "99.99% SLA"],
    highlighted: true,
    tier: "pro",
  },
  {
    name: "Enterprise",
    price: 99,
    ram: "32 GB",
    cpu: "16 vCPUs",
    storage: "640 GB NVMe",
    bandwidth: "32 TB",
    features: ["Everything in Pro", "Dedicated hardware", "Custom SLA", "24/7 SLA support"],
    highlighted: false,
    tier: "enterprise",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* ─── Hero ─────────────────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-semibold uppercase tracking-widest mb-8 animate-fade-in-up">
            <Zap className="w-4 h-4" /> The AWS of the Future
          </div>

          <h1
            className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight animate-fade-in-up"
            style={{ animationDelay: "0.1s" }}
          >
            Power The{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              Cosmos
            </span>
          </h1>

          <p
            className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            Deploy high-performance infrastructure in seconds. Experience
            uncompromised speed, military-grade security, and a beautiful
            developer experience.
          </p>

          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up"
            style={{ animationDelay: "0.3s" }}
          >
            <button className="inline-flex items-center gap-2 px-8 h-14 rounded-xl bg-primary hover:bg-primary/90 text-white shadow-[0_0_30px_rgba(124,58,237,0.4)] text-lg font-semibold uppercase tracking-widest transition-all hover:shadow-[0_0_45px_rgba(124,58,237,0.6)] hover:scale-105">
              Start Deploying <ArrowRight className="w-5 h-5" />
            </button>
            <a
              href="#plans"
              className="inline-flex items-center gap-2 px-8 h-14 rounded-xl border border-white/20 text-white hover:bg-white/5 text-lg font-semibold uppercase tracking-widest transition-colors"
            >
              View Pricing
            </a>
          </div>
        </div>

        {/* Glow orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />
      </section>

      {/* ─── Stats ────────────────────────────────────────────── */}
      <section className="py-20 border-y border-white/5 bg-[#0D0D14]/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {STATS.map((s) => (
              <div key={s.label}>
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">{s.value}</div>
                <div className="text-sm text-gray-400 uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Features ─────────────────────────────────────────── */}
      <section id="about" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Engineered for Excellence
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              We've built a cloud platform that doesn't compromise. Get the
              power you need with the aesthetics you deserve.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="p-8 rounded-2xl bg-[#0D0D14]/80 border border-white/5 hover:border-primary/50 transition-colors group"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <f.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{f.title}</h3>
                <p className="text-gray-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Pricing ──────────────────────────────────────────── */}
      <section id="plans" className="py-32 bg-[#0D0D14]/40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Simple, Transparent Pricing
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              No hidden fees. No surprises. Pay only for what you use.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                className={`relative p-8 rounded-2xl border transition-all ${
                  plan.highlighted
                    ? "border-primary/60 bg-primary/5 shadow-[0_0_60px_rgba(124,58,237,0.25)] scale-105"
                    : "border-white/5 bg-[#0D0D14]/80 hover:border-primary/30"
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-white text-xs font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(124,58,237,0.6)]">
                    Most Popular
                  </div>
                )}

                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>

                <div className="flex items-end gap-1 mb-6">
                  <span className="text-5xl font-bold text-white">${plan.price}</span>
                  <span className="text-gray-400 mb-1">/mo</span>
                </div>

                <div className="space-y-3 mb-8 text-sm text-gray-300">
                  <div className="flex justify-between">
                    <span className="text-gray-500">RAM</span>
                    <span className="font-semibold">{plan.ram}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">CPU</span>
                    <span className="font-semibold">{plan.cpu}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Storage</span>
                    <span className="font-semibold">{plan.storage}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Bandwidth</span>
                    <span className="font-semibold">{plan.bandwidth}</span>
                  </div>
                </div>

                <ul className="space-y-2 mb-8">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-center gap-2 text-sm text-gray-300">
                      <Check className="w-4 h-4 text-primary flex-shrink-0" />
                      {feat}
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-3 rounded-xl font-semibold uppercase tracking-wider text-sm transition-all ${
                    plan.highlighted
                      ? "bg-primary text-white hover:bg-primary/90 shadow-[0_0_20px_rgba(124,58,237,0.4)] hover:shadow-[0_0_30px_rgba(124,58,237,0.6)]"
                      : "border border-white/10 text-white hover:bg-white/5"
                  }`}
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────────────────── */}
      <section id="status" className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
            Ready to explore?
          </h2>
          <p className="text-xl text-gray-300 mb-10">
            Join thousands of developers building the future on Nexaro Cloud.
          </p>
          <button className="inline-flex items-center gap-3 px-10 h-16 rounded-xl bg-white text-black hover:bg-gray-200 text-lg font-bold uppercase tracking-widest transition-colors shadow-[0_0_40px_rgba(255,255,255,0.15)]">
            Create Free Account <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>
    </div>
  );
}
