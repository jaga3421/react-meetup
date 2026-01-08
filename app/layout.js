import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "use-effect vs Side-effects: Writing React code that doesn't fight you",
  description: "use-effect vs Side-effects: Writing React code that doesn't fight you by Jagadeesh",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} overflow-x-hidden w-screen`}>
        {children}
      </body>
    </html>
  );
}
