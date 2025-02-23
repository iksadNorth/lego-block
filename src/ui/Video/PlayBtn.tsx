import styled from "styled-components";
import { usePlay } from "../../hook/video";
import { useVideo } from "../../Proxy/Video";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const Button = styled.button`
    padding: 5px;

    color: white;
    background-color: unset;
    border: none;

    cursor: pointer;
`;

const PlayBtn = ({ ...props }) => {
    const videoRef = useVideo();
    if(!videoRef) return <></>;
    const { isPlaying, togglePlay } = usePlay(videoRef);
    return <>
        <Button onClick={togglePlay} { ...props }>
            <FontAwesomeIcon icon={ isPlaying ? faPause : faPlay } />
        </Button>
    </>;
};

export default PlayBtn;
