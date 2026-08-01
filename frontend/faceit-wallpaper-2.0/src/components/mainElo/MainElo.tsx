import { HiMiniArrowDownRight } from "react-icons/hi2";
import { HiOutlineArrowsExpand } from "react-icons/hi";

import { useMovable } from "../../hooks/useMovable";
import { useResizable } from "../../hooks/useResizable"
import { useScale } from "../../hooks/useScale";

import { getRegionName, getCountryFlag } from '../../types/regionCountryFlag'

import styles from './mainElo.module.scss';

import Rank from './Rank';
import type { MainEloInfo } from '../../types/faceitData';

function MainElo({
    player,
    isLocked,
    widgetOrder,
    setWidgetOrder
}:{
    player: MainEloInfo,
    isLocked: boolean,
    widgetOrder: string[],
    setWidgetOrder: React.Dispatch<React.SetStateAction<string[]>>
}){
    const { scale, isScaling, toggleScale } = useScale({
        storageKey: "mainEloScale",
        defaultScale: 1,
    });

    const { stylesForMove, ref, handleClick } = useMovable({
        storageKey: "mainEloPos",
        pos: {
            x: window.innerWidth / 15,
            y: window.innerHeight / 5
        },
        scale: scale,
        isLocked: isLocked,
        widgetOrder: widgetOrder,
        setWidgetOrder: setWidgetOrder
    });

    const { size, isResizing, toggleResize } = useResizable({
        storageKey: "mainEloSize",
        scale: scale,
        defaultSize: { w: 43.2, h: 18.31 },
    });

    const matches = player.matches ?? 0;
    const wins = player.win_rate ?? 0;

    const elo = player.elo;
    const level = player.level;

    const regionName = getRegionName(player.region ?? 0).toLowerCase().replaceAll(' ', '_');
    const countryCode = player.country ?? 0;

    const countryRank = player.country_rank ?? 0;
    const regionRank = player.region_rank ?? 0;

    return (
        <div className={styles.outerBlock}
            onClick={handleClick}
            ref={ref}
            style={{
                ...stylesForMove,
                '--outer-w': `${size.w}vw`,
                '--outer-h': `${size.h}vh`,
                '--outer-scale': scale,
            } as React.CSSProperties}
        >
            <div className={`${styles.card} ${styles[`level${level}`]}`}>
                <div className={styles.center}>
                    {!level &&
                        <img className={styles.level}
                            src={`./images/levels/-1.png`}
                            alt={`Skill level Unranked`}
                        />
                    }

                    {level && (regionRank > 1000 || regionRank === 0) && 
                        <img className={styles.level}
                            src={`./images/levels/${level}.svg`}
                            alt={`Skill level ${level}`}
                        />
                    }

                    {regionRank <= 1000 && regionRank !== 0 &&
                        <img className={styles.level}
                            src={`./images/levels/11.svg`}
                            alt={`Challenger rank`}
                        />
                    }

                    <span className={styles.elo}>{elo ?? "---"}</span>
                </div>

                <div className={styles.footer}>
                    <div className={styles.stats}>
                        <span><b>{matches?.toLocaleString() ?? "0"}</b> matches</span>
                        <span><b>{wins?.toFixed(1) ?? "0.0"}%</b> wins</span>
                    </div>

                    <div className={styles.ranks}>
                        <Rank
                            code={countryCode}
                            url={countryCode && `https://flagcdn.com/${getCountryFlag(countryCode.toLowerCase())}.svg`}
                            rank={countryRank.toString()}
                        />

                        <Rank
                            code={regionName}
                            url={regionName && `https://cdn-frontend.faceit-cdn.net/web-next/_next/static/media/${regionName}.svg`}
                            rank={regionRank.toString()}
                        />
                    </div>
                </div>
            </div>

            {!isLocked && (
                <HiMiniArrowDownRight
                    color='white'
                    className={styles.resizeHandle}
                    data-active={isResizing}
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleResize(e.currentTarget.closest(`.${styles.outerBlock}`));
                    }}
                />
            )}

            {!isLocked && (
                <HiOutlineArrowsExpand
                    color='white'
                    className={styles.scaleHandle}
                    data-active={isScaling}
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleScale(e.currentTarget.closest(`.${styles.outerBlock}`));
                    }}
                />
            )}
        </div>
    )
}

export default MainElo;