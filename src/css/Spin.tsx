import styled, { keyframes, css } from "styled-components";


const divSpin = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`;

const Spin = css`
    @media (prefers-reduced-motion: no-preference) {
        animation: ${divSpin} infinite 1s linear;
    }
`;

export default Spin;
