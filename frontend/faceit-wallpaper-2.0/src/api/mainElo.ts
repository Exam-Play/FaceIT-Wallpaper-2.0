import type { MainEloInfo } from '../types/wallpaper'

const API_URL = "http://127.0.0.1:8000";

export async function getMainEloInfo(nickname: string): Promise<MainEloInfo> {

    const response = await fetch(
        `${API_URL}/player?nickname=${encodeURIComponent(nickname)}`
    );

    if (!response.ok) {
        throw new Error(
            `Failed to fetch player: ${response.status}`
        );
    }

    return await response.json();
}