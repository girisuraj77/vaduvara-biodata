import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { TemplatesClient } from "@/components/templates/templates-client";

// Highly targeted SEO configuration for the Templates Catalog Page
export const metadata: Metadata = {
  title: "Free Marriage Biodata Templates - Choose Beautiful Matrimonial Layouts",
  description: "Choose from 50+ beautiful, free & premium marriage biodata templates. Standard printable layouts available in Marathi, Hindi, English, and Gujarati. Customize & download for free!",
  keywords: [
    "free marriage biodata templates",
    "marriage biodata templates free",
    "lagnacha biodata format marathi",
    "shadi biodata design download",
    "marriage biodata format pdf free download",
    "matrimonial biodata templates",
    "best lagn biodata layouts",
    "regional marriage biodata templates"
  ],
  alternates: {
    canonical: "/templates",
  },
  openGraph: {
    title: "Free Marriage Biodata Templates - Choose Beautiful Matrimonial Layouts",
    description: "Choose from 50+ beautiful, free & premium marriage biodata templates. Standard printable layouts available in Marathi, Hindi, English, and Gujarati. Customize & download for free!",
    url: "https://vadhuvarbiodata.com/templates",
    siteName: "Vadhuvar Biodata",
    images: [
      {
        url: "/mockups/marathi_biodata_stack.webp",
        width: 800,
        height: 600,
        alt: "Collection of Premium Matrimonial Biodata Templates",
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Marriage Biodata Templates - Choose Beautiful Matrimonial Layouts",
    description: "Choose from 50+ beautiful, free & premium marriage biodata templates. Standard layouts available in Marathi, Hindi, English, and Gujarati. Customize & download for free!",
    images: ["/mockups/marathi_biodata_stack.webp"],
  },
};

export default async function TemplatesPage() {
  // Query all active templates on the server for instant page render & SEO bot crawler visibility
  const templates = await prisma.$queryRawUnsafe(`
    SELECT id, "templateId", name, image, category, gender, community, "isActive", "isViewHomePage", "order", "isFree"
    FROM "Template"
    WHERE "isActive" = true
    ORDER BY "order" ASC
  `) as any[];

  return <TemplatesClient initialTemplates={templates} />;
}
