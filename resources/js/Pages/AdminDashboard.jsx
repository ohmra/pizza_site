import AdminDashboardLayout from "@/Layouts/AdminDashboardLayout.jsx";
import Authenticated from "@/Layouts/AuthenticatedLayout.jsx";
import UserList from "@/Pages/User/UserList.jsx";
import {useState} from "react";
import PizzaListContainer from "@/Components/Pizza/PizzaListContainer.jsx";
import { motion } from "framer-motion";
import AdminIndex from "@/Pages/Order/AdminIndex.jsx";
import {Head} from "@inertiajs/react";

export default function AdminDashboard({pizzas, users, orders}) {
    const [itemSelected, setItemSelected] = useState("overview");
    return (
        <Authenticated>
            <Head title="Dashboard" />
            <AdminDashboardLayout onSelectedItem={setItemSelected}>
                <motion.div
                    key={itemSelected}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className={"max-md:w-full"}
                >
                    {itemSelected === "overview" && <Overview />}
                    {itemSelected === "pizza" && <PizzaListContainer pizzas={pizzas} />}
                    {itemSelected === "user" && <UserList users={users} />}
                    {itemSelected === "order" && <AdminIndex orders={orders} />}
                </motion.div>
            </AdminDashboardLayout>
        </Authenticated>
    )
}

function Overview(){
    return (
        <div className={"absolute inset-0 w-full h-full bg-white"}>

        </div>
    );
}


