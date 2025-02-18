import React, { useEffect } from "react";
import VideoHolder from "@/ui/VideoHolder";
import ItemList from "../align/ItemList";

import { useVideoList, VideoItemProps, fetchVideoList } from "../store/VideoList";


interface VideoApiProps {
    items: VideoItemProps[];
}
const Home = () => {
    const { queue, setQueue } = useVideoList();

    useEffect(() => {
        fetchVideoList().then(
            (res: VideoApiProps) => res?.items || []
        ).then(
            (res: VideoItemProps[]) => setQueue(res)
        ).catch(
            (error) => setQueue([])
        );
    }, []);
    
    return (
        <ItemList minwidth={'250px'}>
            { queue.map((item, index) => <VideoHolder key={index} { ...item }/>) }
        </ItemList>
    )
};

export default Home;