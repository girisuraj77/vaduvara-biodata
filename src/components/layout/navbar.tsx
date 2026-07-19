"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import {
  Mail,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  ChevronDown,
  User,
  ArrowRight,
  Menu,
  X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { useState } from "react";

import { useSession, signOut } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { LogOut, LayoutDashboard } from "lucide-react";

export function Navbar() {
  const { data: session, status } = useSession();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  return (
    <>
      {/* Top Bar - Solid Red */}
      <div className="w-full bg-primary py-2 text-white">
        <div className="container mx-auto px-4 md:px-9 flex items-center justify-between">
          {/* Left: Contact Info */}
          <div className="flex items-center gap-6 text-[12px] font-bold tracking-wider">
            <div className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer">
              <Mail size={16} className="text-white" strokeWidth={2.5} />
              <span>info@vadhuvarbiodata.com</span>
            </div>
          </div>

          {/* Right: Social Medias */}
          <div className="flex items-center gap-7">
            <motion.div whileHover={{ scale: 1.2, rotate: 8 }} transition={{ type: "spring", stiffness: 400, damping: 10 }} className="cursor-pointer">
              <Link href="https://facebook.com" target="_blank">
                <Facebook size={18} className="text-white" strokeWidth={2.5} />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.2, rotate: -8 }} transition={{ type: "spring", stiffness: 400, damping: 10 }} className="cursor-pointer">
              <Link href="https://twitter.com" target="_blank">
                <Twitter size={18} className="text-white" strokeWidth={2.5} />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.2, rotate: 8 }} transition={{ type: "spring", stiffness: 400, damping: 10 }} className="cursor-pointer">
              <Link href="https://linkedin.com" target="_blank">
                <Linkedin size={18} className="text-white" strokeWidth={2.5} />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.2, rotate: -8 }} transition={{ type: "spring", stiffness: 400, damping: 10 }} className="cursor-pointer">
              <Link href="https://instagram.com" target="_blank">
                <Instagram size={18} className="text-white" strokeWidth={2.5} />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Navbar - Sticky White */}
      <header className="sticky top-0 z-[100] w-full bg-white border-b border-zinc-100 shadow-sm transition-all">
        <div className="container mx-auto px-4 md:px-8 flex h-20 items-center justify-between">
          <Logo />

          <nav className="hidden xl:flex gap-8 text-[16px] font-bold tracking-tight text-zinc-600 items-center h-full">
            <Link href="/" className={cn("hover:text-primary transition-all duration-300 cursor-pointer relative py-2 group", isActive("/") && "text-primary")}>
              Home
              <span className={cn("absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full", isActive("/") && "w-full")} />
            </Link>

            <Link href="/templates" className={cn("hover:text-primary transition-all duration-300 cursor-pointer relative py-2 group", isActive("/templates") && "text-primary")}>
              Templates
              <span className={cn("absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full", isActive("/templates") && "w-full")} />
            </Link>

            {/* Formats Dropdown */}
            <div className="relative group/nav h-full flex items-center">
              <div className="flex items-center gap-1.5 hover:text-primary transition-colors cursor-pointer py-2">
                Formats <ChevronDown size={14} className="opacity-50 group-hover/nav:rotate-180 transition-transform duration-300" />
              </div>
              <div className="absolute top-[calc(100%-10px)] left-0 w-72 bg-white/95 backdrop-blur-md rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-zinc-100 py-3 opacity-0 invisible group-hover/nav:opacity-100 group-hover/nav:visible transition-all duration-300 transform translate-y-4 group-hover/nav:translate-y-0 z-[200]">
                <div className="px-4 py-2 mb-1 border-b border-zinc-50">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Design Options</p>
                </div>
                {[
                  { name: "PDF Format", slug: "pdf-format" },
                  { name: "For Girls", slug: "marriage-biodata-for-girls" },
                  { name: "For Boys", slug: "marriage-biodata-for-boys" },
                ].map((item) => (
                  <Link
                    key={item.slug}
                    href={`/formats/${item.slug}`}
                    className="flex items-center justify-between px-4 py-2.5 hover:bg-primary/5 hover:text-primary transition-all duration-200 text-sm group/item"
                  >
                    <span>{item.name}</span>
                    <ArrowRight size={14} className="opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-200" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Community Dropdown */}
            <div className="relative group/nav h-full flex items-center">
              <div className="flex items-center gap-1.5 hover:text-primary transition-colors cursor-pointer py-2">
                Community <ChevronDown size={14} className="opacity-50 group-hover/nav:rotate-180 transition-transform duration-300" />
              </div>
              <div className="absolute top-[calc(100%-10px)] left-0 w-72 bg-white/95 backdrop-blur-md rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-zinc-100 py-3 opacity-0 invisible group-hover/nav:opacity-100 group-hover/nav:visible transition-all duration-300 transform translate-y-4 group-hover/nav:translate-y-0 z-[200]">
                <div className="px-4 py-2 mb-1 border-b border-zinc-50">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Regional & Religious</p>
                </div>
                {[
                  { name: "Hindu Marriage Biodata", slug: "hindu-marriage-biodata" },
                  { name: "Muslim Marriage Biodata", slug: "muslim-marriage-biodata" },
                  { name: "Marathi Biodata Format", slug: "marathi-biodata-format" },
                  { name: "Gujarati Biodata Format", slug: "gujarati-matrimonial-profile" },
                  { name: "Christian Wedding Format", slug: "christian-wedding-profile" },
                  { name: "Sikh Marriage Biodata", slug: "sikh-marriage-biodata" },
                ].map((item) => (
                  <Link
                    key={item.slug}
                    href={`/community/${item.slug}`}
                    className="flex items-center justify-between px-4 py-2.5 hover:bg-primary/5 hover:text-primary transition-all duration-200 text-sm group/item"
                  >
                    <span>{item.name}</span>
                    <ArrowRight size={14} className="opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-200" />
                  </Link>
                ))}
              </div>
            </div>

            <Link href="/blogs" className={cn("hover:text-primary transition-all duration-300 cursor-pointer relative py-2 group", isActive("/blogs") && "text-primary")}>
              Blogs
              <span className={cn("absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full", isActive("/blogs") && "w-full")} />
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="cursor-pointer hidden sm:block"
            >
              <Link href="/#create-biodata">
                <Button size="lg" className="rounded-md px-6 py-3.5 font-bold bg-primary hover:bg-primary/95 text-white uppercase shadow-md transition-shadow hover:shadow-lg cursor-pointer h-auto">
                  Create Biodata
                </Button>
              </Link>
            </motion.div>

            <div className="flex items-center gap-1 md:gap-4 relative justify-end">
              {status === "loading" ? (
                /* Loading Placeholder - prevents jump */
                <div className="h-10 w-10 bg-zinc-50 animate-pulse rounded-full" />
              ) : (status === "authenticated" && (session?.user as any)?.role === "ADMIN") ? (
                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-2 px-3 py-2 bg-zinc-50 hover:bg-zinc-100 rounded-full transition-all border border-zinc-200 cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm overflow-hidden border border-zinc-200">
                      {session.user?.image ? (
                        <img src={session.user.image} alt={session.user.name || "Admin"} className="w-full h-full object-cover" />
                      ) : session.user?.name ? (
                        <span>{session.user.name[0].toUpperCase()}</span>
                      ) : (
                        <User size={16} />
                      )}
                    </div>
                    <span className="hidden md:inline text-sm font-bold text-zinc-700">
                      Admin
                    </span>
                    <ChevronDown size={14} className={cn("text-zinc-400 transition-transform", isUserMenuOpen && "rotate-180")} />
                  </motion.button>

                  {/* Dropdown Menu */}
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-zinc-100 py-2 z-[200] overflow-hidden"
                    >
                      <div className="px-4 py-2 border-b border-zinc-50 mb-1">
                        <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Admin Panel</p>
                        <p className="text-sm font-bold text-zinc-700 truncate">{session.user?.email}</p>
                      </div>

                      <Link
                        href="/admin"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-zinc-600 hover:bg-zinc-50 hover:text-primary transition-all"
                      >
                        <LayoutDashboard size={18} />
                        Admin Panel
                      </Link>

                      <div className="h-px bg-zinc-50 my-1" />

                      <button
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          signOut({ callbackUrl: "/" });
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-zinc-500 hover:text-primary hover:bg-primary/5 transition-all"
                      >
                        <LogOut size={18} />
                        Sign Out
                      </button>
                    </motion.div>
                  )}
                </div>
              ) : null}

              {/* Mobile Hamburger Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="flex xl:hidden w-10 h-10 items-center justify-center rounded-xl bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 text-zinc-700 transition-all cursor-pointer shrink-0 active:scale-95 ml-1"
                aria-label="Toggle Menu"
              >
                {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>


        </div>

        {/* Mobile menu panel using Framer Motion */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="xl:hidden w-full bg-white border-b border-zinc-100 shadow-md overflow-hidden absolute top-20 left-0 right-0 z-[150] px-6 py-6 space-y-5"
            >
              {/* Home & templates */}
              <div className="flex flex-col gap-4 text-[15px] font-bold text-zinc-700">
                <Link
                  href="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn("hover:text-primary transition-colors cursor-pointer py-1.5 border-b border-zinc-50", isActive("/") && "text-primary")}
                >
                  Home
                </Link>
                <Link
                  href="/templates"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn("hover:text-primary transition-colors cursor-pointer py-1.5 border-b border-zinc-50", isActive("/templates") && "text-primary")}
                >
                  Templates
                </Link>
                <Link
                  href="/blogs"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn("hover:text-primary transition-colors cursor-pointer py-1.5 border-b border-zinc-50", isActive("/blogs") && "text-primary")}
                >
                  Blogs
                </Link>
              </div>

              {/* Formats Grid */}
              <div className="space-y-2">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Formats</p>
                <div className="grid grid-cols-2 gap-2 text-xs font-bold text-zinc-600">
                  {[
                    { name: "PDF Format", slug: "pdf-format" },
                    { name: "For Girls", slug: "marriage-biodata-for-girls" },
                    { name: "For Boys", slug: "marriage-biodata-for-boys" },
                  ].map((item) => (
                    <Link
                      key={item.slug}
                      href={`/formats/${item.slug}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="px-3 py-2 bg-zinc-50 hover:bg-primary/5 hover:text-primary rounded-xl border border-zinc-100 transition-colors truncate"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Communities Grid */}
              <div className="space-y-2">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Community Designs</p>
                <div className="grid grid-cols-2 gap-2 text-xs font-bold text-zinc-600">
                  {[
                    { name: "Hindu", slug: "hindu-marriage-biodata" },
                    { name: "Muslim", slug: "muslim-marriage-biodata" },
                    { name: "Marathi", slug: "marathi-biodata-format" },
                    { name: "Gujarati", slug: "gujarati-matrimonial-profile" },
                    { name: "Christian", slug: "christian-wedding-profile" },
                    { name: "Sikh", slug: "sikh-marriage-biodata" },
                  ].map((item) => (
                    <Link
                      key={item.slug}
                      href={`/community/${item.slug}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="px-3 py-2 bg-zinc-50 hover:bg-primary/5 hover:text-primary rounded-xl border border-zinc-100 transition-colors truncate"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Mobile CTA */}
              <div className="pt-2 flex flex-col gap-2">

                <Link href="/#create-biodata" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full rounded-xl py-6 font-bold bg-primary hover:bg-primary/95 text-white uppercase shadow-md cursor-pointer text-sm">
                    Create Biodata Now
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>


    </>
  );
}
