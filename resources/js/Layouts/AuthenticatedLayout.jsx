import { usePage } from '@inertiajs/react';
import NavBar from "@/Components/Nav/NavBar.jsx";
import NavContainer from "@/Components/Nav/NavContainer.jsx";
import NavItem from "@/Components/Nav/NavItem.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRightFromBracket, faUser} from "@fortawesome/free-solid-svg-icons";
import {useEffect} from "react";
import {toast, ToastContainer} from "react-toastify";
import CartButton from "@/Components/Nav/CartButton.jsx";
import bgImage from "../../../public/images/bg.jpg";

export default function Authenticated({ header, children }) {
    const user = usePage().props.auth.user;
    const { flash } = usePage().props;
    useEffect(() => {
        if(flash.success){
            toast.success(flash.success);
        }

        if(flash.error){
            toast.error(flash.error);
        }
    }, [flash]);
    return (
        <div className="auth-div text-[8px] sm:text-[8px] md:text-[10px] lg:text-[12px] xl:text-[16px]">
            <header>
                <div className="navbar-container">
                    <NavBar>
                        <NavContainer className="logo-container">
                            <NavItem href={ user.type === 'user' ? route('home') : route('dashboard')}>
                                <img src="/images/Logo.png" alt="logo"/>
                            </NavItem>
                        </NavContainer>

                        <NavContainer className="link-nav-container">
                            {
                                user.type === 'user' ?
                                    (
                                        <>
                                            <NavItem href={"/home"} active={route().current('home')}>Home</ NavItem>
                                            <NavItem href={route('orders.index')}>My orders</NavItem>
                                        </>
                                    )
                                    :
                                    (
                                        <NavItem href={route('dashboard')} active={route().current('dashboard')} >Dashboard</NavItem>
                                    )
                        }
                        </NavContainer>
                        <NavContainer className="profile-nav-container">
                            {(user.type === 'user') && <CartButton />}
                            <NavItem className="profile-nav" href={route('profile.edit')} icon={<FontAwesomeIcon icon={faUser} size="lg" />} />
                            <NavItem id="logout" method="post" href={route('logout')} button icon={<FontAwesomeIcon icon={faRightFromBracket} size="lg" />}/>
                        </NavContainer>
                    </NavBar>
                </div>
            </header>
            { header }
            <main style={{backgroundImage: `url(${bgImage})`}}>{children}</main>
            <ToastContainer autoClose={1500} />
        </div>
    );
}
