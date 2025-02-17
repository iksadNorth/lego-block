import React from "react";
import IconBtn from "../IconBtn";
import { faSort } from "@fortawesome/free-solid-svg-icons";
import styled from 'styled-components';

import { Comment } from '@/ui/CommentList/Comment';
import { convertToKoreanUnit } from "../../utils";
import Flex from "../../align/Flex";


const ContainerStyled = styled(Flex)`
    align-items: start;
`

const Div = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
`;

const CommentListStyle = styled(Flex)`
    width: 100%;
`;

const IconBtnStyled = styled(IconBtn)`
    width: fit-content;
`;

interface CommentListProps {
    totalCount?: number;
    items?: any[];
}
const CommentList: React.FC<CommentListProps> = ({ totalCount, items }) => {
    return (<>
        <ContainerStyled>
            <Div>
                <h3>댓글 {convertToKoreanUnit(totalCount || 0)}개</h3>
                <IconBtnStyled icon={faSort} >
                    정렬 기준
                </IconBtnStyled>
            </Div>
            <CommentListStyle>
                { 
                    items?.map(
                        (props, key) => <Comment key={key} {...props}/>
                    ) 
                }
            </CommentListStyle>
        </ContainerStyled>
    </>)
};

export default CommentList;
