import { useMovable } from "../../hooks/useMovable";

import styles from './recentMatches.module.scss';

function RecentMatches({
    isLocked,
    widgetOrder,
    setWidgetOrder
}:{
    isLocked: boolean,
    widgetOrder: string[],
    setWidgetOrder: React.Dispatch<React.SetStateAction<string[]>>
}) {
    const { stylesForMove, ref, handleClick } = useMovable({
        storageKey: "recentMatPos",
        pos: {
            x: window.innerWidth / 8,
            y: window.innerHeight / 8
        },
        isLocked: isLocked,
        widgetOrder: widgetOrder,
        setWidgetOrder: setWidgetOrder
    });

    return (
        <div className={styles.outerBlock}
            onClick={handleClick}
            ref={ref}
            style={stylesForMove}
        >
            <p>Recent matches</p>
        </div>
    )
}

export default RecentMatches;