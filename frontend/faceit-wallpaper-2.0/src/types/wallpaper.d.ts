interface Window {
    wallpaperPropertyListener?: {
        applyUserProperties?: (properties: any) => void;
    };
}

interface Position {
    x: number;
    y: number;
}