import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { PricingClient } from "@/components/pricing/pricing-client";

export const revalidate = 3600; // Cache static page and revalidate every hour in the background


// High-performance SEO metadata configuration for the pricing plans
export const metadata: Metadata = {
  title: "Pricing & Packages - Choose the Perfect Biodata Plan | MyWedProfile",
  description: "Affordable, transparent, and simple one-time plans for creating professional marriage biodatas. Select from Basic, Standard, and Premium packages. Free version available.",
  keywords: [
    "marriage biodata pricing",
    "cheap marriage biodata maker",
    "premium biodata packages",
    "biodata download price",
    "free matrimonial biodata plan"
  ],
  alternates: {
    canonical: "/pricing",
  },
  openGraph: {
    title: "Pricing & Packages - Choose the Perfect Biodata Plan | MyWedProfile",
    description: "Affordable and transparent pricing. Access premium templates, build multiple profiles, and download instantly.",
    url: "https://mywedprofile.com/pricing",
    siteName: "MyWedProfile",
    images: [
      {
        url: "/mockups/marathi_biodata_stack.webp",
        width: 800,
        height: 600,
        alt: "Affordable Marriage Biodata Plans",
      }
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pricing & Packages - Choose the Perfect Biodata Plan | MyWedProfile",
    description: "Affordable, transparent one-time plans. Select Basic, Standard, or Premium packages.",
    images: ["/mockups/marathi_biodata_stack.webp"],
  },
};

export default async function PricingPage() {
  // Query packages and comparisons directly on the server for ultra-fast load speed (no client loading spinner)
  let packages: any[] = [];
  let comparison: any[] = [];

  try {
    packages = await prisma.package.findMany({
      where: { isActive: true },
      orderBy: { price: "asc" },
    });
  } catch (e) {
    console.error("Prisma Package Query Error:", e);
  }

  try {
    comparison = await prisma.comparisonRow.findMany({
      orderBy: { order: "asc" },
    });
  } catch (e) {
    console.error("Prisma Comparison Query Error:", e);
  }

  return (
    <PricingClient
      initialPackages={packages}
      initialComparison={comparison}
    />
  );
}
