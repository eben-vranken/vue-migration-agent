
const DifferenceModal = ({ closeModal, inputCode, outputCode }) => {
    const inputLineCount = inputCode.split(/\r\n|\r|\n/)
    const outputLineCount = outputCode.split(/\r\n|\r|\n/)

    return (
        <section className="absolute flex justify-center items-center inset-0 z-10 w-screen h-screen backdrop-blur" >
            {/* Modal */}
            <section className="w-9/12 h-[75%] bg-stone-900 border border-white/50 rounded-lg p-2">
                <section className="flex justify-between">
                    <h1>Difference Viewer</h1>
                    <span onClick={closeModal} className="cursor-pointer">X</span>
                </section>
                {/* Code versions */}
                <section className="[&>*]:overflow-scroll  h-full [&>*]:flex-1 [&>*]:rounded-lg gap-2 [&>*]:h-[96%] flex [&>*]:border [&>*]:border-white/25 rounded-lg p-2 [&>*]:p-2 ">
                    {/* Input Code */}
                    <section className="whitespace-pre flex text-sm" contentEditable>
                        {/* Line Numbers */}
                        <section className="flex flex-col border-r border-white/25 border-dashed pr-2 mr-2 text-white/30">
                            {inputLineCount.map((line, index) => (
                                <div key={index}>{index + 1}</div>
                            ))}
                        </section>
                        {inputCode}
                    </section>

                    {/* Output Code */}
                    <section className="whitespace-pre flex text-sm" contentEditable>
                        {/* Line Numbers */}
                        <section className="flex flex-col border-r border-white/25 border-dashed pr-2 mr-2 text-white/30">
                            {outputLineCount.map((line, index) => (
                                <div key={index}>{index + 1}</div>
                            ))}
                        </section>
                        {outputCode}
                    </section>
                </section>
            </section>
        </section>
    )
}

export default DifferenceModal