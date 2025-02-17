import styled from "styled-components";

interface FitProps {
    padding ?: string;
}

const Fit = styled.div<FitProps>`
    ${({ padding }) => `
        width: fit-content; 
        height: fit-content; 
        padding: ${padding || "0"};
    `}
`;

export default Fit;
