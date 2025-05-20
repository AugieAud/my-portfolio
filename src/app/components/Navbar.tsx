interface NavbarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export default function Navbar({ activeSection, onSectionChange }: NavbarProps) {
  const sections = ['Projects', 'Info', 'Contact'];

  return (
    <aside className="w-1/4 p-8 border-r border-gray-300 flex flex-col justify-between">
      <div>
        <h1 
          className="text-4xl font-sans tracking-wide leading-none cursor-pointer hover:text-gray-600 transition-colors"
          onClick={() => onSectionChange('Home')}
        >
          AUGIE SCHNELL
        </h1>
        <p className="mt-2 text-sm">Creative Developer</p>

        <nav className="mt-8 space-y-2">
          <ul className="space-y-2">
            {sections.map((section) => (
              <li
                key={section}
                onClick={() => onSectionChange(section)}
                className={`cursor-pointer hover:text-gray-600 transition-colors ${
                  activeSection === section ? 'font-medium' : ''
                }`}
              >
                {section}
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="text-xs writing-vertical-lr uppercase tracking-widest text-gray-500">
        Light ▪ Monospaced ▪ Brutalist
      </div>
    </aside>
  );
}
