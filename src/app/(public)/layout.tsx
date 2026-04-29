import type { Metadata } from "next";
import "../globals.css";
import Navbar from "@/src/app/components/Layout/Navbar";
import Footer from "@/src/app/components/Layout/Footer";

export const metadata: Metadata = {
  title: "Movies OK",
  description: "Buy Your Ticket",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
