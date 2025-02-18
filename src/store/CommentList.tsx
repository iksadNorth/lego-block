import { create } from "zustand";
import api from "@/api/axio";

// 댓글 스토어
export interface CommentItemProps {
}
interface CommentStore {
    queue: CommentItemProps[];
    setQueue: (items: CommentItemProps[]) => void;
    appendQueue: (items: CommentItemProps[]) => void;
}
export const useCommentList = create<CommentStore>((set) => ({
    queue: [],
    setQueue: (items) => set(() => ({ queue: items })),
    appendQueue: (items) => set((state) => ({ queue: [...state.queue, ...items] })),
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
