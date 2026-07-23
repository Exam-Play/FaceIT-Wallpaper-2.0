declare global {
    interface Window {
        wallpaperPropertyListener: {
            applyUserProperties: (properties: any) => void;
        };
    }
}

interface Position {
    x: number;
    y: number;
}

export type Size = {
    w: number;
    h: number
};