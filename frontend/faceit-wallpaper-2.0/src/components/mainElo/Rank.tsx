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
                {!code &&
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="20" viewBox="0 0 30 20">
                        <rect width="30" height="20" fill="#ffffff"/>
                        <circle cx="15" cy="10" r="5.8" fill="none" stroke="#b7b7b7" strokeWidth="0.35"/>
                        <circle cx="15" cy="10" r="5" fill="#3FA9F5"/>
                        <circle cx="15" cy="10" r="3.2" fill="none" stroke="#ffffff" strokeWidth="0.45"/>
                        <g fill="#F4C542">
                            <circle cx="15" cy="3.4" r="0.38"/>
                            <circle cx="19.7" cy="5.3" r="0.38"/>
                            <circle cx="21.6" cy="10" r="0.38"/>
                            <circle cx="19.7" cy="14.7" r="0.38"/>
                            <circle cx="15" cy="16.6" r="0.38"/>
                            <circle cx="10.3" cy="14.7" r="0.38"/>
                            <circle cx="8.4" cy="10" r="0.38"/>
                            <circle cx="10.3" cy="5.3" r="0.38"/>
                        </g>
                    </svg>
                }
                {code && (
                    <img
                        src={url}
                        alt={code}
                    />
                )}
            </div>
            <span>{rank?.toLocaleString().replaceAll(' ', ',') ?? "0"}</span>
        </div>
    )
}

export default Rank
