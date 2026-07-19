"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  FileText,
  Eye,
  CheckCircle2,
  Clock,
  Search,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";

export default function BlogsPage() {
  const router = useRouter();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchBlogs = useCallback(async (page: number) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/blogs?page=${page}&limit=7`);
      const data = await res.json();
      setBlogs(data.blogs || []);
      setTotalPages(data.pagination?.pages || 1);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBlogs(currentPage);
  }, [fetchBlogs, currentPage]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this article?")) return;

    try {
      const res = await fetch(`/api/admin/blogs/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success("Article deleted");
        fetchBlogs(currentPage);
      } else {
        throw new Error("Failed to delete");
      }
    } catch (error) {
      toast.error("Error deleting article");
    }
  };

  const filteredBlogs = blogs.filter((blog: any) =>
    blog.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Blog Management</h1>
          <p className="text-gray-500 text-sm">Write and manage educational articles.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="search"
              placeholder="Search articles..."
              className="w-full pl-9 h-10 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Link href="/admin/blogs/new">
            <Button className="h-10 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold px-6">
              <Plus className="h-4 w-4 mr-2" /> Write Article
            </Button>
          </Link>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 border rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 dark:bg-gray-800/50 border-b text-gray-400 font-bold uppercase text-[10px] tracking-widest">
              <tr>
                <th className="px-6 py-4">Article</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Created</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-6 py-4" colSpan={4}>
                      <div className="h-12 bg-gray-100 dark:bg-gray-800 rounded-xl w-full" />
                    </td>
                  </tr>
                ))
              ) : filteredBlogs.length === 0 ? (
                <tr>
                  <td className="px-6 py-12 text-center text-gray-500 font-medium" colSpan={4}>
                    No articles found matching your search.
                  </td>
                </tr>
              ) : (
                filteredBlogs.map((blog: any) => (
                  <tr key={blog.id} className="group hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        {blog.featuredImage ? (
                          <img src={blog.featuredImage} className="w-12 h-12 rounded-xl object-cover border shadow-sm group-hover:scale-105 transition-transform" alt="" />
                        ) : (
                          <div className="w-12 h-12 rounded-xl bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center border group-hover:bg-white transition-colors">
                            <FileText className="h-5 w-5 text-gray-300" />
                          </div>
                        )}
                        <div>
                          <p className="font-bold text-gray-900 dark:text-white line-clamp-1 leading-tight">{blog.title}</p>
                          <p className="text-[10px] text-gray-400 font-mono mt-0.5 tracking-tighter">/blogs/{blog.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border",
                        blog.isPublished
                          ? "bg-green-50 text-green-700 border-green-100"
                          : "bg-zinc-50 text-zinc-500 border-zinc-100"
                      )}>
                        {blog.isPublished ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                        {blog.isPublished ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-xs font-bold">
                      {format(new Date(blog.createdAt), "MMM d, yyyy")}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end items-center gap-1">
                        <Link href={`/blogs/${blog.slug}`} target="_blank">
                          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full text-gray-400 hover:text-primary hover:bg-primary/5">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Link href={`/admin/blogs/${blog.id}`}>
                          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full text-gray-400 hover:text-blue-600 hover:bg-blue-50">
                            <Edit2 className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-9 w-9 rounded-full text-gray-400 hover:text-red-600 hover:bg-red-50"
                          onClick={() => handleDelete(blog.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Admin Blog Pagination bar */}
        {totalPages > 1 && (
          <div className="bg-white dark:bg-gray-900 px-6 py-4 border-t flex items-center justify-between gap-4">
            <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">
              Page {currentPage} of {totalPages}
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1 || loading}
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                className="h-9 w-9 rounded-xl p-0 flex items-center justify-center border hover:bg-zinc-50"
              >
                <ChevronLeft size={16} />
              </Button>

              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentPage(idx + 1)}
                    disabled={loading}
                    className={cn(
                      "w-9 h-9 rounded-xl text-xs font-black transition-all cursor-pointer border shadow-sm",
                      currentPage === idx + 1
                        ? "bg-primary text-white border-primary"
                        : "bg-white text-zinc-500 border-zinc-200 hover:bg-zinc-50"
                    )}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>

              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === totalPages || loading}
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                className="h-9 w-9 rounded-xl p-0 flex items-center justify-center border hover:bg-zinc-50"
              >
                <ChevronRight size={16} />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
