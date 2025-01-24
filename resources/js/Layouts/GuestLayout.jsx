import { Link } from '@inertiajs/react';
import authBg from '../../../public/images/auth-bg.jpg';

export default function Guest({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center pt-6 sm:justify-center sm:pt-0"
             style={{ backgroundImage: `url(${authBg})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center center',}}>
            <div>
                <Link href="/">
                    <img src="./images/Logo.png" alt="pizza logos" className={"w-64 rounded-lg"}/>
                </Link>
            </div>

            <div className="mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
