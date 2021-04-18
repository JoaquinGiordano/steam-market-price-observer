import "../styles/globals.css"
import { ItemsProvider } from "../contexts/Items.context"

function MyApp({ Component, pageProps }) {
    return (
        <ItemsProvider>
            <Component {...pageProps} />
        </ItemsProvider>
    )
}

export default MyApp
