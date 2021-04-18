import { useContext, useEffect } from "react"
import ItemCard from "./ItemCard"

import { ItemsContext } from "../contexts/Items.context"

const ItemsContainer = () => {
    let { items, setItems } = useContext(ItemsContext)

    let localList = []
    useEffect(() => {
        let itemsUrl = JSON.parse(localStorage.getItem("itemsUrl"))

        if (itemsUrl) {
            const loadLocalList = () => {
                return new Promise((resolve, reject) => {
                    itemsUrl.forEach((itemUrl) => {
                        fetch(itemUrl.url)
                            .then((response) => response.json())
                            .then((newItem) => {
                                localList.push({
                                    name: itemUrl.name,
                                    id: itemUrl.id,
                                    url: itemUrl.url,
                                    steamPage: itemUrl.steamPage,
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
                                })
                            })
                            .then(() => {
                                localList.length === itemsUrl.length &&
                                    resolve(localList)
                            })
                    })
                })
            }
            loadLocalList().then((definitiveList) => {
                setItems(definitiveList)
            })
        }
    }, [])
    return (
        <ul className="flex flex-col gap-4 ">
            {items.map((item, i) => (
                <ItemCard item={item} key={i} idNum={i} />
            ))}
        </ul>
    )
}

export default ItemsContainer
