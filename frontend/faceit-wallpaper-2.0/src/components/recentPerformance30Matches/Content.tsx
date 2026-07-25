import styles from './recentPerformance30Matches.module.scss';

import type { ExtendedStats, SkillConfig } from '../../types/faceitData';

import Rating from './mainStats/Rating';
import Consistency from './mainStats/Consistency';
import AvgSwing from './mainStats/AvgSwing';
import RightPanel from './RightPanel';

function Content({
    averageStats,
    rightPanelStats,
    skills,
    extendedStats,
    teamEloAvgLevel,
    ratingHistory,
    swingHistory
}: {
    averageStats: Record<string, number | null>,
    rightPanelStats: Record<string, number | null>,
    skills: SkillConfig[],
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
                    <span>{Math.round(((averageStats.teamEloAvg ?? 0) + (averageStats.opponentTeamEloAvg ?? 0)) / 2)}</span>
                    <p>Avg skill level of Match</p>
                </div>
            </div>

            <div className={styles.mainStats}>
                <Rating averageStats={averageStats} ratingHistory={ratingHistory} />

                <AvgSwing averageStats={averageStats} swingHistory={swingHistory} />

                <Consistency extendedStats={extendedStats} />
            </div>

            <div className={styles.chartContainer}>
                <div className={styles.chartContent}>
                    <RightPanel rightPanelStats={rightPanelStats} skills={skills} />
                </div>
            </div>

            <div className={styles.additionalStats}>
                <div className={styles.addStat}>
                    <span>{averageStats.winRate ?? 0}%</span>
                    <p>Win rate</p>
                </div>
                <div className={styles.addStat}>
                    <span>{averageStats.kills ?? 0} / {averageStats.deaths ?? 0} / {averageStats.assists ?? 0}</span>
                    <p>K/D/A</p>
                </div>
                <div className={styles.addStat}>
                    <span>{averageStats.kd ?? '0.00'}</span>
                    <p>K/D</p>
                </div>
                <div className={styles.addStat}>
                    <span>{averageStats.kr ?? '0.00'}</span>
                    <p>K/R</p>
                </div>
                <div className={styles.addStat}>
                    <span>{averageStats.hsPercent ?? 0}%</span>
                    <p>HS%</p>
                </div>
                <div className={styles.addStat}>
                    <span>{averageStats.adr ?? '0.0'}</span>
                    <p>ADR</p>
                </div>
            </div>
        </div>
    );
}

export default Content;