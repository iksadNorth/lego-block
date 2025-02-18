import { css } from "styled-components";


const HoverShadow = css`
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    &:hover {
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5);
        transition: box-shadow 0.5s ease;
    }
`;

export default HoverShadow;
