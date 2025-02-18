import React, { useState } from "react";
import styled from 'styled-components';
import LogginProfile from "../LogginProfile";
import { GoogleLoginButton } from "@/ui/GoogleLoginButton";
import { ValueBoolean, ValueInput, FormContainer, KeyStyled } from "./FormContainer";


const Card = styled.div`
    height: 500px;
    width: 300px;

    display: flex;
    flex-direction: column;
    gap: 10px;
`;

export const UserDashBoard = () => {
    const [ tmp, setTmp ] = useState<boolean>(false);
    return (<>
        <Card>
            <GoogleLoginButton />
            <LogginProfile />
            <FormContainer>
                <KeyStyled onClick={() => setTmp((prev) => !prev)}>편집</KeyStyled>
                <ValueBoolean edit={tmp}/>
                <KeyStyled onClick={() => setTmp((prev) => !prev)}>이름</KeyStyled>
                <ValueInput edit={tmp}/>
            </FormContainer>
        </Card>
    </>);
};