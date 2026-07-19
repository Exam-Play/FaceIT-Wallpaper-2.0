import MatchElem from './MatchElem';
import styles from './recentMatches.module.scss';

import type { Match } from '../../types/wallpaper';
import { useEffect, useState } from 'react';
import { getRecentMatchesInfo } from '../../api/apiFetch';

function MatchTableBody({
    nickname
}:{
    nickname: string
}){
    const [matches, setMatches] = useState<Match[]>([]);

    useEffect(() => {
        async function loadPlayer() {
            try {
                const data = await getRecentMatchesInfo(nickname);

                setMatches(data);
            } catch (error) {
                console.error(error);
            }
        }

        loadPlayer();

        const interval = setInterval(() => {
            loadPlayer();
        }, 30000);

        return () => clearInterval(interval);
    }, [nickname]);

    return (
        <div className={styles.matchTableBody}>
            {matches.map((match) => (
                <MatchElem key={match.id} match={match} />
            ))}
        </div>
    )
}

export default MatchTableBody;