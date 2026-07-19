import styles from './recentMatches.module.scss';

import faceitRating from '../../../public/images/matches/faceit_rating.svg'

function MatchTableHead() {
    return (
        <div className={styles.matchTableHead}>
            <div className={styles.matchTableHeadRow}>
                <div className={styles.matchTableCell}>Date</div>
                <div className={styles.matchTableCell}>Score</div>
                <div className={styles.matchTableCell}></div>
                <div className={styles.matchTableCell}>
                    <div className={styles.faceitRating}>
                        <img src={faceitRating} />
                        Rating
                    </div>
                </div>
                <div className={styles.matchTableCell}>K/D/A</div>
                <div className={styles.matchTableCell}>K/D</div>
                <div className={styles.matchTableCell}>ADR</div>
                <div className={styles.matchTableCell}>Map</div>
            </div>
        </div>
    )
}

export default MatchTableHead;