"use client";

import Navbar from "../app/components/Navbar";
import { TypeAnimation } from "react-type-animation";

export default function Home() {
  return (
    <main className="flex h-screen relative overflow-hidden">
      <Navbar />

      {/* Main Content */}

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
    </main>
  );
}
