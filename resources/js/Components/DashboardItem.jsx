export default function DashboardItem({ id = null, className = '', children, icon = undefined, handler = undefined }) {
    return (
        <div
            className={`w-full h-14 border-b p-4 flex gap-3 hover:cursor-pointer hover:bg-gray-100 transition duration-300 ease-in-out ${className}`}
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
