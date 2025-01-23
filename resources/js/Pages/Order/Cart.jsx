import {Link, usePage} from "@inertiajs/react";
import React from "react";
import Authenticated from "@/Layouts/AuthenticatedLayout.jsx";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {motion} from "framer-motion";

export default function Cart(){
    const { cart, total_cost } = usePage().props;
    const cart_length = Object.keys(cart).length;
    return (
        <Authenticated>
            <div className={"flex w-full h-full items-center justify-center"}>
                <motion.div className={`w-[400px] h-[500px] bg-white rounded-md p-10`}
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{duration: 1}}
                >
                    <div className={"text-center font-bold text-3xl text-orange-500"}>Cart detail</div>
                    <hr/>
                    {cart_length > 0 ? (
                        <>
                            <ul className={"flex flex-col gap-2 h-80 overflow-auto"}>
                                {
                                    Object.entries(cart).map(([key, pizza], index) => (
                                        <li key={index} className={"flex flex-row w-full gap-2 items-center"}>
                                            <div className={"w-20 overflow-hidden"}>
                                                <div className={"text-lg"}>{pizza.name}</div>
                                                <div className={"text-xs"}>{pizza.price}€</div>
                                            </div>
                                            <div>
                                                <Link method="post" href={route('cart.remove')} data={{'id': pizza.id}}
                                                       as="button"> - </Link>
                                                {pizza.quantity}
                                                <Link href={route('cart.add')} method="post" as="button" data={{pizza: pizza}}
                                                      preserveScroll preserveState> + </Link>
                                            </div>
                                            <div
                                                className={"flex-grow text-right"}>{Number(pizza.price * pizza.quantity).toFixed(2)}€
                                            </div>
                                            <Link method="post" href={route('cart.removeAll')} data={{'id': pizza.id}}
                                                  as="button"><FontAwesomeIcon icon={faTrash} /></Link>
                                        </li>
                                    ))
                                }
                            </ul>
                            <hr/>
                            <div className={"w-full text-right"}>
                                <Link href={route('cart.clear')} method="post" as="button" className={"text-red-400 text-sm hover:text-red-600"}>Clear cart</Link>
                            </div>
                            <div className={"font-bold"}>Total cost : {Number(total_cost).toFixed(2)}€</div>
                            <div className={"w-full flex items-center justify-center h-10"}>
                                <Link className={"bg-orange-400 hover:bg-orange-600 p-2 rounded-md"} method="post" as="button" href={route('order.execute')}>Proceed Order</Link>
                            </div>
                        </>
                    )
                    :
                    <p className={"w-full h-full flex items-center justify-center text-gray-400"}>Your cart is empty</p>
                }
                </motion.div>
            </div>
        </Authenticated>
    )
}
