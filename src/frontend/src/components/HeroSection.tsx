import { PointMaterial, Points } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { ChevronDown } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { Suspense, useMemo, useRef } from "react";
import type * as THREE from "three";

function FloatingParticles() {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const count = 1800;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return arr;
  }, []);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.03;
      ref.current.rotation.x += delta * 0.01;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#D8B68A"
        size={0.04}
        sizeAttenuation
        depthWrite={false}
        opacity={0.8}
      />
    </Points>
  );
}

const turretPositions: [number, number, number][] = [
  [-0.6, 1.05, 0],
  [0.6, 1.05, 0],
];

function PalaceArch({
  position,
  scale = 1,
}: { position: [number, number, number]; scale?: number }) {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
      ref.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.02;
    }
  });

  return (
    <group ref={ref} position={position} scale={scale}>
      <mesh position={[0, -0.5, 0]}>
        <boxGeometry args={[2.2, 0.15, 0.3]} />
        <meshStandardMaterial color="#3d1318" roughness={0.8} />
      </mesh>
      <mesh position={[-0.85, 0.2, 0]}>
        <boxGeometry args={[0.18, 1.4, 0.2]} />
        <meshStandardMaterial color="#4a1820" roughness={0.7} />
      </mesh>
      <mesh position={[0.85, 0.2, 0]}>
        <boxGeometry args={[0.18, 1.4, 0.2]} />
        <meshStandardMaterial color="#4a1820" roughness={0.7} />
      </mesh>
      <mesh position={[0, 0.85, 0]}>
        <boxGeometry args={[1.88, 0.2, 0.2]} />
        <meshStandardMaterial color="#5A1F25" roughness={0.6} />
      </mesh>
      <mesh position={[0, 1.25, 0]}>
        <sphereGeometry args={[0.35, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#5A1F25" roughness={0.5} metalness={0.2} />
      </mesh>
      <mesh position={[0, 1.7, 0]}>
        <coneGeometry args={[0.06, 0.5, 8]} />
        <meshStandardMaterial color="#D8B68A" roughness={0.3} metalness={0.5} />
      </mesh>
      {turretPositions.map((pos) => (
        <group key={`${pos[0]}-${pos[1]}`} position={pos}>
          <mesh>
            <cylinderGeometry args={[0.1, 0.12, 0.4, 8]} />
            <meshStandardMaterial color="#4a1820" roughness={0.7} />
          </mesh>
          <mesh position={[0, 0.3, 0]}>
            <coneGeometry args={[0.1, 0.25, 8]} />
            <meshStandardMaterial
              color="#D8B68A"
              roughness={0.4}
              metalness={0.4}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.4} color="#f5e6d3" />
      <directionalLight position={[5, 8, 3]} intensity={1.2} color="#f0d4b8" />
      <pointLight position={[-4, 2, 2]} intensity={0.6} color="#E7B7B3" />
      <pointLight position={[4, 1, -1]} intensity={0.4} color="#D8B68A" />
      <FloatingParticles />
      <PalaceArch position={[-3.8, -1.8, -2]} scale={0.85} />
      <PalaceArch position={[0, -1.6, -3]} scale={1.1} />
      <PalaceArch position={[3.8, -1.8, -2]} scale={0.9} />
      <PalaceArch position={[-1.8, -1.9, -4]} scale={0.7} />
      <PalaceArch position={[1.8, -1.9, -4]} scale={0.75} />
    </>
  );
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const vignetteY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const canvasScale = useTransform(scrollYProgress, [0, 1], [1, 1.04]);

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full h-screen overflow-hidden"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(160deg, #2A0E12 0%, #3d1820 30%, #5A1F25 60%, #8B3D44 85%, #c98a7a 100%)",
        }}
      />

      <motion.div
        className="absolute inset-0"
        style={{ scale: canvasScale, willChange: "transform" }}
      >
        <Canvas
          camera={{ position: [0, 0, 6], fov: 55 }}
          gl={{ antialias: true, alpha: true }}
          style={{ background: "transparent" }}
        >
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </motion.div>

      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          y: vignetteY,
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(26,8,10,0.7) 100%)",
          willChange: "transform",
        }}
      />

      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent, oklch(0.91 0.032 74))",
        }}
      />

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="w-24 h-px bg-gold mb-8 origin-center"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-xs tracking-[0.35em] uppercase text-gold/90 mb-5 font-sans"
        >
          Wedding Dance & Performing Arts Collective
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight tracking-tight mb-6"
          style={{ textShadow: "0 2px 40px rgba(90,31,37,0.6)" }}
        >
          We Create Moments
          <br />
          <span className="italic text-gold">That Stay Forever</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="text-white/70 text-sm md:text-base font-light tracking-wide mb-10 max-w-lg"
        >
          Choreography · Storytelling · Immersive Artistic Experiences
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <button
            type="button"
            onClick={() =>
              document
                .getElementById("portfolio")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="px-8 py-3.5 text-sm font-medium tracking-widest rounded-full border border-gold text-gold hover:bg-gold hover:text-foreground transition-all duration-300"
            data-ocid="hero.secondary_button"
          >
            OUR PORTFOLIO
          </button>
          <button
            type="button"
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="px-8 py-3.5 text-sm font-medium tracking-widest rounded-full bg-gold text-foreground hover:bg-accent transition-all duration-300 shadow-gold"
            data-ocid="hero.primary_button"
          >
            BOOK YOUR JOURNEY
          </button>
        </motion.div>

        <div className="mt-10 flex items-center gap-3 text-xs text-white/50 tracking-widest">
          {["UDAIPUR", "MUMBAI", "DELHI", "PUNE"].map((city, i) => (
            <motion.span
              key={city}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 1.6 + i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex items-center gap-3"
            >
              {city}
              {i < 3 && <span className="w-1 h-1 rounded-full bg-gold/50" />}
            </motion.span>
          ))}
        </div>
      </div>

      <motion.button
        type="button"
        onClick={scrollToAbout}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/60 hover:text-gold transition-colors"
        style={{ animation: "float 2.5s ease-in-out infinite" }}
        aria-label="Scroll down"
        data-ocid="hero.button"
      >
        <ChevronDown size={28} />
      </motion.button>
    </section>
  );
}
