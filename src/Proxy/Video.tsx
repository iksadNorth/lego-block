import React, { createContext, useContext, useRef, RefObject, ReactNode } from "react";

// Context 생성
const VideoContext = createContext<RefObject<HTMLVideoElement | null> | null>(null);

// Provider 생성
interface VideoProviderProps {
    children: ReactNode;
}
const VideoProvider: React.FC<VideoProviderProps> = ({ children }) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);

    return (
        <VideoContext.Provider value={videoRef}>
            {children}
        </VideoContext.Provider>
    );
};

// Context 가져오는 훅
export const useVideo = () => {
    return useContext(VideoContext);
};

export default VideoProvider;
