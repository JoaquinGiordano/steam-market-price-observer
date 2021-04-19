export default (req, res) => {
    let { item_id } = req.query
    fetch(
        `https://steamcommunity.com/market/itemordershistogram?country=AR&language=latam&currency=34&item_nameid=${item_id}`
    )
        .then((response) => response.json())
        .then((item) => {
            res.status(200).json({
                sellPrice:
                    item.lowest_sell_order.substring(
                        0,
                        item.lowest_sell_order.length - 2
                    ) +
                    "," +
                    item.lowest_sell_order.substring(
                        item.lowest_sell_order.length - 2,
                        item.lowest_sell_order.length
                    ),
                buyPrice:
                    item.highest_buy_order.substring(
                        0,
                        item.highest_buy_order.length - 2
                    ) +
                    "," +
                    item.highest_buy_order.substring(
                        item.highest_buy_order.length - 2,
                        item.highest_buy_order.length
                    ),
            })
        })
}
