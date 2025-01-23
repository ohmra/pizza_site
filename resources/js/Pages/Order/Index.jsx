import Authenticated from "@/Layouts/AuthenticatedLayout.jsx";
import OrderIndex from "@/Components/Order/OrderIndex.jsx";
export default function Index({ orders }){

    return (
        <Authenticated>
            <OrderIndex orders={orders}/>
        </Authenticated>
)
}
