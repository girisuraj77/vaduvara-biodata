"use client";

import { useSession, signOut } from "next-auth/react";
import {
  User,
  LogOut,
  Menu
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="h-16 border-b bg-white dark:bg-gray-900 sticky top-0 z-20">
      <div className="container mx-auto h-full px-4 md:px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="w-5 h-5" />
          </Button>
        </div>


      </div>
    </header>
  );
}
