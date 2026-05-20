import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Movies OK — A Cinematic Editorial",
  description:
    "Movies OK is a luxury cinematic experience for cinephiles — discover, book and review the world's most beautiful films.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={poppins.variable}>
      <body
        suppressHydrationWarning
        className={`${poppins.className} min-h-screen bg-[#121315] text-white antialiased selection:bg-white selection:text-[#121315]`}
      >
        {children}
        <Toaster
          richColors
          position="top-right"
          theme="dark"
          toastOptions={{
            style: {
              background: "#23262B",
              color: "#FFFFFF",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "16px",
            },
          }}
        />
      </body>
    </html>
  );
}
