import {Link, useForm, usePage} from "@inertiajs/react";
import React from "react";
import {faPenToSquare, faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function PizzaListItem({pizza, editHandler=undefined}) {
    const { auth } = usePage().props;
    const user = auth.user.type === "user";
    const maxTextLength = 100;
    const {delete: destroy, processing} = useForm();
    const handleDelete = (e, pizzaId) => {
        e.preventDefault();
        destroy(route('pizza.delete', [pizzaId]));
    }
    return (
        <div className="bg-[#F3F3F3] rounded-[10px] p-3 flex mb-3 w-full">
            <div className="pizza-list-image-container">
                <img src="./images/pizza.jpg" alt="pizza image"/>
            </div>
            <div className="pizza-list-info">
                <p className="pizza-list-name">{pizza.name}</p>
                <p className="pizza-list-description">{pizza.description.length > maxTextLength ? `${pizza.description.slice(0, maxTextLength)}...` : pizza.description}</p>
                <div className="pizza-list-price">{pizza.price}€</div>
            </div>
            <div className="pizza-list-links">
                {user ? <Link href={route('cart.add')}
                              method="post"
                              as="button"
                              data={{pizza: pizza}}
                              preserveScroll
                              preserveState
                              className="add-to-cart-button">
                        Add to cart
                    </Link>
                    :
                    <div className={"w-full h-full flex flex-col items-end"}>
                        <button onClick={() => editHandler?.(pizza, "edit")}><FontAwesomeIcon icon={faPenToSquare}/></button>
                        <form onSubmit={(e) => handleDelete(e, pizza.id)}>
                            <button disabled={processing}
                                    type="submit"><FontAwesomeIcon icon={faTrash}/></button>
                        </form>
                        <div className="text-[0.6em] mt-auto">
                            last updated : <br/>{formatDate(pizza.updated_at)}
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

const formatDate = (dateString) => {
    // Remove the 'T' and 'Z' and slice the fractional seconds
    return dateString.replace('T', ' ').replace('Z', '').split('.')[0];
};
