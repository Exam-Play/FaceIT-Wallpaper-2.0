//import { useWallpaperProperties } from "./hooks/useWallpaperProperties";

import MainElo from "./components/mainElo/MainElo";
import RecentPerformance30Matches from "./components/recentPerformance30Matches/RecentPerformance30Matches";
import Lock from "./components/Lock";
import { useState } from "react";

function App() {
    const [isLocked, setIsLocked] = useState(localStorage.getItem('isLocked') === 'true');
    //const { nickname } = useWallpaperProperties();
    
    return (
        <main>
            <RecentPerformance30Matches isLocked={isLocked} />
            <MainElo isLocked={isLocked} />
            <Lock isLocked={isLocked} setIsLocked={setIsLocked} />
        </main>
    )
}

export default App;