import React from "react";
import IconBtn from "../IconBtn";
import { useParams } from "react-router-dom";
import { faSort } from "@fortawesome/free-solid-svg-icons";
import styled from 'styled-components';

import { Comment } from "./Comment";
import { convertToKoreanUnit } from "../../utils";
import Flex from "../../align/Flex";
import RegisterComment from "./RegisterComment";
import ContextMenu, { MenuItem } from "../ContextMenu";
import { useCommentStore, deleteCommentById } from "../../store/CommentStore";


const ContainerStyled = styled(Flex)`
    align-items: start;
    gap: 10px;
    width: 100%;
`

const Div = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    width: 100%;
`;

const CommentListStyle = styled(Flex)`
    width: 100%;
    gap: 15px;
`;

const IconBtnStyled = styled(IconBtn)`
    width: fit-content;
`;

interface CommentListProps {
    totalCount?: number;
    items?: any[];
}
const CommentList: React.FC<CommentListProps> = ({ totalCount, items }) => {
    const { fetchItems } = useCommentStore();
    const { videoId } = useParams();

    const deleteComment = async (selected: HTMLDivElement) => {
        const commentId = selected.dataset.commentId;
        if (!commentId) return;

        try {
            await deleteCommentById({ commentId });
            
            // 댓글 리프레쉬
            if(!videoId) return;
            await fetchItems({ videoId });;
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (<>
        <ContextMenu eventNet={ 'data-event-net' } menuchild={
            <MenuItem onClick={deleteComment}>삭제하기</MenuItem>
        }>
            <ContainerStyled>
                <Div>
                    <h3>댓글 {convertToKoreanUnit(totalCount || 0)}개</h3>
                    <IconBtnStyled icon={faSort} >
                        정렬 기준
                    </IconBtnStyled>
                </Div>
                <Div>
                    <RegisterComment />
                </Div>
                <CommentListStyle>
                    {
                        items?.map(
                            (props, key) => <Comment key={key} data-event-net data-comment-id={props.id} {...props}/>
                        ) 
                    }
                </CommentListStyle>
            </ContainerStyled>
        </ContextMenu>
    </>)
};

export default CommentList;
