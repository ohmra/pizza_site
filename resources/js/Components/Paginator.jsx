export default function Paginator({className='', numberOfPage, indexPaginator, paginatorHandler}){
    return (
        <div className={`flex justify-center gap-5 `+className}>
            {Array.from({length: numberOfPage}, (_, i) => (
                <span
                    className={`p-1 w-8 text-center border rounded-lg
                                                    ${indexPaginator === i + 1 ? 'bg-blue-500 text-white' : 'hover:bg-gray-300 cursor-pointer'}`}
                    key={i + 1}
                    onClick={() => indexPaginator !== i + 1 && paginatorHandler(i + 1)}
                    aria-label={`Page ${i + 1}`}
                >
                                    {i + 1}
                </span>
            ))}
        </div>
    )
}
