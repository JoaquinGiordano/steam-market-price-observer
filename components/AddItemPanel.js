import Textbox from "./Textbox"
import React, { useContext } from "react"
import { ItemsContext } from "../contexts/Items.context"

const AddItemPanel = () => {
    const { items, setItems } = useContext(ItemsContext)

    const AddItem = () => {
        let item_steam_url = document.querySelector("#steam_url_input").value
        if (
            item_steam_url.search(
                /https:\/\/steamcommunity.com\/market\/listings\//
            ) > -1
        ) {
            let marketHashName = item_steam_url.split("/")[6]

            let currency = 34 //AR$

            fetch(item_steam_url)
                .then((res) => res.text())
                .then((data) => {
                    let id = ""
                    for (let i = 0; i <= 20; i++) {
                        let charPos =
                            data.search("Market_LoadOrderSpread") + 24 + i
                        let char = data[charPos]
                        if (char !== " ") {
                            id += char
                        } else {
                            break
                        }
                    }
                    return id
                })
                .then((itemId) => {
                    fetch(
                        `https://steamcommunity.com/market/itemordershistogram?country=AR&language=latam&currency=${currency}&item_nameid=${itemId}`
                    )
                        .then((response) => response.json())
                        .then((newItem) => {
                            setItems([
                                ...items,
                                {
                                    name: decodeURI(marketHashName),
                                    id: itemId,
                                    url: item_steam_url,
                                    steamPage: item_steam_url,
                                    sellPrice:
                                        newItem.lowest_sell_order.substring(
                                            0,
                                            newItem.lowest_sell_order.length - 2
                                        ) +
                                        "," +
                                        newItem.lowest_sell_order.substring(
                                            newItem.lowest_sell_order.length -
                                                2,
                                            newItem.lowest_sell_order.length
                                        ),
                                    buyPrice:
                                        newItem.highest_buy_order.substring(
                                            0,
                                            newItem.highest_buy_order.length - 2
                                        ) +
                                        "," +
                                        newItem.highest_buy_order.substring(
                                            newItem.highest_buy_order.length -
                                                2,
                                            newItem.highest_buy_order.length
                                        ),
                                },
                            ])
                            if (localStorage.getItem("itemsUrl")) {
                                localStorage.setItem(
                                    "itemsUrl",
                                    JSON.stringify([
                                        ...JSON.parse(
                                            localStorage.getItem("itemsUrl")
                                        ),
                                        {
                                            id: itemId,
                                            name: decodeURI(marketHashName),
                                            url: `https://steamcommunity.com/market/itemordershistogram?country=AR&language=latam&currency=${currency}&item_nameid=${itemId}`,
                                            steamPage: item_steam_url,
                                        },
                                    ])
                                )
                            } else {
                                localStorage.setItem(
                                    "itemsUrl",
                                    JSON.stringify([
                                        {
                                            itemId: itemId,
                                            name: decodeURI(marketHashName),
                                            url: `https://steamcommunity.com/market/itemordershistogram?country=AR&language=latam&currency=${currency}&item_nameid=${itemId}`,
                                            steamPage: item_steam_url,
                                        },
                                    ])
                                )
                            }
                        })
                })
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
