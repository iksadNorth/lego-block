import React, { useState } from "react";
import IconBtn from "../IconBtn";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import styled from 'styled-components';
import api from "../../api/axio";

import Bedge, { BedgeMode } from "../Bedge";
import TextArea from "../TextArea";
import { useParams } from "react-router-dom";


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
    
    const registComment = () => {
        api.post(`/api/v1/videos/${videoId}/comments`, {
            comment: text,
        }).then((res) => {
            // 댓글 새로고침
        }).catch((err) => {
            alert('등록 실패');
        });
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
