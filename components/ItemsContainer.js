import { useContext, useEffect } from "react"
import ItemCard from "./ItemCard"

import { ItemsContext } from "../contexts/Items.context"

const ItemsContainer = () => {
    let { items, setItems } = useContext(ItemsContext)

    let localList = []
    useEffect(() => {
        let storedItems = JSON.parse(localStorage.getItem("storedItems"))

        if (storedItems) {
            const loadLocalList = () => {
                return new Promise((resolve, reject) => {
                    storedItems.forEach((storedItem) => {
                        fetch(`api/getItemPrices?item_id=${storedItem.id}`)
                            .then((response) => response.json())
                            .then((itemPrices) => {
                                localList.push({
                                    name: storedItem.name,
                                    id: storedItem.id,
                                    steamPage: storedItem.steamPage,
                                    sellPrice: itemPrices.sellPrice,
                                    buyPrice: itemPrices.buyPrice,
                                })
                            })
                            .then(() => {
                                localList.length === storedItems.length &&
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
        <ul className="flex flex-col gap-4  ">
            {items.map((item, i) => (
                <ItemCard item={item} key={i} idNum={i} />
            ))}
        </ul>
    )
}

export default ItemsContainer
