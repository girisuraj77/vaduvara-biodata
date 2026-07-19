"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import NextImage from "next/image";
import { cn } from "@/lib/utils";

export function BlogSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    slidesToScroll: 4,
    containScroll: "trimSnaps",
  });

  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback((emblaApi: any) => {
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect(emblaApi);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  const [blogs, setBlogs] = useState<any[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch('/api/blogs');
        const data = await res.json();
        if (Array.isArray(data)) setBlogs(data.slice(0, 8));
      } catch (err) {
        console.error("Blogs fetch failed", err);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <section id="blogs" className="py-12 bg-[#F5EAEC] relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-end justify-between mb-8 gap-6">
          <div className="max-w-2xl text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-4">
              Latest from our <span className="text-primary">Blog</span>
            </h2>
            <p className="text-zinc-500 text-base font-medium">
              Expert advice on creating the perfect biodata, wedding planning, and finding your perfect life partner.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 mr-4">
              <Button
                variant="outline"
                size="icon"
                onClick={scrollPrev}
                disabled={!prevBtnEnabled}
                className="rounded-full w-10 h-10 border-zinc-300 disabled:opacity-30 transition-all bg-white hover:bg-zinc-50 shadow-sm"
              >
                <ChevronLeft size={20} />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={scrollNext}
                disabled={!nextBtnEnabled}
                className="rounded-full w-10 h-10 border-zinc-300 disabled:opacity-30 transition-all bg-white hover:bg-zinc-50 shadow-sm"
              >
                <ChevronRight size={20} />
              </Button>
            </div>
            <Link href="/blogs">
              <Button className="rounded-xl font-bold text-sm h-12 px-6 bg-white text-zinc-900 border border-zinc-200 hover:bg-zinc-50 transition-all cursor-pointer shadow-sm">
                View All Blogs <ArrowRight size={16} className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex -ml-6">
            {blogs.map((blog, i) => (
              <div key={blog.id} className="flex-[0_0_100%] sm:flex-[0_0_50%] md:flex-[0_0_25%] pl-6 min-w-0">
                <Link href={`/blogs/${blog.slug}`}>
                  <motion.div
                    whileHover={{ y: -8 }}
                    className="bg-white rounded-2xl overflow-hidden border border-zinc-200 shadow-sm transition-all hover:shadow-xl hover:shadow-primary/5 group h-full flex flex-col"
                  >
                    <div className="aspect-[16/10] overflow-hidden relative">
                      <NextImage
                        src={blog.featuredImage || "/blogs/blog-placeholder.webp"}
                        alt={blog.title || "Blog Post"}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest text-primary border border-white/20">
                          Insights
                        </span>
                      </div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="text-zinc-400 text-[11px] font-bold uppercase tracking-wider mb-3">
                        {new Date(blog.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                      <h3 className="text-xl font-bold text-zinc-900 mb-3 leading-tight group-hover:text-primary transition-colors cursor-pointer line-clamp-2">
                        {blog.title}
                      </h3>
                      <p className="text-zinc-500 text-sm leading-relaxed mb-6 line-clamp-3">
                        {blog.excerpt}
                      </p>
                      <div className="mt-auto flex items-center gap-2 text-primary font-bold text-sm cursor-pointer group/link">
                        Read Full Article
                        <ChevronRight size={16} className="transition-transform group-hover/link:translate-x-1" />
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
