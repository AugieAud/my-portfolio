"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Navbar from "../app/components/Navbar";
import Projects from "../app/components/Projects";
import Info from "../app/components/Info";
import Contact from "../app/components/Contact";
import HomeComponent from "../app/components/Home";

export default function Home() {
  const [activeSection, setActiveSection] = useState<string>("Home");

  return (
    <main className="flex h-screen relative overflow-hidden">
      <Navbar activeSection={activeSection} onSectionChange={setActiveSection} />

      {/* Main Content */}
      <div className="flex-1 relative">
        <AnimatePresence mode="wait">
          {activeSection === "Home" && <HomeComponent key="home" />}
          {activeSection === "Projects" && <Projects key="projects" />}
          {activeSection === "Info" && <Info key="info" />}
          {activeSection === "Contact" && <Contact key="contact" />}
        </AnimatePresence>
      </div>
    </main>
  );
}
