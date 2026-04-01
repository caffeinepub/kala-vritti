import { motion } from "motion/react";
import { SiInstagram } from "react-icons/si";

const currentYear = new Date().getFullYear();

const navLinks = [
  { label: "Home", id: "hero" },
  { label: "About", id: "about" },
  { label: "Portfolio", id: "portfolio" },
  { label: "Journey", id: "journey" },
  { label: "Contact", id: "contact" },
];

export default function Footer() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.footer
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="py-16 px-6"
      style={{ background: "oklch(0.20 0.070 17)" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          <div>
            <p className="font-serif text-2xl font-bold text-white tracking-[0.15em] uppercase mb-3">
              Kala Vritti
            </p>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              Wedding Dance & Performing Arts Collective. Crafting moments that
              stay forever.
            </p>
            <div className="mt-5 flex items-center gap-1">
              <div className="w-8 h-px bg-gold/50" />
              <p className="text-gold/70 text-xs tracking-[0.2em] uppercase px-3">
                Est. 2017
              </p>
              <div className="w-8 h-px bg-gold/50" />
            </div>
          </div>

          <div>
            <p className="text-xs tracking-[0.25em] text-gold uppercase mb-5">
              Navigate
            </p>
            <ul className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <motion.button
                    type="button"
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => scrollTo(link.id)}
                    className="text-white/60 hover:text-gold text-sm transition-colors duration-200"
                    data-ocid="nav.link"
                  >
                    {link.label}
                  </motion.button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs tracking-[0.25em] text-gold uppercase mb-5">
              Follow Us
            </p>
            <a
              href="https://www.instagram.com/kala_vritti"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-white/70 hover:text-gold transition-colors duration-200 mb-6"
              data-ocid="nav.link"
            >
              <SiInstagram size={18} />
              <span className="text-sm">@kala_vritti</span>
            </a>
            <div>
              <button
                type="button"
                onClick={() => scrollTo("contact")}
                className="px-6 py-3 rounded-full border border-gold/50 text-gold text-xs font-medium tracking-widest hover:bg-gold/10 transition-all duration-300"
                data-ocid="nav.primary_button"
              >
                BOOK YOUR EVENT
              </button>
            </div>
          </div>
        </div>

        <div className="w-full h-px bg-white/10 mb-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <p>© {currentYear} Kala Vritti. All rights reserved.</p>
        </div>
      </div>
    </motion.footer>
  );
}
