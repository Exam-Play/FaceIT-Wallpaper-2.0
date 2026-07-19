from datetime import datetime, timezone

WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

def map_match(round_: dict, level: int) -> dict:
    win = round_.get("win", False)
    start = datetime.fromisoformat(round_["start_time"].replace("Z", "+00:00")).astimezone(timezone.utc)
    rounds_played = round_.get("rounds_played") or 1

    return {
        "id": round_["match_id"],
        "date": f"{WEEKDAYS[start.weekday()]} {start.day} {MONTHS[start.month - 1]}",
        "time": start.strftime("%H:%M"),
        "result": "W" if win else "L",
        "ownScore": round_.get("team_score", 0),
        "enemyScore": round_.get("opponent_team_score", 0),
        "level": level,
        "elo": round_.get("elo_before", 0) + round_.get("elo_delta", 0),
        "eloDelta": round_.get("elo_delta", 0),
        "rating": round(round_.get("faceit_rating", 0), 2),
        "kills": round_.get("kills", 0),
        "deaths": round_.get("deaths", 0),
        "assists": round_.get("assists", 0),
        "kd": round(round_.get("kd", 0), 2),
        "adr": round(round_.get("damage", 0) / rounds_played, 1),
        "map": round_.get("map", ""),
    }