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

export async function getRecentMatchesInfo(nickname: string): Promise<Match[]> {
    const response = await fetch(
        `${API_URL}/recent-matches?nickname=${encodeURIComponent(nickname)}`
    );

    if (!response.ok) {
        throw new Error(
            `Failed to fetch player: ${response.status}`
        );
    }

    return await response.json();
}