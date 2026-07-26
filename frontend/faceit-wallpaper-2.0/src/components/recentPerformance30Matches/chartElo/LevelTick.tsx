import styles from '../recentPerformance30Matches.module.scss';

import { getFaceitLevel } from "../../../api/functionsFetch";

function LevelTick({ x, y, payload, skills }: any) {
    const level = getFaceitLevel(payload.value, skills).skillLevel;
    return (
        <foreignObject x={x - 67} y={y - 16} width={122} height={32}>
            <div className={styles.tickIconWrapper}>
                <span className={styles.skillIconWrapper}>
                    {level ? (
                        <img
                            className={styles.level}
                            src={`./images/levels/${level}.svg`}
                            alt={`Skill level ${level}`}
                        />
                    ) : (
                        <img
                            className={styles.level}
                            src="./images/levels/-1.png"
                            alt="Skill level Unranked"
                        />
                    )}
                    <span className={styles.skillBadge}>{payload.value}</span>
                </span>
            </div>
        </foreignObject>
    );
}

export default LevelTick;