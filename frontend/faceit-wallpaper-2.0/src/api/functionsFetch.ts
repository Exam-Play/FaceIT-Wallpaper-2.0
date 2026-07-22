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

export function mapMatch(round: any) {
    const win = round.win ?? false;

    const start = new Date(round.start_time);

    const roundsPlayed = round.rounds_played || 1;

    return {
        id: round.match_id,
        date: `${WEEKDAYS[start.getUTCDay()]} ${start.getUTCDate()} ${MONTHS[start.getUTCMonth()]}`,
        time: start.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        }),

        result: win ? "W" : "L",
        ownScore: round.team_score ?? 0,
        enemyScore: round.opponent_team_score ?? 0,

        level: getFaceitLevel((round.elo_before ?? 0) + (round.elo_delta ?? 0)),

        elo: (round.elo_before ?? 0) + (round.elo_delta ?? 0),
        eloDelta: round.elo_delta ?? 0,

        rating: Number((round.faceit_rating ?? 0).toFixed(2)),

        kills: round.kills ?? 0,
        deaths: round.deaths ?? 0,
        assists: round.assists ?? 0,

        kd: Number((round.kd ?? 0).toFixed(2)),
        adr: Number(((round.damage ?? 0) / roundsPlayed).toFixed(1)),

        map: round.map ?? ""
    };
}

function getFaceitLevel(elo: number): number {
    if (elo >= 2001) return 10;
    if (elo >= 1751) return 9;
    if (elo >= 1531) return 8;
    if (elo >= 1351) return 7;
    if (elo >= 1201) return 6;
    if (elo >= 1051) return 5;
    if (elo >= 901) return 4;
    if (elo >= 751) return 3;
    if (elo >= 501) return 2;
    return 1;
}