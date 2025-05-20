"use client";

import { useState } from "react";
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
        {activeSection === "Home" && <HomeComponent />}
        {activeSection === "Projects" && <Projects />}
        {activeSection === "Info" && <Info />}
        {activeSection === "Contact" && <Contact />}
      </div>
    </main>
  );
}
