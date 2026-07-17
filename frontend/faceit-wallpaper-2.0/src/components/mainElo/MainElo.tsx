import styles from './mainElo.module.scss';

import { useMovable } from "../../hooks/useMovable";

function MainElo({
    isLocked,
    widgetOrder,
    setWidgetOrder
}:{
    isLocked: boolean,
    widgetOrder: string[],
    setWidgetOrder: React.Dispatch<React.SetStateAction<string[]>>
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

export default MainElo;