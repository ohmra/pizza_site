import {Link} from "@inertiajs/react";

const Error403 = () => {
    return (
        <div>
            <h1>403 - Forbidden</h1>
            <p>You don't have permission to access this page.</p>
            <Link href="/dashboard">Go back to the homepage</Link>
        </div>
    );
}

export default Error403;
