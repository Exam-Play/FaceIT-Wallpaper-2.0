import { useState, useRef, useEffect, useCallback } from "react";

import type { Size } from '../types/wallpaper'

const DEFAULT_MIN: Size = { w: 0, h: 0 };
const DEFAULT_MAX: Size = { w: 100, h: 100 };

export function useResizable({
    storageKey,
    defaultSize,
    scale,
    min = DEFAULT_MIN,
    max = DEFAULT_MAX,
}:{
    storageKey: string;
    defaultSize: Size;
    scale: number;
    min?: Size;
    max?: Size;
}){
    const [size, setSize] = useState<Size>(() => {
        try {
            const saved = localStorage.getItem(storageKey);
            return saved ? JSON.parse(saved) : defaultSize;
        } catch {
            return defaultSize;
        }
    });

    const [isResizing, setIsResizing] = useState(false);
    const originRef = useRef({ x: 0, y: 0 });

    const toggleResize = useCallback((el: HTMLElement | null) => {
        setIsResizing(prev => {
            const next = !prev;

            if (next && el) {
                const rect = el.getBoundingClientRect();

                originRef.current = { x: rect.left, y: rect.top};
            }
            return next;
        });
    }, []);

    useEffect(() => {
        if (!isResizing) return;

        const onMove = (e: MouseEvent) => {
            const vw = window.innerWidth / 100;
            const vh = window.innerHeight / 100;

            let wPx = (e.clientX - originRef.current.x) / scale + 12;
            let hPx = (e.clientY - originRef.current.y) / scale + 12;

            let w = wPx / vw;
            let h = hPx / vh;

            w = Math.min(max.w, Math.max(min.w, w));
            h = Math.min(max.h, Math.max(min.h, h));

            setSize({ w, h });
        };

        document.addEventListener('mousemove', onMove);
        return () => document.removeEventListener('mousemove', onMove);
    }, [isResizing, min.w, min.h, max.w, max.h]);

    useEffect(() => {
        if (!isResizing) {
            localStorage.setItem(storageKey, JSON.stringify(size));
        }
    }, [isResizing]);

    return { size, isResizing, toggleResize };
}