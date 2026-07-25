import httpx
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from config import FACEIT_API_KEY
from cloudflare_manage import CloudflareManager

HEADERS = { "Authorization": f"Bearer {FACEIT_API_KEY}" }

cf_manager = CloudflareManager()

def test_faceit_connection():
    try:
        print("Тестирование соединения с Faceit API...")
        response = cf_manager.make_request(
            "https://www.faceit.com/api/statistics/v1/cs2/seasons"
        )
        if response and response.status_code == 200:
            print("Соединение с Faceit API успешно установлено")
            return True
        else:
            print(f"Ошибка соединения: {response.status_code if response else 'No response'}")
            return False
    except Exception as e:
        print(f"Ошибка тестирования: {e}")
        return False

if not test_faceit_connection():
    print("Не удалось установить соединение с Faceit API. Проверьте cookies.")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True
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

@app.get("/seasons")
async def get_player_id():
    async with httpx.AsyncClient() as client:
        response = cf_manager.make_request(
            "https://www.faceit.com/api/statistics/v1/cs2/seasons"
        )

        response.raise_for_status()

        seasons = response.json()

        return seasons

@app.get("/match-rounds")
async def get_matches(id: str):
    response = cf_manager.make_request(
        f"https://www.faceit.com/api/statistics/v1/cs2/players/{id}/match-rounds?limit=30"
    )

    response.raise_for_status()

    matches = response.json()

    return matches

@app.get("/extended_stats")
async def get_matches(player_id: str, season_id: str):
    response = cf_manager.make_request(
        f"https://www.faceit.com/api/statistics/v1/cs2/players/{player_id}/seasons/{season_id}"
    )

    response.raise_for_status()

    matches = response.json()

    return matches