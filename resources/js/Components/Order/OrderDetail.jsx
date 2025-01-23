import {Link, useForm, usePage} from "@inertiajs/react";
import {useEffect} from "react";

export default function OrderDetail({selectedOrder, fade}){
    const {user} = usePage().props.auth;
    const userType = user.type;

    const { data, setData, put } = useForm({
        'status': selectedOrder?.status,
    });

    useEffect(() => {
        if(selectedOrder){
            setData('status', selectedOrder.status);
        }
    }, [selectedOrder]);

    const handleStatus = (e, order) => {
        e.preventDefault();

        put(route('order.change_status', [order.id]));
    }
    return (
        <div
            className={`w-[400px] h-[500px] bg-white/75 rounded-md p-10 transition-opacity duration-300 ease-in-out ${fade ? "opacity-0" : "opacity-100"}`}>
            <div className={"text-center font-bold text-3xl"}>Order detail</div>
            <hr/>
            {selectedOrder === null
                ?
                <p className={"h-full flex items-center justify-center text-gray-300"}>NO ORDER SELECTED</p>
                :
                <>
                    <ul className={"flex flex-col gap-2 h-80 overflow-auto"}>
                        {
                            selectedOrder.pizzas.map((pizza, index) => (
                                <li key={index} className={"flex flex-row w-full gap-2 items-center"}>
                                    <div className={"w-20 overflow-hidden"}>
                                        <div className={"text-lg"}>{pizza.name}</div>
                                        <div className={"text-xs"}>{pizza.price}€</div>
                                    </div>
                                    <div>x{pizza.pivot.qty}</div>
                                    <div
                                        className={"flex-grow text-right"}>{Number(pizza.price * pizza.pivot.qty).toFixed(2)}€
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                    <hr/>
                    <div>Total : {selectedOrder.total}€</div>
                    <div>Date : {formatDate(selectedOrder.created_at)}</div>
                    {userType === 'admin' && <div>Status : {selectedOrder.status} </div>}
                    {userType === 'cook' &&
                        <>
                            <div className={"flex"}>
                                <form onSubmit={(e) => handleStatus(e, selectedOrder)}>
                                    <select name="status" id="status" value={data.status}
                                            onChange={(e) => setData('status', e.target.value)}
                                            className={"rounded-lg text-s p-1 pr-7 bg-orange-300"}
                                    >
                                        <option value="sent">Sent</option>
                                        <option value="preparing">Preparing</option>
                                        <option value="ready">Ready</option>
                                        <option value="picked out">Picked out</option>
                                    </select>
                                    <button className={"text-xs"} type="submit">Change</button>
                                </form>
                                <Link className={"ml-auto text-blue-600"} href={route('order.next_status')}
                                      data={{'id': selectedOrder.id}}
                                      method="put">Update</Link>
                            </div>
                        </>
                    }
                </>
            }
        </div>
    )
}

const formatDate = (dateString) => {
    // Remove the 'T' and 'Z' and slice the fractional seconds
    return dateString.replace('T', ' ').replace('Z', '').split('.')[0];
};
