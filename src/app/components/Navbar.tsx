export default function Navbar() {
  return (
    <aside className="w-1/4 p-8 border-r border-gray-300 flex flex-col justify-between">
      <div>
        <h1 className="text-4xl font-sans tracking-wide leading-none">
          AUGIE SCHNELL
        </h1>
        <p className="mt-2 text-sm">Creative Developer</p>

        <nav className="mt-8 space-y-2">
          <ul className="space-y-2">
            <li>Projects</li>
            <li>Info</li>
            <li>Contact</li>
          </ul>
        </nav>
      </div>
      <div className="text-xs writing-vertical-lr uppercase tracking-widest text-gray-500">
        Light ▪ Monospaced ▪ Brutalist
      </div>
    </aside>
  );
}
