import React from "react";
import Bedge from "@/ui/Bedge";
import useUserInfoStore from "../store/UserInfoStore";


interface LogginProfileProps {
    onClick?: React.MouseEventHandler;
}
const LogginProfile: React.FC<LogginProfileProps> = ({ onClick }) => {
    const { userInfo } = useUserInfoStore();
    
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
