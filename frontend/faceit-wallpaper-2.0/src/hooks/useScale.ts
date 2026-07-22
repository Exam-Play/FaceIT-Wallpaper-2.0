import { useState, useRef, useEffect, useCallback } from "react";

const DEFAULT_MIN = 0.5;
const DEFAULT_MAX = 2;

export function useScale({
    storageKey,
    defaultScale = 1,
    min = DEFAULT_MIN,
    max = DEFAULT_MAX,
}:{
    storageKey: string;
    defaultScale?: number;
    min?: number;
    max?: number;
}){
    const [scale, setScale] = useState<number>(() => {
        try {
            const saved = localStorage.getItem(storageKey);
            return saved ? JSON.parse(saved) : defaultScale;
        } catch {
            return defaultScale;
        }
    });

    const [isScaling, setIsScaling] = useState(false);
    const originRef = useRef({ x: 0, y: 0 });
    const startDistRef = useRef(1);
    const startScaleRef = useRef(1);

    const toggleScale = useCallback((el: HTMLElement | null) => {
        setIsScaling(prev => {
            const next = !prev;

            if (next && el) {
                const rect = el.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;

                originRef.current = { x: centerX, y: centerY };
                startDistRef.current = Math.hypot(rect.right - centerX, rect.bottom - centerY) || 1;
                startScaleRef.current = scale;
            }
            return next;
        });
    }, [scale]);

    useEffect(() => {
        if (!isScaling) return;

        const onMove = (e: MouseEvent) => {
            const dx = e.clientX - originRef.current.x;
            const dy = e.clientY - originRef.current.y;
            const dist = Math.hypot(dx, dy);

            let next = startScaleRef.current * (dist / startDistRef.current);

            next = Math.min(max, Math.max(min, next));

            setScale(next);
        };

        const onUp = () => setIsScaling(false);

        document.addEventListener('mousemove', onMove);
        document.addEventListener('mouseup', onUp);
        return () => {
            document.removeEventListener('mousemove', onMove);
            document.removeEventListener('mouseup', onUp);
        };
    }, [isScaling, min, max]);

    useEffect(() => {
        if (!isScaling) {
            localStorage.setItem(storageKey, JSON.stringify(scale));
        }
    }, [isScaling]);

    return { scale, isScaling, toggleScale };
}