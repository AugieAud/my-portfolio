"use client";

import { useState } from "react";
import Navbar from "../app/components/Navbar";
import Projects from "../app/components/Projects";
import Info from "../app/components/Info";
import Contact from "../app/components/Contact";
import { TypeAnimation } from "react-type-animation";

export default function Home() {
  const [activeSection, setActiveSection] = useState<string>("");

  return (
    <main className="flex h-screen relative overflow-hidden">
      <Navbar activeSection={activeSection} onSectionChange={setActiveSection} />

      {/* Main Content */}
      <div className="flex-1 relative">
        {activeSection === "Projects" && <Projects />}
        {activeSection === "Info" && <Info />}
        {activeSection === "Contact" && <Contact />}

        <section className="fixed bottom-0 right-0 p-8 flex items-end justify-end">
          <TypeAnimation
            sequence={[
              "I believe software can be thoughtful and playful.",
              1000,
              "I believe software can be thoughtful and playful.\nWith a passion for clean design and creative code,",
              1000,
              "I believe software can be thoughtful and playful.\nWith a passion for clean design and creative code,\nI craft experiences that are both useful and inspiring.",
              1000,
            ]}
            wrapper="p"
            cursor={true}
            repeat={1}
            className="max-w-md text-sm leading-relaxed whitespace-pre-line"
            style={{ display: "inline-block" }}
          />
        </section>
      </div>
    </main>
  );
}
