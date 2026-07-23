import styles from '../recentPerformance30Matches.module.scss';

import RatingBadge from '../../ratingBadge/RatingBadge';
import { RATING_GOOD, RATING_HIGH, RATING_LOW } from '../../../types/faceitData';

import Sparkline from '../Sparkline';

function Rating({
    stats,
    ratingHistory
}:{
    stats: Record<string, number | null>,
    ratingHistory: number[],
}) {
    const rating = stats.rating ?? 0;
    
    function getRatingColor(rating: number): string {
        if (rating <= RATING_LOW) return 'rgba(255, 39, 39, 1)';
        if (rating >= RATING_GOOD[0] && rating <= RATING_GOOD[1]) return 'rgba(106, 222, 67, 1)';
        if (rating >= RATING_HIGH) return 'rgba(255, 115, 0, 1)';
        return 'rgba(255, 255, 255, 1)';
    }

    return (
        <div className={`${styles.cell} ${styles.rating}`}>
            <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
                <img src={'./images/matches/faceit_rating.svg'} />
                <RatingBadge
                    rating={rating}
                    style={{
                        minInlineSize: '52px',
                        maxInlineSize: '52px',
                        minBlockSize: '29px',
                        maxBlockSize: '29px',
                        fontSize: '22px'
                    }}
                />
            </div>
            
            <div className={styles.sparkline}
                data-negative={rating <= RATING_LOW}
                data-good={(rating >= RATING_GOOD[0] && rating <= RATING_GOOD[1])}
                data-high={rating >= RATING_HIGH}
            >
                <Sparkline data={ratingHistory} color={getRatingColor(rating)} />
            </div>
        </div>
    )
}

export default Rating
