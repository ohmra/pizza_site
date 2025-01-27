import {useForm} from "@inertiajs/react";
import {motion} from "framer-motion";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleXmark} from "@fortawesome/free-solid-svg-icons";

export default function PizzaModalForm({action, pizza, handleModalClose}){
    const {data, setData, post, put, processing, errors, reset} = useForm({
        name: pizza ? pizza.name : '',
        description: pizza ? pizza.description : '',
        price: pizza ? Number(pizza.price).toFixed(2) : '',
    });

    const submit = (e) => {
        e.preventDefault();

        if(action === 'create'){
            post(route('pizza.create'), {
                onSuccess: () => {
                    reset();
                    handleModalClose();
                },
            });
        }
        else if (action === 'edit' && pizza?.id){
            put(route('pizza.edit', [pizza?.id]), {
                onSuccess: () => {
                    reset();
                    handleModalClose()
                },
            })
        }
    }
    return (
            <div className={`fixed inset-0 bg-blue-50/75 flex items-center justify-center`}>
                <div className={"fixed inset-0 z-40"} onClick={() => handleModalClose()}></div>
                <motion.div className="pizza-form w-[18em] md:w-[25em] h-[30em] z-50"
                            initial={{opacity: 0, y: -150}}
                            animate={{opacity: 100, y: 0}}
                            exit={{opacity:0}}
                            duration={100}
                >
                    <form onSubmit={submit}>
                        <button type={"button"} className={"absolute right-8 top-6 text-2xl"} onClick={() => handleModalClose()}>
                            <FontAwesomeIcon icon={faCircleXmark}/></button>
                        <h1>Pizza Creation</h1>
                        <div className="input-wrapper">
                            <label className="input-label" htmlFor="name">Name</label>
                            <input className="input-form" type="text" id="name" name="name" value={data.name}
                                   onChange={(e) => setData('name', e.target.value)} placeholder="Margherita"
                                   required/>
                            {errors.name && <p className="input-error">{errors.name}</p>}
                        </div>

                        <div className="input-wrapper">
                            <label className="input-label" htmlFor="description">Description</label>
                            <textarea className="input-form" type="text" id="description" name="description"
                                      onChange={(e) => setData('description', e.target.value)}
                                      placeholder="fresh mozarella, tomato sauce and basil" value={data.description}
                                      rows="4"/>
                            {errors.description && <p className="input-error">{errors.description}</p>}
                        </div>

                        <div className="input-wrapper">
                            <label className="input-label" htmlFor="price">Price</label>
                            <input className="input-form" type="text" id="price" name="price" value={data.price}
                                   onChange={(e) => setData('price', e.target.value)} placeholder="5.99" required/>
                            {errors.price && <p className="input-error">{errors.price}</p>}
                        </div>

                        <button type="submit" id="pizza-button-form"
                                disabled={processing}>{processing ? 'Processing...' : 'Confirm'}</button>
                    </form>
                </motion.div>
            </div>
    );
}
