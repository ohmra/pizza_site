import Authenticated from "@/Layouts/AuthenticatedLayout.jsx";
import {motion} from "framer-motion";
import PizzaListContainer from "@/Components/Pizza/PizzaListContainer.jsx";

export default function Home({pizzas}){
    return (
        <Authenticated>
            <div className="home overflow-x-hidden">
                <motion.p id="introduction"
                          initial={{opacity: 0, x: -150}}
                          animate={{opacity: 1, x: 0}}
                          transition={{duration: 1}}
                >
                    The best pizza of town since 1994!
                </motion.p>
                <motion.div
                    initial={{opacity: 0, x: 150}}
                    animate={{opacity: 1, x: 0}}
                    transition={{duration: 1}}>
                    <PizzaListContainer pizzas={pizzas}/>
                </motion.div>
            </div>
        </Authenticated>
    )
}
