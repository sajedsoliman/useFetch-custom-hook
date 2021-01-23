import { useState } from "react"


export default function useFetch(link) {
    const [values, setValues] = useState([])

    // get items(records) from the given link by fetching it
    const getItems = async () => {
        const items = await fetchItems();

        setValues(items)
    }

    const fetchItems = async () => {
        const res = await fetch(link);
        const data = await res.json();

        return data
    }

    // fetch item to not avoid DRY
    const fetchItem = async (id, headers) => {
        const res = await fetch(`${link}/${id ? id : ""}`, headers ? headers : { method: "GET" })
        const data = await res.json();
        return data
    }

    // add item
    const addItem = async (item) => {
        const fetchHeaders = { method: "POST", headers: { "Content-type": "application/json" }, body: JSON.stringify(item) }
        const data = await fetchItem(null, fetchHeaders)

        setValues([...values, data])
    }

    // delete item from server
    const deleteItem = (id) => {
        fetchItem(id, { method: "Delete" })

        setValues(values.filter(item => item.id != id))
    }

    // edit item
    const editItem = async (editedItem) => {
        const fetchHeaders = { method: "PUT", headers: { "Content-type": "application/json" }, body: JSON.stringify(editedItem) }
        const data = await fetchItem(editedItem.id, fetchHeaders)

        // new way to edit a single item
        setValues(values.map(item =>
            item.id == editedItem.id ? data : item
        ))
    }

    // get single item
    const getItem = async (id) => {
        const item = await fetchItem(id);

        return item
    }

    return {
        values,
        setValues,
        getItems,
        deleteItem,
        editItem,
        getItem,
        addItem
    }
} 