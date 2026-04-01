import { motion, useInView } from "motion/react";
import { useRef } from "react";

const reels = [
  { id: "DJMb-0rCQVa", handle: "@kala_vritti", label: "Wedding Sangeet" },
  { id: "DRlxdB2AmyV", handle: "@khushixchirag", label: "Couple Performance" },
  { id: "DI6ZAr4IowV", handle: "@kala_vritti", label: "Group Choreography" },
  { id: "DWjzve9kuhr", handle: "@ishqkireet", label: "Bridal Dance" },
  { id: "DUYZ62wDVjA", handle: "@kala_vritti", label: "Stage Show" },
  {
    id: "DUpd5tZAdZzuFB_DaOAifc2kYIoOUUmiVaoyZk0",
    handle: "@anushribagadia",
    label: "Special Performance",
  },
];

export default function PortfolioSection() {
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-100px" });

  return (
    <section id="portfolio" className="py-24 md:py-32 bg-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={titleRef} className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-xs tracking-[0.3em] text-gold uppercase mb-4"
          >
            Our Work
          </motion.p>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={titleInView ? { clipPath: "inset(0 0% 0 0)" } : {}}
              transition={{
                duration: 0.9,
                delay: 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="font-serif text-4xl md:text-5xl font-bold text-maroon"
            >
              Portfolio
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-muted-foreground mt-4 max-w-md mx-auto text-sm"
          >
            Each reel tells a story — explore our performances across India's
            most memorable celebrations.
          </motion.p>
        </div>

        <div
          className="overflow-x-auto pb-6"
          style={{ scrollbarWidth: "none" }}
        >
          <div className="flex gap-6 min-w-max px-2 py-2">
            {reels.map((reel, i) => (
              <motion.div
                key={reel.id}
                initial={{ opacity: 0, y: 60, scale: 0.92 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                whileHover={{ borderColor: "oklch(0.79 0.072 65 / 0.6)" }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.55,
                  delay: i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex-shrink-0 flex flex-col items-center"
                data-ocid={`portfolio.item.${i + 1}`}
              >
                <div
                  className="rounded-2xl overflow-hidden border border-transparent transition-all duration-300"
                  style={{
                    width: 300,
                    height: 540,
                    background: "oklch(0.14 0.04 20)",
                    boxShadow:
                      "0 8px 40px rgba(26,8,10,0.15), 0 2px 12px rgba(180,130,60,0.08)",
                  }}
                >
                  <iframe
                    src={`https://www.instagram.com/reel/${reel.id}/embed/`}
                    width="300"
                    height="540"
                    frameBorder="0"
                    scrolling="no"
                    allowTransparency={true}
                    allowFullScreen={true}
                    style={{
                      border: "none",
                      overflow: "hidden",
                      display: "block",
                    }}
                    title={reel.label}
                  />
                </div>
                <div className="mt-3 text-center">
                  <p className="font-medium text-sm text-maroon">
                    {reel.label}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5 tracking-wide">
                    {reel.handle}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-10"
        >
          <a
            href="https://www.instagram.com/kala_vritti"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-maroon text-maroon text-sm font-medium tracking-widest hover:bg-maroon hover:text-primary-foreground transition-all duration-300"
            data-ocid="portfolio.primary_button"
          >
            VIEW ALL ON INSTAGRAM
          </a>
        </motion.div>
      </div>
    </section>
  );
}
