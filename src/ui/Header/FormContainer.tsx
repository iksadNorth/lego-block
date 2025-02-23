import React, { useEffect, useState, cloneElement, ReactElement, ReactNode, useMemo } from "react";
import styled, { css } from "styled-components";


interface EditableProps {
    edit?: boolean;
}
interface OnChangeProps<T> {
    value?: T;
    onChange?: (value: T) => void;
}

export const ValueStyled = css`
    height: 1.5rem;
    display: inline-flex;
    padding: 3px;
    line-height: 1.5;
    font-size: 1rem;
    font-weight: 600;

    border: 1px solid lightgray;
    border-radius: 5px;
`;
export const KeyStyled = styled.div`
    text-align: center;
    text-overflow: ellipsis;
    lien-height: 2;
`;
export const ValueTextStyled = styled.input.attrs({ type: 'text' })`
    ${ValueStyled}
    background-color: gray;
`;
export const ValueLabelStyled = styled.div`
    ${ValueStyled}
    
`;

export const ValueInput: React.FC<OnChangeProps<string> & EditableProps> = ({ edit, onChange, value }) => {
    const [ inner, setInner ] = useState<string>('');
    const handleClick = (e: any) => {
        setInner(e.target.value);
    };

    useEffect(() => {
        if(!onChange) return;
        onChange(inner);
    }, [inner]);

    useEffect(() => {
        if(!value) return;
        if(value == inner) return;
        setInner(value);
    }, [value]);

    return <> { 
        edit 
        ? <ValueTextStyled value={inner} onChange={handleClick}/> 
        : <ValueLabelStyled>
            { inner }
        </ValueLabelStyled> 
    } </>;
};

const ValueBooleanStyled = styled.button<{value: boolean}>`${({ value }) => `
    height: 20px; width: 40px;
    border: none;
    border-radius: 20px;
    background-color:  ${(value ? "#4CAF50" : "#ccc")};
    color: white;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        opacity: 0.8;
    }
`}`;

export const ValueBoolean: React.FC<OnChangeProps<boolean> & EditableProps & {onClick?: any}> = ({ value, onChange, onClick, edit }) => {
    const [ on , isOn ] = useState<boolean>(false);

    useEffect(() => {
        if(!value) return;
        isOn(value);
    }, [value]);

    useEffect(() => {
        if(!onChange) return;
        onChange(on);
    }, [on]);

    const handleClick = () => {
        if(!edit) return;
        const newValue = !on;
        isOn(newValue);

        if (onClick) {
            onClick(newValue);
        }
    };
    return <>
        <ValueBooleanStyled value={on} onClick={handleClick}/>
    </>;
};

interface InputField<T> {
    name: string;
    keyName: string;
    value?: T;
    onChange?: (dict: object) => void;
    edit?: boolean;
}
export const InputField: React.FC<InputField<string>> = ({ name, keyName, value, onChange, edit=true }) => {
    const [ input, setInput ] = useState(value || '');

    useEffect(() => {
        if(!onChange) return;
        onChange({[keyName]: input});
    }, [input]);

    const handleValueInputChange = (v: string) => {
        debugger
        setInput((prev) => (prev !== v ? v : prev));
    };

    return <>
        <KeyStyled>{ name || keyName }</KeyStyled>
        <ValueInput edit={edit} value={ input } onChange={handleValueInputChange}/>
    </>;
};

const FormContainerStyled = styled.div`
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 10px;
    align-items: center;
`;

interface FormContainerProps {
    children?: ReactNode;
    value?: any;
    onChange?: any;
}
export const FormContainer: React.FC<FormContainerProps> = ({ children, value, onChange }) => {
    const [ obj, setObj ] = useState<object>({});

    useEffect(() => {
        if(!onChange) return;
        onChange(obj);
    }, [obj]);

    const memoizedChildren = useMemo(() => {
        return React.Children.map(children, (child) => {
            if(!(React.isValidElement(child) && child.type === InputField)) return child;
            const childProps = child.props as { keyName: string };

            const props: any = {};
            if ("keyName" in childProps && childProps.keyName in value) {
                props[childProps.keyName] = value[childProps.keyName];
            }
            props.onChange = (newValue: object) => {
                setObj((prev) => ({ ...prev, ...newValue }));
            };
            return cloneElement(child as ReactElement<InputField<string>>, props);
        });
    }, [children, obj]);

    return <>
        <FormContainerStyled>
            { memoizedChildren }
        </FormContainerStyled>
    </>;
};
