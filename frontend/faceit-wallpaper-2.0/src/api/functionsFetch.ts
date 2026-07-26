import type { Performance, SkillConfig } from '../types/faceitData';

const WEEKDAYS = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat"
];

const MONTHS = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
];

export function mapMatch(round: any, config: SkillConfig[]) {
    const win = round.win ?? false;

    const start = new Date(round.start_time ?? round.startTime);

    const roundsPlayed = round.rounds_played ?? round.roundsPlayed ?? 1;

    const eloBefore = round.elo_before ?? round.eloBefore ?? 0;
    const eloDelta = round.elo_delta ?? round.eloDelta ?? 0;

    return {
        id: round.match_id ?? round.matchId,

        date: `${WEEKDAYS[start.getUTCDay()]} ${start.getUTCDate()} ${MONTHS[start.getUTCMonth()]}`,
        time: start.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        }),

        result: win ? "W" : "L",

        ownScore: round.team_score ?? round.teamScore ?? 0,
        enemyScore:
            round.opponent_team_score ?? round.opponentTeamScore ?? 0,

        level: getFaceitLevel(eloBefore + eloDelta, config).skillLevel,

        elo: eloBefore + eloDelta,
        eloDelta,

        rating: Number(
            ((round.faceit_rating ?? round.faceitRating ?? 0) as number).toFixed(2)
        ),

        kills: round.kills ?? 0,
        deaths: round.deaths ?? 0,
        assists: round.assists ?? 0,

        kd: Number(((round.kd ?? 0) as number).toFixed(2)),
        adr: Number(
            (((round.damage ?? 0) as number) / roundsPlayed).toFixed(1)
        ),

        map: round.map ?? "",
    };
}

export function mapPerformance(round: any): Performance {
    const start = new Date(round.start_time ?? round.startTime);

    return {
        date: `${WEEKDAYS[start.getUTCDay()]} ${start.getUTCDate()} ${MONTHS[start.getUTCMonth()]}`,
        time: start.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        }),

        result:
            ((round.team_score ?? round.teamScore) >
            (round.opponent_team_score ?? round.opponentTeamScore))
                ? "W"
                : "L",

        roundsPlayed: round.rounds_played ?? round.roundsPlayed,

        elo: round.elo_before ?? round.eloBefore,
        isCalibrating: round.is_calibrating ?? round.isCalibrating,
        eloDelta: round.elo_delta ?? round.eloDelta,

        rating: round.faceit_rating ?? round.faceitRating,
        faceitRoundSwingAvg:
            round.faceit_round_swing_avg ?? round.faceitRoundSwingAvg,
        rws: round.rws,

        teamEloAvg: round.team_elo_avg ?? round.teamEloAvg,
        opponentTeamEloAvg:
            round.opponent_team_elo_avg ?? round.opponentTeamEloAvg,

        kills: round.kills,
        deaths: round.deaths,
        assists: round.assists,
        headshots: round.headshots,

        kd: round.kd,
        damage: round.damage,
    };
}

export function getFaceitLevel(elo: number, config: SkillConfig[]): SkillConfig {
    const match = config.find(({ min, max }) => elo >= min && elo <= max);

    return match ?? config.find(c => c.skillLevel === 1) ?? { skillLevel: 1, min: 0, max: 0 };
}