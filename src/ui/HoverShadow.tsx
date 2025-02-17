import styled from "styled-components";

interface HoverShadowProps {
    color ?: string;
}

const HoverShadow = styled.div<HoverShadowProps>`
    ${({ color }) => `
        will-change: filter;
        transition: filter 300ms;

        &:hover {
            filter: drop-shadow(0 0 2em ${color || 'black'});
        }
    `}
`;

export default HoverShadow;
