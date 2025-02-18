import { create } from "zustand";
import api from "@/api/axio";

// 댓글 스토어
export interface VideoItemProps {
    thumbnail?: string;
    title?: string;
    publisher?: string;
    numViews?: number;
    created_at?: string;
    videoId?: string;
    bdsrc?: string;
}
interface VideoStore {
    queue: VideoItemProps[];
    setQueue: (items: VideoItemProps[]) => void;
    appendQueue: (items: VideoItemProps[]) => void;
}
export const useVideoList = create<VideoStore>((set) => ({
    queue: [],
    setQueue: (items) => set(() => ({ queue: items })),
    appendQueue: (items) => set((state) => ({ queue: [...state.queue, ...items] })),
}));
export const useVideoMetaData = create<any>((set) => ({
    data: {},
    setData: (item: any) => set(() => ({ data: item })),
}));

interface fetchVideoListProps {
    keyword?: string;
}
export const fetchVideoList = async ({ keyword }: fetchVideoListProps = {}) => {
    let url = '';
    if(keyword) {
        url = `/api/v1/videos?keyword=${keyword}&sort=-created_at`;
    } else {
        url = `/api/v1/videos?sort=-created_at`;
    }

    console.log(url);
    
    const res = await api.get(url);
    return res.data;
};

export const fetchVideoMetaData = async ({ videoId }: { videoId:  string }) => {
    const res = await api.get(
        `/api/v1/videos/${videoId}/metadatas`
    );
    return res.data;
};
