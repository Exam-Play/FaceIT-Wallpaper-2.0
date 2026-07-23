export const RATING_MIN = 0.55;
export const RATING_MAX = 1.79;

export const RATING_LOW = 0.89;
export const RATING_GOOD: [number, number] = [1.30, 1.79];
export const RATING_HIGH = 1.80;

export type MatchResult = 'W' | 'L';

export type ActiveTool = "move" | "resize" | "scale" | null;

export interface MainEloInfo {
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

export interface Performance {
    date: string;
    time: string;
    result: MatchResult;
    roundsPlayed: number;
    
    elo: number;
    eloDelta: number;

    rating: number;
    faceitRoundSwingAvg: number;
    rws: number;

    teamEloAvg: number;
    opponentTeamEloAvg: number;

    kills: number;
    deaths: number;
    assists: number;
    headshots: number;

    kd: number;
    damage: number;
}

export interface ExtendedStats {
    consistency: number;
}