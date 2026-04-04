import type { Metadata, Viewport } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0a0c10',
};

export const metadata: Metadata = {
  title: {
    default: "CA BYLDRS — Trusted Local Home Services in Orange County & Los Angeles County",
    template: "%s | CA BYLDRS",
  },
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
    "emergency home repair OC",
    "licensed plumbers near me",
    "electrician Orange County",
  ],
  authors: [{ name: "CA BYLDRS", url: "https://github.com/mohontotopu48-maker/CA-BYLDRS" }],
  creator: "CA BYLDRS",
  publisher: "CA BYLDRS",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  openGraph: {
    title: "CA BYLDRS — Trusted Local Home Services",
    description:
      "Connecting homeowners with verified local professionals in Orange County & Los Angeles County for plumbing, roofing, cleaning, and more. No spam. No shared leads.",
    type: "website",
    locale: "en_US",
    url: "https://cabyldrs.com",
    siteName: "CA BYLDRS",
    images: [{ url: "https://i.ibb.co/VchfWZ7x/Chat-GPT-Image-Apr-4-2026-03-27-52-AM.png", width: 512, height: 512, alt: "CA BYLDRS Logo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "CA BYLDRS — Trusted Local Home Services",
    description: "Connecting homeowners with verified local professionals in OC & LA County. No spam, no shared leads.",
    images: ["https://i.ibb.co/VchfWZ7x/Chat-GPT-Image-Apr-4-2026-03-27-52-AM.png"],
  },
  alternates: {
    canonical: "https://cabyldrs.com",
    hosts: ["https://cabyldrs.com", "https://nxlbyldr.com"],
  },
  other: {
    'geo.region': 'US-CA',
    'geo.placename': 'Fullerton, California',
    'geo.position': '33.8704;-117.9242',
    'ICBM': '33.8704, -117.9242',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      {/* Structured Data - LocalBusiness */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: 'CA BYLDRS',
            description: 'Connecting Orange County & Los Angeles County homeowners with verified, licensed local professionals.',
            url: 'https://cabyldrs.com',
            telephone: '+1-562-944-0500',
            email: 'hello@nxlbyldr.com',
            contactPoint: {
              '@type': 'ContactPoint',
              telephone: '+1-562-944-0500',
              contactType: 'customer service',
              email: 'hello@nxlbyldr.com',
              availableLanguage: ['English'],
            },
            address: { '@type': 'PostalAddress', streetAddress: '3400 Twilight Dr.', addressLocality: 'Fullerton', addressRegion: 'CA', postalCode: '92835', addressCountry: 'US' },
            areaServed: [{ '@type': 'AdministrativeArea', name: 'Orange County' }, { '@type': 'AdministrativeArea', name: 'Los Angeles County' }],
            serviceType: ['Plumbing', 'Roofing', 'Cleaning', 'Pest Control', 'HVAC', 'Electrical', 'Handyman', 'Painting', 'Junk Removal'],
            openingHours: ['Mo-Fr 08:00-18:00', 'Sa 09:00-15:00'],
            priceRange: 'Free',
            image: 'https://i.ibb.co/VchfWZ7x/Chat-GPT-Image-Apr-4-2026-03-27-52-AM.png',
            sameAs: ['https://cabyldrs.com', 'https://nxlbyldr.com'],
          }),
        }}
      />
      <head>
        {/* GoHighLevel External Tracking Script */}
        <script
          src="https://link.msgsndr.com/js/external-tracking.js"
          data-tracking-id="tk_10e022fb5c9f4ebea7a518b61fa81171"
          async
        />
        {/* Preload critical logo image */}
        <link rel="preload" as="image" href="https://i.ibb.co/VchfWZ7x/Chat-GPT-Image-Apr-4-2026-03-27-52-AM.png" type="image/png" />
        <link rel="icon" href="https://i.ibb.co/VchfWZ7x/Chat-GPT-Image-Apr-4-2026-03-27-52-AM.png" type="image/png" />
      </head>
      <body
        className={`${outfit.variable} ${inter.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
        {/* Skip Navigation */}
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-orange-500 focus:text-white focus:rounded-lg">Skip to main content</a>
      </body>
    </html>
  );
}
