import InputRange from "./InputRange";
import { useVideo } from "../../Proxy/Video";
import { useVolume } from "../../hook/video";
import { faVolumeUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";


const Div = styled.div`
    & > * {
        margin-left: 2px;
        margin-right: 2px;
    }
`;

const VolumeBar = () => {
    const videoRef = useVideo();
    if(!videoRef) return <></>;
    const { volume, setVolume } = useVolume(videoRef);

    // getter, setter 정의
    const getVolumeFromBar = (scale: number) => {
        const videoEl = videoRef.current;
        if(!videoEl) return 0;
        return Math.floor(scale * (100));
    };

    return <>
        <InputRange 
            row={false} value={volume} onChange={(e) => setVolume(e.target.value)}
        >
            <Div>
                <FontAwesomeIcon icon={ faVolumeUp } />
                <span>{ getVolumeFromBar(volume) }</span>
            </Div>
        </InputRange>
    </>;
};

export default VolumeBar;
