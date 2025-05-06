import Navbar from "../app/components/Navbar";
import ParticleBackground from "./components/ParticleBackground";

export default function Home() {
  return (
    <main className="flex h-screen">
      <Navbar />

      {/* Main Content */}
      <ParticleBackground />
      <section className="fixed bottom-0 right-0 p-8 flex items-end justify-end">
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
