import axios from "axios";


export const BACK_URL = import.meta.env.VITE_API_BACKEND_URL;
const api = axios.create({
    baseURL: BACK_URL,
    timeout: 5000, // 요청 제한 시간 (5초)
    headers: { "Content-Type": "application/json" },
});

// 요청 인터셉터
api.interceptors.request.use(
    (config) => {
        const userInfoRaw = JSON.parse(localStorage.getItem("user_info") || '');
        const userInfo = userInfoRaw?.state?.userInfo;
        if(!userInfo) return config;

        const token = userInfo.accessToken;
        if (!token) return config;
        
        config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;
