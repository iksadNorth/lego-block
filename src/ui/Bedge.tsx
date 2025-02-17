import React, { ReactNode } from 'react';
import styled from 'styled-components';
import Ellipsis from '@/align/Ellipsis';


const BedgeStyled = styled.img`
    border-radius: 50%;
    height: 2rem;
    max-width: 100%;
    flex-grow: 0;
`;
const ContentStyled = styled(Ellipsis)`
    font-size: 1rem;
    width: 80%;
    word-break: break-word;
    flex-grow: 1;
`;
const BedgeContainer = styled.div<any>`
    display: flex;
    align-items: ${({mode}) => `${HeightMode(mode)} !important`};
    gap: 10px;
`;

export enum BedgeMode {
    Intro = 'intro',
    Comment = 'comment',
}
const HeightMode: (mode: BedgeMode | null) => string = (mode) => {
    switch (mode) {
        case BedgeMode.Intro:
            return 'center';
        case BedgeMode.Comment:
            return 'start';
        default:
            return 'center';
    }
};

interface BedgeProps {
    children: ReactNode;
    mode?: BedgeMode;
    src?: string;
    onClick?: React.MouseEventHandler;
}
const Bedge: React.FC<BedgeProps> = ({ children, mode, src, onClick, ...props }) => {
    src = src || 'https://cdn.pixabay.com/photo/2024/06/15/20/24/groovebox-8832172_1280.png';
    return (<>
        <BedgeContainer mode={mode} onClick={onClick} { ...props }>
            <BedgeStyled src={src} />
            <ContentStyled>
                {children}
            </ContentStyled>
        </BedgeContainer>
    </>);
};

export default Bedge;
