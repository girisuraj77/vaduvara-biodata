"use client";

import { motion } from "framer-motion";
import { Calendar, User, ArrowLeft, Share2, Facebook, Twitter, Link2, Sparkles, BookOpen, ArrowRight, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";

export default function BlogContent({ blog, relatedBlogs }: { blog: any, relatedBlogs: any[] }) {
  const copyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  return (
    <main className="bg-white min-h-screen">
      {/* Dynamic Hero Section - Centered as requested */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-[#430917]/5 border-b border-primary/5">
        <div className="container mx-auto px-4 md:px-8 relative z-10 text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            {/* Breadcrumbs */}
            <div className="flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] mb-8">
              <Link href="/blogs" className="text-zinc-400 hover:text-primary transition-colors">Blogs</Link>
              <ChevronRight size={12} className="text-zinc-300" />
              <span className="text-primary truncate max-w-[200px]">{blog.title}</span>
            </div>

            <h1 className="text-2xl md:text-4xl lg:text-5xl font-black mb-8 leading-[1.1] tracking-tight text-zinc-900">
              {blog.title}
            </h1>

            <div className="flex flex-wrap items-center justify-center gap-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/10">
                  <User size={18} />
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest leading-none mb-1">Author</p>
                  <p className="text-sm font-black text-zinc-900">{blog.author || "Admin"}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-400 border border-zinc-200">
                  <Calendar size={18} />
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest leading-none mb-1">Published</p>
                  <p className="text-sm font-black text-zinc-900">
                    {new Date(blog.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Left Content Area */}
            <div className="lg:col-span-8">
              {/* Featured Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative aspect-[21/10] rounded-[2.5rem] overflow-hidden shadow-2xl mb-16 group"
              >
                <Image
                  src={blog.featuredImage || "/blogs/blog-placeholder.webp"}
                  alt={blog.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 800px"
                  className="object-cover group-hover:scale-105 transition-transform duration-1000"
                  priority
                />
              </motion.div>

              {/* Article Body */}
              <div className="prose prose-zinc max-w-none 
                prose-headings:font-black prose-headings:tracking-tight prose-headings:text-zinc-900
                prose-p:text-zinc-600 prose-p:leading-relaxed prose-p:text-lg prose-p:mb-8
                prose-strong:text-zinc-900 prose-strong:font-black
                prose-img:rounded-[2rem] prose-img:shadow-xl
                prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-primary/5 prose-blockquote:rounded-r-2xl prose-blockquote:p-8 prose-blockquote:not-italic prose-blockquote:font-bold prose-blockquote:text-zinc-900">
                <div dangerouslySetInnerHTML={{ __html: blog.content }} />
              </div>

              {/* Share Bar */}
              <div className="mt-20 pt-12 border-t border-zinc-100 flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div className="flex flex-wrap gap-3">
                  <span className="px-4 py-1.5 bg-zinc-50 rounded-full text-[10px] font-black text-zinc-400 uppercase tracking-widest border border-zinc-100">Matrimony</span>
                  <span className="px-4 py-1.5 bg-zinc-50 rounded-full text-[10px] font-black text-zinc-400 uppercase tracking-widest border border-zinc-100">Biodata Tips</span>
                  <span className="px-4 py-1.5 bg-zinc-50 rounded-full text-[10px] font-black text-zinc-400 uppercase tracking-widest border border-zinc-100">Guide</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mr-2">Share Article</span>
                  <button onClick={copyLink} className="w-10 h-10 rounded-xl bg-zinc-50 flex items-center justify-center text-zinc-500 hover:bg-primary hover:text-white transition-all shadow-sm border border-zinc-100">
                    <Link2 size={18} />
                  </button>
                  <button className="w-10 h-10 rounded-xl bg-zinc-50 flex items-center justify-center text-zinc-500 hover:bg-[#1877F2] hover:text-white transition-all shadow-sm border border-zinc-100">
                    <Facebook size={18} />
                  </button>
                  <button className="w-10 h-10 rounded-xl bg-zinc-50 flex items-center justify-center text-zinc-500 hover:bg-[#1DA1F2] hover:text-white transition-all shadow-sm border border-zinc-100">
                    <Twitter size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Sidebar - Related Posts */}
            <aside className="lg:col-span-4">
              <div className="sticky top-32">
                <div className="bg-zinc-50/50 rounded-[2.5rem] p-8 md:p-10 border border-zinc-100">
                  <h3 className="text-xl font-black text-zinc-900 mb-8 flex items-center gap-3">
                    <Sparkles size={20} className="text-primary" />
                    Recommended
                  </h3>

                  <div className="space-y-8">
                    {relatedBlogs.map((item) => (
                      <Link key={item.id} href={`/blogs/${item.slug}`} className="group block">
                        <div className="flex gap-4 items-start">
                          <div className="relative w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0">
                            <Image
                              src={item.featuredImage || "/blogs/blog-placeholder.webp"}
                              alt={item.title}
                              fill
                              sizes="80px"
                              className="object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                          </div>
                          <div>
                            <h4 className="text-sm font-black text-zinc-900 group-hover:text-primary transition-colors leading-snug line-clamp-2 mb-2">
                              {item.title}
                            </h4>
                            <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                              <Calendar size={10} className="text-primary" />
                              {new Date(item.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>

                  <Link href="/blogs" className="mt-10 block">
                    <Button variant="outline" className="w-full rounded-2xl h-12 font-black text-[10px] uppercase tracking-widest border-zinc-200 hover:bg-primary hover:text-white hover:border-primary transition-all">
                      View All Insights <ArrowRight size={14} className="ml-2" />
                    </Button>
                  </Link>
                </div>

                {/* Newsletter / Promo box */}
                <div className="mt-8 bg-zinc-900 rounded-[2.5rem] p-8 md:p-10 text-white relative overflow-hidden group">
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative z-10">
                    <h4 className="text-xl font-black mb-4 leading-tight">Need a professional <span className="text-primary italic">Biodata?</span></h4>
                    <p className="text-zinc-400 text-sm font-medium mb-8">
                      Choose from our curated collection of premium templates and stand out today.
                    </p>
                    <Link href="/#create-biodata">
                      <Button className="w-full rounded-xl h-12 font-black text-[10px] uppercase tracking-widest bg-primary hover:bg-white hover:text-primary transition-all">
                        Create Now
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Simplified Bottom CTA Section */}
      <section className="pb-24 pt-12">
        <div className="container mx-auto px-4 md:px-8">
          <div className="bg-primary/5 rounded-[3rem] p-10 md:p-16 text-center relative overflow-hidden border border-primary/10">
            <div className="relative z-10 max-w-2xl mx-auto">
              <h3 className="text-2xl md:text-4xl font-black mb-4 text-zinc-900 leading-tight">
                Liked this <span className="text-primary italic">Article?</span>
              </h3>
              <p className="text-zinc-500 text-base font-medium mb-8">
                Build your own high-quality biodata in just 2 minutes with our premium templates.
              </p>
              <Link href="/#create-biodata">
                <Button size="lg" className="rounded-full px-10 h-14 font-black bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/20 transition-all">
                  Create Your Biodata <ArrowRight className="ml-2" size={18} />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
