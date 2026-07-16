import styles from './mainElo.module.scss';

import { useMovable } from "../../hooks/useMovable";

function MainElo({ isLocked }: { isLocked: boolean }) {
    const { stylesForMove, ref, handleClick } = useMovable({
        storageKey: "mainEloPos",
        pos: {
            x: window.innerWidth / 4,
            y: window.innerHeight / 4
        },
        isLocked: isLocked
    });

    return (
        <div className={styles.outerBlock}
            onClick={handleClick}
            ref={ref}
            style={stylesForMove}
        >
            <p>Main Elo</p>
        </div>
    )
}

export default MainElo
