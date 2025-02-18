import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import VideoProvider from "@/Proxy/Video";
import Video from "@/ui/Video";
import MetaData from "@/ui/MetaData";
import CommentList from "@/ui/CommentList"

import { useCommentStore } from "../store/CommentList";
import { useVideoStore } from "../store/VideoList";


const Div = styled.div`
    max-width: 1000px;

    display: flex;
    flex-direction: column;
    align-items: center;

    & > * {
        width: 100%;
    }
`;

const backURL = import.meta.env.VITE_API_BACKEND_URL;
const Watch = () => {
    const { videoId } = useParams();
    const { fetchItems: fetchCommentList, items: commentList, totalCount: commentCount } = useCommentStore();
    const { fetchMetaData: fetchVideoMetaData, metaData: metaDataState } = useVideoStore();

    const fetchData = async ({ videoId }: { videoId: string }) => {
        if(!videoId) return {};

        await Promise.all([
            fetchVideoMetaData({ videoId }),
            fetchCommentList({ videoId }),
        ]);
    };

    useEffect(() => {
        if(!videoId) return;
        fetchData({ videoId });
    }, []);

    return (<>
        <VideoProvider>
            <Div>
                <Video srcUrl={`${backURL}/api/v1/videos/${videoId}`}></Video>
                <MetaData {...metaDataState} />
                <CommentList totalCount={commentCount} items={commentList} />
            </Div>
        </VideoProvider>
    </>)};

export default Watch;
