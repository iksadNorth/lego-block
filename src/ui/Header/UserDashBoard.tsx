import styled from 'styled-components';
import LogginProfile from "../LogginProfile";
import { GoogleLoginButton } from "../GoogleLoginButton";
import UserInfoUpdater from "./UserInfoUpdater";


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
            <GoogleLoginButton />
            <LogginProfile />
            <UserInfoUpdater />
        </Card>
    </>);
};