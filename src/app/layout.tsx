import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import Script from "next/script";
import { GoogleAnalytics } from '@next/third-parties/google';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vadhuvar Biodata | Free Marriage Biodata Maker & Premium PDF Templates",
  description: "Create a beautiful marriage biodata online for FREE in minutes. Choose from elegant free & premium templates in Marathi, Hindi, English, Gujarati. Instant high-quality PDF download.",
  metadataBase: new URL('https://vadhuvarbiodata.com'),
  icons: {
    icon: [
      { url: "/brand-icon.png?v=3", sizes: "32x32", type: "image/png" },
      { url: "/brand-icon.png?v=3", sizes: "48x48", type: "image/png" },
      { url: "/brand-icon.png?v=3", sizes: "96x96", type: "image/png" },
      { url: "/brand-icon.png?v=3", sizes: "144x144", type: "image/png" },
      { url: "/brand-icon.png?v=3", sizes: "192x192", type: "image/png" },
    ],
    shortcut: "/brand-icon.png?v=3",
    apple: [
      { url: "/brand-icon.png?v=3", sizes: "180x180", type: "image/png" }
    ],
  },
  openGraph: {
    title: "Vadhuvar Biodata | Free Marriage Biodata Maker & Premium PDF Templates",
    description: "Create a beautiful marriage biodata online for FREE in minutes. Choose from elegant free & premium templates in Marathi, Hindi, English, Gujarati. Instant high-quality PDF download.",
    url: "https://vadhuvarbiodata.com",
    siteName: "Vadhuvar Biodata",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Vadhuvar Biodata - Premium Marriage Biodata Maker",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vadhuvar Biodata | Free Marriage Biodata Maker & Premium PDF Templates",
    description: "Create a beautiful marriage biodata online for FREE in minutes. Choose from elegant free & premium templates in Marathi, Hindi, English, Gujarati. Instant high-quality PDF download.",
    images: ["/og-image.png"],
  },
};


import { Providers } from "@/components/providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
        suppressHydrationWarning>

        <Providers>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </Providers>

        <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
