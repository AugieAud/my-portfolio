export default function Home() {
  return (
    <main className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-1/4 p-8 border-r border-gray-300 flex flex-col justify-between">
        <div>
          <h1 className="text-4xl font-sans tracking-wide leading-none">
            AUGIE SCHNELL
          </h1>
          <p className="mt-2 text-sm">Creative Developer</p>

          <nav className="mt-8 space-y-2">
            <ul className="space-y-2">
              <li className="font-bold">● Projects</li>
              <li>Info</li>
              <li>Contact</li>
              <li>FAQ</li>
              <li>Extras</li>
            </ul>
          </nav>
        </div>
        <div className="text-xs rotate-180 writing-vertical-lr uppercase tracking-widest text-gray-500"></div>
      </aside>

      {/* Main Content */}
      <section className="w-3/4 p-12 flex items-center justify-center">
        <p className="max-w-md text-sm leading-relaxed">
          Born in 1992 in Wellington, New Zealand.
          <br />
          I believe software can be thoughtful and playful.
          <br />
          With a passion for clean design and creative code,
          <br />I craft experiences that are both useful and inspiring.
        </p>
      </section>
    </main>
  );
}
