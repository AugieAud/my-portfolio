"use client";

import { useTheme } from '../context/ThemeContext';

interface NavbarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export default function Navbar({ activeSection, onSectionChange }: NavbarProps) {
  const sections = ['Projects', 'Info', 'Contact'];
  const { theme, setTheme } = useTheme();

  return (
    <aside className="w-1/4 p-8 border-r border-gray-300 dark:border-gray-700 flex flex-col justify-between">
      <div>
        <h1 
          className="text-4xl font-sans tracking-wide leading-none cursor-pointer text-foreground hover:opacity-80 transition-colors"
          onClick={() => onSectionChange('Home')}
        >
          AUGIE SCHNELL
        </h1>
        <p className="mt-2 text-sm text-foreground">Creative Developer</p>

        <nav className="mt-8 space-y-2">
          <ul className="space-y-2">
            {sections.map((section) => (
              <li
                key={section}
                onClick={() => onSectionChange(section)}
                className={`cursor-pointer text-foreground hover:opacity-80 transition-colors ${
                  activeSection === section ? 'font-medium' : ''
                }`}
              >
                {section}
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="text-xs space-x-2 text-gray-400 dark:text-gray-500 flex justify-end">
        <button
          onClick={() => setTheme('light')}
          className={`hover:text-foreground transition-colors ${theme === 'light' ? 'text-foreground' : ''}`}
        >
          Light
        </button>
        <span>▪</span>
        <button
          onClick={() => setTheme('dark')}
          className={`hover:text-foreground transition-colors ${theme === 'dark' ? 'text-foreground' : ''}`}
        >
          Dark
        </button>
        <span>▪</span>
        <button
          onClick={() => setTheme('color')}
          className={`hover:text-foreground transition-colors ${theme === 'color' ? 'text-foreground' : ''}`}
        >
          Color
        </button>
      </div>
    </aside>
  );
}
