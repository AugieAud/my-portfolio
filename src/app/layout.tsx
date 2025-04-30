import "./globals.css";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";

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
    <html lang="en" className={`${mono.variable} ${grotesk.variable}`}>
      <body className="font-mono bg-[#f5f5f5] text-black antialiased">
        {children}
      </body>
    </html>
  );
}
