import { useState, useEffect } from "react";

export const useVolume = (videoRef: React.RefObject<HTMLVideoElement | null>) => {
    const [volume, setVolume] = useState(1);
    useEffect(() => {
        if (!videoRef.current) return;
        const updateVolume = () => setVolume(videoRef.current?.volume);
        videoRef.current.addEventListener("volumechange", updateVolume);
    
        return () => videoRef.current?.removeEventListener("volumechange", updateVolume);
    }, [videoRef]);
    const changeVolume = (newVolume: number) => {
        if (videoRef.current) videoRef.current.volume = newVolume;
    };
    return { volume, setVolume: changeVolume };
};

export const useCurrentTime = (videoRef: React.RefObject<HTMLVideoElement | null>) => {
    const [currentTime, setCurrentTime] = useState(0);
  
    useEffect(() => {
        if (!videoRef.current) return;
        const updateTime = () => setCurrentTime(videoRef.current?.currentTime);
        videoRef.current.addEventListener("timeupdate", updateTime);
    
        return () => {
            videoRef.current?.removeEventListener("timeupdate", updateTime);
        };
    }, [videoRef]);
  
    const setVideoTime = (time: number) => {
        if (!videoRef.current) return;
        videoRef.current.currentTime = time;
    };
  
    return { currentTime, setCurrentTime: setVideoTime };
};

export const usePlay = (videoRef: React.RefObject<HTMLVideoElement | null>) => {
    const [isPlaying, setIsPlaying] = useState(false);
    useEffect(() => {
        if (!videoRef.current) return;
        const updatePlayState = () => setIsPlaying(!videoRef.current?.paused);
        videoRef.current.addEventListener("play", updatePlayState);
        videoRef.current.addEventListener("pause", updatePlayState);
  
        return () => {
            videoRef.current?.removeEventListener("play", updatePlayState);
            videoRef.current?.removeEventListener("pause", updatePlayState);
        };
    }, [videoRef]);
    const togglePlay = () => {
        if (!videoRef.current) return;
        videoRef.current.paused ? videoRef.current.play() : videoRef.current.pause();
    };
    return { isPlaying, setIsPlaying, togglePlay };
};

export const useFullscreen = (videoRef: React.RefObject<HTMLVideoElement | null>) => {
    const [isFullscreen, setIsFullscreen] = useState(false);
    useEffect(() => {
        const updateFullscreen = () => setIsFullscreen(!!document.fullscreenElement);
        document.addEventListener("fullscreenchange", updateFullscreen);
        return () => document.removeEventListener("fullscreenchange", updateFullscreen);
    }, []);
    const toggleFullscreen = () => {
        if (!videoRef.current) return;
        if (!document.fullscreenElement) {
            videoRef.current.requestFullscreen?.();
        } else {
            document.exitFullscreen();
        }
    };
    return { isFullscreen, toggleFullscreen };
};

export const usePlaybackRate = (videoRef: React.RefObject<HTMLVideoElement | null>) => {
    const [playbackRate, setPlaybackRate] = useState(1);
    useEffect(() => {
        if (!videoRef.current) return;
        const updateRate = () => setPlaybackRate(videoRef.current?.playbackRate);
        videoRef.current.addEventListener("ratechange", updateRate);
    
        return () => videoRef.current?.removeEventListener("ratechange", updateRate);
    }, [videoRef]);
    const changePlaybackRate = (rate: number) => {
        if (videoRef.current) videoRef.current.playbackRate = rate;
    };
    return { playbackRate, setPlaybackRate: changePlaybackRate };
};

export const useVideoKeyBoardControls = (videoRef: React.RefObject<HTMLVideoElement | null>) => {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (!(document.activeElement instanceof HTMLBodyElement)) return;
            if (!videoRef.current) return;
            if (event.defaultPrevented) {
                return; // 이미 이벤트가 실행되는 중이라면 아무 동작도 하지 않습니다.
            }
            event.preventDefault();

            switch (event.key) {
                case "Enter":
                case " ":
                    if (videoRef.current.paused) {
                        videoRef.current.play();
                    } else {
                        videoRef.current.pause();
                    }
                    break;
                case "ArrowRight":
                    videoRef.current.currentTime = Math.min(videoRef.current.currentTime + 5, videoRef.current.duration);
                    break;
                case "ArrowLeft":
                    videoRef.current.currentTime = Math.max(videoRef.current.currentTime - 5, 0);
                    break;
                case "ArrowUp":
                    videoRef.current.volume = Math.min(videoRef.current.volume + 0.05, 1);
                    break;
                case "ArrowDown":
                    videoRef.current.volume = Math.max(videoRef.current.volume - 0.05, 0);
                    break;
                case "f":
                    videoRef.current.requestFullscreen();
                    break;
                default:
                    break;
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [videoRef]);
}

