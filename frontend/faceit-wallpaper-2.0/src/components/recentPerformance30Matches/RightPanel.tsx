import { getFaceitLevel } from '../../api/functionsFetch';
import type { SkillConfig } from '../../types/faceitData';
import styles from './recentPerformance30Matches.module.scss';

function RightPanel({
    rightPanelStats,
    skills
}:{
    rightPanelStats: Record<string, number | null>,
    skills: SkillConfig[]
}){
    const level = getFaceitLevel(rightPanelStats.elo ?? 0, skills);

    return (
        <div className={styles.rightPanel}>
            <div className={styles.winLoseContent}>
                <div className={styles.winLoseBlock}>
                    <div className={styles.win}>W</div>
                    <span className={styles.winText}>{rightPanelStats.wins ?? 0}</span>
                </div>
                <div style={{color: '#a7a7a7'}}>/</div>
                <div className={styles.winLoseBlock}>
                    <div className={styles.lose}>L</div>
                    <span className={styles.loseText}>{rightPanelStats.losses ?? 0}</span>
                </div>
            </div>
            <div className={styles.eloWinStreakContent}>
                <div className={styles.eloBar}>
                    <div className={styles.eloIcons}>
                        {(level.skillLevel && rightPanelStats.elo) ?
                            <img className={styles.level}
                                src={`./images/levels/${level.skillLevel}.svg`}
                                alt={`Skill level ${level.skillLevel}`}
                            />
                            : <img className={styles.level} src={`./images/levels/-1.png`} alt={`Skill level Unranked`}/>
                        }

                        {(level.skillLevel && rightPanelStats.elo) ?
                            <img className={styles.level}
                                src={`./images/levels/${level.skillLevel + 1}.svg`}
                                alt={`Skill level ${level.skillLevel + 1}`}
                            />
                            : <img className={styles.level} src={`./images/levels/-1.png`} alt={`Skill level Unranked`}/>
                        }
                    </div>
                    <div className={styles.progressBar}>
                        <div className={styles.progress}
                            style={{
                                '--outer-progress': `${
                                    ((rightPanelStats.elo ?? 0) - level.min)
                                    / (level.max - level.min) * 100}%`,
                            } as React.CSSProperties}
                        ></div>
                    </div>
                    <div className={styles.elos}>
                        <span>{level.min ?? 0}</span>
                        <p>{rightPanelStats.elo ?? 0}</p>
                        <span>{level.max ?? 0}</span>
                    </div>
                </div>
                <div className={styles.eloChange}>
                    <span>Elo change</span>
                    <p>{(rightPanelStats.eloDelta ?? 0) >= 0 ? '+' : null}{rightPanelStats.eloDelta}</p>
                </div>
                <div className={styles.customBorder}/>
                <div className={styles.winStreak}>
                    <span>Longest Win Streak</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 23" height="12" width="12">
                        <path fill="#F50" d="M16.14 16.14C15.852 18.971 12.918 22 8.677 22S1 18.565 1 14.332c0-2.387.516-3.803 1.635-5.446.352 1.768 1.683 2.465 1.683 2.465S3.708 4.019 11.024 2c-.877 4.006 2.316 5.008 2.519 9.664.696-1.925 1.91-1.91 1.91-1.91-.494 2.113 1.056 2.762.688 6.385z"></path>
                        <path fill="#C40" fillRule="evenodd" d="M16.887 16.215c-.332 3.252-3.623 6.535-8.21 6.535C4.02 22.75.25 18.98.25 14.332c0-2.543.565-4.105 1.765-5.868l1.007-1.478.349 1.753c.062.312.16.58.277.81.089-.683.258-1.507.575-2.374.829-2.269 2.667-4.813 6.601-5.898l1.198-.33-.266 1.213c-.38 1.737.095 2.789.784 4.074l.15.28c.464.857.99 1.829 1.311 3.099.123-.105.246-.193.369-.267.271-.165.52-.25.714-.295a1.908 1.908 0 01.355-.047h.022l-.009.75s-.369-.004-.816.314a2.396 2.396 0 00-.455.428c-.227.275-.451.652-.638 1.168a9.419 9.419 0 00-.155-1.358c-.273-1.427-.836-2.47-1.361-3.443-.674-1.247-1.284-2.375-1.132-4.044A6.64 6.64 0 0111.024 2c-.283.078-.554.164-.813.257-4.985 1.789-5.785 6.235-5.891 8.17-.032.571-.002.924-.002.924s-.363-.19-.76-.624a3.738 3.738 0 01-.623-.927 3.922 3.922 0 01-.3-.914c-.197.29-.376.573-.536.855C1.35 11.06 1 12.367 1 14.331 1 18.566 4.435 22 8.676 22s7.175-3.028 7.465-5.86c.196-1.933-.153-3.02-.447-3.934-.184-.57-.346-1.074-.34-1.675.003-.24.033-.495.098-.777l.01-.75.933.012-.212.909c-.182.779-.027 1.265.234 2.08l.047.148c.298.937.62 2.114.423 4.062z" clipRule="evenodd"></path>
                        <path fill="#FFDA4F" d="M13 18.484C12.826 20.184 11.066 22 8.521 22a4.603 4.603 0 01-4.605-4.6c0-1.433.31-2.283.98-3.268.212 1.06 1.01 1.478 1.01 1.478S5.54 11.211 9.93 10c-.526 2.404 1.39 3.005 1.511 5.798.418-1.155 1.146-1.145 1.146-1.145-.296 1.267.634 1.657.413 3.83z"></path>
                    </svg>
                    <p>{rightPanelStats.longestWinStreak ?? 0}</p>
                </div>
            </div>
        </div>
    )
}

export default RightPanel;