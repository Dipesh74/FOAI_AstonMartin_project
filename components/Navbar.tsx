'use client';

import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
    const { scrollY } = useScroll();
    const [isScrolled, setIsScrolled] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 50);
    });

    return (
        <motion.nav
            className={`fixed top-0 left-0 w-full z-50 px-8 py-6 transition-colors duration-300 ${isScrolled ? 'bg-pagani-black/80 backdrop-blur-md border-b border-white/10' : 'bg-transparent'
                }`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            <div className="max-w-[1800px] mx-auto flex justify-between items-center">
                <Link href="/" className="font-orbitron text-2xl tracking-widest text-white uppercase font-bold">
                    Aston Martin
                </Link>

                <button className="px-6 py-2 border border-white/30 rounded-none uppercase text-sm tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-300 font-rajdhani font-medium">
                    Inquire
                </button>
            </div>
        </motion.nav>
    );
}
