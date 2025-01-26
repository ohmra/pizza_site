export default function SearchBar({search, setSearch, setIndexPaginator = undefined, className = ""}) {
    const handleSearch = (e) => {
        setSearch(e.target.value);
        if(setIndexPaginator) {
            setIndexPaginator(1);
        }
    }
    return (
        <input type="text" value={search} placeholder="Search..."
        onChange={handleSearch}
        className={`rounded-xl mb-[0.8em] text-gray-500 h-[2em] w-[10em] text-[1.5em]
                    max-sm:w-full`+className}
        />
    )
}
