'use client';

import { useMotionValueEvent, MotionValue } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface ZondaScrollCanvasProps {
    scrollYProgress: MotionValue<number>;
    totalFrames: number;
    imageFolderPath: string;
}

export default function ZondaScrollCanvas({
    scrollYProgress,
    totalFrames,
    imageFolderPath,
}: ZondaScrollCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        let loadedCount = 0;
        const totalToLoad = totalFrames;
        // Use an array of the correct size to keep indices stable
        const loadedImages: HTMLImageElement[] = new Array(totalFrames);

        console.log(`Starting to load ${totalFrames} frames from ${imageFolderPath}`);

        for (let i = 0; i < totalFrames; i++) {
            const img = new Image();
            const frameIndex = i + 1;
            const filename = `ezgif-frame-${String(frameIndex).padStart(3, '0')}.jpg`;

            // Set onload handler before src to ensure no race condition on cached images
            img.onload = () => {
                loadedCount++;
                if (loadedCount === totalToLoad) {
                    console.log('All images loaded successfully');
                    setIsLoaded(true);
                }
            };

            img.onerror = () => {
                console.error(`Failed to load: ${filename}`);
                // Still count it as loaded so one failure doesn't hang the app
                loadedCount++;
                if (loadedCount === totalToLoad) {
                    setIsLoaded(true);
                }
            };

            img.src = `${imageFolderPath}/${filename}`;
            loadedImages[i] = img;
        }

        setImages(loadedImages);
    }, [totalFrames, imageFolderPath]);

    useEffect(() => {
        // Initial draw when loaded
        if (isLoaded && canvasRef.current && images.length > 0) {
            renderFrame(0);
        }
    }, [isLoaded]);

    const renderFrame = (index: number) => {
        const canvas = canvasRef.current;
        if (!canvas || !images[index]) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Handle high output resolution for retina
        const dpr = window.devicePixelRatio || 1;

        // Set canvas internal dimensions to match logical size * dpr
        // We get the computed style width/height
        const rect = canvas.getBoundingClientRect();

        // Only resize if dimensions changed to avoid clearing
        if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            ctx.scale(dpr, dpr);
        }

        // Draw image contain logic
        // We want to fill the canvas or contain? Prompt says "object-fit: contain"
        // So we calculate aspect ratio
        const img = images[index];

        // Logical dimensions
        const cw = rect.width;
        const ch = rect.height;

        const iw = img.naturalWidth;
        const ih = img.naturalHeight;

        // Calculate scale to contain
        const scale = Math.min(cw / iw, ch / ih);
        const nw = iw * scale;
        const nh = ih * scale;
        const x = (cw - nw) / 2;
        const y = (ch - nh) / 2;

        // Clear and draw
        // Actually, setting width/height clears canvas, but if not resized, we need to clear
        // But since we redraw full image, maybe just fill color first?
        // User requested "object-fit: contain", so might have black bars
        // Global background is black, so let's clear to transparent (showing parent background)
        ctx.clearRect(0, 0, cw, ch); // clear logical area (scaled by dpr via context)

        ctx.drawImage(img, x, y, nw, nh);
    };

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (!isLoaded || images.length === 0) return;

        // Map 0-1 to 0-(totalFrames-1)
        const frameIndex = Math.min(
            totalFrames - 1,
            Math.max(0, Math.round(latest * (totalFrames - 1)))
        );

        requestAnimationFrame(() => renderFrame(frameIndex));
    });

    if (!isLoaded) {
        return (
            <div className="w-full h-full flex items-center justify-center text-pagani-gold font-orbitron animate-pulse">
                Loading Experience...
            </div>
        );
    }

    return (
        <canvas
            ref={canvasRef}
            className="w-full h-full block object-contain"
        />
    );
}
