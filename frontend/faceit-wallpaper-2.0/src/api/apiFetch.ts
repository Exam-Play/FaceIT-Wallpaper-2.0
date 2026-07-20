import type { MainEloInfo, Match } from '../types/wallpaper'

const API_URL = "http://127.0.0.1:8000";

export async function getMainEloInfo(nickname: string): Promise<MainEloInfo> {
    const response = await fetch(
        `${API_URL}/main-elo?nickname=${encodeURIComponent(nickname)}`
    );

    if (!response.ok) {
        throw new Error(
            `Failed to fetch player: ${response.status}`
        );
    }

    return await response.json();
}

export async function getPlayerId(nickname: string): Promise<string> {
    const response = await fetch(
        `${API_URL}/player-id?nickname=${encodeURIComponent(nickname)}`
    );

    if (!response.ok) {
        throw new Error(
            `Failed to fetch player ID: ${response.status}`
        );
    }

    const data = await response.json();

    return data.player_id;
}

export async function getRecentMatchesInfo(id: string): Promise<Match[]> {
    const response = await fetch(
        `https://www.faceit.com/api/statistics/v1/cs2/players/${id}/match-rounds?limit=30`
    );

    if (!response.ok) {
        throw new Error(
            `Failed to fetch matches: ${response.status}`
        );
    }

    const data = await response.json();

    return data.payload.cs2.match_rounds;
}