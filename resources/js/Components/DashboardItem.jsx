export default function DashboardItem({ id = null, className = '', children, icon = undefined, handler = undefined }) {
    return (
        <div
            className={`w-full h-[3.5em] border-b p-[1em] flex gap-3 hover:cursor-pointer hover:bg-gray-100 transition duration-300 ease-in-out ${className}`}
            onClick={() => handler?.(id)}
        >
            {icon && (
                <div>
                    {icon}
                </div>
            )}
            <div>{children}</div>
        </div>
    );
}
