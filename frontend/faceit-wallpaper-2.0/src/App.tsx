import { useEffect, useState } from "react";

import MainElo from "./components/mainElo/MainElo";
import RecentPerformance30Matches from "./components/recentPerformance30Matches/RecentPerformance30Matches";
import RecentMatches from "./components/recentMatches/RecentMatches";

import Buttons from "./components/Buttons";

import { useWallpaperProperties } from "./hooks/useWallpaperProperties";

import { getConsistency, getPlayerId, getRecentMatchesInfo, getSkillsConfig } from "./api/apiFetch";
import { mapMatch, mapPerformance } from "./api/functionsFetch";

import type { Match, Performance } from "./types/faceitData";

function App() {
    const [widgetOrder, setWidgetOrder] = useState<string[]>(() => {
        return JSON.parse(localStorage.getItem("widgetOrder") ??
            '["recentMatPos","recPerf30MatPos","mainEloPos"]'
        );
    });
    const [isLocked, setIsLocked] = useState(localStorage.getItem('isLocked') === 'true');
    const { nickname } = useWallpaperProperties();

    const [matches, setMatches] = useState<any>([]);
    const [extendedStats, setExtendedStats] = useState<any>([]);
    const [skills, setSkills] = useState<any>([])

    useEffect(() => {
        async function loadPlayer() {
            try {
                const playerId = await getPlayerId(nickname);

                const data = await getRecentMatchesInfo(playerId);

                const extendedData = await getConsistency(playerId);

                const skillsConfig = await getSkillsConfig();

                setMatches(data);
                setExtendedStats(extendedData);
                setSkills(skillsConfig);
            } catch (error) {
                console.error(error);
            }
        }

        loadPlayer();

        const interval = setInterval(() => {
            loadPlayer();
        }, 60000);

        return () => clearInterval(interval);
    }, [nickname]);

    return (
        <main>
            <img className="background-img" id="background-img" />
            <video id="background-video" autoPlay loop muted />

            <RecentPerformance30Matches
                isLocked={isLocked}
                widgetOrder={widgetOrder}
                setWidgetOrder={setWidgetOrder}
                matches={(matches ?? []).map((r: Performance) => mapPerformance(r))}
                skills={skills}
                extendedStats={extendedStats}
            />

            <MainElo
                isLocked={isLocked}
                widgetOrder={widgetOrder}
                setWidgetOrder={setWidgetOrder}
                nickname={nickname}
            />

            <RecentMatches
                isLocked={isLocked}
                widgetOrder={widgetOrder}
                setWidgetOrder={setWidgetOrder}
                matches={(matches ?? []).slice(0, 5).map((r: Match) => mapMatch(r, skills))}
            />

            <Buttons isLocked={isLocked} setIsLocked={setIsLocked} />
        </main>
    )
}

export default App;