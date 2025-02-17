import styled from "styled-components";


const HoverShow = styled.div`
    opacity: 0;
    transition: opacity 300ms ease-in-out;

    &:hover {
        opacity: 0.8;
    }
`;

export default HoverShow;
