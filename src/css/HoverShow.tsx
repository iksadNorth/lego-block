import { css } from "styled-components";


const HoverShow = css`
    opacity: 0;
    transition: opacity 300ms ease-in-out;

    &:hover {
        opacity: 0.8;
    }
`;

export default HoverShow;
