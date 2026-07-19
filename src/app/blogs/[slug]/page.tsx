import { prisma } from "@/lib/prisma";
import BlogContent from "@/components/blogs/BlogContent";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";

export const revalidate = 3600; // 1 hour cache

const getBlogBySlug = cache(async (slug: string) => {
  return prisma.blog.findUnique({
    where: { slug },
    select: {
      id: true,
      title: true,
      slug: true,
      content: true,
      excerpt: true,
      featuredImage: true,
      author: true,
      createdAt: true,
      updatedAt: true,
      keywords: true,
      metaTitle: true,
      metaDescription: true,
    },
  });
});

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;

  const blog = await getBlogBySlug(slug);

  if (!blog) return {};

  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL ||
    "https://vadhuvarbiodata.com";

  const url = `/blogs/${slug}`;
  const ogImage = blog.featuredImage || "/og-image.jpg";

  return {
    metadataBase: new URL(baseUrl),
    title: `${blog.metaTitle || blog.title} | Marriage Profile`,
    description:
      blog.metaDescription || blog.excerpt || undefined,
    keywords: blog.keywords
      ? blog.keywords.split(",")
      : ["marriage biodata", "matrimonial tips"],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: blog.metaTitle || blog.title,
      description:
        blog.metaDescription || blog.excerpt || undefined,
      url,
      siteName: "Marriage Profile",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
      locale: "en_IN",
      type: "article",
      publishedTime: blog.createdAt.toISOString(),
      authors: [blog.author || "Admin"],
      tags: blog.keywords
        ? blog.keywords.split(",")
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.metaTitle || blog.title,
      description:
        blog.metaDescription || blog.excerpt || undefined,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function BlogDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [blog, relatedBlogs] = await Promise.all([
    getBlogBySlug(slug),

    prisma.blog.findMany({
      where: {
        isPublished: true,
        NOT: {
          slug,
        },
      },
      take: 3,
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        title: true,
        slug: true,
        featuredImage: true,
        createdAt: true,
      },
    }),
  ]);

  if (!blog) {
    notFound();
  }

  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL ||
    "https://vadhuvarbiodata.com";

  const wordCount = blog.content
    .replace(/<[^>]*>/g, "")
    .split(/\s+/).length;

  const readingTime = Math.ceil(wordCount / 200);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: blog.metaDescription || blog.excerpt,
    image: blog.featuredImage
      ? blog.featuredImage.startsWith("http")
        ? blog.featuredImage
        : `${baseUrl}${blog.featuredImage}`
      : `${baseUrl}/og-image.jpg`,
    datePublished: blog.createdAt.toISOString(),
    dateModified: blog.updatedAt.toISOString(),
    author: {
      "@type": "Person",
      name: blog.author || "Admin",
    },
    publisher: {
      "@type": "Organization",
      name: "Marriage Profile",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/blogs/${slug}`,
    },
    wordCount,
    timeRequired: `PT${readingTime}M`,
    keywords: blog.keywords,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      <BlogContent
        blog={blog}
        relatedBlogs={relatedBlogs}
      />
    </>
  );
}