"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, User, ArrowRight, Sparkles, BookOpen, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function BlogsList({ initialBlogs }: { initialBlogs: any[] }) {
  const [blogs] = useState<any[]>(initialBlogs);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth < 1024) {
        setItemsPerPage(8);
      } else {
        setItemsPerPage(12);
      }
    };
    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

  const totalPages = Math.ceil(blogs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentBlogs = blogs.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden bg-[#430917]/5 border-b border-primary/5">
        <div className="container mx-auto px-4 md:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-6">
              <BookOpen size={12} /> Insights & Advice
            </div>
            <h1 className="text-3xl md:text-3xl lg:text-5xl font-black mb-6 leading-tight tracking-tight text-zinc-900">
              Blogs & <span className="text-primary italic">Articles</span>
            </h1>
            <p className="text-zinc-500 text-md md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
              Expert advice on creating the perfect biodata, understanding traditions, and finding your life partner.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blogs Grid */}
      <section className="py-24 bg-zinc-50/30 min-h-[600px]">
        <div className="container mx-auto px-4 md:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-10"
            >
              {currentBlogs.map((blog, i) => (
                <motion.div
                  key={blog.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="group bg-white rounded-[2rem] overflow-hidden transition-all duration-500 flex flex-col h-full"
                  style={{
                    border: '1px solid rgba(214, 13, 44, 0.15)',
                    boxShadow: '0 10px 30px -10px rgba(214, 13, 44, 0.1)'
                  }}
                >
                  <Link href={`/blogs/${blog.slug}`} className="block relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={blog.featuredImage || "/blogs/blog-placeholder.webp"}
                      alt={blog.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </Link>

                  <div className="p-6 md:p-7 flex flex-col flex-grow">
                    <div className="flex items-center gap-4 text-[9px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-3">
                      <span className="flex items-center gap-1.5"><Calendar size={11} className="text-primary" /> {new Date(blog.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
                      <span className="flex items-center gap-1.5"><User size={11} className="text-primary" /> {blog.author}</span>
                    </div>

                    <Link href={`/blogs/${blog.slug}`}>
                      <h3 className="text-lg md:text-xl font-black text-zinc-900 mb-3 group-hover:text-primary transition-colors leading-tight">
                        {blog.title}
                      </h3>
                    </Link>

                    <p className="text-zinc-500 text-[13px] font-medium leading-relaxed mb-6 line-clamp-3">
                      {blog.excerpt}
                    </p>

                    <div className="mt-auto">
                      <Link href={`/blogs/${blog.slug}`}>
                        <Button variant="ghost" className="p-0 h-auto font-black text-[10px] uppercase tracking-[0.2em] text-primary hover:text-primary hover:bg-transparent group/btn">
                          Read More
                          <ArrowRight size={14} className="ml-1.5 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Pagination UI */}
          {totalPages > 1 && (
            <div className="mt-20 flex items-center justify-center gap-4">
              <Button
                variant="outline"
                size="icon"
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                className="w-12 h-12 rounded-2xl border-zinc-200 bg-white hover:bg-primary hover:text-white hover:border-primary transition-all disabled:opacity-50"
              >
                <ChevronLeft size={20} />
              </Button>

              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => handlePageChange(idx + 1)}
                    className={`w-12 h-12 rounded-2xl text-sm font-black transition-all ${currentPage === idx + 1
                      ? "bg-primary text-white shadow-lg shadow-primary/20"
                      : "bg-white text-zinc-400 border border-zinc-100 hover:border-primary hover:text-primary"
                      }`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>

              <Button
                variant="outline"
                size="icon"
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                className="w-12 h-12 rounded-2xl border-zinc-200 bg-white hover:bg-primary hover:text-white hover:border-primary transition-all disabled:opacity-50"
              >
                <ChevronRight size={20} />
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Simplified CTA Section */}
      <section className="pb-24 pt-12">
        <div className="container mx-auto px-4 md:px-8">
          <div className="bg-primary/5 rounded-[3rem] p-10 md:p-16 text-center relative overflow-hidden border border-primary/10">
            <div className="relative z-10 max-w-2xl mx-auto">
              <h3 className="text-2xl md:text-4xl font-black mb-4 text-zinc-900 leading-tight">
                Ready to Create Your <span className="text-primary italic">Biodata?</span>
              </h3>
              <p className="text-zinc-500 text-base font-medium mb-8">
                Choose from 50+ premium templates and get started for free.
              </p>
              <Link href="/#create-biodata">
                <Button size="lg" className="rounded-full px-10 h-14 font-black bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/20 transition-all">
                  Create Biodata Now <ArrowRight className="ml-2" size={18} />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
