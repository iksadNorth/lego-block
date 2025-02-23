import styled from "styled-components";
import Preset, { PresetProps } from "../size/Preset";


export const Frame = styled(Preset)<PresetProps>`
    position: relative;
    overflow: hidden;

    & > * {
        color: white;
        font-weight: bolder;

        position: absolute;
        top: 50%; left: 50%;
        transform: translate(-50%, -50%);
    }
`;

interface LayerProps {
    top?: string;
    left?: string;
}
export const Layer = styled.div<LayerProps>`${({ top, left }) => `
    top: ${ top || '50%' }; 
    left: ${ left || '50%' };
`}`;
