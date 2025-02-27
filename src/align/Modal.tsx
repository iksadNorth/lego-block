import React, { useState, useImperativeHandle, forwardRef, ReactNode } from "react";
import styled from 'styled-components';


// 모달 오버레이 스타일
const ModalOverlay = styled.div<{ open: boolean }>`
    position: fixed;
    top: 0; bottom: 0;
    left: 0; right: 0;

    background: rgba(0, 0, 0, 0.5);

    display: ${({ open }) =>  (open ?? true) ? 'flex' : 'none'};
    justify-content: center;
    align-items: center;

    z-index: 1000;
`;

export interface ModalHandle {
    open: () => void;
    close: () => void;
}

interface ModalProps {
    children: ReactNode;
}

export const Modal = forwardRef<ModalHandle, ModalProps>(({ children }, ref) => {
    const [open, isOpen] = useState(false);

    useImperativeHandle(ref, () => ({
        open: () => isOpen(true),
        close: () => isOpen(false),
    }));

    const handleOutterClick: React.MouseEventHandler = (event) => {
        if (event.target !== event.currentTarget) return;
        isOpen(false);
    };
    return (
        <ModalOverlay open={open} onClick={handleOutterClick}>
            { children }
        </ModalOverlay>
    );
});
