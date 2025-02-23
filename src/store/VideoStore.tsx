import { create } from "zustand";
import api from "../api/axio";

// 댓글 스토어
export const useVideoStore = create<any>((set) => ({
    metaData: {},
    items: [],

    setMetaData: (metaData: any) => set(() => ({ metaData })),
    setItems: (items: any) => set(() => ({ items })),

    fetchMetaData: async ({ videoId }: { videoId:  string }) => {
        const res = await fetchVideoMetaData({ videoId });        
        set({ metaData: res });
    },
    fetchItems: async ({ keyword }: fetchVideoListProps = {}) => {
        const res = await fetchVideoList({ keyword });
        set({ items: res.items });
    },
}));

interface fetchVideoListProps {
    keyword?: string;
}
export const fetchVideoList = async ({ keyword }: fetchVideoListProps = {}) => {
    let url = '';
    if(keyword) {
        url = `/api/v1/videos?page=1&page_size=100&sort=-created_at&keyword=${keyword}`;
    } else {
        url = `/api/v1/videos?page=1&page_size=100&sort=-created_at`;
    }
    
    const res = await api.get(url);
    return res.data;
};

export const fetchVideoMetaData = async ({ videoId }: { videoId:  string }) => {
    const res = await api.get(
        `/api/v1/videos/${videoId}/metadatas`
    );
    return res.data;
};
