import styles from './recentPerformance30Matches.module.scss';

import { useMovable } from "../../hooks/useMovable";

function RecentPerformance30Matches({
    isLocked,
    widgetOrder,
    setWidgetOrder
}:{
    isLocked: boolean,
    widgetOrder: string[],
    setWidgetOrder: React.Dispatch<React.SetStateAction<string[]>>
}){
    /*const { scale, isScaling, toggleScale } = useScale({
        storageKey: "recPerf30MatScale",
        defaultScale: 1,
    });*/

    const { stylesForMove, ref, handleClick } = useMovable({
        storageKey: "recPerf30MatPos",
        pos: {
            x: window.innerWidth / 1.96,
            y: window.innerHeight / 5
        },
        scale: 1,
        isLocked: isLocked,
        widgetOrder: widgetOrder,
        setWidgetOrder: setWidgetOrder
    });

    /*const { size, isResizing, toggleResize } = useResizable({
        storageKey: "recPerf30MatSize",
        scale: scale,
        defaultSize: { w: 43.26, h: 17 },
    });*/

    return (
        <div className={styles.outerBlock}
            onClick={handleClick}
            ref={ref}
            style={stylesForMove}
        >
            <p>Recent Performance 30 Matches</p>
        </div>
    )
}

export default RecentPerformance30Matches;