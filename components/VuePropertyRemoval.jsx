"use client"

import { Interface } from "@/app/page"
import useAgent from "@/hooks/useAgent";
import { useState, useEffect } from "react";

const VuePropertyRemoval = () => {

    const propertyDecoratorRemoval = new Interface("You are an experienced developer tasked with migrating Vue.js code from vue-property-decorator to the native Vue options API without making any code refactoring changes. Your objective is to convert Vue component code that uses decorators like @Prop, @Watch, and @Emit into code utilizing standard Vue options such as props, watch, and methods while keeping the existing code structure intact. The goal is to align the codebase with Vue's recommended practices and reduce third-party library dependencies. Migrate all Vue 2 code, ensuring functionality remains intact, without specific coding standards. Please provide the migrated code output directly using defineComponent without any additional commentary or code refactoring.")

    const [loading, setLoading] = useState(false)
    const [timer, setTimer] = useState(0)
    const agent = useAgent;

    const handleSubmit = () => {
        const inputCode = document.getElementById("input-code").value;

        // Set loading & timer
        setLoading(true)
        setTimer(0)

        agent(propertyDecoratorRemoval.prompt, inputCode).then((response) => {
            // Remove loading & timer
            setLoading(false)

            console.log(response)

            const outputCode = document.getElementById("output-code");
            if (outputCode) {
                outputCode.value = response;
            }
        })
            .catch((error) => {
                console.error(error);

                // Remove loading & timer
                setLoading(false)
                setTimer(false)
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

    return (
        // Input code:
        <section className=" h-full flex gap-2 pt-2 [&>section]:rounded-lg [&>section]:border [&>section]:border-slate-500">
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
                    {loading && <span className="opacity-50 font-bold">{timer.toFixed(2)}s</span>}
                </section>
                <textarea id="output-code" name="vue-property-after" className="h-full" cols="30" readOnly></textarea>
                {loading && <section className="absolute inset-0 h-full flex items-center justify-center"><section className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></section></section>}
            </section>
        </section >)
}

export default VuePropertyRemoval