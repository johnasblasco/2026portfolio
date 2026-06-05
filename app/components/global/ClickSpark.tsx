'use client';

import React, { useRef, useEffect, useCallback } from 'react';

interface Spark {
    x: number;
    y: number;
    angle: number;
    startTime: number;
}

const ClickSpark = ({
    sparkColor = '#fff',
    sparkSize = 10,
    sparkRadius = 15,
    sparkCount = 8,
    duration = 400,
    easing = 'ease-out',
    extraScale = 1.0,
    children
}: any) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const sparksRef = useRef<Spark[]>([]);

    // --- FULLSCREEN CANVAS SETUP ---
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const resize = () => {
            const canvas = canvasRef.current;
            if (!canvas) return;

            const dpr = window.devicePixelRatio || 1;

            const width = window.innerWidth;
            const height = window.innerHeight;

            canvas.width = width * dpr;
            canvas.height = height * dpr;

            canvas.style.width = width + "px";
            canvas.style.height = height + "px";

            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            // RESET transform every resize (IMPORTANT)
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };
        resize();
        window.addEventListener("resize", resize);

        return () => window.removeEventListener("resize", resize);
    }, []);

    // --- CLICK LISTENER ON WINDOW (IMPORTANT FIX) ---
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const now = performance.now();

            const newSparks = Array.from({ length: sparkCount }, (_, i) => ({
                x: e.clientX,
                y: e.clientY,
                angle: (2 * Math.PI * i) / sparkCount,
                startTime: now
            }));

            sparksRef.current.push(...newSparks);
        };

        window.addEventListener("click", handleClick);
        return () => window.removeEventListener("click", handleClick);
    }, [sparkCount]);

    // --- ANIMATION LOOP ---
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let frame: number;

        const draw = (t: number) => {
            ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

            sparksRef.current = sparksRef.current.filter((s) => {
                const elapsed = t - s.startTime;
                if (elapsed > duration) return false;

                const p = elapsed / duration;
                const eased = p * (2 - p);

                const dist = eased * sparkRadius * extraScale;
                const len = sparkSize * (1 - eased);

                const x1 = s.x + Math.cos(s.angle) * dist;
                const y1 = s.y + Math.sin(s.angle) * dist;

                const x2 = s.x + Math.cos(s.angle) * (dist + len);
                const y2 = s.y + Math.sin(s.angle) * (dist + len);

                ctx.strokeStyle = sparkColor;
                ctx.lineWidth = 2;

                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.stroke();

                return true;
            });

            frame = requestAnimationFrame(draw);
        };

        frame = requestAnimationFrame(draw);
        return () => cancelAnimationFrame(frame);
    }, [sparkColor, sparkSize, sparkRadius, extraScale, duration]);

    return (
        <>
            {/* VISUAL LAYER ONLY */}
            <canvas
                ref={canvasRef}
                style={{
                    position: "fixed",
                    inset: 0,
                    width: "100vw",
                    height: "100vh",
                    pointerEvents: "none",
                    zIndex: 999999,
                }}
            />

            {/* YOUR APP (UNCHANGED) */}
            {children}
        </>
    );
};

export default ClickSpark;