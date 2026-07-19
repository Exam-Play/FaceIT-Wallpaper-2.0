import { useState } from "react";

import MainElo from "./components/mainElo/MainElo";
import RecentPerformance30Matches from "./components/recentPerformance30Matches/RecentPerformance30Matches";
import RecentMatches from "./components/recentMatches/RecentMatches";

import Lock from "./components/Lock";
import { useWallpaperProperties } from "./hooks/useWallpaperProperties";

function App() {
    const [widgetOrder, setWidgetOrder] = useState<string[]>(() => {
        return JSON.parse(localStorage.getItem("widgetOrder") ??
            '["recentMatPos","recPerf30MatPos","mainEloPos"]'
        );
    });
    const [isLocked, setIsLocked] = useState(localStorage.getItem('isLocked') === 'true');
    const { nickname } = useWallpaperProperties();
    
    return (
        <main>
            <img className="background-img" id="background-img" />
            <video id="background-video" autoPlay loop muted />

            <RecentPerformance30Matches
                isLocked={isLocked}
                widgetOrder={widgetOrder}
                setWidgetOrder={setWidgetOrder}
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
                nickname={nickname}
            />

            <Lock isLocked={isLocked} setIsLocked={setIsLocked} />
        </main>
    )
}

export default App;