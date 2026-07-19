"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  Image as ImageIcon,
  Search,
  Filter,
  X,
  Layers,
  ArrowUpDown,
  Eye,
  AlertCircle,
  Loader2,
  Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<any>(null);
  const [deletingTemplate, setDeletingTemplate] = useState<any>(null);

  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("ALL");

  const [formData, setFormData] = useState({
    templateId: "",
    name: "",
    image: "",
    category: "Traditional",
    gender: "BOTH",
    community: "Hindu",
    isActive: true,
    isViewHomePage: true,
    isFree: false,
    order: 0
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/templates");
      if (!res.ok) throw new Error("Failed to fetch data");
      const tData = await res.json();
      setTemplates(tData);
    } catch (error) {
      toast.error("Failed to load data");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredTemplates = useMemo(() => {
    return templates.filter(t => {
      const matchesSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.templateId.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === "ALL" || t.category === categoryFilter;
      return matchesSearch && matchesCategory;
    }).sort((a, b) => a.order - b.order);
  }, [templates, searchTerm, categoryFilter]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editingTemplate ? "PUT" : "POST";
    const url = editingTemplate ? `/api/admin/templates/${editingTemplate.id}` : "/api/admin/templates";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        toast.success(editingTemplate ? "Template updated" : "Template created");
        setIsModalOpen(false);
        fetchData();
      } else {
        throw new Error("Save failed");
      }
    } catch (error) {
      toast.error("Error saving template");
    }
  };

  const handleDelete = async () => {
    if (!deletingTemplate) return;
    try {
      const res = await fetch(`/api/admin/templates/${deletingTemplate.id}`, {
        method: "DELETE"
      });
      if (res.ok) {
        toast.success("Template deleted");
        setIsDeleteModalOpen(false);
        fetchData();
      } else {
        throw new Error("Delete failed");
      }
    } catch (error) {
      toast.error("Error deleting template");
    }
  };

  const openModal = (template: any = null) => {
    if (template) {
      setEditingTemplate(template);
      setFormData({
        templateId: template.templateId,
        name: template.name,
        image: template.image,
        category: template.category,
        gender: template.gender || "BOTH",
        community: template.community || "Hindu",
        isActive: template.isActive,
        isViewHomePage: template.isViewHomePage ?? true,
        isFree: template.isFree ?? false,
        order: template.order
      });
    } else {
      setEditingTemplate(null);
      setFormData({
        templateId: "",
        name: "",
        image: "",
        category: "Traditional",
        gender: "BOTH",
        community: "Hindu",
        isActive: true,
        isViewHomePage: true,
        isFree: false,
        order: templates.length > 0 ? Math.max(...templates.map(t => t.order)) + 1 : 1
      });
    }
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-gray-900 to-gray-500 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
            Design Templates
          </h1>
          <p className="text-gray-500 text-sm">Manage your premium biodata designs and assignments.</p>
        </div>
        <Button
          onClick={() => openModal()}
          className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 transition-all active:scale-95"
        >
          <Plus className="h-4 w-4 mr-2" /> Add New Template
        </Button>
      </div>

      {/* Control Bar */}
      <div className="flex flex-col lg:flex-row gap-4 p-4 bg-white/50 dark:bg-gray-900/50 backdrop-blur-md border rounded-2xl shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or ID..."
            className="w-full pl-10 pr-4 h-11 bg-transparent border-none focus:ring-0 text-sm outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="h-10 w-px bg-gray-200 dark:bg-gray-800 hidden lg:block" />
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 px-3 h-11 bg-gray-50 dark:bg-gray-800/50 rounded-xl border">
            <Filter className="h-3.5 w-3.5 text-gray-400" />
            <select
              className="bg-transparent border-none text-xs font-bold focus:ring-0 outline-none pr-6 cursor-pointer"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="ALL">All Categories</option>
              <option value="Traditional">Traditional</option>
              <option value="Modern">Modern</option>
              <option value="Premium">Premium</option>
              <option value="Simple">Simple</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {loading ? (
          Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="aspect-[3/4] bg-gray-100 dark:bg-gray-800/50 animate-pulse rounded-3xl border shadow-sm" />
          ))
        ) : filteredTemplates.length === 0 ? (
          <div className="col-span-full py-32 text-center bg-gray-50/50 dark:bg-gray-900/50 border border-dashed rounded-3xl flex flex-col items-center justify-center gap-3">
            <ImageIcon className="h-12 w-12 text-gray-300" />
            <p className="text-gray-400 font-medium italic">No templates match your criteria.</p>
          </div>
        ) : (
          filteredTemplates.map((template: any) => (
            <div
              key={template.id}
              className="group relative bg-white dark:bg-gray-900 border rounded-[2rem] overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 hover:-translate-y-1"
            >
              <div className="aspect-[3/4] relative bg-zinc-50 dark:bg-gray-800 p-[15px]">
                <div className="relative w-full h-full overflow-hidden rounded-[1.25rem] border border-zinc-200/50 bg-white">
                  {template.image ? (
                    <img
                      src={template.image}
                      className="w-full h-full object-cover"
                      alt={template.name}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                      <ImageIcon className="h-16 w-16" />
                    </div>
                  )}

                  {template.isFree && (
                    <span className="absolute top-3 right-3 bg-emerald-500 text-white font-black text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-lg shadow-md z-10">
                      Free
                    </span>
                  )}

                  {/* Overlays */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-3 backdrop-blur-[2px]">
                    <Button
                      variant="secondary"
                      size="sm"
                      className="bg-white/90 hover:bg-white text-black font-bold h-10 px-5 rounded-full"
                      onClick={() => openModal(template)}
                    >
                      <Edit2 className="h-4 w-4 mr-2" /> Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="h-10 w-10 rounded-full p-0 shadow-lg"
                      onClick={() => {
                        setDeletingTemplate(template);
                        setIsDeleteModalOpen(true);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>


              </div>

              <div className="p-6">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className="font-extrabold text-base truncate leading-tight group-hover:text-primary transition-colors">
                      {template.name}
                    </h3>
                    <p className="text-[10px] text-gray-400 font-mono font-medium tracking-tighter truncate uppercase mt-0.5">
                      {template.templateId}
                    </p>
                  </div>
                  <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-800">
                    <Layers className="h-3.5 w-3.5 text-primary" />
                  </div>
                </div>

                <div className="mt-4 flex flex-col gap-2 pt-2 border-t border-gray-100 dark:border-gray-800">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                      <span className="text-[10px] font-black text-gray-500 uppercase tracking-wider">
                        {(template.community || "Hindu").split(',').join(', ')}
                      </span>
                    </div>
                    <span className="text-[9px] font-bold text-gray-300 uppercase px-2 py-0.5 border rounded-md">
                      {template.category}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-gray-400">
                    <span>Gender: <strong className="text-gray-600 dark:text-gray-300">{template.gender === 'BOTH' ? 'Male & Female' : template.gender === 'BOY' ? 'Male Only' : 'Female Only'}</strong></span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Main Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-in fade-in zoom-in duration-300">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="relative bg-white dark:bg-gray-900 rounded-[2.5rem] w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col border border-white/10">
            <div className="p-8 border-b flex items-center justify-between bg-white dark:bg-gray-900 z-10">
              <div className="space-y-1">
                <h2 className="text-2xl font-black">{editingTemplate ? "Refine Design" : "New Creation"}</h2>
                <p className="text-xs text-gray-400">Configure your biodata template settings.</p>
              </div>
              <Button variant="ghost" size="icon" className="rounded-full h-10 w-10" onClick={() => setIsModalOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-hide">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase text-gray-400 tracking-widest ml-1">Friendly Name</label>
                  <input
                    required
                    className="w-full h-12 px-4 rounded-2xl border bg-gray-50/50 dark:bg-gray-800/50 focus:ring-2 focus:ring-primary outline-none transition-all"
                    placeholder="e.g., Maroon Traditional"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase text-gray-400 tracking-widest ml-1">System ID</label>
                  <input
                    required
                    className="w-full h-12 px-4 rounded-2xl border bg-gray-50/50 dark:bg-gray-800/50 focus:ring-2 focus:ring-primary outline-none transition-all font-mono"
                    placeholder="e.g., trad_maroon"
                    value={formData.templateId}
                    onChange={(e) => setFormData({ ...formData, templateId: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase text-gray-400 tracking-widest ml-1">Category</label>
                  <div className="relative">
                    <select
                      className="w-full h-12 px-4 rounded-2xl border bg-gray-50/50 dark:bg-gray-800/50 focus:ring-2 focus:ring-primary outline-none appearance-none cursor-pointer"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    >
                      <option value="Traditional">Traditional</option>
                      <option value="Modern">Modern</option>
                      <option value="Premium">Premium</option>
                      <option value="Simple">Simple</option>
                    </select>
                    <ArrowUpDown className="absolute right-4 top-1/2 -translate-y-1/2 h-3 w-3 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black uppercase text-gray-400 tracking-widest ml-1">Gender Suitability</label>
                  <div className="relative">
                    <select
                      className="w-full h-12 px-4 rounded-2xl border bg-gray-50/50 dark:bg-gray-800/50 focus:ring-2 focus:ring-primary outline-none appearance-none cursor-pointer"
                      value={formData.gender}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    >
                      <option value="BOTH">Both (Male & Female)</option>
                      <option value="BOY">Boy (Male Only)</option>
                      <option value="GIRL">Girl (Female Only)</option>
                    </select>
                    <ArrowUpDown className="absolute right-4 top-1/2 -translate-y-1/2 h-3 w-3 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-1 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase text-gray-400 tracking-widest ml-1">Target Communities</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                    {["Hindu", "Muslim", "Christian", "Sikh"].map((com) => {
                      // Check if this community is currently selected
                      const selectedList = (formData.community || "Hindu").split(',').map(c => c.trim());
                      const isSelected = selectedList.includes(com);

                      const toggleSelection = () => {
                        let newList: string[];
                        if (isSelected) {
                          newList = selectedList.filter(c => c !== com);
                        } else {
                          newList = [...selectedList.filter(c => c !== ""), com];
                        }
                        if (newList.length === 0) {
                          newList = ["Hindu"];
                        }
                        setFormData({ ...formData, community: newList.join(',') });
                      };

                      return (
                        <button
                          key={com}
                          type="button"
                          onClick={toggleSelection}
                          className={cn(
                            "h-12 px-4 rounded-xl border flex items-center justify-between font-bold text-xs tracking-tight transition-all active:scale-95 cursor-pointer",
                            isSelected
                              ? "bg-primary/5 border-primary text-primary dark:bg-primary/10 shadow-sm"
                              : "bg-white border-zinc-200 text-zinc-600 hover:bg-zinc-50 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-300"
                          )}
                        >
                          <span>{com}</span>
                          {isSelected && <Check className="h-4 w-4 stroke-[3px]" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="space-y-6 p-6 bg-gray-50/50 dark:bg-gray-800/30 rounded-[2rem] border border-dashed">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-black uppercase text-gray-400 tracking-widest ml-1">Mockup Image URL</label>
                    {formData.image && <Eye className="h-3.5 w-3.5 text-primary" />}
                  </div>
                  <input
                    required
                    className="w-full h-12 px-4 rounded-2xl border bg-white dark:bg-gray-900 focus:ring-2 focus:ring-primary outline-none text-xs"
                    placeholder="https://your-storage.com/image.jpg"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 p-6 bg-zinc-50 dark:bg-gray-800/30 rounded-[2rem] border border-zinc-200/60 items-center">
                {/* Sequence Order Input */}
                <div className="space-y-1.5 text-left">
                  <label className="text-[10px] font-black uppercase text-zinc-400 tracking-widest ml-1">Sequence Order</label>
                  <input
                    type="number"
                    className="w-full md:w-32 h-12 px-4 rounded-xl border bg-white dark:bg-gray-950 outline-none text-center font-bold"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                  />
                </div>

                {/* Toggles Grid */}
                <div className="flex flex-col sm:flex-row flex-wrap gap-6 items-start sm:items-center">
                  {/* Free vs Paid Toggle */}
                  <label className="flex items-center gap-3 cursor-pointer group select-none">
                    <div className={cn(
                      "w-12 h-6 rounded-full transition-all relative border-2 shrink-0",
                      formData.isFree ? "bg-emerald-500 border-emerald-500" : "bg-zinc-200 dark:bg-zinc-800 border-transparent"
                    )}>
                      <div className={cn(
                        "absolute top-0.5 w-4.5 h-4.5 rounded-full bg-white transition-all shadow-sm",
                        formData.isFree ? "left-[25px]" : "left-0.5"
                      )} />
                      <input
                        type="checkbox"
                        className="hidden"
                        checked={formData.isFree}
                        onChange={(e) => setFormData({ ...formData, isFree: e.target.checked })}
                      />
                    </div>
                    <span className="text-xs font-black uppercase text-zinc-500 group-hover:text-emerald-500 transition-colors">
                      {formData.isFree ? "Free Design" : "Paid Design"}
                    </span>
                  </label>

                  {/* Active Toggle */}
                  <label className="flex items-center gap-3 cursor-pointer group select-none">
                    <div className={cn(
                      "w-12 h-6 rounded-full transition-all relative border-2 shrink-0",
                      formData.isActive ? "bg-primary border-primary" : "bg-zinc-200 dark:bg-zinc-800 border-transparent"
                    )}>
                      <div className={cn(
                        "absolute top-0.5 w-4.5 h-4.5 rounded-full bg-white transition-all shadow-sm",
                        formData.isActive ? "left-[25px]" : "left-0.5"
                      )} />
                      <input
                        type="checkbox"
                        className="hidden"
                        checked={formData.isActive}
                        onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                      />
                    </div>
                    <span className="text-xs font-black uppercase text-zinc-500 group-hover:text-primary transition-colors">
                      {formData.isActive ? "Live in Store" : "Keep in Draft"}
                    </span>
                  </label>

                  {/* Home View Toggle */}
                  <label className="flex items-center gap-3 cursor-pointer group select-none">
                    <div className={cn(
                      "w-12 h-6 rounded-full transition-all relative border-2 shrink-0",
                      formData.isViewHomePage ? "bg-amber-400 border-amber-400" : "bg-zinc-200 dark:bg-zinc-800 border-transparent"
                    )}>
                      <div className={cn(
                        "absolute top-0.5 w-4.5 h-4.5 rounded-full bg-white transition-all shadow-sm",
                        formData.isViewHomePage ? "left-[25px]" : "left-0.5"
                      )} />
                      <input
                        type="checkbox"
                        className="hidden"
                        checked={formData.isViewHomePage}
                        onChange={(e) => setFormData({ ...formData, isViewHomePage: e.target.checked })}
                      />
                    </div>
                    <span className="text-xs font-black uppercase text-zinc-500 group-hover:text-amber-500 transition-colors">
                      {formData.isViewHomePage ? "Show on Home" : "Hidden from Home"}
                    </span>
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-6">
                <Button
                  type="button"
                  variant="ghost"
                  className="rounded-full px-8 h-12"
                  onClick={() => setIsModalOpen(false)}
                >
                  Discard
                </Button>
                <Button type="submit" className="bg-primary text-white hover:bg-primary/90 px-12 h-12 rounded-full shadow-xl shadow-primary/20">
                  {editingTemplate ? "Save Changes" : "Publish Design"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 animate-in fade-in zoom-in duration-300">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setIsDeleteModalOpen(false)} />
          <div className="relative bg-white dark:bg-gray-900 rounded-[2.5rem] w-full max-w-sm p-10 text-center shadow-2xl border border-red-500/10">
            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="h-10 w-10 text-red-500" />
            </div>
            <h2 className="text-2xl font-black mb-2">Delete Design?</h2>
            <p className="text-sm text-gray-500 mb-8">
              Are you sure you want to remove <span className="font-bold text-gray-900 dark:text-white">"{deletingTemplate?.name}"</span>? This action is permanent.
            </p>
            <div className="flex flex-col gap-3">
              <Button
                variant="destructive"
                className="w-full h-12 rounded-full font-bold shadow-lg shadow-red-500/20"
                onClick={handleDelete}
              >
                Delete Permanently
              </Button>
              <Button
                variant="ghost"
                className="w-full h-12 rounded-full font-bold"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                Go Back
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

}
