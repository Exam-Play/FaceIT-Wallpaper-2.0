import type { Performance } from '../types/faceitData';
type NumericPerformanceKeys = {
    [K in keyof Performance]: Performance[K] extends number ? K : never
}[keyof Performance];

type StatKey = NumericPerformanceKeys | 'adr' | 'winRate' | 'kr' | 'hsPercent';

const FIELD_PRECISION: Partial<Record<StatKey, number>> = {
    kd: 2,
    adr: 1,
    rating: 2,
    rws: 2,
    faceitRoundSwingAvg: 4,
    winRate: 0,
    kr: 2,
    hsPercent: 0,
};

export function averageField(
    matches: Performance[],
    key: NumericPerformanceKeys
): number | null {
    const digits = FIELD_PRECISION[key] ?? 0;

    const values = matches
        .map(m => m[key])
        .filter((v): v is number => typeof v === 'number' && !Number.isNaN(v));

    if (values.length === 0) return null;

    const avg = values.reduce((acc, v) => acc + v, 0) / values.length;
    return Number(avg.toFixed(digits));
}

export function winRate(matches: Performance[]): number | null {
    if (matches.length === 0) return null;

    const wins = matches.filter(m => m.result === 'W').length;
    const digits = FIELD_PRECISION.winRate ?? 0;

    return Number(((wins / matches.length) * 100).toFixed(digits));
}

export function averageKD(matches: Performance[]): number | null {
    const valid = matches.filter(
        m => typeof m.kills === 'number' && typeof m.deaths === 'number'
    );
    if (valid.length === 0) return null;

    const totalKills = valid.reduce((sum, m) => sum + m.kills, 0);
    const totalDeaths = valid.reduce((sum, m) => sum + m.deaths, 0);

    if (totalDeaths === 0) return totalKills;

    const digits = FIELD_PRECISION.kd ?? 2;
    return Number((totalKills / totalDeaths).toFixed(digits));
}

export function averageKR(matches: Performance[]): number | null {
    const valid = matches.filter(
        m => typeof m.kills === 'number'
              && typeof m.roundsPlayed === 'number' && m.roundsPlayed > 0
    );
    if (valid.length === 0) return null;

    const totalKills = valid.reduce((sum, m) => sum + m.kills, 0);
    const totalRounds = valid.reduce((sum, m) => sum + m.roundsPlayed, 0);

    if (totalRounds === 0) return null;

    const digits = FIELD_PRECISION.kr ?? 2;
    return Number((totalKills / totalRounds).toFixed(digits));
}

export function headshotPercentage(matches: Performance[]): number | null {
    const valid = matches.filter(
        m => typeof m.headshots === 'number'
              && typeof m.kills === 'number' && m.kills > 0
    );
    if (valid.length === 0) return null;

    const totalHeadshots = valid.reduce((sum, m) => sum + m.headshots, 0);
    const totalKills = valid.reduce((sum, m) => sum + m.kills, 0);

    if (totalKills === 0) return null;

    const digits = FIELD_PRECISION.hsPercent ?? 0;
    return Number(((totalHeadshots / totalKills) * 100).toFixed(digits));
}

export function averageDamagePerRound(matches: Performance[]): number | null {
    const valid = matches.filter(
        m => typeof m.damage === 'number' && !Number.isNaN(m.damage)
              && typeof m.roundsPlayed === 'number' && m.roundsPlayed > 0
    );
    if (valid.length === 0) return null;

    const totalDamage = valid.reduce((sum, m) => sum + m.damage, 0);
    const totalRounds = valid.reduce((sum, m) => sum + m.roundsPlayed, 0);

    if (totalRounds === 0) return null;

    const digits = FIELD_PRECISION.adr ?? 1;
    return Number((totalDamage / totalRounds).toFixed(digits));
}

export function averageStats(
    matches: Performance[],
    keys: StatKey[]
): Record<string, number | null> {
    const result: Record<string, number | null> = {};

    for (const key of keys) {
        switch (key) {
            case 'adr':
                result.adr = averageDamagePerRound(matches);
                break;
            case 'kd':
                result.kd = averageKD(matches);
                break;
            case 'winRate':
                result.winRate = winRate(matches);
                break;
            case 'kr':
                result.kr = averageKR(matches);
                break;
            case 'hsPercent':
                result.hsPercent = headshotPercentage(matches);
                break;
            default:
                result[key] = averageField(matches, key as NumericPerformanceKeys);
        }
    }

    return result;
}