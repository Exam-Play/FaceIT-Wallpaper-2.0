import { useEffect, useState } from "react";
import { setBackgroundColor, setBackgroundImage, setBackgroundVideo } from "../api/functionsWallpaper";

export function useWallpaperProperties() {
    const [nickname, setNickname] = useState(
        /*() => localStorage.getItem("nickname") ?? */"Kr1v0huev"
    );

    useEffect(() => {
        const backgroundColor = localStorage.getItem("background_color");
        const backgroundImage = localStorage.getItem("background_image");
        const backgroundVideo = localStorage.getItem("background_video");

        if (backgroundColor) {
            setBackgroundColor(backgroundColor);
        }

        if (backgroundImage) {
            setBackgroundImage(backgroundImage);
        }

        if (backgroundVideo) {
            setBackgroundVideo(backgroundVideo);
        }
    }, []);

    useEffect(() => {
        window.wallpaperPropertyListener = window.wallpaperPropertyListener || {};

        window.wallpaperPropertyListener.applyUserProperties = (properties: any) => {

            if (properties.nickname) {
                const value = properties.nickname.value?.trim();

                if (value) {
                    setNickname(value);
                    localStorage.setItem("nickname", value);
                }
            }

            if (properties.background_color) {
                setBackgroundColor(properties.background_color.value);
                localStorage.setItem("background_color", properties.background_color.value);
            }

            if (properties.background_image) {
                setBackgroundImage(properties.background_image.value);
                localStorage.setItem("background_image", properties.background_image.value);
            }

            if (properties.background_video) {
                setBackgroundVideo(properties.background_video.value);
                localStorage.setItem("background_video", properties.background_video.value);
            }
        };
    }, []);

    return { nickname };
}