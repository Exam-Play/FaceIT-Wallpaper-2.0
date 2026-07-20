import httpx
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from config import FACEIT_API_KEY

#FACEIT_API_KEY_BUILD = "d9e0c483-4196-4f8c-b40a-6cefe7ab07d5"

HEADERS = { "Authorization": f"Bearer {FACEIT_API_KEY}" }
#HEADERS = { "Authorization": f"Bearer {FACEIT_API_KEY_BUILD}" }

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"]
)

@app.get("/main-elo")
async def get_main_elo(nickname: str):
    async with httpx.AsyncClient() as client:
        player_response = await client.get(
            "https://open.faceit.com/data/v4/players",
            params={
                "nickname": nickname,
                "game": "cs2"
            },
            headers=HEADERS
        )

        player_response.raise_for_status()
        player = player_response.json()

        cs2 = player["games"]["cs2"]

        player_id = player["player_id"]
        country = player.get("country")
        region = cs2.get("region")

        stats_response = await client.get(
            f"https://open.faceit.com/data/v4/players/{player_id}/stats/cs2",
            headers=HEADERS
        )
        stats_response.raise_for_status()
        stats = stats_response.json()

        lifetime = stats["lifetime"]

        region_rank_response = await client.get(
            f"https://open.faceit.com/data/v4/rankings/games/cs2/regions/{region}/players/{player_id}",
            headers=HEADERS
        )
        region_rank_response.raise_for_status()
        region_rank = region_rank_response.json()

        country_rank_response = await client.get(
            f"https://open.faceit.com/data/v4/rankings/games/cs2/regions/{region}/players/{player_id}",
            params={
                "country": country
            },
            headers=HEADERS
        )
        country_rank_response.raise_for_status()
        country_rank = country_rank_response.json()

    return {
        "nickname": player["nickname"],
        "avatar": player.get("avatar"),
        "country": country,
        "region": region,

        "elo": cs2["faceit_elo"],
        "level": cs2["skill_level"],

        "matches": int(lifetime.get("Matches")),
        "win_rate": float(lifetime.get("Win Rate %")),

        "region_rank": region_rank["position"],
        "country_rank": country_rank["position"]
    }

@app.get("/player-id")
async def get_player_id(nickname: str):
    async with httpx.AsyncClient() as client:
        response = await client.get(
            "https://open.faceit.com/data/v4/players",
            params={
                "nickname": nickname,
                "game": "cs2"
            },
            headers=HEADERS
        )

        response.raise_for_status()

        player = response.json()

        return {
            "player_id": player["player_id"]
        }