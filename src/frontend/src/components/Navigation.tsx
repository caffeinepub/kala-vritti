import { Music, VolumeX } from "lucide-react";
import { useEffect, useState } from "react";

interface NavigationProps {
  audioEnabled: boolean;
  onAudioToggle: () => void;
}

export default function Navigation({
  audioEnabled,
  onAudioToggle,
}: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  const navLinks = [
    { label: "HOME", id: "hero" },
    { label: "ABOUT", id: "about" },
    { label: "PORTFOLIO", id: "portfolio" },
    { label: "JOURNEY", id: "journey" },
    { label: "CONTACT", id: "contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "py-3 backdrop-blur-md bg-ivory/85 border-b border-border shadow-warm"
          : "py-5 bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <button
          type="button"
          onClick={() => scrollTo("hero")}
          className="font-serif text-xl tracking-[0.2em] text-maroon font-bold uppercase"
          data-ocid="nav.link"
        >
          Kala Vritti
        </button>

        <div
          className={`hidden md:flex items-center gap-1 px-3 py-2 rounded-full border transition-all duration-300 ${
            scrolled
              ? "bg-cream/80 border-border shadow-xs"
              : "bg-white/15 border-white/25 backdrop-blur-sm"
          }`}
        >
          {navLinks.map((link) => (
            <button
              type="button"
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className={`px-4 py-1.5 text-xs font-medium tracking-widest rounded-full transition-all duration-200 ${
                scrolled
                  ? "text-foreground hover:bg-maroon/10 hover:text-maroon"
                  : "text-white/90 hover:bg-white/20"
              }`}
              data-ocid="nav.link"
            >
              {link.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onAudioToggle}
            className={`p-2 rounded-full border transition-all duration-200 ${
              scrolled
                ? "border-border text-maroon hover:bg-maroon/10"
                : "border-white/30 text-white/80 hover:bg-white/20"
            }`}
            aria-label={audioEnabled ? "Mute music" : "Play music"}
            data-ocid="nav.toggle"
          >
            {audioEnabled ? <Music size={16} /> : <VolumeX size={16} />}
          </button>

          <button
            type="button"
            onClick={() => scrollTo("contact")}
            className="hidden md:block px-5 py-2 text-xs font-medium tracking-widest rounded-full bg-maroon text-primary-foreground hover:bg-maroon-dark transition-all duration-200 shadow-warm"
            data-ocid="nav.primary_button"
          >
            BOOK NOW
          </button>

          <button
            type="button"
            className={`md:hidden p-2 ${
              scrolled ? "text-maroon" : "text-white"
            }`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-5 flex flex-col gap-1">
              <span
                className={`block h-0.5 bg-current transition-all ${mobileOpen ? "rotate-45 translate-y-1.5" : ""}`}
              />
              <span
                className={`block h-0.5 bg-current transition-all ${mobileOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`block h-0.5 bg-current transition-all ${mobileOpen ? "-rotate-45 -translate-y-1.5" : ""}`}
              />
            </div>
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="md:hidden bg-ivory/95 backdrop-blur-md border-t border-border px-6 py-4 flex flex-col gap-2">
          {navLinks.map((link) => (
            <button
              type="button"
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="text-left py-2 text-sm tracking-widest text-maroon font-medium uppercase"
              data-ocid="nav.link"
            >
              {link.label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => scrollTo("contact")}
            className="mt-2 w-full py-3 text-xs font-medium tracking-widest rounded-full bg-maroon text-primary-foreground"
            data-ocid="nav.primary_button"
          >
            BOOK NOW
          </button>
        </div>
      )}
    </header>
  );
}
