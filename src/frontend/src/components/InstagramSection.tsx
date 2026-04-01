import { Instagram } from "lucide-react";

export default function InstagramSection() {
  return (
    <section style={{ background: "oklch(0.28 0.085 17)", padding: "2rem 0" }}>
      <div style={{ textAlign: "center" }}>
        <a
          href="https://www.instagram.com/kala_vritti"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-gold/40 bg-white/5 text-white/80 text-xs tracking-widest hover:bg-gold/10 hover:border-gold/70 hover:text-white transition-all duration-300"
          data-ocid="instagram.primary_button"
        >
          <Instagram size={14} />
          Follow @kala_vritti on Instagram
        </a>
      </div>
    </section>
  );
}
