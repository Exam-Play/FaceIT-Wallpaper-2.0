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
 
export interface Match {
    id: string;
    date: string;
    time: string;
    result: MatchResult;
    ownScore: number;
    enemyScore: number;
    level: number;
    elo: number;
    eloDelta: number;
    rating: number;
    kills: number;
    deaths: number;
    assists: number;
    kd: number;
    adr: number;
    map: string;
}

export type Size = {
    w: number;
    h: number
};

export type MatchResult = 'W' | 'L';