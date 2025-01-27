import {Link, usePage} from "@inertiajs/react";
import React, {useRef, useState} from "react";
import {faCartPlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function CartButton() {
    const { cart, total_cost } = usePage().props;
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    let cart_length = Object.keys(cart).length;

    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setDropdownVisible(!isDropdownVisible);
    }


    return (
        <div style={{position: 'relative', display: 'inline-block'}} className="cart">
            <button onClick={toggleDropdown} aria-expanded={isDropdownVisible}>
                <FontAwesomeIcon icon={faCartPlus} /> ({cart_length})
            </button>

            {isDropdownVisible && (
                <div
                    className="fixed inset-0 z-20"
                    onClick={() => setDropdownVisible(false)}
                ></div>
            )}

            {/* Toggle Dropdown */}
            <div ref={dropdownRef}
                className={`cart-dropdown text-[1.2rem] z-40 transition-all duration-300 ease-in-out ${isDropdownVisible ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-6'}`}>

                {cart_length > 0 ? (
                    <ul>
                        <li className="cart-header text-center font-bold text-orange-500">YOUR CART</li>
                        <li className={`max-h-80 overflow-y-auto`}>
                            <ul className={"flex flex-col"}>
                                {
                                    Object.entries(cart).map(([key, pizza], index) => (
                                        <li key={index} className={"flex flex-row w-full justify-between items-center"}>
                                            <div className="cart-dropdown-name-wrapper">
                                                <div>{pizza.name}</div>
                                                <div>{pizza.price}€</div>
                                            </div>
                                            <div className="cart-dropdown-quantity">
                                                <Link method="post" href={route('cart.remove')} data={{'id': pizza.id}}
                                                      as="button"> - </Link>
                                                <div>{pizza.quantity}</div>
                                                <Link href={route('cart.add')} method="post" as="button" data={{pizza: pizza}}
                                                      preserveScroll preserveState> + </Link>
                                            </div>
                                            <div>{Number(pizza.price * pizza.quantity).toFixed(2)}€</div>
                                            <div><Link method="post" href={route('cart.removeAll')} data={{'id': pizza.id}}
                                                       as="button"><FontAwesomeIcon icon={faTrash} /></Link></div>
                                        </li>
                                    ))
                                }
                            </ul>
                        </li>
                        <hr/>
                        <li className={"text-right text-red-500 text-[1em]"}><Link href={route('cart.clear')} method="post" as="button">Clear cart</Link></li>
                        <li>Total cost : <span className={"font-bold"}>{Number(total_cost).toFixed(2)}€</span></li>
                    </ul>


                ) : (
                    <p className={"p-[1em] text-[0.7em] text-gray-400"}>Your cart is empty</p>
                )}
                <Link href={route('cart.show')} className={"text-[1em] text-blue-500"}>Show cart</Link>
            </div>

        </div>
    )
}
