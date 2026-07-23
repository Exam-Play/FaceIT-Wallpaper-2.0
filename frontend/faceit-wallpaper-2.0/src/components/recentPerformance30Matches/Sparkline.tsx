import { LineChart, Line, ResponsiveContainer } from 'recharts';

interface SparklineProps {
    data: number[];
    color?: string;
    width?: number;
    height?: number;
}

function Sparkline({ data, color = 'rgba(255, 255, 255, 1)'}: SparklineProps) {
    const chartData = data.map((value, index) => ({ index, value }));
    const gradientId = `sparklineGradient-${color.replace(/[^a-zA-Z0-9]/g, '')}`;

    return (
        <ResponsiveContainer>
            <LineChart data={chartData} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
                <defs>
                    <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor={color} />
                        <stop offset="100%" stopColor={color} />
                    </linearGradient>
                </defs>
                <Line
                    type="monotone"
                    dataKey="value"
                    stroke={`url(#${gradientId})`}
                    strokeWidth={2}
                    dot={false}
                    isAnimationActive={false}
                />
            </LineChart>
        </ResponsiveContainer>
    );
}

export default Sparkline;