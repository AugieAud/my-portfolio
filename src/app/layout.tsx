import "./globals.css";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import ParticleField from "./components/ParticleField";

const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });
const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-sans" });

export const metadata = {
  title: "Augie Schnell | Portfolio",
  description: "Software developer porfolio and personal website.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <div className={`${mono.variable} ${grotesk.variable} font-mono text-black antialiased min-h-screen relative`}>
          <div className="fixed inset-0 -z-10">
            <ParticleField count={2000} />
          </div>
          <div className="relative z-10">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
