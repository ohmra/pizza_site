import Authenticated from "@/Layouts/AuthenticatedLayout.jsx";
import OrderIndex from "@/Components/Order/OrderIndex.jsx";
import {Head} from "@inertiajs/react";
export default function Index({ orders }){

    return (
        <Authenticated>
            <Head title="Orders" />
            <OrderIndex orders={orders}/>
        </Authenticated>
)
}
