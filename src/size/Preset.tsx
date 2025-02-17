import styled from "styled-components";

export interface PresetProps {
    presetratio ?: "square" | "wide" | "tall";
}

const ratioMap = {
    square: "1 / 1",
    wide: "16 / 9",
    tall: "9 / 16",
};

const Preset = styled.div<PresetProps>`
    ${({ presetratio  }) => `
        aspect-ratio: ${presetratio ? ratioMap[presetratio] : "1 / 1"}; 
        width: 100%;
    `}
`;

export default Preset;
