import {motion} from "framer-motion";
import React, {useMemo, useRef, useState} from "react";
import OrderDetail from "@/Components/Order/OrderDetail.jsx";
import {usePage} from "@inertiajs/react";
import usePaginator from "@/Hooks/usePaginator.js";
import Paginator from "@/Components/Paginator.jsx";

export default function OrderIndex({className, orders, dateOptions}){
    const {user} = usePage().props.auth;
    const userType = user.type;

    const [ hidePicked, setHidePicked ] = useState(false);
    const visibleOrder = useMemo(() => {
        return orders.filter((pizza) => !(hidePicked && pizza['status'] === "picked out"));
    }, [hidePicked, orders]);

    const [fade, setFade] = useState(false)

    const [selectedOrder, setSelectedOrder] = useState(null);

    const orderClickHandler = (current_order) => {
        setFade(true);
        setTimeout(() => {
            setSelectedOrder(current_order);
            setFade(false);
        }, 300)
    }

    const {selectedDate = '', handleChangeDate = () => {}, earnings = 0} = dateOptions || {};

    //PAGINATOR
    const userIndexRef = useRef(null);
    const {indexPaginator, numberOfPage, displayed_data, animation, paginatorHandler } = usePaginator({
        data: visibleOrder,
        display_count: 10,
        listContainerRef: userIndexRef
    });

    return (
        <div className={`w-full h-full flex flex-col md:flex-row items-center sm:justify-around ${userType === "admin" ? 'gap-4' : ''} ${className}`}>
            <motion.div
                className={`p-10 bg-white rounded-tl-2xl rounded-bl-2xl my-4 rounded-tr-md rounded-br-md h-[30em] md:h-[36em] w-full md:w-[30em] xl:w-[50em] overflow-auto`}
                initial={{opacity: 0, x: -150}}
                animate={{opacity: 1, x: 0}}
                transition={{duration: 1}}
                ref={userIndexRef}
            >
                {!(userType === 'cook') &&
                    <div className={"m-2"}>
                        <input type="checkbox" id="pickedToggle" onChange={(e) => setHidePicked(e.target.checked)}/>
                        <label className={"ml-2"} htmlFor="pickedToggle">Show not picked order only</label>
                    </div>
                }

                {userType === 'admin' && <>
                    <div>
                        <input className={"text-xs"} type="date" value={selectedDate} onChange={handleChangeDate}/>
                    </div>
                    <div>Earnings : {earnings}€</div>
                </>}
                <div
                    className={`transition-opacity duration-300 ease-in-out ${animation ? 'opacity-0' : 'opacity-100'}`}>
                    <table className={`table-auto w-full border-collapse border border-gray-200`}>
                        <thead className="bg-gray-200">
                        <tr>
                            <th className={"border text-left px-4 py-3"}>Order Number</th>
                            <th className={"border text-left px-4 py-3 w-80"}>Status</th>
                            <th className={"border text-left px-4 py-3"}>Total</th>
                        </tr>
                        </thead>
                        <tbody>
                        {displayed_data.length > 0 ?
                            displayed_data.map((order) => (
                                <tr className={`hover:bg-orange-300 hover:cursor-pointer ${selectedOrder?.id === order.id ? 'bg-orange-300' : ''}`}
                                    key={order.id}
                                    onClick={() => orderClickHandler(order)}
                                >
                                    <td className={"border text-left px-4 py-3"}>{order.id}</td>
                                    <td className={"border text-left px-4 py-3"}>{order.status}</td>
                                    <td className={"border text-left px-4 py-3"}>{order.total}€</td>
                                </tr>
                            ))
                            :
                            <tr>
                                <td colSpan="3" className="text-center py-4 text-gray-400">
                                    <p>No order</p>
                                </td>
                            </tr>
                        }
                        </tbody>
                    </table>
                    <Paginator numberOfPage={numberOfPage} indexPaginator={indexPaginator}
                               paginatorHandler={paginatorHandler} className={"mt-3"}/>
                </div>
            </motion.div>
            <OrderDetail selectedOrder={selectedOrder} fade={fade}/>
        </div>
)
}
