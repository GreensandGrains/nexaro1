import { CloudLightning } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#0D0D14] border-t border-primary/20 pt-16 pb-8 text-gray-400">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <a href="#" className="flex items-center gap-2 text-white">
              <CloudLightning className="w-6 h-6 text-primary" />
              <span className="font-bold text-lg tracking-wider">NEXARO CLOUD</span>
            </a>
            <p className="text-sm leading-relaxed">
              Premium cloud hosting for developers who demand performance and style.
              Powering the next generation of the web.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Products</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#plans" className="hover:text-primary transition-colors">Compute Instances</a></li>
              <li><a href="#plans" className="hover:text-primary transition-colors">Managed Databases</a></li>
              <li><a href="#plans" className="hover:text-primary transition-colors">Object Storage</a></li>
              <li><a href="#plans" className="hover:text-primary transition-colors">Load Balancers</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">API Reference</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">System Status</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Security Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Cookie Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">SLA</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between text-sm">
          <p>&copy; {new Date().getFullYear()} Nexaro Cloud. All rights reserved.</p>
          <div className="flex items-center gap-2 mt-4 md:mt-0">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
            </span>
            <span>All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
