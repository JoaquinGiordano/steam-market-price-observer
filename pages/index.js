import Head from "next/head"
import AddItemPanel from "../components/AddItemPanel"

import Image from "next/image"

import ItemsContainer from "../components/ItemsContainer"

export default function Home() {
    return (
        <div className="flex flex-col bg-page h-full min-h-screen w-full">
            <Head>
                <title>Steam Market Price Observer</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className=" flex items-center p-5 h-28">
                <div className="flex items-center justify-center md:justify-start shadow w-full md:w-auto  gap-5 bg-white py-2 pl-2 pr-5 rounded md:rounded-full">
                    <Image width={64} height={64} src="/assets/logo.png" />
                    <h1 className="text-gray-800 text-2xl md:text-3xl text-center font-semibold">
                        Steam Market Price Observer
                    </h1>
                </div>
            </div>
            <div className="flex flex-col md:flex-row h-full w-full">
                <div className=" p-5 w-full xl:w-1/3 md:w-1/2">
                    <AddItemPanel />
                </div>
                <div className=" p-5 w-full xl:w-2/3 md:w-1/2">
                    <ItemsContainer />
                </div>
            </div>
        </div>
    )
}
