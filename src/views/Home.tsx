import { useEffect } from "react";
import VideoHolder from "../ui/VideoHolder";
import ItemList from "../align/ItemList";

import { useVideoStore } from "../store/VideoStore";


const Home = () => {
    const { items, fetchItems } = useVideoStore();

    useEffect(() => {
        fetchItems();
    }, []);
    
    return (
        <ItemList minwidth={'250px'}>
            { items.map((item: any, index: number) => <VideoHolder key={index} { ...item }/>) }
        </ItemList>
    )
};

export default Home;