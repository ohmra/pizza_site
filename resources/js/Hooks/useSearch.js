import {useMemo, useState} from "react";

export default function UseSearch({items, filterType}) {
    const [search, setSearch] = useState("");
    const filteredItems = useMemo(() =>
            items.filter((item) => item[filterType]?.toLowerCase().includes(search.toLowerCase())),
        [search, items]);
    return {search, setSearch, filteredItems};
}
