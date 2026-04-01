import {
  Loader2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";
import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { useSubmitContact } from "../hooks/useQueries";

const cities = ["Pune", "Mumbai", "Delhi", "Udaipur", "Other"];

const contactInfo = [
  { icon: Phone, label: "Call Us", value: "+91 99999 99999" },
  { icon: Mail, label: "Email", value: "hello@kalavritti.com" },
  { icon: MapPin, label: "Based In", value: "Pune, Maharashtra" },
];

export default function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    message: "",
  });

  const mutation = useSubmitContact();
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await mutation.mutateAsync(form);
      toast.success("Your story is in our hands! We'll reach out soon. 🌹");
      setForm({ name: "", email: "", phone: "", city: "", message: "" });
    } catch {
      toast.error(
        "Something went wrong. Please try again or WhatsApp us directly.",
      );
    }
  };

  const whatsappUrl = `https://wa.me/919999999999?text=${encodeURIComponent("Hi Kala Vritti! I'm interested in choreography for my wedding. Please share more details.")}`;

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-24 md:py-32 bg-ivory relative overflow-hidden"
    >
      {/* Decorative bg */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 80% 20%, oklch(0.80 0.068 14 / 0.3) 0%, transparent 50%)",
        }}
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-xs tracking-[0.3em] text-gold uppercase mb-4"
          >
            Get In Touch
          </motion.p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-maroon leading-tight">
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="block"
            >
              Let's Choreograph
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="block"
            >
              Your Story
            </motion.span>
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-muted-foreground mt-4 max-w-md mx-auto text-sm leading-relaxed"
          >
            Tell us about your celebration. We'll craft something unforgettable.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Left: info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2 flex flex-col justify-center gap-8"
          >
            <div>
              <h3 className="font-serif text-2xl font-semibold text-maroon mb-4">
                We'd love to hear from you
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Whether it's a grand Sangeet, an intimate couple dance, or a
                full theatrical show — we're here to make your vision come
                alive.
              </p>
            </div>

            <div className="flex flex-col gap-5">
              {contactInfo.map(({ icon: Icon, label, value }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.15,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="flex items-center gap-4"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon size={16} className="text-maroon" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{label}</p>
                    <p className="text-sm font-medium text-foreground">
                      {value}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-[#25D366] text-white text-sm font-medium tracking-wide hover:bg-[#20bb5a] transition-all duration-300 w-fit shadow-xs"
              data-ocid="contact.secondary_button"
            >
              <MessageCircle size={18} />
              Chat on WhatsApp
            </a>
          </motion.div>

          {/* Right: form */}
          <motion.form
            initial={{ opacity: 0, x: 30, boxShadow: "none" }}
            whileInView={{
              opacity: 1,
              x: 0,
              boxShadow: "0 30px 80px rgba(90,31,37,0.12)",
            }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
            onSubmit={handleSubmit}
            className="lg:col-span-3 bg-cream rounded-3xl p-8 md:p-10 border border-border relative mandala-corner mandala-corner-br overflow-hidden"
            data-ocid="contact.modal"
          >
            <div className="relative z-10">
              <div className="grid sm:grid-cols-2 gap-5 mb-5">
                <div>
                  <label
                    className="block text-xs tracking-wider text-muted-foreground uppercase mb-2"
                    htmlFor="name"
                  >
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Priya Sharma"
                    className="w-full bg-transparent border-b border-border py-3 text-sm text-foreground placeholder-muted-foreground/50 focus:outline-none focus:border-maroon transition-colors"
                    data-ocid="contact.input"
                  />
                </div>
                <div>
                  <label
                    className="block text-xs tracking-wider text-muted-foreground uppercase mb-2"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="priya@example.com"
                    className="w-full bg-transparent border-b border-border py-3 text-sm text-foreground placeholder-muted-foreground/50 focus:outline-none focus:border-maroon transition-colors"
                    data-ocid="contact.input"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5 mb-5">
                <div>
                  <label
                    className="block text-xs tracking-wider text-muted-foreground uppercase mb-2"
                    htmlFor="phone"
                  >
                    Phone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className="w-full bg-transparent border-b border-border py-3 text-sm text-foreground placeholder-muted-foreground/50 focus:outline-none focus:border-maroon transition-colors"
                    data-ocid="contact.input"
                  />
                </div>
                <div>
                  <label
                    className="block text-xs tracking-wider text-muted-foreground uppercase mb-2"
                    htmlFor="city"
                  >
                    City of Event
                  </label>
                  <select
                    id="city"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-border py-3 text-sm text-foreground focus:outline-none focus:border-maroon transition-colors cursor-pointer"
                    data-ocid="contact.select"
                  >
                    <option value="">Select city...</option>
                    {cities.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mb-8">
                <label
                  className="block text-xs tracking-wider text-muted-foreground uppercase mb-2"
                  htmlFor="message"
                >
                  Tell Us Your Story
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us about your wedding, event date, and what you're envisioning..."
                  className="w-full bg-transparent border-b border-border py-3 text-sm text-foreground placeholder-muted-foreground/50 focus:outline-none focus:border-maroon transition-colors resize-none"
                  data-ocid="contact.textarea"
                />
              </div>

              <button
                type="submit"
                disabled={mutation.isPending}
                className="w-full flex items-center justify-center gap-3 py-4 rounded-full bg-maroon text-primary-foreground text-sm font-medium tracking-widest hover:bg-maroon-dark transition-all duration-300 shadow-warm disabled:opacity-60 disabled:cursor-not-allowed"
                data-ocid="contact.submit_button"
              >
                {mutation.isPending ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    SEND YOUR STORY
                  </>
                )}
              </button>

              {mutation.isSuccess && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center text-sm text-green-600 mt-4"
                  data-ocid="contact.success_state"
                >
                  ✓ Message received! We'll be in touch soon.
                </motion.p>
              )}
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
