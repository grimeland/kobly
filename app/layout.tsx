import type { Metadata } from "next";
import localFont from "next/font/local";
import { Crimson_Pro, Syne } from "next/font/google";
import "./globals.css";

const moderat = localFont({
  variable: "--font-moderat",
  display: "swap",
  src: [
    {
      path: "./fonts/Moderat-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Moderat-Semibold.otf",
      weight: "600",
      style: "normal",
    },
  ],
});

const crimsonPro = Crimson_Pro({
  variable: "--font-crimson",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kobly — Vi finner det beste flyttebyrået for deg",
  description:
    "Kobly kobler deg med kvalitetssjekkede flyttebyråer i ditt område.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="nb"
      className={`${moderat.variable} ${crimsonPro.variable} ${syne.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
