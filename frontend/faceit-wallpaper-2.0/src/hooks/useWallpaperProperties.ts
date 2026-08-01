import { useEffect, useState, useRef } from "react";
import { setBackgroundColor, setBackgroundImage, setBackgroundVideo } from "../api/functionsWallpaper";

const NICKNAME_DEBOUNCE_MS = 1000;

export function useWallpaperProperties() {
    const [nickname, setNickname] = useState(
        () => localStorage.getItem("nickname") ?? "_ExamPlay_"
    );

    const nicknameDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

                if (nicknameDebounceRef.current) {
                    clearTimeout(nicknameDebounceRef.current);
                }

                if (value) {
                    nicknameDebounceRef.current = setTimeout(() => {
                        setNickname(value);
                        localStorage.setItem("nickname", value);
                    }, NICKNAME_DEBOUNCE_MS);
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