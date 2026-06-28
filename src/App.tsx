import { GalaxyBackground } from "@/components/GalaxyBackground";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Home from "@/pages/Home";

export default function App() {
  return (
    <div className="min-h-[100dvh] flex flex-col">
      <GalaxyBackground />
      <Navbar />
      <main className="flex-1 pt-20">
        <Home />
      </main>
      <Footer />
    </div>
  );
}
