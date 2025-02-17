import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import api from "@/api/axio";
import useLocalStorage from "@/hook/storage";


export interface UserInfoProps {
    accessToken: string | null;
    bedge_src: string | null;
    nickname: string | null;
}
export const initialValueUserInfo = {
    accessToken: null,
    bedge_src: null,
    nickname: null,
};

const AuthGoogleCallback = () => {
    const [searchParams] = useSearchParams();
    const [userInfo, setUserInfo, removeUserInfo] = useLocalStorage<UserInfoProps>('user_info', initialValueUserInfo);

    const fetchToken = (code: string) => async () => {
        const res = await api.post(
            "/api/v1/auth/google/callback", { code }
        );
        return res.data;
    };

    useEffect(() => {
        const code = searchParams.get("code");
        if (!code) return;
        
        fetchToken(code)().then((res) => {
            if(!res.access_token) return;
            setUserInfo({
                ...res.user,
                accessToken: res.access_token,
            });
        }).finally(() => { window.close();});

    }, []);
  return (<></>);
};

export default AuthGoogleCallback;
