import Textbox from "./Textbox"
import React, { useContext, useState } from "react"
import { ItemsContext } from "../contexts/Items.context"

const AddItemPanel = () => {
    const { items, setItems } = useContext(ItemsContext)

    const [isAddingItem, setIsAddingItem] = useState(false)

    const AddItem = () => {
        if (!isAddingItem) {
            setIsAddingItem(true)
            let item_steam_url = document.querySelector("#steam_url_input")
                .value
            if (
                item_steam_url.search(
                    /https:\/\/steamcommunity.com\/market\/listings\//
                ) > -1
            ) {
                let marketHashName = item_steam_url.split("/")[6]

                fetch(`api/getItemId?steam_url=${item_steam_url}`)
                    .then((res) => res.json())
                    .then((data) => {
                        return data.id
                    })
                    .then((itemId) => {
                        fetch(`api/getItemPrices?item_id=${itemId}`)
                            .then((response) => response.json())
                            .then((itemPrices) => {
                                setItems([
                                    ...items,
                                    {
                                        name: decodeURI(marketHashName),
                                        id: itemId,
                                        steamPage: item_steam_url,
                                        sellPrice: itemPrices.sellPrice,
                                        buyPrice: itemPrices.buyPrice,
                                    },
                                ])
                                if (localStorage.getItem("storedItems")) {
                                    localStorage.setItem(
                                        "storedItems",
                                        JSON.stringify([
                                            ...JSON.parse(
                                                localStorage.getItem(
                                                    "storedItems"
                                                )
                                            ),
                                            {
                                                name: decodeURI(marketHashName),
                                                id: itemId,
                                                steamPage: item_steam_url,
                                            },
                                        ])
                                    )
                                } else {
                                    localStorage.setItem(
                                        "storedItems",
                                        JSON.stringify([
                                            {
                                                name: decodeURI(marketHashName),
                                                id: itemId,
                                                steamPage: item_steam_url,
                                            },
                                        ])
                                    )
                                }
                            })
                    })
                    .then(() => setIsAddingItem(false))
            }
        }
    }

    return (
        <div className="flex flex-col gap-3 w-full  bg-white p-8 shadow border rounded">
            <h1 className="text-xl">Add an Item</h1>
            <Textbox
                placeholder="Steam URL"
                id="steam_url_input"
                onKeyPress={(e) => e.key === "Enter" && AddItem()}
            />
            <button
                className="w-20 px-4 py-2 focus:outline-none hover:bg-gray-100  rounded shadow border transition"
                onClick={AddItem}
            >
                Add
            </button>
        </div>
    )
}

export default AddItemPanel
