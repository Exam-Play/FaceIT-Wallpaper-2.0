//import { useWallpaperProperties } from "./hooks/useWallpaperProperties";

import MainElo from "./components/mainElo/MainElo";
import RecentPerformance30Matches from "./components/recentPerformance30Matches/RecentPerformance30Matches";
import Lock from "./components/Lock";
import { useState } from "react";
import RecentMatches from "./components/recentMatches/RecentMatches";

function App() {
    const [widgetOrder, setWidgetOrder] = useState<string[]>(() => {
        return JSON.parse(localStorage.getItem("widgetOrder") ?? "[]");
    });
    const [isLocked, setIsLocked] = useState(localStorage.getItem('isLocked') === 'true');
    //const { nickname } = useWallpaperProperties();
    
    return (
        <main>
            <RecentPerformance30Matches
                isLocked={isLocked}
                widgetOrder={widgetOrder}
                setWidgetOrder={setWidgetOrder}
            />

            <MainElo
                isLocked={isLocked}
                widgetOrder={widgetOrder}
                setWidgetOrder={setWidgetOrder}
            />

            <RecentMatches
                isLocked={isLocked}
                widgetOrder={widgetOrder}
                setWidgetOrder={setWidgetOrder}
            />

            <Lock isLocked={isLocked} setIsLocked={setIsLocked} />
        </main>
    )
}

export default App;