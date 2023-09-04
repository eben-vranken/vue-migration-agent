"use client"

import VuePropertyRemoval from "@/components/VuePropertyRemoval";
import useAgent from "@/hooks/useAgent"


// Template interface
export class Interface {
  constructor(prompt) {
    this.prompt = prompt;
  }
}

export default function Home() {

  return (
    <main className="flex h-screen flex-col py-16">
      <h1>Vue Migration Agent</h1>

      <VuePropertyRemoval />
    </main>
  )
}
