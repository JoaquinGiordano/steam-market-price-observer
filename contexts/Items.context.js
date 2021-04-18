import React, { createContext, useState } from "react"

const ItemsContext = createContext({})

const ItemsProvider = ({ children }) => {
    const [items, setItems] = useState([])

    return (
        <ItemsContext.Provider value={{ items, setItems }}>
            {children}
        </ItemsContext.Provider>
    )
}

export { ItemsContext, ItemsProvider }
