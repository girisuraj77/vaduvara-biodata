"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  User,
  CreditCard,
  LogOut,
  Grid,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const menuItems = [
  { id: "biodatas", label: "Biodatas", icon: Grid, href: "/dashboard/biodatas" },
  { id: "plans", label: "Plans", icon: CreditCard, href: "/dashboard/plans" },
  { id: "profile", label: "Profile", icon: User, href: "/dashboard/profile" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    } else if (status === "authenticated") {
      setIsLoading(false);
    }
  }, [status, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fcfcfc] flex flex-col relative">
      <div className="container mx-auto px-4 md:px-8 flex-1">
        <div className="flex flex-col lg:flex-row gap-8 py-6 lg:py-12">

          {/* Dashboard Menus (Desktop Sidebar) */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-28 flex flex-col h-[calc(100vh-160px)]">
              <nav className="flex flex-col gap-1 flex-1">
                {menuItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-black transition-all",
                        isActive
                          ? "bg-primary text-white shadow-lg shadow-primary/20"
                          : "text-zinc-500 hover:bg-primary/5 hover:text-primary"
                      )}
                    >
                      <item.icon size={18} />
                      {item.label}
                    </Link>
                  );
                })}
              </nav>

              <div className="pt-8 border-t border-zinc-100 space-y-4">
                <div className="bg-zinc-50 rounded-2xl p-4 flex items-center gap-3 border border-zinc-100 overflow-hidden">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white text-xs font-black shrink-0">
                    {session?.user?.image ? (
                      <img src={session.user.image} alt="" className="w-full h-full rounded-full object-cover" />
                    ) : (
                      session?.user?.name?.[0].toUpperCase() || "U"
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-black text-zinc-900 truncate">{session?.user?.name}</p>
                    <p className="text-[9px] font-bold text-zinc-400 truncate">{session?.user?.email}</p>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  onClick={() => signOut()}
                  className="w-full justify-start gap-3 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-xl font-black text-xs px-4 h-11"
                >
                  <LogOut size={16} />
                  Sign Out
                </Button>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 min-w-0 pb-24 lg:pb-0">
            {children}
          </main>

        </div>
      </div>

      {/* Dashboard Menus (Mobile Bottom Bar) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-[999] bg-white border-t border-zinc-100 pb-safe">
        <nav className="flex items-center justify-around p-3">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.id}
                href={item.href}
                className={cn(
                  "flex flex-col items-center gap-1 min-w-[64px] transition-colors",
                  isActive ? "text-primary" : "text-zinc-400"
                )}
              >
                <div className={cn(
                  "p-2 rounded-xl",
                  isActive ? "bg-primary/10" : "bg-transparent"
                )}>
                  <item.icon size={22} strokeWidth={isActive ? 3 : 2} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-tighter">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
