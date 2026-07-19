import { prisma } from "@/lib/prisma";
import BlogsList from "@/components/blogs/BlogsList";
import { Metadata } from "next";
import { cache } from "react";

export const metadata: Metadata = {
  title: "Blogs & Articles | Marriage Profile",
  description:
    "Expert advice on creating the perfect biodata, understanding traditions, and finding your life partner.",
  keywords: [
    "marriage biodata tips",
    "matrimonial advice",
    "biodata templates guide",
    "indian wedding traditions",
  ],
};

// Cache for 1 hour
export const revalidate = 3600;

const getBlogs = cache(async () => {
  return prisma.blog.findMany({
    where: {
      isPublished: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      author: true,
      featuredImage: true,
      createdAt: true,
    },
  });
});

export default async function BlogsPage() {
  const blogs = await getBlogs();

  return (
    <main className="bg-white min-h-screen">
      <BlogsList initialBlogs={blogs} />
    </main>
  );
}