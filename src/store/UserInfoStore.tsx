import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "../api/axio";


export interface UserInfoProps {
    accessToken: string | null;
    bedge_src: string | null;
    nickname: string | null;
}

export const initialValueUserInfo: UserInfoProps = {
    accessToken: null,
    bedge_src: null,
    nickname: null,
};

interface UserInfoStoreState {
    userInfo: UserInfoProps;
    setUserInfo: (userInfo: Partial<UserInfoProps>) => void;
    removeUserInfo: () => void;
    syncUserInfo: () => void;
    fetchToken: (code: string) => Promise<void>;
    updateUserInfo: (props: UserInfoUpdateProps) => Promise<void>;
}

const useUserInfoStore = create<UserInfoStoreState>()(
    persist<UserInfoStoreState>(
        (set) => ({
            userInfo: initialValueUserInfo,
            setUserInfo: (userInfo) => set((state) => ({
                userInfo: { ...state.userInfo, ...userInfo },
            })),
            removeUserInfo: () => set({
                userInfo: { ...initialValueUserInfo },
            }),
            syncUserInfo: () => {
                const storedData = localStorage.getItem("user_info");
                if (!storedData) return;
                set({ userInfo: JSON.parse(storedData).state.userInfo });
            },
            fetchToken: async (code) => {
                const res = await fetchToken(code);
                if(!res.access_token) return;
                set((state) => ({ userInfo: { 
                    ...state.userInfo,
                    ...res.user, 
                    accessToken: res.access_token, 
                }}));
            },
            updateUserInfo: async (props) => {
                await updateUserInfo(props);
                const resUserInfo = await readUserInfo();
                set((state) => ({ userInfo: { 
                    ...state.userInfo,
                    ...resUserInfo, 
                }}));
            },
        }),
        {
            name: "user_info",
        }
    )
);

const fetchToken = async (code: string) => {
    const res = await api.post(
        "/api/v1/auth/google/callback", { code }
    );
    return res.data;
};

export interface UserInfoUpdateProps {
    nickname: string | null;
}
const updateUserInfo = async (props: UserInfoUpdateProps) => {
    const res = await api.patch(
        "/api/v1/users/me", props
    );
    return res.data;
};

const readUserInfo = async () => {
    const res = await api.get(
        "/api/v1/users/me"
    );
    return res.data;
};

// `storage` 이벤트 감지해서 Zustand 상태 업데이트
window.addEventListener("storage", (event) => {
    if (event.key === "user_info") {
        useUserInfoStore.getState().syncUserInfo();
    }
});


export default useUserInfoStore;
