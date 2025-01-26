import DashboardItem from "@/Components/DashboardItem.jsx";
import {usePage} from "@inertiajs/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCartShopping, faPizzaSlice, faUser} from "@fortawesome/free-solid-svg-icons";

export default function AdminDashboardLayout({children, onSelectedItem}) {
    const user = usePage().props.auth.user;
    const validItem = ["pizza", "user", "order", "overview"];
    const handleClickItem = (item) => {
        if(validItem.includes(item)) {
            onSelectedItem(item);
        }
    }
    return (
        <div className={"w-full h-full flex items-center justify-between"}>
            <div className={"bg-white w-[18em] h-full border-r"}>
                <div className={"h-20  font-bold text-[2em] text-gray-400 p-4"}>{user.name}</div>
                <hr className={"mb-[2.5em]"}/>
                {/*TODO: OVERVIEW*/}
                <DashboardItem handler={handleClickItem} id={"overview"} >Overview</DashboardItem>

                <DashboardItem handler={handleClickItem} id={"pizza"} icon={<FontAwesomeIcon icon={faPizzaSlice}/>}>Pizzas</DashboardItem>
                <DashboardItem handler={handleClickItem} id={"user"} icon={<FontAwesomeIcon icon={faUser} />}>Users</DashboardItem>
                <DashboardItem handler={handleClickItem} id={"order"} icon={<FontAwesomeIcon icon={faCartShopping} />}>Orders</DashboardItem>
                </div>
            <div className={"flex-grow h-full flex items-center justify-center relative"}>
                {children}
            </div>
        </div>
    )
}
