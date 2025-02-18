import styled from "styled-components";
import Spin from "../css/Spin";


const Spinner = styled.div`
    ${ Spin }

    border: solid 1rem black;
    border-left: solid 1rem transparent;
    border-radius: 50%;
    height: 3rem; width: 3rem;
`;

export default Spinner;
