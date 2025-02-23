import React, { ReactNode } from 'react';
import styled from 'styled-components';


interface InputRangeProps {
    row?: boolean;
    disabled?: boolean;
    children?: ReactNode;
    value?: Number;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onMouseUp?: React.MouseEventHandler<HTMLVideoElement>;
    onMouseDown?: React.MouseEventHandler<HTMLVideoElement>;
}

const unit = '1.00rem';
const Base = styled.div<InputRangeProps>`${({ disabled, row }) => `
    ${(disabled || false) ? 'display: none;' : ''}
    height: 100%;
    width: 100%;

    display: flex;
    align-items: center;
    flex-direction: ${!!row ? 'row' : 'column'};
    gap: 10px;
`}`;
const Text = styled.span`
    flex-grow: 0;

    font-size: 0.75rem;
    font-weight: 700;

    color: white;
`;

const BaseInputRange = styled.input.attrs({
    type: 'range',
    max: '1', step: '0.01',
})<InputRangeProps>`${({ row }) => `
    flex-grow: 1;
    writing-mode: ${!!row ? 'horizontal-tb' : 'sideways-lr'};

    /* range Track 스타일 */
    -webkit-appearance: none;
    outline: none;
    border-radius: 2px;
    background: linear-gradient(${!!row ? '-90deg' : '180deg'}, white 0%, white 100%);

    /* range thumb 스타일 */
    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        
        ${!!row ? 'height' : 'width'}: calc(${unit} / 2.00);
        ${!!row ? 'width' : 'height'}: calc(${unit});
        
        background: black;
        border-radius: 2px;
    }
`}`;

const InputRange: React.FC<InputRangeProps> = ({ children, row, disabled, value, ...props }) => {
    return (
        <Base disabled={disabled} row={!!row}>
            <Text>{children}</Text>
            <BaseInputRange row={!!row} value={value} { ...props } />
        </Base>
    );
};

export default InputRange;
