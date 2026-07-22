import { HiMiniArrowDownRight } from "react-icons/hi2";
import { HiOutlineArrowsExpand } from "react-icons/hi";

import { useScale } from "../../hooks/useScale";
import { useMovable } from "../../hooks/useMovable";
import { useResizable } from "../../hooks/useResizable";

import styles from './recentMatches.module.scss';
import MatchTableHead from "./MatchTableHead";
import MatchTableBody from "./MatchTableBody";

function RecentMatches({
    isLocked,
    widgetOrder,
    setWidgetOrder,
    nickname
}:{
    isLocked: boolean,
    widgetOrder: string[],
    setWidgetOrder: React.Dispatch<React.SetStateAction<string[]>>,
    nickname: string
}) {
    const { scale, isScaling, toggleScale } = useScale({
        storageKey: "recentMatScale",
        defaultScale: 1,
    });

    const { stylesForMove, ref, handleClick } = useMovable({
        storageKey: "recentMatPos",
        pos: {
            x: window.innerWidth / 15,
            y: window.innerHeight / 2.5
        },
        scale: scale,
        isLocked: isLocked,
        widgetOrder: widgetOrder,
        setWidgetOrder: setWidgetOrder
    });

    const { size, isResizing, toggleResize } = useResizable({
        storageKey: "recentMatSize",
        scale: scale,
        min: { w: 24, h: 5 },
        defaultSize: { w: 43.26, h: 32 }
    });

    return (
        <div className={styles.outerBlock}
            onClick={handleClick}
            ref={ref}
            style={{
                ...stylesForMove,
                '--outer-w': `${size.w}vw`,
                '--outer-h': `${size.h}vh`,
                '--outer-scale': scale,
            } as React.CSSProperties}
        >
            <div className={styles.matchTable}>
                <MatchTableHead />
                <MatchTableBody nickname={nickname} />
            </div>

            {!isLocked && (
                <HiMiniArrowDownRight
                    color='white'
                    className={styles.resizeHandle}
                    data-active={isResizing}
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleResize(e.currentTarget.closest(`.${styles.outerBlock}`));
                    }}
                />
            )}

            {!isLocked && (
                <HiOutlineArrowsExpand
                    color='white'
                    className={styles.scaleHandle}
                    data-active={isScaling}
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleScale(e.currentTarget.closest(`.${styles.outerBlock}`));
                    }}
                />
            )}
        </div>
    )
}

export default RecentMatches;