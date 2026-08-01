import MatchElem from './MatchElem';
import EmptyMatchElem from './EmptyMatchElem';
import styles from './recentMatches.module.scss';

import type { Match } from '../../types/faceitData';

const MIN_ROWS = 5;

function MatchTableBody({
    matches
}:{
    matches: Match[]
}){
    const emptyRowsCount = Math.max(0, MIN_ROWS - matches.length);

    return (
        <div className={styles.matchTableBody}>
            {matches.map((match : Match) => (
                <MatchElem key={match.id} match={match}/>
            ))}
            {Array.from({ length: emptyRowsCount }).map((_, index) => (
                <EmptyMatchElem key={`empty-${index}`} />
            ))}
        </div>
    )
}

export default MatchTableBody;