import { prisma } from "./prisma";
import { Metadata } from "next";

/**
 * Static pages now define their own metadata directly in page.tsx
 * This utility remains for legacy compatibility and Blog SEO
 */

export async function getPageSEO(pageKey: string): Promise<Metadata> {
  // Legacy support - now returns empty to allow page-level defaults
  return {};
}

export async function getCommunitySEO(slug: string): Promise<Metadata> {
  // Communities are now static - metadata is handled in src/app/community/[slug]/page.tsx
  return {};
}

export async function getBlogSEO(slug: string): Promise<Metadata> {
  try {
    const blog = await prisma.blog.findUnique({
      where: { slug }
    });

    if (!blog) return {};

    return {
      title: blog.metaTitle || blog.title,
      description: blog.metaDescription || blog.excerpt || undefined,
      keywords: blog.keywords || undefined,
      openGraph: {
        title: blog.metaTitle || blog.title,
        description: (blog.metaDescription || blog.excerpt) || undefined,
        images: blog.featuredImage ? [{ url: blog.featuredImage }] : undefined,
      }
    };
  } catch (error) {
    return {};
  }
}
