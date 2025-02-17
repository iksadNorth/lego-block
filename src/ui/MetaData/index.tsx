import React, { useEffect } from "react";
import styled from 'styled-components';
import Bedge from "../Bedge";
import MetaDataBtnContainer from "./MetaDataBtnContainer";
import { convertToKoreanUnit } from "../../utils";


const ContainerStyled = styled.div`
    align-items: flex-start;
`;

const Div = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
`;

interface MetaDataProps {
    title?: string;
    bdsrc?: string;
    publisher?: string;
    numDescripter?: number;
}
const MetaData: React.FC<MetaDataProps> = ({title, bdsrc, publisher, numDescripter, ...props}) => {
    // 페이지 제목 변경
    useEffect(() => {
        const oldTitle = document.title;
        document.title = (title || oldTitle);

        return () => {
            document.title = oldTitle;
        };
    }, [title]);
    
    return (<ContainerStyled>
        <h2>{ title || document.title }</h2>
        <Div>
            <Bedge src={bdsrc}>
                <a href="#">{ publisher }</a><br/>
                <span>구독자 { convertToKoreanUnit(numDescripter || 0) }명</span>
            </Bedge>
            <MetaDataBtnContainer {...props}/>
        </Div>
    </ContainerStyled>)
};

export default MetaData;
