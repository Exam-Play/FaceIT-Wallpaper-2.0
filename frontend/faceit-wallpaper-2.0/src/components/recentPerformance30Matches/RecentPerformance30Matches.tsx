import { useMemo } from 'react';
import styles from './recentPerformance30Matches.module.scss';

import { HiOutlineArrowsExpand } from 'react-icons/hi';
import { HiMiniArrowDownRight } from 'react-icons/hi2';

import { useMovable } from "../../hooks/useMovable";
import { useResizable } from '../../hooks/useResizable';
import { useScale } from '../../hooks/useScale';

import type { ExtendedStats, Performance, SkillConfig } from '../../types/faceitData';

import { getAverageStats, getRightPanelStats } from '../../api/performance';
import { getFaceitLevel } from '../../api/functionsFetch';

import Content from './Content';

function RecentPerformance30Matches({
    isLocked,
    widgetOrder,
    setWidgetOrder,
    matches,
    skills,
    extendedStats
}:{
    isLocked: boolean,
    widgetOrder: string[],
    setWidgetOrder: React.Dispatch<React.SetStateAction<string[]>>,
    matches: Performance[],
    skills: SkillConfig[],
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

    const averageStats = useMemo(() => getAverageStats(matches, [
        'teamEloAvg', 'opponentTeamEloAvg',
        'rating', 'faceitRoundSwingAvg',
        'winRate', 'kills', 'deaths', 'assists', 'kd', 'kr', 'hsPercent', 'adr'
    ]), [matches]);

    const rightPanelStats = useMemo(() => getRightPanelStats(matches, [
        'losses', 'wins', 'longestWinStreak', 'elo', 'eloDelta'
    ]), [matches]);

    const teamEloAvgLevel = useMemo(() => getFaceitLevel(
        Math.round(((averageStats.teamEloAvg ?? 0) + (averageStats.opponentTeamEloAvg ?? 0)) / 2),
        skills
    ), [averageStats]);

    const ratingHistory = matches
        .map(m => m.rating)
        .filter((v): v is number => typeof v === 'number' && !Number.isNaN(v))

    const swingHistory = matches
        .map(m => m.faceitRoundSwingAvg)
        .filter((v): v is number => typeof v === 'number' && !Number.isNaN(v))

    const winHistory = matches.map(m => m.result === 'W');
    const eloHistory = matches.map(m => m.isCalibrating ? null : m.elo + m.eloDelta);

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
                averageStats={averageStats}
                rightPanelStats={rightPanelStats}
                skills={skills}
                extendedStats={extendedStats}
                teamEloAvgLevel={teamEloAvgLevel.skillLevel}
                ratingHistory={ratingHistory}
                swingHistory={swingHistory}
                eloHistory={eloHistory}
                winHistory={winHistory}
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