const itemId = (req, res) => {
    let { steam_url } = req.query

    fetch(steam_url)
        .then((res) => res.text())
        .then((data) => {
            let id = ""
            for (let i = 0; i <= 20; i++) {
                let charPos = data.search("Market_LoadOrderSpread") + 24 + i
                let char = data[charPos]
                if (char !== " ") {
                    id += char
                } else {
                    break
                }
            }
            res.status(200).json({ error: false, id })
        })
}

export default itemId
