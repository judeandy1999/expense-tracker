import { Inter } from "next/font/google";
import NavBar from "./(ui)/components/navBar";
import "./globals.css";
import { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "My Budget",
  description: "Budget Application",
	keywords: "budget money, how to budget, expenses vs income, finance goals",
};

interface RootLayoutProps {
  children: ReactNode; // Define the type for children
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div>
          <NavBar />
        </div>
        {children}
      </body>
    </html>
  );
}
