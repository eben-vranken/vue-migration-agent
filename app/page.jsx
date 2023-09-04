"use client"

export default function Home() {

  const handleSubmit = () => {
    alert('submitted')
  }

  const handleClear = () => {
    const textArea = document.getElementById("vue-property-before");
    textArea.value = '';
  }

  return (
    <main className="flex h-screen flex-col py-16">
      <h1>Vue Migration Agent</h1>
      {/* Vue Property Decorator removal */}
      {/* Input container */}
      <section className=" h-full flex gap-2 pt-2 [&>section]:rounded-lg [&>section]:border [&>section]:border-slate-500">
        <section className="[&>input]:h-full gap-2 [&>textarea]:border [&>textarea]:border-slate-200/25 [&>textarea]:rounded-md flex-1 flex flex-col p-2 items-center">
          <label htmlFor="vue-property-before" className="w-full">Input code:</label>
          <textarea id="vue-property-before" name="vue-property-before" className="h-full w-full" cols="30" ></textarea>
          <section className="w-full flex gap-2">
            <button onClick={handleClear} className="bg-red-600 py-3 rounded-md text-white font-semibold flex-1">Clear</button>
            <button onClick={handleSubmit} className="bg-blue-600 py-3 rounded-md text-white font-semibold flex-1">Submit</button>
          </section>
        </section>

        <section className="[&>input]:h-full gap-2 [&>textarea]:border [&>textarea]:border-slate-200/25 [&>textarea]:rounded-md flex-1 flex flex-col p-2">
          <label htmlFor="vue-property-after">Output code:</label>
          <textarea name="vue-property-after" className="h-full" cols="30" readOnly></textarea>
        </section>
      </section>
    </main>
  )
}
