import styled from 'styled-components';


interface LineProps {
    row?: boolean;
}
const Line = styled.div<LineProps>`
    ${
        ({ row }) => ( row || false ) ?
        `
            border-top: solid 1px lightgray;
            height: fit-content; width: 100%;
        ` : 
        `
            border-right: solid 1px lightgray;
            height: 100%; width: fit-content;
        `
    }
    padding: 0px;
`;

export default Line;
