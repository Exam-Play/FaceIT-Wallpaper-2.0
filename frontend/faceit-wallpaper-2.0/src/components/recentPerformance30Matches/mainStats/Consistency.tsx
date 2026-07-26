import { Pie, PieChart } from 'recharts';
import type { ExtendedStats } from '../../../types/faceitData';
import styles from '../recentPerformance30Matches.module.scss';

function Consistency({
    extendedStats
}: {
    extendedStats: ExtendedStats
}) {
    const consistency = extendedStats?.consistency ?? 0;

    const data = [
        { value: consistency, fill: "currentColor" },
        { value: 1 - consistency, fill: "#2E2E2E" },
    ];

    return (
        <div className={`${styles.cell} ${styles.consistency}`}>
            <div>
                <span className={styles.consistencyValue}
                    data-negative={consistency <= 0.30}
                    data-good={consistency >= 0.70}
                >
                    {Math.round(consistency * 100)}%
                </span>
                <p>Consistency</p>
            </div>
            <div className={styles.consistencyRing}
                data-negative={consistency <= 0.30}
                data-good={consistency >= 0.70}
            >
                <PieChart width={54} height={54}>
                    <Pie data={data} dataKey="value"
                        cx="50%" cy="50%"
                        innerRadius={20} outerRadius={24}
                        startAngle={-270} endAngle={90}
                        stroke="none"
                        cornerRadius={4} paddingAngle={4}
                    />
                </PieChart>
            </div>
        </div>
    )
}

export default Consistency;