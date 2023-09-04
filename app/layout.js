import './globals.css'

export const metadata = {
  title: 'Vue Migration Agent',
  description: ' LLM Agent which automates Vue 2 to Vue 3 migration ',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={"[&>*]:w-8/12 flex justify-center bg-primary text-white"}>
        {children}
      </body>
    </html>
  )
}
