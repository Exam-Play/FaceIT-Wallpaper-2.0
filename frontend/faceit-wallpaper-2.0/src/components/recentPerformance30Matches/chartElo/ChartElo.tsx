import { useMemo, useState } from 'react';
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    ReferenceLine
} from 'recharts';

import styles from '../recentPerformance30Matches.module.scss';
import type { EloPoint, SkillConfig } from '../../../types/faceitData';
import ResultTick from './ResultTick';
import LevelTick from './LevelTick';

function ChartElo({
    skills,
    eloHistory,
    winHistory,
    seasonResetIndex,
    seasonFinishCalbrating,
    seasonResetLabel = 'Season 8'
}: {
    skills: SkillConfig[]
    eloHistory: (number | null)[];
    winHistory: boolean[];
    seasonResetIndex?: number;
    seasonFinishCalbrating?: number;
    seasonResetLabel?: string;
}) {
    const [chartWidth, setChartWidth] = useState(0);

    const hasData = eloHistory.some(v => v !== null);

    const PLACEHOLDER_VALUE = 1150;
    const TOTAL_SLOTS = 30;

    const data: EloPoint[] = useMemo(() => {
        if (!hasData) {
            return Array.from({ length: TOTAL_SLOTS }, (_, i) => ({
                match: i,
                value: 1150,
                isWin: false,
                isPlaceholder: true
            }));
        }

        return Array.from({ length: TOTAL_SLOTS }, (_, i) => {
            if (i < eloHistory.length) {
                return {
                    match: i,
                    value: eloHistory[i],
                    isWin: !!winHistory[i],
                    isPlaceholder: false
                };
            }
            return {
                match: i,
                value: null,
                isWin: false,
                isPlaceholder: true
            };
        });
    }, [eloHistory, winHistory, hasData]);

    const yTicks = useMemo(() => {
        if (!hasData) return [PLACEHOLDER_VALUE - 200, PLACEHOLDER_VALUE, PLACEHOLDER_VALUE + 200];

        const values = data
            .map(d => d.value)
            .filter((v): v is number => v !== null);

        if (!values.length) return [900, 1350, 1750];

        const min = Math.min(...values);
        const max = Math.max(...values);

        const boundaries = skills.map(s => s.max);

        const bottom = [...boundaries].reverse().find(v => v <= min) ?? boundaries[0];
        const top = boundaries.find(v => v >= max) ?? boundaries.at(-1)!;
        const between = boundaries.filter(v => v > bottom && v < top);

        const middle = between.length === 0
            ? Math.round((bottom + top) / 2)
            : between[Math.floor(between.length / 2)];

        return [bottom, middle, top];
    }, [data, skills, hasData]);

    const plotWidth = Math.max(chartWidth - 12 - 12 - 70, 0);
    const gap = 3;
    const tickWidth = data.length > 0
        ? Math.max(4, Math.min(19.375, plotWidth / data.length - gap))
        : 19.375;

    const lineColor = hasData ? '#FF5500' : '#5D5D5D';

    return (
        <div className={styles.chartElo} data-empty={!hasData}>
            <ResponsiveContainer width="100%" height={224} onResize={(w) => setChartWidth(w)}>
                <AreaChart data={data} margin={{ top: 20, right: 12, left: 12, bottom: 24 }}>
                    <defs>
                        <linearGradient id="eloFill" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={lineColor} stopOpacity={hasData ? 0.15 : 0.06} />
                            <stop offset="95%" stopColor={lineColor} stopOpacity={0} />
                        </linearGradient>
                    </defs>

                    <CartesianGrid
                        vertical={false}
                        strokeDasharray="2 2"
                        stroke="rgba(255,255,255,0.05)"
                    />

                    <YAxis
                        domain={[yTicks[0], yTicks[2]]}
                        ticks={yTicks}
                        axisLine={false}
                        tickLine={false}
                        width={70}
                        tick={hasData ? <LevelTick skills={skills} /> : false}
                    />

                    <XAxis
                        dataKey="match"
                        axisLine={false}
                        tickLine={false}
                        interval={0}
                        height={24}
                        tick={<ResultTick data={data} tickWidth={tickWidth} isEmpty={!hasData} />}
                    />

                    {hasData && seasonResetIndex !== undefined && (
                        <ReferenceLine
                            x={seasonResetIndex}
                            stroke="#5D5D5D"
                            strokeDasharray="2 4"
                            label={{
                                value: seasonResetLabel,
                                angle: -90,
                                position: 'insideBottomLeft',
                                fill: '#5D5D5D',
                                fontSize: 10,
                                fontWeight: 'bold'
                            }}
                        />
                    )}

                    {hasData && seasonFinishCalbrating !== undefined && (
                        <ReferenceLine
                            x={seasonFinishCalbrating}
                            stroke="#5D5D5D"
                            strokeDasharray="2 4"
                        />
                    )}

                    <Area
                        type="monotone"
                        dataKey="value"
                        stroke={lineColor}
                        strokeWidth={2}
                        fill="url(#eloFill)"
                        connectNulls={!hasData}
                        isAnimationActive={false}
                        activeDot={hasData ? { r: 3, fill: '#FF5500', stroke: 'none' } : false}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}

export default ChartElo;