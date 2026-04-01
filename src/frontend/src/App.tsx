import { Toaster } from "@/components/ui/sonner";
import { useState } from "react";
import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import InstagramSection from "./components/InstagramSection";
import JourneySection from "./components/JourneySection";
import Navigation from "./components/Navigation";
import PortfolioSection from "./components/PortfolioSection";

export default function App() {
  const [audioEnabled, setAudioEnabled] = useState(false);

  return (
    <>
      <Navigation
        audioEnabled={audioEnabled}
        onAudioToggle={() => setAudioEnabled((v) => !v)}
      />
      <main>
        <HeroSection />
        <AboutSection />
        <PortfolioSection />
        <JourneySection />
        <InstagramSection />
        <ContactSection />
      </main>
      <Footer />
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "oklch(0.94 0.025 78)",
            border: "1px solid oklch(0.77 0.038 68)",
            color: "oklch(0.20 0.030 25)",
          },
        }}
      />
    </>
  );
}
