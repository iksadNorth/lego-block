import styled from "styled-components";

interface FlexProps {
  align?: "start" | "center" | "end"; // flex 정렬
  direction?: "row" | "column"; // flex 방향
}

const Flex = styled.div<FlexProps>`
    ${({ align, direction }) => `
        display: flex;
        flex-direction: ${direction || "column"};
        justify-content: ${align || "center"};
        overflow: auto;
        scrollbar-width: thin;
    `}
`;

export default Flex;
