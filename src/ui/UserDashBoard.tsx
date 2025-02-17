import React from "react";
import styled from 'styled-components';
import { UserLogginBedge } from "@/views/UserLogginBedge";
import { GoogleLoginButton } from "@/ui/GoogleLoginButton";


const Card = styled.div`
    height: 500px;
    width: 300px;

    display: flex;
    flex-direction: column;
    gap: 10px;
`;

export const UserDashBoard = () => {
    return (<>
        <Card>
            <div>
                <GoogleLoginButton />
            </div>
        </Card>
    </>);
};