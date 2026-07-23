import MatchElem from './MatchElem';
import styles from './recentMatches.module.scss';

import type { Match } from '../../types/faceitData';

function MatchTableBody({
    matches
}:{
    matches: Match[]
}){
    return (
        <div className={styles.matchTableBody}>
            {matches.map((match : Match) => (
                <MatchElem key={match.id} match={match}/>
            ))}
        </div>
    )
}

export default MatchTableBody;