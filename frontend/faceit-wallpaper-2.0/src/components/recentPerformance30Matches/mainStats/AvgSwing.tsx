import styles from '../recentPerformance30Matches.module.scss';
import Sparkline from '../Sparkline';

function AvgSwing({
    stats,
    swingHistory
}:{
    stats: Record<string, number | null>,
    swingHistory: number[]
}) {
    const roundSwing = stats.faceitRoundSwingAvg ?? 0;

    function getSwingColor(roundSwing: number): string {
        if (roundSwing * 100 < 0) return 'rgba(255, 39, 39, 1)';
        if (roundSwing * 100 >= 15) return 'rgba(106, 222, 67, 1)';
        return 'rgba(255, 255, 255, 1)';
    }

    return (
        <div className={`${styles.cell} ${styles.avgSwing}`}>
            <div>
                <span className={styles.swingValue}
                    data-negative={roundSwing * 100 < 0}
                    data-good={roundSwing * 100 >= 15}
                >
                    {roundSwing >= 0 ? '+' : ''}{(roundSwing * 100).toFixed(2)}%
                </span>
                <p>Avg Swing</p>
            </div>
            <div className={styles.sparkline}
                data-negative={roundSwing * 100 < 0}
                data-good={roundSwing * 100 >= 15}
            >
                <Sparkline data={swingHistory} color={getSwingColor(roundSwing)} />
            </div>
        </div>
    )
}

export default AvgSwing;