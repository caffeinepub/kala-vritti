import { MapPin, X } from "lucide-react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

const cities = [
  {
    id: "udaipur",
    name: "Udaipur",
    state: "Rajasthan",
    style: "Palace Aesthetic",
    events: 14,
    highlight:
      "The City of Lakes set the stage for some of our most breathtaking performances. We choreographed grand Sangeet ceremonies at Udaipur's heritage palace venues, where every step resonated with royal elegance.",
    speciality: "Heritage Palace Weddings",
  },
  {
    id: "mumbai",
    name: "Mumbai",
    state: "Maharashtra",
    style: "Modern Skyline",
    events: 32,
    highlight:
      "Mumbai — the city of dreams — has been our creative playground. From luxury banquet halls to intimate rooftop soirées, we've brought contemporary storytelling to some of India's most spectacular weddings.",
    speciality: "Luxury Banquet & Rooftop Weddings",
  },
  {
    id: "delhi",
    name: "Delhi",
    state: "NCR",
    style: "Heritage Architecture",
    events: 21,
    highlight:
      "Delhi's grand heritage venues have witnessed our most theatrical productions. We've choreographed multi-act performances at farmhouse weddings, historic havelis, and five-star ballrooms across the capital.",
    speciality: "Grand Farmhouse & Heritage Venues",
  },
  {
    id: "pune",
    name: "Pune",
    state: "Maharashtra",
    style: "Cultural Elegance",
    events: 18,
    highlight:
      "Our home city — Pune — is where Kala Vritti was born. The cultural richness of Pune inspires everything we create. From traditional Maharashtrian weddings to modern fusion celebrations, Pune remains our creative heart.",
    speciality: "Traditional & Fusion Weddings",
  },
];

function CountUp({ target, inView }: { target: number; inView: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1200;
    const step = 16;
    const increment = target / (duration / step);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, step);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <>{count}+</>;
}

export default function JourneySection() {
  const [selectedCity, setSelectedCity] = useState<(typeof cities)[0] | null>(
    null,
  );
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="journey"
      ref={sectionRef}
      className="py-24 md:py-32 relative overflow-hidden"
      style={{ background: "oklch(0.22 0.075 17)" }}
    >
      {/* Animated radial gradient background */}
      <motion.div
        className="absolute inset-0 opacity-10"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
        }}
        transition={{
          duration: 20,
          ease: "linear",
          repeat: Number.POSITIVE_INFINITY,
        }}
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 50%, oklch(0.79 0.072 65) 0%, transparent 50%), radial-gradient(circle at 80% 20%, oklch(0.80 0.068 14) 0%, transparent 40%)",
          backgroundSize: "200% 200%",
        }}
      />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-xs tracking-[0.3em] text-gold uppercase mb-4">
            Where We've Performed
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary-foreground leading-tight">
            Our Journey Across India
          </h2>
          <p className="text-white/50 mt-4 max-w-md mx-auto text-sm leading-relaxed">
            From the palaces of Rajasthan to the skylines of Mumbai — click a
            city to explore our story
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-4">
          {cities.map((city, i) => (
            <motion.button
              type="button"
              key={city.id}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              whileHover={{ x: 4, backgroundColor: "rgba(255,255,255,0.12)" }}
              transition={{
                duration: 0.6,
                delay: 0.3 + i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              onClick={() => setSelectedCity(city)}
              className="group flex items-center gap-5 p-5 rounded-2xl border border-white/10 bg-white/5 hover:border-gold/40 transition-colors duration-300 text-left"
              data-ocid={`journey.item.${i + 1}`}
            >
              <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center shrink-0 group-hover:bg-gold/30 transition-colors">
                <MapPin size={16} className="text-gold" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-serif font-semibold text-white text-base">
                  {city.name}
                </p>
                <p className="text-white/50 text-xs">
                  {city.state} · {city.style}
                </p>
              </div>
              <div className="text-right shrink-0">
                <p className="font-serif font-bold text-gold text-xl">
                  <CountUp target={city.events} inView={inView} />
                </p>
                <p className="text-white/40 text-xs">events</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedCity && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedCity(null)}
            data-ocid="journey.modal"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-w-md w-full rounded-3xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="absolute inset-0"
                style={{ background: "oklch(0.28 0.085 17)" }}
              />
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.79 0.072 65 / 0.2) 0%, transparent 60%)",
                }}
              />

              <div className="relative z-10 p-8">
                <button
                  type="button"
                  onClick={() => setSelectedCity(null)}
                  className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                  data-ocid="journey.close_button"
                >
                  <X size={16} />
                </button>

                <p className="text-xs tracking-[0.3em] text-gold uppercase mb-2">
                  {selectedCity.state}
                </p>
                <h3 className="font-serif text-4xl font-bold text-white mb-1">
                  {selectedCity.name}
                </h3>
                <p className="text-gold text-sm mb-5">{selectedCity.style}</p>
                <div className="w-12 h-px bg-gold/50 mb-5" />
                <p className="text-white/70 text-sm leading-relaxed mb-6">
                  {selectedCity.highlight}
                </p>

                <div className="flex items-center gap-6">
                  <div>
                    <p className="font-serif font-bold text-gold text-2xl">
                      {selectedCity.events}+
                    </p>
                    <p className="text-white/50 text-xs">Events Performed</p>
                  </div>
                  <div>
                    <p className="font-medium text-white text-sm">
                      {selectedCity.speciality}
                    </p>
                    <p className="text-white/50 text-xs">Specialty</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
