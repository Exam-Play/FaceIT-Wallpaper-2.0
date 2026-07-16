import { useEffect, useState } from "react";

export function useWallpaperProperties() {
    const [nickname, setNickname] = useState("");

    useEffect(() => {
        window.wallpaperPropertyListener ??= {};
        
        window.wallpaperPropertyListener.applyUserProperties = (properties: any) => {
            if (properties.nickname) {
                setNickname(properties.nickname.value);
            }

            if (properties.background_color) {
                const color : Number[] = properties.backgroundcolor.value.split(" ").map(Number);

                document.body.style.backgroundColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
            }

            if (properties.background_image) {
                document.body.style.backgroundImage = `url(${properties.background_image.value})`;
            }
        };
    }, []);

    return { nickname };
}