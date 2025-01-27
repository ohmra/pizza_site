import Authenticated from "@/Layouts/AuthenticatedLayout.jsx";
import {motion} from "framer-motion";
import PizzaListContainer from "@/Components/Pizza/PizzaListContainer.jsx";
import {Head} from "@inertiajs/react";

export default function Home({pizzas}){
    return (
        <>
        <Head title="Home" />
            <Authenticated>
                <div className={`w-full h-full flex items-center flex-col overflow-x-hidden
                                lg:flex-row sm:justify-around`}>
                    <motion.aside className={"text-white w-[50%] text-[2em] sm:text-[2em] md:text-[3em] sm:w-[7em]"}
                              initial={{opacity: 0, x: -150}}
                              animate={{opacity: 1, x: 0}}
                              transition={{duration: 1}}
                    >
                        The best pizza of town since 1994!
                    </motion.aside>
                    <motion.div className={"max-md:w-full"}
                        initial={{opacity: 0, x: 150}}
                        animate={{opacity: 1, x: 0}}
                        transition={{duration: 1}}>
                        <PizzaListContainer pizzas={pizzas}/>
                    </motion.div>
                </div>
            </Authenticated>
        </>
    )
}
