import React, { useState, useEffect } from "react";
import api from "@/api/axio";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import VideoProvider from "@/Proxy/Video";
import Video from "@/ui/Video";
import MetaData from "@/ui/MetaData";
import CommentList from "@/ui/CommentList"


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
    const [data, setData] = useState([]);

    const fetchData = (videoId: string) => async () => {
        if(!videoId) return {};

        const [metadata, comments] = await Promise.all([
            api(`/api/v1/videos/${videoId}/metadatas`).then(res => res.data),
            api(`/api/v1/videos/${videoId}/comments?page_size=10&page=1&sort=-created_at`).then(res => res.data),
        ]);
        
        return {
            ...metadata, ...comments,
            videoId: videoId,
        };
    };

    useEffect(() => {
        if(!videoId) return;
        fetchData(videoId)().then(setData);
    }, []);

    return (<>
        <VideoProvider>
            <Div>
                <Video srcUrl={`${backURL}/api/v1/videos/${videoId}`}></Video>
                <MetaData {...data} />
                <CommentList {...data} />
            </Div>
        </VideoProvider>
    </>)};

export default Watch;
