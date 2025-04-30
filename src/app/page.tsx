import Navbar from "../app/components/Navbar";

export default function Home() {
  return (
    <main className="flex h-screen">
      <Navbar />

      {/* Main Content */}
      <section className="w-3/4 p-12 flex items-center justify-center">
        <p className="max-w-md text-sm leading-relaxed">
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
