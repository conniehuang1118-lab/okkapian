import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import "./globals.css";

const GA_ID = "G-GK7CHQ5607";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "okkapian — 文案卡片生成器",
  description:
    "把文案直接排成卡片，保留全文，自动收字，换背景和字体，导出就能发。",
};

const googleFontFamilies = [
  "Noto+Serif+SC:wght@400;700",
  "Noto+Sans+SC:wght@400;500;700",
].join("&family=");

const googleFontsUrl = `https://fonts.googleapis.com/css2?family=${googleFontFamilies}&display=swap`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link href={googleFontsUrl} rel="stylesheet" crossOrigin="anonymous" />
      </head>
      <body className="min-h-full flex flex-col antialiased">
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
        </Script>
        {children}
      </body>
    </html>
  );
}
