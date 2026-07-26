import type { EloPoint } from "../../../types/faceitData";

function ResultTick({ x, y, payload, data, tickWidth = 19.375 }: any) {
    const point: EloPoint | undefined = data[payload.value];
    if (!point) return null;

    const fill = point.isPlaceholder
        ? '#5D5D5D'
        : (point.isWin ? '#05FF00' : '#EF0000');

    return (
        <g transform={`translate(${x},${y})`}>
            <rect
                x={-tickWidth / 2}
                y={0}
                width={tickWidth}
                height={4}
                rx={2}
                fill={fill}
            />
        </g>
    );
}

export default ResultTick;