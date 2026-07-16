import styles from './recentPerformance30Matches.module.scss';

import { useMovable } from "../../hooks/useMovable";

function RecentPerformance30Matches({ isLocked }: { isLocked: boolean }) {
    const { stylesForMove, ref, handleClick } = useMovable({
        storageKey: "recPerf30MatPos",
        pos: {
            x: window.innerWidth / 2,
            y: window.innerHeight / 2
        },
        isLocked: isLocked
    });

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