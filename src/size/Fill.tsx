import styled from "styled-components";

interface FillProps {
    fillPercent?: number;
}

const Fill = styled.div<FillProps>`
    ${({ fillPercent }) => `
        width: ${fillPercent || 100}%; 
        height: ${fillPercent || 100}%;
    `}
`;

export default Fill;
