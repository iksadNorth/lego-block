import { useNavigate }  from "react-router-dom";
import styled from "styled-components";
import Bedge from "./Bedge";
import { convertToKoreanUnit, timeAgo } from "../utils";
import HoverShadow from "../css/HoverShadow";


const Preview = styled.img`
    width: 100%;
    height: 60%;
    object-fit: cover;
`;
const Content = styled.div`
    display: flex;
    flex-direction: column;

    & > * {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        word-break: break-all;
    }
`;

const VideoHolderStyled = styled.div`
    ${ HoverShadow }

    border: solid 1px lightgray;
    aspect-ratio: calc(5/4);

    overflow: hidden;
    border-radius: 10px;

    cursor: pointer;
`;

const BedgeStyle = styled(Bedge)`
    padding-left: 10px;
    padding-right: 10px;
`;

interface VideoHolderProps {
    thumbnail?: string;
    title?: string;
    publisher?: string;
    numViews?: number;
    created_at?: string;
    videoId?: string;
    bdsrc?: string;
}
const VideoHolder: React.FC<VideoHolderProps> = ({ thumbnail, title, publisher, numViews, created_at, videoId, bdsrc }) => {
    const navigate = useNavigate();

    thumbnail = thumbnail || 'https://cdn.pixabay.com/photo/2017/03/09/12/31/error-2129569_1280.jpg';
    title = title || '...';
    publisher = publisher || '...';
    numViews = numViews || 0;
    created_at = created_at || '';
    videoId = videoId || '';

    return (<>
        <VideoHolderStyled onClick={() => navigate(`/watch/${videoId}`)}>
            <Preview src={ thumbnail } />
            <BedgeStyle src={bdsrc}>
                <Content>
                    <span>{ title }</span>
                    <span style={{color: 'gray'}}>{ publisher }</span>
                    <span style={{color: 'gray'}}>조회수 { convertToKoreanUnit(numViews) }회 { timeAgo(created_at) }</span>
                </Content>
            </BedgeStyle>
        </VideoHolderStyled>
    </>);
};

export default VideoHolder;
