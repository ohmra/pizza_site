import DashboardItem from "@/Components/DashboardItem.jsx";
import {usePage} from "@inertiajs/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCartShopping, faPizzaSlice, faUser} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";

export default function AdminDashboardLayout({children, onSelectedItem}) {
    const user = usePage().props.auth.user;
    const validItem = ["pizza", "user", "order", "overview"];
    const [menuOpen, setMenuOpen] = useState(false); // Dropdown state
    const handleClickItem = (item) => {
        if(validItem.includes(item)) {
            onSelectedItem(item);
            setMenuOpen(false); // Close menu after selecting item on mobile
        }
    }

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    }
    return (
        <div className={"w-full h-full flex flex-col lg:items-center justify-between lg:flex-row"}>
            <div className={"bg-white w-[18em] h-full border-r hidden lg:block"}>
                <div className={"h-20  font-bold text-[2em] text-gray-400 p-4"}>{user.name}</div>
                <hr className={"mb-[2.5em]"}/>
                {/*TODO: OVERVIEW*/}
                <DashboardItem handler={handleClickItem} id={"overview"} >Overview</DashboardItem>

                <DashboardItem handler={handleClickItem} id={"pizza"} icon={<FontAwesomeIcon icon={faPizzaSlice}/>}>Pizzas</DashboardItem>
                <DashboardItem handler={handleClickItem} id={"user"} icon={<FontAwesomeIcon icon={faUser} />}>Users</DashboardItem>
                <DashboardItem handler={handleClickItem} id={"order"} icon={<FontAwesomeIcon icon={faCartShopping} />}>Orders</DashboardItem>
            </div>
            {/* Dropdown button for small screens */}
            <div className="lg:hidden w-full p-4">
                <button
                    className="bg-blue-500 text-white p-2 rounded-md w-full"
                    onClick={toggleMenu}>
                    Menu
                </button>
                {menuOpen && (
                    <div className="bg-white w-full border mt-2 rounded-md">
                        <DashboardItem handler={handleClickItem} id={"overview"}>Overview</DashboardItem>
                        <DashboardItem handler={handleClickItem} id={"pizza"} icon={<FontAwesomeIcon icon={faPizzaSlice}/>}>Pizzas</DashboardItem>
                        <DashboardItem handler={handleClickItem} id={"user"} icon={<FontAwesomeIcon icon={faUser}/>}>Users</DashboardItem>
                        <DashboardItem handler={handleClickItem} id={"order"} icon={<FontAwesomeIcon icon={faCartShopping}/>}>Orders</DashboardItem>
                    </div>
                )}
            </div>
            <div className={"flex-grow h-full flex max-lg:mt-2 lg:items-center justify-center relative"}>
                {children}
            </div>
        </div>
    )
}
