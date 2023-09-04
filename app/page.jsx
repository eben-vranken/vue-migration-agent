"use client"

import VuePropertyRemoval from "@/components/VuePropertyRemoval";
import useAgent from "@/hooks/useAgent";
import { useEffect, useState } from "react";

// Template interface
export class Interface {
  constructor(prompt, refactor) {
    this.prompt = prompt;
    this.refactor = refactor;
  }
}

const views = {
  "vue-property": <VuePropertyRemoval />,
};

export default function Home() {
  const [view, setView] = useState("vue-property");

  const switchView = (view) => {
    setView(view);
  };

  const linkStyles = "bg-stone-700 rounded-t-lg py-1 px-2 pb-3";

  useEffect(() => {
    const nav = document.getElementById("nav");
    const navChildren = nav.children;

    // Loop through the child elements and remove all class names
    for (let i = 0; i < navChildren.length; i++) {
      navChildren[i].className = ""; // This will remove all class names from the element
    }
    const link = document.getElementById(view);
    link.classList = linkStyles;
  }, [view]);

  return (
    <main className="flex w-full h-screen flex-col py-12">
      <h1 className="text-xl font-bold font-mono">Vue Migration Agent</h1>

      <section className="h-full flex flex-col pt-2 [&>section]:rounded-lg [&>section]:border [&>section]:border-slate-500">
        <nav id="nav" className="mb-1 [&>*]:px-6 [&>*]:cursor-pointer">
          <span id="vue-property" onClick={() => switchView("vue-property")}>
            Vue Property Removal
          </span>
          <span id="nextSteps" onClick={() => switchView("nextSteps")}>
            Next steps...
          </span>
        </nav>

        {views[view]}
      </section>
    </main>
  );
}
