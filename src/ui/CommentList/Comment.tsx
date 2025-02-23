import React, { ReactNode } from "react";
import Bedge from "../Bedge";
import { addBookMark } from "./Bookmark";
import { timeAgo } from "../../utils";
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

const Box = styled(Bedge)`
    padding: 10px; margin: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
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
    const parseComment = (text: string): ReactNode[] => {
        if(!text) return [];

        let lines = text.split('\n')
            .map((line) => line.trim())
            .filter((line) => line)
            .map((line, idx) => <span key={idx}>{ addBookMark(line) }<br/></span>);
        return lines;
    };

    return (<>
        <Box mode={BedgeMode.Comment} src={src} { ...props }>
            <CommentTitle>
                <span style={{ color: 'gray' }}>@{ nickname }</span>
                <span>{ timeAgo(created_at) }</span>
                <span className={"col-span-2"}>{ parseComment(comment || '') }</span>
            </CommentTitle>
        </Box>
    </>)
};
