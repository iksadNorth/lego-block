import styled from 'styled-components';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactNode } from 'react';
import Ellipsis from '@/align/Ellipsis';


const Span = styled.div`${ Ellipsis }`;
const ButtonStyled = styled.button`${({ theme }) => `
    color: ${theme.colors.text};

    border: none;
    border-radius: 10px;
    background-color: gray;

    &:hover {
        background-color: lightgray;
        transition: all 0.5s;
    }
`}`;
export const IconContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 1.5rem;
    line-height: 1.5rem;
    gap: 5px;
`;

interface IcontBtnProp {
    children?: ReactNode;
    icon?: IconProp;
    onClick?: React.MouseEventHandler;
}
const IconBtn: React.FC<IcontBtnProp> = ({ children, icon, onClick }) => {
    onClick = onClick || (() => {
        alert('미구현 버튼');
    });
    return (<>
        <ButtonStyled onClick={onClick}>
            <IconContainer>
                {icon ? <FontAwesomeIcon icon={icon} /> : ''}
                <Span className='text'>{children}</Span>
            </IconContainer>
        </ButtonStyled>
    </>);
};

export default IconBtn;
