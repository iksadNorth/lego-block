import React from "react";
import Bedge from "../Bedge";
import { addBookMark } from "./Bookmark";
import { timeAgo } from "@/utils";
import styled from "styled-components";
import { BedgeMode } from "../Bedge";


const CommentTitle = styled.div`
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 10px;

    & > :nth-child(3) {
        grid-column: 1 / -1;
    }
`;

interface CommentProps {
    comment?: string;
    src?: string;
    nickname?: string;
    created_at?: string;
}
export const Comment: React.FC<CommentProps> = ({comment, src, nickname, created_at, ...props}) => {
    // 댓글 파싱.
    // 기본적으로 라인 마다 줄바꿈 추가.
    const parseComment = (text: string) => {
        if(!text) return [];

        let lines = text.split('\n')
            .map((line: string) => line.trim())
            .filter((line: string) => line)
            .map((line: string) => addBookMark(line))   // 시간 댓글에 북마크 표기.
            .map((line: string, idx: number) => <span key={idx}>{line}<br/></span>);
        return lines;
    };

    return (<>
        <Bedge mode={BedgeMode.Comment} src={src}>
            <CommentTitle>
                <span style={{ color: 'gray' }}>@{ nickname }</span>
                <span>{ timeAgo(created_at) }</span>
                <span className={"col-span-2"}>{ parseComment(comment || '') }</span>
            </CommentTitle>
        </Bedge>
    </>)
};
