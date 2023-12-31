import OpenAI from "openai"

const useAgent = async (prompt, inputCode) => {

    const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY

    console.log(prompt, inputCode)

    const openai = new OpenAI({
        apiKey: apiKey,
        dangerouslyAllowBrowser: true
    })

    const chatCompletion = await openai.chat.completions.create({
        messages: [{ role: "system", content: prompt }, { role: "user", content: inputCode }],
        model: "gpt-3.5-turbo",
    })


    return chatCompletion.choices[0].message.content
}

export default useAgent