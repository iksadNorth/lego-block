import React, { useRef } from "react";
import styled from 'styled-components';
import IconBtn from "@/ui/IconBtn";
import { Modal } from "@/align/Modal";
import LogginProfile from "@/ui/LogginProfile";
import { UserDashBoard } from "../ui/Header/UserDashBoard";
import { faOpenid } from '@fortawesome/free-brands-svg-icons';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import ThemeBtn from "../theme/ThemeBtn";


export const HeaderStyled = styled.div`
    display: flex;
    justify-content: space-between;

    & > * {
        display: flex;
        gap: 10px;
    }
`;

const IconBtnStyled = styled(IconBtn)`
    padding: 10px;
`;

const ModalContent = styled.div`
    background: ${({ theme }) => theme.colors.background};
    border-radius: 10px;
    
    padding: 20px;
    max-width: 100%;

    position: relative;
`;

const Header: React.FC = ({ ...props }) => {
    const modalRef = useRef<Modal>(null);

    const handleClickLogginProfile = () => {
        if (modalRef.current) {
            modalRef.current.open();
        }
    };

    return (<div>
        <HeaderStyled { ...props }>
            <div>
                <IconBtnStyled icon={ faOpenid } />
            </div>
            <div>
                <input type='text' name='keyword'/>
            </div>
            <div>
                <IconBtnStyled icon={ faPlus } />
                <LogginProfile onClick={handleClickLogginProfile}/>
            </div>
        </HeaderStyled>
            
        <Modal ref={modalRef}>
            <ModalContent>
                <UserDashBoard />
                <ThemeBtn />
            </ModalContent>
        </Modal>
    </div>);
};

export default Header;
