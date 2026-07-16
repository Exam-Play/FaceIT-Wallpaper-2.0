import { useEffect, useRef, useState } from "react";

interface Position {
    x: number;
    y: number;
}

let currentZIndex = 1;

export const useMovable = ({
    storageKey,
    pos,
    isLocked
}:{
    storageKey: string,
    pos: Position,
    isLocked: boolean
}) => {
    const [position, setPosition] = useState(() => {
        const saved = localStorage.getItem(storageKey);

        return saved ? JSON.parse(saved) : pos;
    });
    const [zIndex, setZIndex] = useState(1);

    const [isMoving, setIsMoving] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    
    const stylesForMove : React.CSSProperties = {
        left: position.x,
        top: position.y,
        position: 'absolute',
        transform: 'translate(-50%, -50%)',
        zIndex: zIndex
    };

    const handleClick = () => {
        if (!isMoving) {
            currentZIndex++;
        }
        setZIndex(currentZIndex);

        setIsMoving(prev => !prev);
    };

    useEffect(() => {
        const onMouseMove = (e: MouseEvent) => {
            if (!isMoving || isLocked) {
                return;
            }

            const rect = ref.current?.getBoundingClientRect();

            const width = rect?.width ?? 0;
            const height = rect?.height ?? 0;

            const newPosition = {
                x: Math.max(
                    width / 2,
                    Math.min(e.clientX, window.innerWidth - width / 2)
                ),
                y: Math.max(
                    height / 2,
                    Math.min(e.clientY, window.innerHeight - height / 2)
                )
            };

            setPosition(newPosition);
        };


        window.addEventListener("mousemove", onMouseMove);

        return () => window.removeEventListener("mousemove", onMouseMove);
    }, [isMoving]);

    useEffect(() => {
        if (!isMoving) {
            localStorage.setItem(storageKey, JSON.stringify(position));
        }
    }, [isMoving])

    return { stylesForMove, ref, handleClick };    
}