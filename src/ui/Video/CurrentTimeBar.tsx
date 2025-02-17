import { useState, useEffect } from "react";
import InputRange from "./InputRange";
import { useVideo } from "../../Proxy/Video";
import { useCurrentTime } from "../../hook/video";


const CurrentTimeBar = () => {
    const [ seekingTime, setSeekingTime ] = useState(0);
    const [ detached, isDetached ] = useState(false);

    const videoRef = useVideo();
    if(!videoRef) return <></>;
    const { currentTime, setCurrentTime } = useCurrentTime(videoRef);

    // getter, setter 정의
    const getTimeFromBar = (scale: number) => {
        const videoEl = videoRef.current;
        if(!videoEl) return 0;
        return scale * (videoEl.duration);
    };
    const getScaleFromBar = (seconds: number) => {
        const videoEl = videoRef.current;
        if(!videoEl) return 0;
        return (seconds / videoEl.duration);
    };
    const getTimeFormatted = (seconds: number) => {
        if(!seconds) return '00:00:00';
    
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = Math.floor(seconds % 60);
    
        return [hrs, mins, secs]
            .map((unit) => String(unit).padStart(2, "0"))
            .join(":");
    };

    // 이벤트 정의
    const change = (value: number) => {
        return setSeekingTime(getTimeFromBar(value));
    };
    const mouseDown = () => {
        isDetached(true);
    };
    const mouseUp = () => {
        setCurrentTime(seekingTime);
        isDetached(false);
    };

    // 동기화
    useEffect(() => {
        if(detached) return;
        setSeekingTime(currentTime);
    }, [currentTime]);

    return <>
        <InputRange 
            row={true} value={getScaleFromBar(seekingTime)} onChange={(e) => change(e.target.value)}
            onMouseUp={mouseUp} onMouseDown={mouseDown}
        >
            { getTimeFormatted(seekingTime) }
        </InputRange>
    </>;
};

export default CurrentTimeBar;
