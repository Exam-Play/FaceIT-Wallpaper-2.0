import styles from './recentMatches.module.scss';

function EmptyMatchElem() {
    return (
        <div className={styles.matchElem} data-empty="true">
            <div className={styles.matchTableCell}>
                <span className={styles.emptyDash}>---</span>
            </div>
            <div className={styles.matchTableCell}>
                <span className={styles.emptyDash}>---</span>
            </div>
            <div className={styles.matchTableCell}>
                <span className={styles.emptyDash}>---</span>
            </div>
            <div className={styles.matchTableCell}>
                <span className={styles.emptyDash}>---</span>
            </div>
            <div className={styles.matchTableCell}>
                <span className={styles.emptyDash}>---</span>
            </div>
            <div className={styles.matchTableCell}>
                <span className={styles.emptyDash}>---</span>
            </div>
            <div className={styles.matchTableCell}>
                <span className={styles.emptyDash}>---</span>
            </div>
            <div className={styles.matchTableCell}>
                <span className={styles.emptyDash}>---</span>
            </div>
        </div>
    );
}

export default EmptyMatchElem;