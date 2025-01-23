import React, {useEffect, useMemo, useState} from "react";
import OrderIndex from "@/Components/Order/OrderIndex.jsx";

export default function AdminIndex({orders}){

    const [ selectedDate, setSelectedDate ] = useState('');
    const handleChangeDate = (e) => {
        const date = e.target.value;
        setSelectedDate(date);
    }
    const filteredByDateOrder = useMemo(() => {
        return selectedDate === ''
            ? orders
            : orders.filter((order) => formatDate(order.created_at).startsWith(selectedDate));
    }, [selectedDate, orders]);
    const [ earnings, setEarnings ] = useState(0);

    useEffect(() => {
        if(selectedDate !== ''){
            let totalEarning = 0;
            filteredByDateOrder.forEach(function(order){
                totalEarning += Number(order.total);
            });
            setEarnings(totalEarning);
        }
    }, [selectedDate]);
    const dateOptions = {
        selectedDate,
        earnings,
        handleChangeDate
    }
    return (
        <OrderIndex orders={filteredByDateOrder} dateOptions={dateOptions}/>
    );
}
