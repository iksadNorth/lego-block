import React from "react";
import styled from "styled-components";
import { Frame, Layer } from "../../align/Layer";

import { useVideo } from "../../Proxy/Video";
import { useVideoKeyBoardControls } from "../../hook/video";

import PlayBtn from "./PlayBtn";
import CurrentTimeBar from "./CurrentTimeBar";
import VolumeBar from "./VolumeBar";
import HoverShow from "../../css/HoverShow";


const Tool = styled.div`
    ${ HoverShow }

    height: 100%; width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;

    & > * {
        flex-grow: 1;
    }
    & > .play-btn {
        flex-grow: 0;
    }
`;

const VideoStyled = styled.video`
    width: 100%;
    border-radius: 20px;
`;

interface VideoProps {
    srcUrl?: string;
}
const Video: React.FC<VideoProps> = ({ srcUrl }) => {
    const videoRef = useVideo();
    if(!videoRef) return <></>;
    useVideoKeyBoardControls(videoRef);

    return <>
        <Frame presetratio={'wide'}>
            <VideoStyled ref={videoRef} src={srcUrl}/>
            <Layer left={'4%'} style={{ height: '80%' }}>
                <Tool>
                    <VolumeBar />
                </Tool>
            </Layer>
            <Layer top={'95%'} style={{ width: '95%' }}>
                <Tool>
                    <PlayBtn className={'play-btn'}/>
                    <CurrentTimeBar />
                </Tool>
            </Layer>
        </Frame>
    </>;
};

export default Video;
