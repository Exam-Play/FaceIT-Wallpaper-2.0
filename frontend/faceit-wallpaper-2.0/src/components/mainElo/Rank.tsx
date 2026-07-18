import styles from './mainElo.module.scss';

function Rank({
    code,
    url,
    rank
}:{
    code: string,
    url: string,
    rank: string
}) {
    return (
        <div className={styles.rank}>
            <div className={styles.flag}>
                {code && (
                    <img
                        src={url}
                        alt={code}
                    />
                )}
            </div>
            <span>{rank?.toLocaleString().replaceAll(' ', ',') ?? "..."}</span>
        </div>
    )
}

export default Rank
