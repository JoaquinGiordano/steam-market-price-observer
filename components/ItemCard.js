import { useContext } from "react"
import { ItemsContext } from "../contexts/Items.context"

const ItemCard = ({ item, idNum }) => {
    const { items, setItems } = useContext(ItemsContext)
    const navigateItemPage = () => {
        window.open(item.steamPage, "_blank")
    }
    return (
        <li className="relative flex  gap-1 flex-col bg-white w-full p-8 shadow  rounded">
            <h1
                className="text-xl text-gray-800 font-semibold cursor-pointer"
                onClick={navigateItemPage}
            >
                {item.name}
            </h1>

            <span
                className="text-green-600 font-bold cursor-pointer"
                onClick={navigateItemPage}
            >
                Buy Price: {item.buyPrice} AR$
            </span>
            <span
                className="text-red-500 font-bold cursor-pointer"
                onClick={navigateItemPage}
            >
                Sell Price: {item.sellPrice} AR$
            </span>
            <button
                className="absolute right-2 top-2 text-red-300 hover:text-red-500 px-4 py-2 focus:outline-none font-bold transition"
                onClick={() => {
                    let localItemsList = [...items]
                    localItemsList.splice(idNum, 1)
                    setItems(localItemsList)
                    localStorage.setItem(
                        "itemsUrl",
                        JSON.stringify(localItemsList)
                    )
                }}
            >
                X
            </button>
        </li>
    )
}

export default ItemCard
