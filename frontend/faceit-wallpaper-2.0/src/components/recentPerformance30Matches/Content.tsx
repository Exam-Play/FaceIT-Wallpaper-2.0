import styles from './recentPerformance30Matches.module.scss';

import type { ExtendedStats } from '../../types/faceitData';

import Rating from './mainStats/Rating';
import Consistency from './mainStats/Consistency';
import AvgSwing from './mainStats/AvgSwing';

function Content({
    stats,
    extendedStats,
    teamEloAvgLevel,
    ratingHistory,
    swingHistory
}: {
    stats: Record<string, number | null>,
    extendedStats: ExtendedStats,
    teamEloAvgLevel: number,
    ratingHistory: number[],
    swingHistory: number[]
}) {

    return (
        <div className={styles.content}>
            <div className={styles.recentPerf}>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="whiteLowEmphasis" height="20" width="20">
                    <path d="M5 9h3v10H5V9zm5.5-4h3v14h-3V5zm5.5 8h3v6h-3v-6z" fill="currentColor"></path>
                </svg>
                <p>Recent performance</p>
            </div>

            <div className={styles.customBorder}></div>

            <div className={styles.avgEloOfMatch}>
                <p>Last 30 Matches</p>
                <span className={styles.dot}>•</span>
                <div className={styles.avgEloOfMatchFlex}>
                    {teamEloAvgLevel &&
                        <img className={styles.teamEloAvgLevel}
                            src={`./images/levels/${teamEloAvgLevel}.svg`}
                            alt={`Skill level ${teamEloAvgLevel}`}
                        />
                    }
                    <span>{Math.round(((stats.teamEloAvg ?? 0) + (stats.opponentTeamEloAvg ?? 0)) / 2)}</span>
                    <p>Avg skill level of Match</p>
                </div>
            </div>

            <div className={styles.mainStats}>
                <Rating stats={stats} ratingHistory={ratingHistory} />

                <AvgSwing stats={stats} swingHistory={swingHistory} />

                <Consistency extendedStats={extendedStats} />
            </div>

            <div className={styles.additionalStats}>
                <div className={styles.addStat}>
                    <span>{stats.winRate}%</span>
                    <p>Win rate</p>
                </div>
                <div className={styles.addStat}>
                    <span>{stats.kills} / {stats.deaths} / {stats.assists}</span>
                    <p>K/D/A</p>
                </div>
                <div className={styles.addStat}>
                    <span>{stats.kd}</span>
                    <p>K/D</p>
                </div>
                <div className={styles.addStat}>
                    <span>{stats.kr}</span>
                    <p>K/R</p>
                </div>
                <div className={styles.addStat}>
                    <span>{stats.hsPercent}%</span>
                    <p>HS%</p>
                </div>
                <div className={styles.addStat}>
                    <span>{stats.adr}</span>
                    <p>ADR</p>
                </div>
            </div>
        </div>
    );
}

export default Content;