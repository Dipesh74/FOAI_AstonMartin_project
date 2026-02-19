'use client';

import { useScroll, motion, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Navbar from '@/components/Navbar';
import ZondaScrollCanvas from '@/components/ZondaScrollCanvas';
import ZondaExperience from '@/components/ZondaExperience';
import { CAR_DATA } from '@/data/carData';

// Placeholder Components for sections below the main experience
const SpecsGrid = () => (
  <section className="py-24 px-8 bg-pagani-black text-white border-t border-white/10">
    <div className="max-w-7xl mx-auto">
      <h3 className="font-orbitron text-4xl mb-12 uppercase text-pagani-gold">Specifications</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { label: "Top Speed", value: "> 350 km/h" },
          { label: "0-100 km/h", value: "< 2.5s" },
          { label: "Torque", value: "1000 Nm" },
          { label: "Weight", value: "1550 kg" },
          { label: "Transmission", value: "8-Speed DCT" },
          { label: "Drive", value: "RWD / AWD" },
        ].map((spec, i) => (
          <div key={i} className="p-6 border border-white/10 hover:border-pagani-gold transition-colors duration-300">
            <h4 className="font-rajdhani text-gray-400 uppercase tracking-wider text-sm mb-2">{spec.label}</h4>
            <div className="font-orbitron text-2xl md:text-3xl">{spec.value}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Features = () => (
  <section className="py-24 px-8 bg-carbon-gray text-white">
    <div className="max-w-7xl mx-auto">
      <h3 className="font-orbitron text-4xl mb-12 uppercase text-pagani-gold">Features</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <h4 className="font-orbitron text-2xl">Aerodynamics</h4>
          <p className="font-rajdhani text-gray-300 leading-relaxed">
            Active aerodynamics adapt to driving conditions, providing optimal downforce and minimal drag.
            Every curve is sculpted for performance.
          </p>
        </div>
        <div className="space-y-6">
          <h4 className="font-orbitron text-2xl">Cockpit</h4>
          <p className="font-rajdhani text-gray-300 leading-relaxed">
            A driver-centric interior combining luxury materials with race-inspired ergonomics.
            Carbon fiber meets hand-stitched leather.
          </p>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="py-12 px-8 bg-black text-white/50 text-center font-rajdhani">
    <p>&copy; {new Date().getFullYear()} Aston Martin Lagonda. All rights reserved.</p>
    <div className="mt-4 flex justify-center gap-6 text-sm uppercase tracking-widest">
      <a href="#" className="hover:text-white transition-colors">Privacy</a>
      <a href="#" className="hover:text-white transition-colors">Terms</a>
      <a href="#" className="hover:text-white transition-colors">Contact</a>
    </div>
  </footer>
);

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress of the container relative to the viewport
  // We want the animation to start when container hits top (start start)
  // and end when container bottom hits bottom (end end) 
  // actually effectively 'end bottom' or 'end end' works for sticky
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <main className="bg-pagani-black min-h-screen">
      <Navbar />

      {/* 
        Main Scrollytelling Section
        h-[500vh] creates the scroll space.
        Sticky container holds the canvas and HUD.
      */}
      <section ref={containerRef} className="h-[500vh] relative">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {/* Layer 0: Canvas Background */}
          <div className="absolute inset-0 z-0">
            <ZondaScrollCanvas
              scrollYProgress={scrollYProgress}
              totalFrames={CAR_DATA.sequence.totalFrames}
              imageFolderPath={`/images/${CAR_DATA.sequence.folderName}-sequence`}
            />
          </div>

          {/* Layer 1: HUD Experience Overlay */}
          <div className="absolute inset-0 z-10 pointer-events-none">
            <ZondaExperience scrollYProgress={scrollYProgress} />
          </div>
        </div>
      </section>

      {/* Content below the scroll sequence */}
      <div className="relative z-20 bg-pagani-black shadow-[0_-50px_100px_rgba(0,0,0,1)]">
        <SpecsGrid />
        <Features />
        <Footer />
      </div>
    </main>
  );
}
