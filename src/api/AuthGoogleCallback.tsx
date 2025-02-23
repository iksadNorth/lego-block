import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import useUserInfoStore from "../store/UserInfoStore";


const AuthGoogleCallback = () => {
    const [searchParams] = useSearchParams();
    const { fetchToken } = useUserInfoStore();

    useEffect(() => {
        const code = searchParams.get("code");
        if (!code) return;
        fetchToken(code).finally(() => { window.close();});

    }, []);
  return (<></>);
};

export default AuthGoogleCallback;
