import React, { useState } from "react";
import IconBtn from "../IconBtn";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import styled from 'styled-components';

import Bedge, { BedgeMode } from "../Bedge";
import TextArea from "../TextArea";
import { useParams } from "react-router-dom";
import { fetchCommentList, insertComment, useCommentList } from "../../store/CommentList";


const BedgeStyled = styled(Bedge)`
    width: 100%;
`;

const Div = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    width: 100%;
`;

interface RegisterCommentProps {
}
const RegisterComment: React.FC<RegisterCommentProps> = () => {
    const [ text, setText ] = useState('');
    const { videoId } = useParams();
    const { setQueue } = useCommentList();
    
    const registComment = async () => {
        try {
            if(!videoId) return;
            await insertComment({ videoId, text })
            
            // 댓글 리프레쉬
            const items = await fetchCommentList({ videoId });
            setQueue(items);

        } catch {
            alert('등록 실패');
        }
    };

    return (<>
        <BedgeStyled mode={BedgeMode.Comment}>
            <Div>
                <TextArea onChange={(value: string) => setText(value)} />
                <IconBtn icon={faCheck} onClick={registComment}></IconBtn>
            </Div>
        </BedgeStyled>
    </>)
};

export default RegisterComment;
