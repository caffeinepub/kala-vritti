import { Mic2, Music2, Star, Users } from "lucide-react";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

const services = [
  {
    icon: Music2,
    title: "Sangeet Choreography",
    description:
      "Bespoke Sangeet performances crafted to reflect your family's unique story. From solo to ensemble arrangements, we design each act with heart.",
  },
  {
    icon: Users,
    title: "Couple Performances",
    description:
      "Intimate and powerful couple choreography that captures the essence of your love story — with grace, emotion, and cinematic flair.",
  },
  {
    icon: Star,
    title: "Group Dances",
    description:
      "Family and friend group choreography designed for maximum impact. We train every performer to shine on their most special day.",
  },
  {
    icon: Mic2,
    title: "Stage Shows",
    description:
      "Full theatrical stage productions featuring original storytelling, classical fusion, and immersive visual design for grand weddings.",
  },
];

function ServiceCard({
  service,
  index,
}: { service: (typeof services)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const Icon = service.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      whileHover={{ y: -4, boxShadow: "0 20px 60px rgba(90,31,37,0.15)" }}
      transition={{
        duration: 0.7,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative p-6 bg-cream border border-border rounded-2xl mandala-corner mandala-corner-br overflow-hidden group cursor-pointer"
    >
      <div className="relative z-10">
        <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
          <Icon size={20} className="text-maroon" />
        </div>
        <h3 className="font-serif text-lg font-semibold text-maroon mb-2">
          {service.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {service.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function AboutSection() {
  const headingRef = useRef<HTMLDivElement>(null);
  const servicesHeadingRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headingRef, { once: true, margin: "-100px" });
  const servicesInView = useInView(servicesHeadingRef, {
    once: true,
    margin: "-80px",
  });

  return (
    <section id="about" className="py-24 md:py-32 bg-ivory">
      <div className="max-w-7xl mx-auto px-6">
        {/* Two column */}
        <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.02 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5]">
              <img
                src="/assets/generated/about-dance.dim_800x600.jpg"
                alt="Kala Vritti dance performance"
                className="w-full h-full object-cover"
              />
              {/* Gold frame accent */}
              <div className="absolute inset-0 rounded-3xl border-2 border-gold/30 pointer-events-none" />
            </div>
            {/* Floating badge */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{
                duration: 4,
                ease: "easeInOut",
                repeat: Number.POSITIVE_INFINITY,
              }}
              className="absolute -bottom-6 -right-6 bg-maroon text-primary-foreground rounded-2xl px-6 py-4 shadow-warm"
            >
              <p className="font-serif text-3xl font-bold">7+</p>
              <p className="text-xs tracking-wider opacity-80">Years of Art</p>
            </motion.div>
          </motion.div>

          {/* Text */}
          <div ref={headingRef}>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-xs tracking-[0.3em] text-gold uppercase mb-4"
            >
              About Us
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-serif text-4xl md:text-5xl font-bold text-maroon leading-tight mb-6"
            >
              We Are
              <br />
              Kala Vritti
            </motion.h2>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-16 h-0.5 bg-gold mb-6 origin-left"
            />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-muted-foreground leading-relaxed mb-5"
            >
              Kala Vritti is a contemporary wedding dance and performing arts
              collective, born from a deep love of storytelling through
              movement. We don't just choreograph dances — we craft experiences
              that become cherished memories.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-muted-foreground leading-relaxed mb-8"
            >
              Founded by{" "}
              <span className="text-maroon font-medium">
                Priyanshi Panjwani
              </span>{" "}
              and{" "}
              <span className="text-maroon font-medium">Samarth Patankar</span>,
              our collective merges classical Indian dance traditions with
              modern cinematic expression — creating performances that are
              intimate, powerful, and deeply personal.
            </motion.p>

            {/* Founders */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="flex gap-5"
            >
              {[
                {
                  name: "Priyanshi Panjwani",
                  role: "Co-Founder & Lead Choreographer",
                  img: "/assets/generated/founder-priyanshi.dim_400x400.jpg",
                },
                {
                  name: "Samarth Patankar",
                  role: "Co-Founder & Artistic Director",
                  img: "/assets/generated/founder-samarth.dim_400x400.jpg",
                },
              ].map((founder) => (
                <div key={founder.name} className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-gold/50 shrink-0">
                    <img
                      src={founder.img}
                      alt={founder.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-sm text-maroon">
                      {founder.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {founder.role}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Services grid */}
        <div>
          <div ref={servicesHeadingRef} className="text-center mb-12">
            <p className="text-xs tracking-[0.3em] text-gold uppercase mb-3">
              What We Offer
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-maroon">
              {["Our", "Services"].map((word, i) => (
                <motion.span
                  key={word}
                  initial={{ opacity: 0, filter: "blur(8px)", y: 10 }}
                  animate={
                    servicesInView
                      ? { opacity: 1, filter: "blur(0px)", y: 0 }
                      : {}
                  }
                  transition={{
                    duration: 0.7,
                    delay: i * 0.15,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="inline-block mr-3"
                >
                  {word}
                </motion.span>
              ))}
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, i) => (
              <ServiceCard key={service.title} service={service} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
