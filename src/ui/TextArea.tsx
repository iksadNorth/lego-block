import React, { useState, useRef, useEffect } from "react";
import styled from 'styled-components';


const InputText = styled.textarea`${({ theme }) => `
    width: 90%;
    min-height: 40px;
    max-height: 300px;
    overflow: hidden;
    resize: none;
    padding: 8px;
    font-size: 16px;
    border: solid 1px gray;
    border-radius: 4px;

    color: ${theme.colors.text};
    background-color: ${theme.colors.background};
`}`;

const TextArea: React.FC<any> = ({ onChange, ...props }) => {
    const [input, setInput] = useState("");
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto"; // 높이 초기화
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // 내용에 맞게 높이 조정
        }

        onChange(input);
    }, [input]); // value가 변경될 때마다 실행

    return (<>
        <InputText 
            ref={textareaRef} { ...props }
            value={input} onChange={(e) => setInput(e.target.value)}
        />
    </>)
};

export default TextArea;
