import {useForm} from "@inertiajs/react";
import {useRef, useState} from "react";
import {faCircleXmark, faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {AnimatePresence} from "framer-motion";
import {motion} from "framer-motion";
import useSearch from "@/Hooks/useSearch.js";
import SearchBar from "@/Components/SearchBar.jsx";
import usePaginator from "@/Hooks/usePaginator.js";
import Paginator from "@/Components/Paginator.jsx";

export default function UserList({users}) {
    const { delete: destroy, processing } = useForm();
    const handleDelete = (e, userId) => {
        e.preventDefault();

        destroy(route('user.delete', [userId]));
    }

    const {data, setData, post, put, errors, reset} = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        type: 'user',
    });

    const [isOpenUserModal, setIsOpenUserModal] = useState(false);
    const [action, setAction] = useState("")
    const [userId, setUserId] = useState(null)
    const handleUserModalClick = (user, act) => {
        setIsOpenUserModal(true);
        if(user != null){
            setData(user);
            setUserId(user.id)
        }
        else{
            reset();
            setUserId(null);
        }
        setAction(act);
    }

    const handleUserModalClose = () => {
        setIsOpenUserModal(false);
        reset();
        setAction("");
        setUserId(null);
    }

    console.log(action);

    const submit = (e) => {
        e.preventDefault();
        if(action === 'create'){
            post(route('user.create'), {
                onFinish: () => reset('password', 'password_confirmation'),
                onSuccess: () => handleUserModalClose(),
            });
        }
        else if (action === 'edit' && userId){
            put(route('user.edit', [userId]), {
                onFinish: () => reset('password', 'password_confirmation'),
                onSuccess: () => handleUserModalClose(),
            })
        }
    }

    const {search, setSearch, filteredItems: filteredUser} = useSearch({
        items: users,
        filterType: 'name',
    });

    const userListContainerRef = useRef(null);

    const {indexPaginator, numberOfPage, displayed_data, animation, paginatorHandler, setIndexPaginator} = usePaginator({
        data: filteredUser,
        display_count: 5,
        listContainerRef: userListContainerRef
    });

    return (
        <div className={"bg-white w-[44em] mt-4 h-[46em] sm:w-[56em] sm:h-[34em] p-10 overflow: auto"} ref={userListContainerRef}>
            <button className={"w-[12em] mr-[1em] p-[0.3em] bg-green-300 mb-1 rounded-lg"} onClick={() => handleUserModalClick(null, "create")}>ADD A USER</button>
            <SearchBar search={search} setSearch={setSearch} setIndexPaginator={setIndexPaginator} />
            <div className={`transition-opacity duration-300 ease-in-out ${animation ? 'opacity-0' : 'opacity-100'}`}>
                <table className={`table-auto w-full border-collapse border border-gray-200 text-[0.9rem]`}>
                    <thead className="bg-gray-200">
                    <tr>
                        <th className={"border text-left px-4 py-3"}>id</th>
                        <th className={"border text-left px-4 py-3"}>name</th>
                        <th className={"border text-left px-4 py-3"}>email</th>
                        <th className={"border text-left px-4 py-3"}>type</th>
                        <th className={"border text-left px-4 py-3"}>created_at</th>
                        <th className={"border text-left px-4 py-3"}>updated_at</th>
                        <th className={"border text-left px-4 py-3"}></th>
                        <th className={"border text-left px-4 py-3"}></th>
                    </tr>
                    </thead>
                    <tbody>
                    {displayed_data.map(user => {
                        return (
                            <tr key={user.id} className="even:bg-gray-100">
                                <td className={"border text-left px-4 py-3"}>{user['id']}</td>
                                <td className={"border text-left px-4 py-3"}>{user['name']}</td>
                                <td className={"border text-left px-4 py-3"}>{user['email']}</td>
                                <td className={"border text-left px-4 py-3"}>{user['type']}</td>
                                <td className={"border text-left px-4 py-3"}>{user['created_at'] ? formatDate(user['created_at']) : "null"}</td>
                                <td className={"border text-left px-4 py-3"}>{user['updated_at'] ? formatDate(user['updated_at']) : "null"}</td>
                                <td className={"border text-left px-4 py-3"}><button onClick={() => handleUserModalClick(user, "edit")}
                                                                                className="index-edit">Edit</button></td>
                                <td className={"border text-left px-4 py-3"}>
                                    <form onSubmit={(e) => handleDelete(e, user.id)}>
                                        <button disabled={processing} type="submit" className="index-delete">
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </form>
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>

                <Paginator numberOfPage={numberOfPage} indexPaginator={indexPaginator}
                           paginatorHandler={paginatorHandler} className={"mt-2"}/>
            </div>

            <AnimatePresence>

                    { isOpenUserModal &&
                        <div className={"fixed inset-0 bg-blue-50/75 flex items-center justify-center"}>
                            {
                                isOpenUserModal && <div className={"fixed inset-0 z-40"} onClick={handleUserModalClose}></div>
                            }
                            <motion.div className="user-form-container z-50"
                                initial={{opacity: 0, y: -150}}
                                animate={{opacity: 100, y: 0}}
                                exit={{opacity:0}}
                                duration={100}
                            >
                                <form onSubmit={submit} className="user-form relative">
                                    <button type={"button"} className={"absolute right-5 top-3 text-2xl"} onClick={handleUserModalClose}><FontAwesomeIcon icon={faCircleXmark} /></button>
                                    <div className="input-wrapper">
                                        <label className="input-label" htmlFor="name">Name</label>
                                        <input className="input-form" type="text" name="name" id="name" value={data.name}
                                               onChange={(e) => setData('name', e.target.value)}
                                               required/>
                                        {errors.name && <p className="input-error">{errors.name}</p>}
                                    </div>

                                    <div className="input-wrapper">
                                        <label className="input-label" htmlFor="email">Email</label>
                                        <input className="input-form" type="email" name="email" id="email"
                                               value={data.email}
                                               onChange={(e) => setData('email', e.target.value)}
                                               required/>
                                        {errors.email && <p className="input-error">{errors.email}</p>}
                                    </div>

                                    <div className="input-wrapper">
                                        <label className="input-label" htmlFor="password">Password</label>
                                        <input className="input-form" type="password" name="password" id="password"
                                               value={data.password}
                                               onChange={(e) => setData('password', e.target.value)}/>
                                        {errors.password && <p className="input-error">{errors.password}</p>}
                                    </div>

                                    <div className="input-wrapper">
                                        <label className="input-label" htmlFor="password_confirmation">Confirm
                                            Password</label>
                                        <input className="input-form" type="password" name="password_confirmation"
                                               id="password_confirmation"
                                               value={data.password_confirmation}
                                               onChange={(e) => setData('password_confirmation', e.target.value)}/>
                                        {errors.password_confirmation &&
                                            <p className="input-error">{errors.password_confirmation}</p>}
                                    </div>

                                    <div className="input-wrapper">
                                        <label className="input-label" htmlFor="type">Type</label>
                                        <select className="input-form" id="type" name="type" value={data.type}
                                                onChange={(e) => setData('type', e.target.value)}>
                                            <option value="">Select a type</option>
                                            <option value="user">User</option>
                                            <option value="admin">Admin</option>
                                            <option value="cook">Cook</option>
                                        </select>
                                        {errors.type && <p className="input-error">{errors.type}</p>}
                                    </div>

                                    <button id="user-button" type="submit"
                                            disabled={processing}>{processing ? "Processing" : "Confirm"}</button>
                                </form>
                            </motion.div>
                        </div>
                    }
            </AnimatePresence>

        </div>
    )
}

const formatDate = (dateString) => {
    // Remove the 'T' and 'Z' and slice the fractional seconds
    return dateString.replace('T', ' ').replace('Z', '').split('.')[0];
};

