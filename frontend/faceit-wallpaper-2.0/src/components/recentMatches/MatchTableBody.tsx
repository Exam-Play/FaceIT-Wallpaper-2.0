import MatchElem from './MatchElem';
import styles from './recentMatches.module.scss';

import type { Match } from '../../types/wallpaper';
import { mapMatch } from '../../api/functionsFetch';

import { useEffect, useState } from 'react';
import { getRecentMatchesInfo, getPlayerId } from '../../api/apiFetch';

function MatchTableBody({
    nickname
}:{
    nickname: string
}){
    const [matches, setMatches] = useState<any>([]);

    useEffect(() => {
        async function loadPlayer() {
            try {
                const playerId = await getPlayerId(nickname);

                const data = await getRecentMatchesInfo(playerId);

                setMatches(data.slice(0, 5).map((r: Match) => mapMatch(r)));
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
            {matches.map((match : Match) => (
                <MatchElem key={match.id} match={match} />
            ))}
        </div>
    )
}

export default MatchTableBody;