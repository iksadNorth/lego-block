import React, { useState, useEffect } from "react";
import VideoHolder from "@/ui/VideoHolder";
import ItemList from "../align/ItemList";

import api from "@/api/axio";


interface VideoItemProps {
    thumbnail?: string;
    title?: string;
    publisher?: string;
    numViews?: Number;
    created_at?: string;
    videoId?: string;
    bdsrc?: string;
}
interface VideoApiProps {
    items: VideoItemProps[];
}
const Home = () => {
    const [items, setItems] = useState<VideoItemProps[]>([]);

    const fetchData = async () => {
        try {
            const res = await api.get(
                `/api/v1/videos?sort=-created_at`
            );
            return res.data;
        } catch {
            return [];
        }
    };

    useEffect(() => {
        fetchData().then(
            (res: VideoApiProps) => res?.items || [null]
        ).then(setItems);
    }, []);
    
    return (
        <ItemList minwidth={'250px'}>
            { items.map((item, index) => <VideoHolder key={index} { ...item }/>) }
        </ItemList>
    )
};

export default Home;