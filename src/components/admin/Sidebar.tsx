"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  FileText, 
  CreditCard, 
  Rss, 
  Palette, 
  ImagePlus
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  { icon: FileText, label: "Biodatas", href: "/admin/biodatas" },
  { icon: CreditCard, label: "Transactions", href: "/admin/transactions" },
  { icon: Rss, label: "Blogs", href: "/admin/blogs" },
  { icon: Palette, label: "Templates", href: "/admin/templates" },
  { icon: ImagePlus, label: "Thumbnails Tool", href: "/admin/thumbnails" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col w-64 border-r bg-white dark:bg-gray-900">

      <nav className="flex-1 px-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive 
                  ? "bg-primary/10 text-primary" 
                  : "text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

    </aside>
  );
}
