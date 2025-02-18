import React, { ReactNode } from "react";
import styled from "styled-components";

import Header   from '@/views/Header';
import Nav      from '@/views/Nav';
import Center   from '@/align/Center';
import Footer   from '@/views/Footer';


let LayoutStyle = styled.div`
    height: 97.5vh; width: 97.5vw;

    display: grid;
    grid-template-rows: auto 1fr auto;
    grid-template-columns: auto 1fr;
    gap: 10px;

    & > :nth-child(1) {
        grid-column: 1 / -1;
    }
    & > :nth-child(2) {
        grid-row: 2 / -1;
    }
`;

const Body = styled.div`${ Center }`;

interface LayoutProps {
    children: ReactNode;
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <LayoutStyle>
            <Header />
            <Nav />
            <Body>
                { children }
            </Body>
            <Footer />
        </LayoutStyle>
    );
};

export default Layout;
