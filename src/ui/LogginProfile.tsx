import React from "react";
import useLocalStorage from "@/hook/storage";
import Bedge from "@/ui/Bedge";
import { initialValueUserInfo, UserInfoProps } from "@/api/AuthGoogleCallback";


interface LogginProfileProps {
    onClick?: React.MouseEventHandler;
}
const LogginProfile: React.FC<LogginProfileProps> = ({ onClick }) => {
    const [ userInfo ] = useLocalStorage<UserInfoProps>('user_info', initialValueUserInfo);
    
    return userInfo.accessToken ? (
        <Bedge src={userInfo.bedge_src ?? null} onClick={ onClick }>
            { userInfo.nickname ?? '' }
        </Bedge>
    ) : (
        <Bedge src={null} onClick={ onClick }>
            비로그인
        </Bedge>
    )
};

export default LogginProfile;
