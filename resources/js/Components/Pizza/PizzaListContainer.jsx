import PizzaListItem from "@/Components/Pizza/PizzaListItem.jsx";
import {useRef, useState} from "react";
import {AnimatePresence} from "framer-motion";
import PizzaModalForm from "@/Components/Pizza/PizzaModalForm.jsx";
import usePaginator from "@/Hooks/usePaginator.js";
import useSearch from "@/Hooks/useSearch.js";
import Paginator from "@/Components/Paginator.jsx";
import {usePage} from "@inertiajs/react";
import SearchBar from "@/Components/SearchBar.jsx";

export default function PizzaListContainer({pizzas}) {
    const {user} = usePage().props.auth;
    const admin = user.type === "admin";
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [action, setAction] = useState("")
    const [pizzaData, setPizzaData] = useState(null)

    const handleModalClose = () => {
        setAction("");
        setPizzaData(null);
        setIsModalOpen(false);
    }
    const modalHandler = (pizza, act) => {
        setPizzaData(pizza);
        setAction(act);
        setIsModalOpen(true);
    }

    const {search, setSearch, filteredItems: filteredPizzas} = useSearch({
        items: pizzas,
        filterType: "name",
    });

    const pizzaListContainerRef = useRef(null);

    const {indexPaginator, numberOfPage, displayed_data, animation, paginatorHandler, setIndexPaginator} = usePaginator({
        data: filteredPizzas,
        display_count: 6,
        listContainerRef: pizzaListContainerRef
    });

    return (
        <>
            <div className={`bg-white h-[60em] max-sm:mt-20 sm:h-[30em] w-[50em] rounded-[10px] overflow-auto p-3`}
                 ref={pizzaListContainerRef}>
                {
                    admin &&
                    <button className={"w-[12em] mr-[1em] p-[0.3em] bg-green-300 mb-1 rounded-lg"}
                            onClick={() => modalHandler(null, "create")}>ADD A PIZZA
                    </button>
                }
                <SearchBar search={search} setSearch={setSearch} setIndexPaginator={setIndexPaginator} />
                <div
                    className={`transition-opacity duration-300 ease-in-out ${animation ? 'opacity-0' : 'opacity-100'}`}>
                    <ul>
                        {displayed_data.map(pizza => (
                            <li key={pizza.id}><PizzaListItem pizza={pizza} editHandler={modalHandler}/></li>
                        ))}
                    </ul>
                    <Paginator numberOfPage={numberOfPage} indexPaginator={indexPaginator}
                               paginatorHandler={paginatorHandler}/>
                </div>
            </div>
            <AnimatePresence>
                {
                    isModalOpen &&
                    <PizzaModalForm action={action} pizza={pizzaData} handleModalClose={handleModalClose}/>
                }
            </AnimatePresence>
        </>
    );
}
