import { RATING_LOW, RATING_GOOD, RATING_HIGH, RATING_MIN, RATING_MAX } from '../../types/faceitData.ts';
import styles from '../recentMatches/recentMatches.module.scss';

function getRatingRatio(rating: number): number {
    const ratio = (rating - RATING_MIN) / (RATING_MAX - RATING_MIN);
    return Math.min(Math.max(ratio, 0), 1);
}

function RatingBadge({
    rating,
    style
}:{
    rating: number
    style?: React.CSSProperties;
}){
    return (
        <div className={styles.wrapperRating}
            data-low={rating <= RATING_LOW}
            data-good={rating >= RATING_GOOD[0] && rating <= RATING_GOOD[1]}
            data-high={rating >= RATING_HIGH}
            style={style}
        >
            <span className={styles.ratingBox}>
                {rating.toFixed(2)}
            </span>
            <div
                className={styles.borderCustom}
                style={{ '--rating-ratio': getRatingRatio(rating) } as React.CSSProperties}
            ></div>
        </div>
    );
}

export default RatingBadge;