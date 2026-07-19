import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { LandingClient } from "@/components/home/landing-client";

// Perfect, high-performance SEO configuration for Google, Bing, and Social shares
export const metadata: Metadata = {
  title: "Free Marriage Biodata Maker - Create Matrimonial Profiles Online",
  description: "Create your marriage biodata online for FREE in minutes. Choose from elegant free & premium templates in Marathi (Lagn Biodata), Hindi (Shadi Biodata), Gujarati & English for Hindu, Muslim, Christian, and Sikh communities. Download print-ready PDF instantly.",
  keywords: [
    // Core English Keywords
    "free marriage biodata maker",
    "free marriage biodata format",
    "free marriage biodata templates",
    "free matrimonial biodata maker",
    "marriage biodata maker free",
    "matrimonial profile builder",
    "marriage biodata format",
    "marriage biodata pdf download",
    "online biodata creator",
    "premium marriage biodata templates",

    // Marathi & Lagn Specific Keywords
    "marathi marriage biodata maker",
    "marathi biodata",
    "lagn biodata",
    "lagnacha biodata marathi",
    "lagnacha biodata format",
    "free marathi marriage biodata",
    "marathi matrimonial profile",
    "marriage biodata in marathi",

    // Hindi & Shadi Specific Keywords
    "shadi biodata maker",
    "shadi ke liye biodata format",
    "marriage biodata in hindi",
    "free hindi shadi biodata",

    // Gujarati Specific Keywords
    "gujarati marriage biodata maker",
    "lagn biodata gujarati",
    "gujarati matrimonial profile",

    // Community-Specific Keywords
    "hindu marriage biodata",
    "muslim marriage biodata format",
    "christian marriage biodata",
    "sikh marriage biodata",
    "nikah biodata format",

    // General high-converting keywords
    "biodata creator for boys",
    "biodata format for girls",
    "marriage biodata template free download"
  ],
  metadataBase: new URL('https://vadhuvarbiodata.com'),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Free Marriage Biodata Maker - Create Matrimonial Profiles Online",
    description: "Create your marriage biodata online for FREE in minutes. Choose from elegant free & premium templates in Marathi (Lagn Biodata), Hindi (Shadi Biodata), Gujarati & English for Hindu, Muslim, Christian, and Sikh communities. Download print-ready PDF instantly.",
    url: "https://vadhuvarbiodata.com",
    siteName: "Vadhuvar Biodata",
    images: [
      {
        url: "/mockups/marathi_biodata_stack.webp",
        width: 800,
        height: 600,
        alt: "Premium Multilingual Marriage Biodata Templates Stack",
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Marriage Biodata Maker - Create Matrimonial Profiles Online",
    description: "Create your marriage biodata online for FREE in minutes. Choose from elegant free & premium templates in Marathi (Lagn Biodata), Hindi (Shadi Biodata), Gujarati & English. Instant print-ready PDF download.",
    images: ["/mockups/marathi_biodata_stack.webp"],
  },
};

export default async function LandingPage() {
  // Query Prisma directly on the server for ultra-fast, database pre-rendered load
  const templates = await prisma.$queryRawUnsafe(`
    SELECT id, "templateId", name, image, category, gender, community, "isActive", "isViewHomePage", "order", "isFree"
    FROM "Template"
    WHERE "isActive" = true AND "isViewHomePage" = true
    ORDER BY "order" ASC
  `) as any[];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Vadhuvar Biodata - Premium Marriage Biodata Maker",
    "url": "https://vadhuvarbiodata.com",
    "description": "Create beautiful, premium, and professional marriage biodata online in minutes. Choose from 50+ templates in Marathi, Hindi, English, Gujarati.",
    "applicationCategory": "MatrimonialProfileBuilder",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "INR"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "1284"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LandingClient initialTemplates={templates} />
    </>
  );
}
