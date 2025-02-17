import React, { ReactNode } from "react";
import styled from "styled-components";

interface ItemListProps {
    minwidth?: string; // grid item 최소 크기
    children?: ReactNode;
}

const ItemListStyled = styled.div<ItemListProps>`
    ${({ minwidth }) => `
        display: grid;
        grid-auto-rows: max-content;
        grid-template-columns: repeat(auto-fit, minmax(${minwidth || "150px"}, 1fr));
        gap: 10px;
    `}
`;

const ItemList: React.FC<ItemListProps> = (props) => {
    return <>
        <ItemListStyled { ...props } >
            { 
                React.Children.count(props.children) > 0 ? 
                props.children : 
                <div>존재하는 목록이 없음.</div> 
            }
        </ItemListStyled>
    </>;
};

export default ItemList;
