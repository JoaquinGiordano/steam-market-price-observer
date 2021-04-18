const Textbox = ({ className, large = false, ...extra }) => (
    <>
        {!large ? (
            <input
                className={
                    "shadow border border-gray-300 rounded px-2 py-2 focus:outline-none " +
                    className
                }
                {...extra}
            ></input>
        ) : (
            <textarea
                className={
                    "shadow border border-gray-300 rounded px-2 py-3 focus:outline-none resize-none " +
                    className
                }
                {...extra}
            ></textarea>
        )}
    </>
)

export default Textbox
