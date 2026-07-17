import { useEffect, useRef, useState } from "react";

export const useMovable = ({
    storageKey,
    pos,
    isLocked,
    widgetOrder,
    setWidgetOrder
}:{
    storageKey: string,
    pos: Position,
    isLocked: boolean,
    widgetOrder: string[],
    setWidgetOrder: React.Dispatch<React.SetStateAction<string[]>>
}) => {
    const [position, setPosition] = useState(() => {
        const saved = localStorage.getItem(storageKey);

        return saved ? JSON.parse(saved) : pos;
    });
    const [isMoving, setIsMoving] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const offset = useRef({x: 0, y: 0});

    const zIndex = (() => {
        const index = widgetOrder.indexOf(storageKey);

        return index === -1 ? 1 : index + 1;
    })();

    const stylesForMove : React.CSSProperties = {
        left: position.x,
        top: position.y,
        position: 'absolute',
        zIndex: zIndex
    };

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (isLocked) return;

        if (!isMoving) {
            setWidgetOrder(prev => {
                const order = [...prev];

                const index = order.indexOf(storageKey);

                if (index !== -1) {
                    order.splice(index, 1);
                }

                order.push(storageKey);

                localStorage.setItem(
                    "widgetOrder",
                    JSON.stringify(order)
                );

                return order;
            });

            const rect = ref.current!.getBoundingClientRect();

            offset.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            };
        }

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

            const x = e.clientX - offset.current.x;
            const y = e.clientY - offset.current.y;

            const newPosition = {
                x: Math.max(
                    0,
                    Math.min(x, window.innerWidth - width)
                ),
                y: Math.max(
                    0,
                    Math.min(y, window.innerHeight - height)
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