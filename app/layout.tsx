import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "GLASSSKIN | Editorial Luxury Skincare Storefront",
  description: "A warm, high-end editorial storefront featuring premium skincare cleansers, serums, moisturizers, SPF, and gift sets.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans antialiased text-brand-text bg-brand-bg">
        {children}
      </body>
    </html>
  );
}
