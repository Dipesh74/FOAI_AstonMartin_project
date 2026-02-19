'use client';

import { motion, MotionValue, useTransform } from 'framer-motion';
import { CAR_DATA } from '@/data/carData';

interface ZondaExperienceProps {
    scrollYProgress: MotionValue<number>;
}

export default function ZondaExperience({ scrollYProgress }: ZondaExperienceProps) {
    // Hero Section (0% - 33%)
    const heroOpacity = useTransform(scrollYProgress, [0, 0.25, 0.33], [1, 1, 0]);
    const heroY = useTransform(scrollYProgress, [0, 0.25, 0.33], [0, 0, -50]);
    const heroPointerEvents = useTransform(scrollYProgress, (v) => (v < 0.33 ? 'auto' : 'none'));

    // Design Section (33% - 66%)
    const designOpacity = useTransform(scrollYProgress, [0.33, 0.4, 0.6, 0.66], [0, 1, 1, 0]);
    const designY = useTransform(scrollYProgress, [0.33, 0.66], [50, -50]);
    const designPointerEvents = useTransform(scrollYProgress, (v) => (v >= 0.33 && v < 0.66 ? 'auto' : 'none'));

    // Engine Section (66% - 100%)
    const engineOpacity = useTransform(scrollYProgress, [0.66, 0.73, 1], [0, 1, 1]);
    const engineY = useTransform(scrollYProgress, [0.66, 1], [50, 0]);
    const enginePointerEvents = useTransform(scrollYProgress, (v) => (v >= 0.66 ? 'auto' : 'none'));

    return (
        <div className="absolute inset-0 z-10 w-full h-full pointer-events-none">

            {/* Hero Phase */}
            <motion.div
                style={{ opacity: heroOpacity, y: heroY, pointerEvents: heroPointerEvents }}
                className="absolute inset-0 flex flex-col justify-center items-center text-center p-8"
            >
                <h1 className="font-orbitron text-6xl md:text-8xl w-full uppercase tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400">
                    {CAR_DATA.name}
                </h1>
                <div className="w-32 h-1 bg-pagani-gold mb-6 mx-auto" />
                <p className="font-rajdhani text-2xl md:text-3xl text-pagani-gold mb-8 tracking-widest">
                    {CAR_DATA.price}
                </p>
                <button className="pointer-events-auto px-8 py-3 border border-white text-white uppercase tracking-[0.2em] hover:bg-pagani-gold hover:text-black hover:border-pagani-gold transition-all duration-300 font-bold">
                    Inquire Now
                </button>
            </motion.div>

            {/* Design Phase */}
            <motion.div
                style={{ opacity: designOpacity, y: designY, pointerEvents: designPointerEvents }}
                className="absolute inset-0 flex flex-col justify-center items-start text-left p-12 md:p-24 bg-gradient-to-r from-black/80 to-transparent"
            >
                <div className="max-w-xl border-l-2 border-pagani-gold pl-8">
                    <h2 className="font-orbitron text-4xl md:text-5xl uppercase tracking-widest mb-6 text-white">
                        Design
                    </h2>
                    <p className="font-rajdhani text-xl md:text-2xl text-gray-300 leading-relaxed">
                        {CAR_DATA.designDescription}
                    </p>
                </div>
            </motion.div>

            {/* Engine Phase */}
            <motion.div
                style={{ opacity: engineOpacity, y: engineY, pointerEvents: enginePointerEvents }}
                className="absolute inset-0 flex flex-col justify-center items-end text-right p-12 md:p-24 bg-gradient-to-l from-black/80 to-transparent"
            >
                <div className="border-r-2 border-pagani-gold pr-8">
                    <h2 className="font-orbitron text-4xl md:text-5xl uppercase tracking-widest mb-8 text-white">
                        Engine
                    </h2>

                    <div className="flex flex-col gap-6 font-rajdhani">
                        <div>
                            <span className="block text-pagani-gold text-sm tracking-[0.2em] uppercase mb-1">Type</span>
                            <span className="text-3xl md:text-4xl text-white font-bold">{CAR_DATA.engineType}</span>
                        </div>
                        <div>
                            <span className="block text-pagani-gold text-sm tracking-[0.2em] uppercase mb-1">Power</span>
                            <span className="text-3xl md:text-4xl text-white font-bold">{CAR_DATA.horsepower}</span>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Global Scroll Indicator (optional but cool) */}
            <motion.div
                style={{ scaleX: scrollYProgress }}
                className="absolute bottom-0 left-0 h-1 bg-pagani-gold origin-left w-full"
            />
        </div>
    );
}
