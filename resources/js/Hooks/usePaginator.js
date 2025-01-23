import {useState} from "react";

export default function usePaginator({data = null, display_count = 0, listContainerRef = null}) {
    const [indexPaginator, setIndexPaginator] = useState(1);
    const numberOfPage = Math.ceil(data.length / display_count);
    const displayed_data = data.slice((indexPaginator - 1) * display_count, indexPaginator * display_count);
    const [animation, setAnimation] = useState(false);

    const paginatorHandler = (id) => {
        setAnimation(true);

        setTimeout(() => {
            setIndexPaginator(id);
        }, 300);


        if(listContainerRef.current){
            listContainerRef.current.scrollTo({top: 0, behavior: "smooth"});
        }

        setTimeout(() => {
            setAnimation(false);
        }, 300);
    }
    return  { indexPaginator, numberOfPage, displayed_data, animation, paginatorHandler, setIndexPaginator }
}
