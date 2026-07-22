import styles from './recentMatches.module.scss';
import type { Match } from '../../types/wallpaper';

const RATING_MIN = 0.55;
const RATING_MAX = 1.79;

function getRatingRatio(rating: number) {
    const ratio = (rating - RATING_MIN) / (RATING_MAX - RATING_MIN);
    return Math.min(Math.max(ratio, 0), 1);
}

function MatchElem({ match }: { match: Match }) {
    const {
        date, time, result, ownScore, enemyScore,
        level, elo, eloDelta, rating,
        kills, deaths, assists, kd, adr, map
    } = match;
 
    const eloDirection = eloDelta >= 0 ? 'up' : 'down';
 
    return (
        <div className={styles.matchElem} data-result={result}>
            <div className={styles.matchTableCell}>
                <div className={styles.flexColumn}>
                    <span>{date}</span>
                    <span style={{ color: 'rgb(167, 167, 167)', fontSize: '12px' }}>{time}</span>
                </div>
            </div>
 
            <div className={styles.matchTableCell}>
                <div className={styles.scoreCell}>
                    <div className={styles.resultBadge} data-result={result}>L</div>
                    <span className={styles.scoreText}>
                        <span className={styles.ownScore} data-result={result}>{ownScore}</span>
                        {' : '}
                        {enemyScore}
                    </span>
                </div>
            </div>
 
            <div className={styles.matchTableCell}>
                <div className={styles.matchMeta}>
                    {level && 
                        <img className={styles.level}
                            src={`./images/levels/${level}.svg`}
                            alt={`Skill level ${level}`}
                        />
                    }

                    <span className={styles.eloBlock}>
                        {elo.toLocaleString()}
                        {eloDelta !== 0 &&
                            <span className={styles.eloDelta} data-direction={eloDirection}>
                                {eloDirection === 'up' ?
                                    <svg viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg" height="12" width="12">
                                        <path d="M0 6l1.414 1.414L5 3.828V14h2V3.828l3.586 3.586L12 6 6 0 0 6z" fill="currentColor"></path>
                                    </svg> :
                                    <svg viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg" height="12" width="12">
                                        <path d="M0 8l1.414-1.414L5 10.172V0h2v10.172l3.586-3.586L12 8l-6 6-6-6z" fill="currentColor"></path>
                                    </svg>
                                }
                                {Math.abs(eloDelta)}
                            </span>
                        }
                    </span>
                </div>
            </div>
 
            <div className={styles.matchTableCell}>
                <div className={styles.wrapperRating}
                    data-low={rating <= 0.89}
                    data-good={rating >= 1.30 && rating <= 1.79}
                    data-high={rating >= 1.80}
                >
                    <span className={styles.ratingBox}>
                        {rating.toFixed(2)}
                    </span>
                    <div className={styles.borderCustom} style={{ '--rating-ratio': getRatingRatio(rating) } as React.CSSProperties}></div>
                </div>
            </div>
 
            <div className={styles.matchTableCell} style={{fontFamily: 'Play-Regular', fontWeight: 'normal'}}>
                {kills} / {deaths} / {assists}
            </div>
            <div className={styles.matchTableCell} style={{fontFamily: 'Play-Regular', fontWeight: 'normal'}}>
                {kd.toFixed(2)}
            </div>
            <div className={styles.matchTableCell} style={{fontFamily: 'Play-Regular', fontWeight: 'normal'}}>
                {adr.toFixed(1)}
            </div>
 
            <div className={styles.matchTableCell}>
                <div className={styles.mapCell}>
                    <img src={`./images/map_icons/${map}.svg`} />
                    {map.replace('de_', '').toUpperCase().charAt(0) + map.slice(4).replaceAll(/([a-zA-Z])(\d)/g, '$1 $2')}
                </div>
            </div>
        </div>
    )
}

export default MatchElem;