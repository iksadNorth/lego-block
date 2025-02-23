import styled from 'styled-components';
import useUserInfoStore from "../store/UserInfoStore";


export const FRONT_URL = import.meta.env.VITE_API_FRONTEND_URL;
export const openPopup = (
        url: string, 
        params: Record<string, string>={}, 
        options = 'width=400,height=600'
    ) => {
    return new Promise<void>((resolve, reject) => {
        const form = document.createElement("form");
        form.method = "GET";
        form.action = url;
        form.target = "popupWindow"; // 새 창의 이름 지정

        // 각 파라미터를 form의 hidden input으로 추가
        Object.keys(params).forEach((key: string) => {
            const input = document.createElement("input");
            input.type = "hidden";
            input.name = key;
            input.value = params[key];
            form.appendChild(input);
        });

        document.body.appendChild(form);

        // 팝업 창 열기 (폼을 통해)
        const popup = window.open("", "popupWindow", options);

        if (!popup) {
            reject();
            return;
        }

        form.submit();
        document.body.removeChild(form); // 폼 제거

        // 타입스크립트 빌드로 인해 억지로 넣은 구문. 사용 안할 거임
        resolve();
    });
};

const GoogleButton = styled.button`${({ theme }) => `
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;

    background-color: ${theme.colors.background};
    color: ${theme.colors.text};
    border: 1px solid #dadce0;

    padding: 10px 16px;
    border-radius: 4px;

    font-size: 14px;
    font-weight: 500;

    cursor: pointer;
    transition: background 0.5s, box-shadow 0.5s;
    
    &:hover {
        background: ${theme.colors.backgroundHover};
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    &:active {
        background: ${theme.colors.backgroundHover};
    }
`}`;

const GoogleIcon = styled.img`
  width: 18px;
  height: 18px;
`;

export const GoogleLoginButton = () => {
    const { userInfo, removeUserInfo } = useUserInfoStore();

    const CLIENT_ID = "166933239001-7hecbc575m8g9n3l9lt7idjb2570brov.apps.googleusercontent.com";
    const REDIRECT_URI = `${FRONT_URL}/auth/google/callback`;

    const googleLogin = () => {
        const authUrl = `https://accounts.google.com/o/oauth2/auth`;
        const params = {
            client_id: CLIENT_ID,
            redirect_uri: REDIRECT_URI,
            response_type: `code`,
            scope: `email profile`,
        };
        openPopup(authUrl, params);
    };
    const logout = () => {
        removeUserInfo();
    };
    if(userInfo.accessToken) {
        return (
            <GoogleButton onClick={logout}>
                <GoogleIcon src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/2048px-Google_%22G%22_logo.svg.png" alt="Google" />
                Log Out
            </GoogleButton>
        );
    } else {
        return (
            <GoogleButton onClick={googleLogin}>
                <GoogleIcon src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/2048px-Google_%22G%22_logo.svg.png" alt="Google" />
                Sign in with Google
            </GoogleButton>
        );
    }
};

