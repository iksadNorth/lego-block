import styled, { keyframes, css } from "styled-components";

interface SpinProps {
    frequency?: string;
}

const divSpin = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`;

const Spin = styled.div<SpinProps>`${({ frequency }) => css`
    @media (prefers-reduced-motion: no-preference) {
        animation: ${divSpin} infinite ${frequency || '1s'} linear;
    }
`}`;

export default Spin;
