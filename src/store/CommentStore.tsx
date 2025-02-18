import { create } from "zustand";
import api from "@/api/axio";

// 댓글 스토어
export const useCommentStore = create<any>((set) => ({
    items: [],
    totalCount: 0,
    
    setItems: (items: any) => set(() => ({ items })),

    fetchItems: async ({ videoId }: { videoId: string }) => {
        const res = await fetchCommentList({ videoId });
        set({ totalCount: res.totalCount, items: res.items });
    },
}));

export const fetchCommentList = async ({ videoId }: { videoId: string }) => {
    const res = await api.get(`/api/v1/videos/${videoId}/comments?page_size=10&page=1&sort=-created_at`);
    return res.data;
};

export const insertComment = async ({ videoId, text }: { videoId: string, text: string }) => {
    await api.post(`/api/v1/videos/${videoId}/comments`, {
        comment: text,
    });
};

export const deleteCommentById = async ({ commentId }: { commentId: string }) => {
    await api.delete(`/api/v1/comments/${commentId}`);
};
