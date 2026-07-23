import styles from './recentPerformance30Matches.module.scss';

import { HiOutlineArrowsExpand } from 'react-icons/hi';
import { HiMiniArrowDownRight } from 'react-icons/hi2';

import { useMovable } from "../../hooks/useMovable";
import { useResizable } from '../../hooks/useResizable';
import { useScale } from '../../hooks/useScale';

import type { ExtendedStats, Performance } from '../../types/faceitData';
import { averageStats } from '../../api/averagePerformance';
import { useMemo } from 'react';
import { getFaceitLevel } from '../../api/functionsFetch';
import Content from './Content';

function RecentPerformance30Matches({
    isLocked,
    widgetOrder,
    setWidgetOrder,
    matches,
    extendedStats
}:{
    isLocked: boolean,
    widgetOrder: string[],
    setWidgetOrder: React.Dispatch<React.SetStateAction<string[]>>,
    matches: Performance[],
    extendedStats: ExtendedStats
}){
    const { scale, isScaling, toggleScale } = useScale({
        storageKey: "recPerf30MatScale",
        defaultScale: 1,
    });

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

    const { size, isResizing, toggleResize } = useResizable({
        storageKey: "recPerf30MatSize",
        scale: scale,
        defaultSize: { w: 43.26, h: 52 },
    });

    const stats = useMemo(() => averageStats(matches, [
        'teamEloAvg', 'opponentTeamEloAvg',
        'rating', 'faceitRoundSwingAvg',
        'winRate', 'kills', 'deaths', 'assists', 'kd', 'kr', 'hsPercent', 'adr'
    ]), [matches]);

    const teamEloAvgLevel = useMemo(() => getFaceitLevel(
        Math.round(((stats.teamEloAvg ?? 0) + (stats.opponentTeamEloAvg ?? 0)) / 2)
    ), [stats]);

    const ratingHistory = matches
        .map(m => m.rating)
        .filter((v): v is number => typeof v === 'number' && !Number.isNaN(v))

    const swingHistory = matches
        .map(m => m.faceitRoundSwingAvg)
        .filter((v): v is number => typeof v === 'number' && !Number.isNaN(v))
    
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
            <Content
                stats={stats}
                extendedStats={extendedStats}
                teamEloAvgLevel={teamEloAvgLevel}
                ratingHistory={ratingHistory}
                swingHistory={swingHistory}
            />

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

export default RecentPerformance30Matches;