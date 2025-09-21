import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Manav Online Market",
  description: "Taze sebze ve meyve siparişi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1 bg-gray-50 text-black">{children}</main>
          <footer className="bg-green-900 text-center p-6 text-white text-sm">
            <p>© 2025 Manav Online Market</p>
          </footer>
        </div>
        <ToastContainer autoClose={2000} />
      </body>
    </html>
  );
}
