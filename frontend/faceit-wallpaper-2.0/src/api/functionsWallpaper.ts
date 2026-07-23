export function setBackgroundColor(value: string) {
    const c = value.split(" ").map(Number);

    document.body.style.backgroundColor =
        `rgb(${c[0] * 255}, ${c[1] * 255}, ${c[2] * 255})`;

    const img = document.getElementById("background-img") as HTMLImageElement | null;
    const video = document.getElementById("background-video") as HTMLVideoElement | null;

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

export function setBackgroundImage(path: string) {
    const img = document.getElementById("background-img") as HTMLImageElement | null;
    const video = document.getElementById("background-video") as HTMLVideoElement | null;

    if (!path) {
        if (img) {
            img.src = "";
            img.style.display = "none";
        }
        return;
    }

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
}

export function setBackgroundVideo(path: string) {
    const img = document.getElementById("background-img") as HTMLImageElement | null;
    const video = document.getElementById("background-video") as HTMLVideoElement | null;

    if (!path) {
        if (video) {
            video.pause();
            video.removeAttribute("src");
            video.load();
            video.style.display = "none";
        }
        return;
    }

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
}