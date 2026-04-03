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
  title: "CA BYLDRS — Trusted Local Home Services in Orange County & Los Angeles County",
  description:
    "Get connected with verified local professionals for plumbing, roofing, cleaning, pest control, HVAC, electrical, handyman, and painting services. Serving Orange County and Los Angeles County.",
  keywords: [
    "CA BYLDRS home services",
    "Orange County contractors",
    "Los Angeles County home services",
    "plumbing Orange County",
    "roofing Los Angeles",
    "HVAC repair Southern California",
    "local contractors",
    "verified professionals",
    "home service matching",
  ],
  authors: [{ name: "CA BYLDRS" }],
  openGraph: {
    title: "CA BYLDRS — Trusted Local Home Services",
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
        {/* GoHighLevel External Tracking Script */}
        <script
          src="https://link.msgsndr.com/js/external-tracking.js"
          data-tracking-id="tk_10e022fb5c9f4ebea7a518b61fa81171"
          async
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
