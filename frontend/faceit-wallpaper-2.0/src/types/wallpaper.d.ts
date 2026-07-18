declare global {
    interface Window {
        wallpaperPropertyListener: {
            applyUserProperties: (properties: any) => void;
        };
    }
}

interface Position {
    x: number;
    y: number;
}

interface MainEloInfo {
    nickname: string;
    avatar?: string;
    country: string;
    region: string;
    elo: number;
    level: number;
    region_rank: number | null;
}

export type Size = {
    w: number;
    h: number
};