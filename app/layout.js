import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "The Tauri System and React",
  description: "Build Better Cross-Platform Apps by Jagadeesh",
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
