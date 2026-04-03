import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "California Next Builder — Trusted Local Home Services in Orange County & Los Angeles County",
  description:
    "Get connected with verified local professionals for plumbing, roofing, cleaning, pest control, HVAC, electrical, handyman, and painting services. Serving Orange County and Los Angeles County.",
  keywords: [
    "California home services",
    "Orange County contractors",
    "Los Angeles County home services",
    "plumbing Orange County",
    "roofing Los Angeles",
    "HVAC repair California",
    "local contractors",
    "verified professionals",
    "home service matching",
  ],
  authors: [{ name: "California Next Builder" }],
  openGraph: {
    title: "California Next Builder — Trusted Local Home Services",
    description:
      "Connecting homeowners with verified local professionals in Orange County & Los Angeles County for plumbing, roofing, cleaning, and more.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          src="https://link.msgsndr.com/js/external-tracking.js"
          data-tracking-id="tk_10e022fb5c9f4ebea7a518b61fa81171"
          strategy="afterInteractive"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
