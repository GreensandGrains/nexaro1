import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GalaxyBackground } from "@/components/GalaxyBackground";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { TransitionProvider } from "@/context/TransitionContext";
import { GalaxyTransition } from "@/components/GalaxyTransition";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Client from "@/pages/Client";

function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[100dvh] flex flex-col">
      <GalaxyBackground />
      <Navbar />
      <main className="flex-1 pt-20">{children}</main>
      <Footer />
    </div>
  );
}

function AppInner() {
  return (
    <>
      <GalaxyTransition />
      <Routes>
        {/* Standalone auth pages */}
        <Route path="/login" element={<Login />} />

        {/* Client area */}
        <Route path="/client" element={<Client />} />

        {/* Main marketing site */}
        <Route path="/*" element={
          <HomeLayout>
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </HomeLayout>
        } />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <TransitionProvider>
        <AppInner />
      </TransitionProvider>
    </BrowserRouter>
  );
}
