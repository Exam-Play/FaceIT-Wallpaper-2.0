import { useEffect, useRef, useState } from "react";

import styles from './recentPerformance30Matches.module.scss';

function RecentPerformance30Matches() {
    const [position, setPosition] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

    const ref = useRef<HTMLDivElement>(null);
    const dragging = useRef(false);
    const offset = useRef({ x: 0, y: 0 });

    const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        dragging.current = true;

        offset.current = {
            x: e.clientX - position.x,
            y: e.clientY - position.y,
        };
    };

    useEffect(() => {
        const onMouseMove = (e: MouseEvent) => {
            if (!dragging.current) return;

            const x = e.clientX - offset.current.x;
            const y = e.clientY - offset.current.y;

            const rect = ref.current?.getBoundingClientRect();

            const width = rect?.width ?? 0;
            const height = rect?.height ?? 0;

            setPosition({
                x: Math.max(width / 2, Math.min(x, window.innerWidth - width / 2)),
                y: Math.max(height / 2, Math.min(y, window.innerHeight - height / 2)),
            });
        };

        const onMouseUp = () => {
            dragging.current = false;
        };

        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
        };
    }, []);

    return (
        <div
            className={styles.outerBlock}
            onMouseDown={onMouseDown}
            ref={ref}
            style={{ left: position.x, top: position.y, position: 'absolute' }}
        >
            <p>Recent Performance 30 Matches</p>
        </div>
    )
}

export default RecentPerformance30Matches;