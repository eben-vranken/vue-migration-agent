"use client"

import { Interface } from "@/app/page"
import useAgent from "@/hooks/useAgent";
import { useState, useEffect } from "react";
import DifferenceModal from "./DifferenceModal";
import ChatModal from "./ChatModal";

const VuePropertyRemoval = () => {

    const propertyDecoratorRemoval = new Interface(
        "You are an experienced developer tasked with migrating Vue.js code from vue-property-decorator to the native Vue options API without making any changes to method names, variable names, the order of methods, or any other code elements. Your objective is to convert Vue component code that uses decorators like @Prop, @Watch, and @Emit into code utilizing standard Vue options such as props, watch, and methods while keeping the existing code structure, naming conventions, and method orders completely intact. The goal is to align the codebase with Vue's recommended practices and reduce third-party library dependencies. Migrate all Vue 2 code, ensuring functionality remains identical to the original code, without specific coding standards. Please provide the migrated code output directly using defineComponent without any additional commentary or code refactoring.",

        "You have two sets of Vue.js code: one originally written using vue-property-decorator and the other migrated to the native Vue options API. Your task is to create a function that compares these two sets of code and refactors the code using the native Vue options API to match the structure, method names, and variable names of the code originally written with vue-property-decorator. Ensure that no vue-property-decorator syntax is introduced during the refactoring process, and the code structure, method names, and variable names should remain identical to the original code. The goal is to align the migrated code with the structure of the code using vue-property-decorator without introducing any other changes. Provide the refactored code output without any additional commentary or code modifications beyond matching the structure and naming conventions."
    )

    const [loading, setLoading] = useState(false)
    const [timer, setTimer] = useState(0)
    const [done, setDone] = useState(false)
    const [diffModal, setDiffModal] = useState(false)
    const [chatModal, setChatModal] = useState(false)


    const [inputCode, setInputCode] = useState('')
    const [outputCode, setOutputCode] = useState('')

    const agent = useAgent;

    const handleSubmit = () => {
        const outputCodeValue = document.getElementById("output-code");
        setOutputCode(outputCode.value)
        outputCodeValue.value = ''
        const inputCodeValue = document.getElementById("input-code").value;
        setInputCode(inputCodeValue)

        // Set loading & timer
        setLoading(true)
        setTimer(0)
        setDone(false);

        agent(propertyDecoratorRemoval.prompt, inputCode).then((response) => {
            // Remove loading & timer
            setLoading(false)
            setDone(true);

            const outputCode = document.getElementById("output-code");
            outputCode.value = response;
            setOutputCode(response);
        })
            .catch((error) => {
                console.error(error);

                // Remove loading & timer
                setLoading(false)
                setTimer(false)
                setDone(true)
            });
    }

    // Timer logic
    useEffect(() => {
        let interval;
        let startTime;

        if (loading) {
            startTime = Date.now() - (timer * 1000); // Calculate start time based on previous timer value
            interval = setInterval(() => {
                const elapsedTime = Date.now() - startTime;
                setTimer(elapsedTime / 1000); // Update timer with seconds and milliseconds
            }, 16); // Update approximately every 16 milliseconds (for 3 decimal points)
        } else {
            clearInterval(interval);
        }

        return () => {
            clearInterval(interval);
        };
    }, [loading, timer]);

    const handleClear = () => {
        const textArea = document.getElementById("input-code");
        textArea.value = '';
    }

    const handleCopy = () => {
        const textArea = document.getElementById("output-code");
        navigator.clipboard.writeText(textArea.value);
    }

    const handleRefactor = () => {
        const outputCodeValue = document.getElementById("output-code").value;
        setOutputCode(outputCode)
        const inputCodeValue = document.getElementById("input-code").value;
        setInputCode(inputCodeValue)

        // Set loading & timer
        setLoading(true)
        setTimer(0)
        setDone(false);

        agent(propertyDecoratorRemoval.refactor, `Old code: \n${inputCode} \n\n\n New code:\n${outputCode}`).then((response) => {
            // Remove loading & timer
            setLoading(false)
            setDone(true);

            const outputCode = document.getElementById("output-code");
            outputCode.value = response;
        })
            .catch((error) => {
                console.error(error);

                // Remove loading & timer
                setLoading(false)
                setTimer(false)
                setDone(true)
            });
    }

    const handleDifference = () => {
        setDiffModal(!diffModal)
    }

    const handleChat = () => {
        setChatModal(!chatModal)
    }

    return (
        // Input code:
        <section className="flex h-full bg-primary">
            <section className="[&>input]:h-full gap-2 [&>textarea]:border [&>textarea]:border-slate-200/25 [&>textarea]:rounded-md flex-1 flex flex-col p-2 items-center">
                <label htmlFor="vue-property-before" className="w-full">Input code:</label>
                <textarea id="input-code" name="vue-property-before" className="h-full w-full" cols="30" ></textarea>
                <section className="w-full flex gap-2">
                    <button onClick={handleClear} className="bg-red-600 py-3 rounded-md text-white font-semibold flex-1">Clear</button>
                    <button onClick={handleSubmit} className="bg-blue-600 py-3 rounded-md text-white font-semibold flex-1">Submit</button>
                </section>
            </section>

            {/* Output code: */}
            <section className="relative [&>input]:h-full gap-2 [&>textarea]:border [&>textarea]:border-slate-200/25 [&>textarea]:rounded-md flex-1 flex flex-col p-2">
                <section className="w-full flex justify-between">
                    <label htmlFor="vue-property-after">Output code:</label>
                    {/* Timer */}
                    {(loading || done) && <span className="opacity-50 font-bold">{timer.toFixed(2)}s</span>}
                </section>
                <textarea id="output-code" name="vue-property-after" className="h-full" cols="30"></textarea>
                {loading && <section className="absolute inset-0 h-full flex items-center justify-center"><section className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></section></section>}

                {
                    done && (
                        <section className="w-full flex gap-2">
                            <button onClick={handleCopy} className="bg-yellow-500 py-3 rounded-md text-white font-semibold flex-[0.25_1_1%]" title="Copy">📋</button>
                            <button onClick={handleRefactor} className="bg-red-500 py-3 rounded-md text-white font-semibold flex-[0.25_1_1%]" title="Refactor">🔧</button>
                            <button onClick={handleDifference} className="bg-green-500 py-3 rounded-md text-white font-semibold flex-[0.25_1_1%]" title="Refactor">🔍</button>
                            <button onClick={handleChat} className="bg-blue-600 py-3 rounded-md text-white font-semibold flex-[0.25_1_1%]" title="Chat">🗯</button>
                        </section>

                    )
                }

            </section>


            {/* Modals */}
            {diffModal && <DifferenceModal closeModal={handleDifference} inputCode={inputCode} outputCode={outputCode} />}
            {chatModal && <ChatModal closeModal={handleDifference} inputCode={inputCode} outputCode={outputCode} />}

        </section >)
}

export default VuePropertyRemoval