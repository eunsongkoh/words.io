import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/nav";
import Search from "@/components/search";
import RandomCard from "@/components/randomCard";
import Card from "@/components/card";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Word.io",
  description: "learn and share",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Nav />
        <div className="justify-between font-mono text-sm">
          <Search />
          <div className="flex flex-col lg:flex-row lg:justify-between">
            <div className="max-w-screen-lg mx-auto">
              <RandomCard />
              <Card />
            </div>
          </div>
        </div>
        {children}
      </body>
    </html>
  );
}
