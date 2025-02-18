import React, { ReactNode } from "react";
import styled from "styled-components";
import Spinner from "../ui/Spinner";
import Center from "./Center";


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

const Div = styled.div`
    ${ Center }
`;

const ItemList: React.FC<ItemListProps> = (props) => {
    return <>
        { 
            React.Children.count(props.children) > 0 ? 

            <ItemListStyled { ...props } >
                { props.children }
            </ItemListStyled> :

            <Div>
                <Spinner /> 
            </Div>
        }
    </>;
};

export default ItemList;
