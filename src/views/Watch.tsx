import React, { useState, useEffect } from "react";
import api from "@/api/axio";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import VideoProvider from "@/Proxy/Video";
import Video from "@/ui/Video";
import MetaData from "@/ui/MetaData";
import CommentList from "@/ui/CommentList"

import { useCommentList, fetchCommentList } from "../store/CommentList";
import { fetchVideoMetaData, useVideoMetaData } from "../store/VideoList";


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
    const { queue: commentList, setQueue: setCommentList } = useCommentList();
    const { data: metaDataState, setData: setMetaData } = useVideoMetaData();

    const fetchData = async ({ videoId }: { videoId: string }) => {
        if(!videoId) return {};

        const [metadata, comments] = await Promise.all([
            fetchVideoMetaData({ videoId }),
            fetchCommentList({ videoId }),
        ]);

        // 스토어 동기화
        setCommentList(comments);
        setMetaData(metadata);
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
                <CommentList {...commentList} />
            </Div>
        </VideoProvider>
    </>)};

export default Watch;
