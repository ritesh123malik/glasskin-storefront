import type { Metadata } from "next";
import { Nunito, Playfair_Display, Archivo_Black, Baloo_2 } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import CookieConsent from "@/components/ui/CookieConsent";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
});

const archivo = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-archivo",
});

const baloo = Baloo_2({
  subsets: ["latin"],
  variable: "--font-baloo",
});

export const metadata: Metadata = {
  title: "GLASSSKIN | Super Delicious Skincare",
  description: "A playful, feel-good skincare storefront featuring cleansers, serums, moisturizers, SPF, and gift sets. Real science, deliciously simple.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${nunito.variable} ${archivo.variable} ${baloo.variable}`}>
      <body className="font-sans antialiased text-brand-text bg-brand-bg">
        <Providers>{children}</Providers>
        <CookieConsent />
      </body>
    </html>
  );
}
