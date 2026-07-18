import { useState, useEffect } from 'react';
import { HiMiniArrowDownRight } from "react-icons/hi2";

import { useMovable } from "../../hooks/useMovable";
import { useResizable } from "../../hooks/useResizable"

import { getRegionName, getCountryFlag } from '../../types/regionCountryFlag'

import { getMainEloInfo } from "../../api/mainElo";

import styles from './mainElo.module.scss';

import Rank from './Rank';

const SIZE_STORAGE_KEY = "mainEloSize";
const DEFAULT_SIZE = { w: 25, h: 20 };

function MainElo({
    isLocked,
    widgetOrder,
    setWidgetOrder,
    nickname
}:{
    isLocked: boolean,
    widgetOrder: string[],
    setWidgetOrder: React.Dispatch<React.SetStateAction<string[]>>,
    nickname: string
}){
    const { stylesForMove, ref, handleClick } = useMovable({
        storageKey: "mainEloPos",
        pos: {
            x: window.innerWidth / 4,
            y: window.innerHeight / 4
        },
        isLocked: isLocked,
        widgetOrder: widgetOrder,
        setWidgetOrder: setWidgetOrder
    });

    const { size, isResizing, toggleResize } = useResizable({
        storageKey: SIZE_STORAGE_KEY,
        defaultSize: DEFAULT_SIZE,
    });

    const [player, setPlayer] = useState<any>(null);

    useEffect(() => {
        async function loadPlayer() {
            try {
                const data = await getMainEloInfo(nickname);

                setPlayer(data);
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

    const matches = player?.matches;
    const wins = player?.win_rate;

    const elo = player?.elo;
    const level = player?.level;

    const regionName = getRegionName(player?.region).toLowerCase().replaceAll(' ', '_');
    const countryCode = player?.country;

    const countryRank = player?.country_rank;
    const regionRank = player?.region_rank;

    return (
        <div className={styles.outerBlock}
            onClick={handleClick}
            ref={ref}
            style={{
                ...stylesForMove,
                '--outer-w': `${size.w}vw`,
                '--outer-h': `${size.h}vh`,
            } as React.CSSProperties}
        >
            <div className={`${styles.card} ${styles[`level${level}`]}`}>
                <div className={styles.center}>
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

                    <span className={styles.elo}>{elo?.toLocaleString() ?? "..."}</span>
                </div>

                <div className={styles.footer}>
                    <div className={styles.stats}>
                        <span><b>{matches?.toLocaleString() ?? "..."}</b> matches</span>
                        <span><b>{wins?.toFixed(1) ?? "..."}</b> wins</span>
                    </div>

                    <div className={styles.ranks}>
                        <Rank
                            code={countryCode}
                            url={countryCode && `https://flagcdn.com/${getCountryFlag(countryCode.toLowerCase())}.svg`}
                            rank={countryRank}
                        />

                        <Rank
                            code={regionName}
                            url={regionName && `https://cdn-frontend.faceit-cdn.net/web-next/_next/static/media/${regionName}.svg`}
                            rank={regionRank}
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
        </div>
    )
}

export default MainElo;