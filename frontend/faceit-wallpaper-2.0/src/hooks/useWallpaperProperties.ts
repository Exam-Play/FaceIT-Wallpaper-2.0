import { useEffect, useState } from "react";

export function useWallpaperProperties() {
    const [nickname, setNickname] = useState("_ExamPlay_");

    useEffect(() => {
        window.wallpaperPropertyListener = window.wallpaperPropertyListener || {};

        window.wallpaperPropertyListener.applyUserProperties = (properties: any) => {
            const img = document.getElementById("background-img") as HTMLImageElement | null;
            const video = document.getElementById("background-video") as HTMLVideoElement | null;
            
            if (properties.nickname) {
                const value = properties.nickname.value?.trim();

                if (value) {
                    setNickname(value);
                }
            }

            if (properties.background_color) {
                const c = properties.background_color.value.split(" ").map(Number);
                document.body.style.backgroundColor = `rgb(${c[0] * 255}, ${c[1] * 255}, ${c[2] * 255})`;

                if (img) {
                    img.style.display = "none";
                    img.src = "";
                }

                if (video) {
                    video.pause();
                    video.removeAttribute("src");
                    video.load();
                    video.style.display = "none";
                }
            }

            if (properties.background_image) {
                const path = properties.background_image.value;

                if (path) {
                    if (img) {
                        img.src = `file:///${path}`;
                        img.style.display = "block";
                        img.style.width = "100vw";
                        img.style.height = "100vh";
                        img.style.objectFit = "fill";
                        img.style.zIndex = "-1";
                    }

                    if (video) {
                        video.pause();
                        video.removeAttribute("src");
                        video.load();
                        video.style.display = "none";
                    }

                    document.body.style.backgroundColor = "transparent";
                } else {
                    if (img) {
                        img.src = "";
                        img.style.display = "none";
                    }
                }
            }

            if (properties.background_video) {
                const path = properties.background_video.value;

                if (path) {
                    if (video) {
                        video.src = `file:///${path}`;
                        video.style.display = "block";
                        video.autoplay = true;
                        video.loop = true;
                        video.muted = true;
                        video.style.width = "100vw";
                        video.style.height = "100vh";
                        video.style.objectFit = "fill";
                        video.style.zIndex = "-1";
                        video.load();
                        video.play().catch(() => {});
                    }

                    if (img) {
                        img.style.display = "none";
                    }

                    document.body.style.backgroundColor = "transparent";
                } else {
                    if (video) {
                        video.pause();
                        video.removeAttribute("src");
                        video.load();
                        video.style.display = "none";
                    }
                }
            }
        };
    }, []);

    return { nickname };
}