"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  Save, 
  ImageIcon,
  Search,
  Globe,
  Loader2,
  Upload
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Link from "next/link";
import React from "react";
import RichTextEditor from "@/components/admin/RichTextEditor";

export default function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imageSize, setImageSize] = useState<string | null>(null);
  const [initialLoading, setInitialLoading] = useState(true);
  const [blogId, setBlogId] = useState("");
  const [editorMode, setEditorMode] = useState<"visual" | "html">("visual");
  
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    excerpt: "",
    featuredImage: "",
    isPublished: false,
    metaTitle: "",
    metaDescription: "",
    keywords: ""
  });

  const fetchImageSize = async (url: string) => {
    try {
      const res = await fetch(url, { method: 'HEAD' });
      const contentLength = res.headers.get('content-length');
      if (contentLength) {
        const bytes = parseInt(contentLength, 10);
        setImageSize((bytes / 1024).toFixed(1) + " KB");
      }
    } catch (e) {
      console.error("Failed to fetch image size:", e);
    }
  };

  useEffect(() => {
    const fetchBlog = async () => {
      const { id } = await params;
      setBlogId(id);
      try {
        const res = await fetch(`/api/admin/blogs/${id}`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setFormData({
          title: data.title,
          slug: data.slug,
          content: data.content,
          excerpt: data.excerpt || "",
          featuredImage: data.featuredImage || "",
          isPublished: data.isPublished,
          metaTitle: data.metaTitle || "",
          metaDescription: data.metaDescription || "",
          keywords: data.keywords || ""
        });
        if (data.featuredImage) {
          fetchImageSize(data.featuredImage);
        }
      } catch (error) {
        toast.error("Error loading article");
        router.push("/admin/blogs");
      } finally {
        setInitialLoading(false);
      }
    };
    fetchBlog();
  }, [params, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`/api/admin/blogs/${blogId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        toast.success("Article updated successfully!");
        router.push("/admin/blogs");
        router.refresh();
      } else {
        throw new Error("Failed to save");
      }
    } catch (error) {
      toast.error("Error updating article");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "image/webp") {
      toast.error("Only WebP images are allowed!");
      return;
    }

    setImageSize((file.size / 1024).toFixed(1) + " KB");
    setUploading(true);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      try {
        const base64Data = reader.result as string;
        const res = await fetch("/api/admin/blogs/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            image: base64Data,
            fileName: file.name
          })
        });

        const data = await res.json();
        if (res.ok && data.url) {
          setFormData(prev => ({ ...prev, featuredImage: data.url }));
          toast.success("Image uploaded successfully!");
        } else {
          toast.error(data.error || "Failed to upload image");
        }
      } catch (err) {
        toast.error("Upload error");
        console.error(err);
      } finally {
        setUploading(false);
      }
    };
  };

  const updateSlug = (title: string) => {
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    setFormData({ ...formData, title, slug });
  };

  if (initialLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-gray-900 p-6 rounded-[2rem] border shadow-sm sticky top-0 z-30">
        <div className="flex items-center gap-4">
          <Link href="/admin/blogs">
            <Button variant="ghost" size="icon" className="rounded-full h-12 w-12 border hover:bg-gray-50">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-xl font-black">Edit Article</h1>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Update Mode</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-3 px-4 h-12 bg-gray-50 dark:bg-gray-800 rounded-2xl border cursor-pointer hover:bg-gray-100 transition-colors">
            <input
              type="checkbox"
              className="w-4 h-4 rounded-full text-primary border-2"
              checked={formData.isPublished}
              onChange={(e) => setFormData({...formData, isPublished: e.target.checked})}
            />
            <span className="text-sm font-black uppercase tracking-tight">Draft / Live</span>
          </label>
          <Button 
            disabled={loading}
            onClick={handleSubmit}
            className="h-12 px-8 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest text-xs shadow-xl shadow-primary/20"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <><Save className="h-4 w-4 mr-2" /> Save Changes</>}
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border shadow-sm space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Article Title</label>
              <input
                required
                className="w-full h-12 px-5 rounded-xl border focus:border-primary focus:bg-white outline-none text-md font-bold transition-all"
                placeholder="Enter title..."
                value={formData.title}
                onChange={(e) => updateSlug(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Slug (URL Path)</label>
              <div className="relative">
                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 font-mono text-sm">/blogs/</span>
                <input
                  required
                  className="w-full h-12 pl-20 pr-6 rounded-xl border bg-gray-50/30 dark:bg-gray-800/30 focus:ring-2 focus:ring-primary outline-none font-mono text-sm"
                  value={formData.slug}
                  onChange={(e) => setFormData({...formData, slug: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between ml-1">
                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Content Body</label>
                <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-xl border text-[10px] font-black uppercase tracking-wider gap-1">
                  <button
                    type="button"
                    onClick={() => setEditorMode("visual")}
                    className={`px-3 py-1 rounded-lg transition-all font-bold ${
                      editorMode === "visual"
                        ? "bg-white dark:bg-zinc-700 shadow-sm text-zinc-950 dark:text-white"
                        : "text-gray-400 hover:text-zinc-700 dark:hover:text-zinc-300"
                    }`}
                  >
                    Visual
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditorMode("html")}
                    className={`px-3 py-1 rounded-lg transition-all font-bold ${
                      editorMode === "html"
                        ? "bg-white dark:bg-zinc-700 shadow-sm text-zinc-950 dark:text-white"
                        : "text-gray-400 hover:text-zinc-700 dark:hover:text-zinc-300"
                    }`}
                  >
                    HTML Code
                  </button>
                </div>
              </div>
              
              {editorMode === "visual" ? (
                <RichTextEditor
                  content={formData.content}
                  onChange={(html) => setFormData({ ...formData, content: html })}
                  placeholder="Start writing..."
                />
              ) : (
                <textarea
                  className="w-full min-h-[450px] p-6 rounded-2xl border bg-zinc-950 font-mono text-zinc-100 text-sm leading-relaxed outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all shadow-inner resize-y"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="<!-- Write custom HTML layout here -->"
                />
              )}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* Featured Image */}
          <div className="bg-white dark:bg-gray-900 p-6 rounded-[2rem] border shadow-sm space-y-4">
            <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
              <ImageIcon className="h-3.5 w-3.5" /> Media Asset (WebP Only)
              {imageSize && <span className="text-[10px] font-black text-primary font-mono ml-auto">({imageSize})</span>}
            </h3>
            <div className="aspect-video rounded-2xl bg-gray-50 border-2 border-dashed flex flex-col items-center justify-center overflow-hidden relative group p-4 text-center">
              {formData.featuredImage ? (
                <img src={formData.featuredImage} className="w-full h-full object-cover rounded-xl" alt="Preview" />
              ) : (
                <div className="space-y-2">
                  <Upload className="mx-auto h-8 w-8 text-gray-300" />
                  <p className="text-[10px] font-black text-gray-400 uppercase">Upload WebP Image</p>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="h-11 w-full bg-primary/5 hover:bg-primary/10 text-primary border border-primary/20 rounded-xl flex items-center justify-center gap-2 text-xs font-bold cursor-pointer transition-all">
                {uploading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <Upload size={14} />
                    <span>{formData.featuredImage ? "Replace WebP Image" : "Upload WebP Image"}</span>
                  </>
                )}
                <input
                  type="file"
                  accept="image/webp"
                  className="hidden"
                  onChange={handleImageUpload}
                  disabled={uploading}
                />
              </label>

              <input
                className="w-full h-11 px-4 rounded-xl border bg-gray-50/50 text-[10px] font-mono outline-none focus:ring-2 focus:ring-primary"
                placeholder="Featured image path will show here..."
                value={formData.featuredImage}
                readOnly
              />
            </div>
          </div>

          {/* SEO Optimization */}
          <div className="bg-white dark:bg-gray-900 p-6 rounded-[2rem] border shadow-sm space-y-6">
            <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
              <Search className="h-3.5 w-3.5" /> SEO Settings
            </h3>
            
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-500 uppercase ml-1">Meta Title</label>
              <input
                className="w-full h-10 px-4 rounded-xl border bg-gray-50/30 text-xs outline-none focus:ring-2 focus:ring-primary"
                value={formData.metaTitle}
                onChange={(e) => setFormData({...formData, metaTitle: e.target.value})}
                placeholder="Meta Title"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-500 uppercase ml-1">Meta Description</label>
              <textarea
                className="w-full h-24 px-4 py-3 rounded-xl border bg-gray-50/30 text-xs outline-none focus:ring-2 focus:ring-primary resize-none"
                value={formData.metaDescription}
                onChange={(e) => setFormData({...formData, metaDescription: e.target.value})}
                placeholder="Meta Description"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-500 uppercase ml-1">Keywords</label>
              <input
                className="w-full h-10 px-4 rounded-xl border bg-gray-50/30 text-xs outline-none focus:ring-2 focus:ring-primary"
                value={formData.keywords}
                onChange={(e) => setFormData({...formData, keywords: e.target.value})}
                placeholder="marriage, biodata, guide"
              />
            </div>
          </div>

          {/* Excerpt / Summary */}
          <div className="bg-primary p-6 rounded-[2rem] text-white space-y-4 shadow-xl shadow-primary/20">
            <h3 className="text-xs font-black uppercase tracking-widest opacity-70 flex items-center gap-2">
              <Globe className="h-3.5 w-3.5" /> Global Visibility
            </h3>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase opacity-70">Excerpt</label>
              <textarea
                className="w-full h-32 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-xs outline-none focus:bg-white/20 resize-none placeholder:text-white/30"
                placeholder="A short summary for search results..."
                value={formData.excerpt}
                onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
