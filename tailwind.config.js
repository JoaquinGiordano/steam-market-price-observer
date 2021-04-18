module.exports = {
    purge: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        backgroundColor: (theme) => ({
            ...theme("colors"),
            page: "#d3e0ea",
        }),
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
