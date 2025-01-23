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
        className={`rounded-xl m-2 text-gray-500`+className}
        />
    )
}
