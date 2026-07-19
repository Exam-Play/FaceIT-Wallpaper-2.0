import { HiMiniArrowDownRight } from "react-icons/hi2";
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

    const { size, isResizing, toggleResize } = useResizable({
        storageKey: "recentMatSize",
        defaultSize: { w: 55, h: 20 }
    });

    return (
        <div className={styles.outerBlock}
            onClick={handleClick}
            ref={ref}
            style={{
                ...stylesForMove,
                '--outer-w': `${size.w}vw`,
                '--outer-h': `${size.h}vh`,
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
        </div>
    )
}

export default RecentMatches;