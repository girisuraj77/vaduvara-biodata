import { ReactNode } from "react";
import Sidebar from "@/components/admin/Sidebar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession(authOptions);

  // Double check admin role in layout too
  if (!session || (session.user as any).role !== "ADMIN") {
    redirect("/");
  }

  return (
    <div className="h-screen bg-gray-100/50 dark:bg-gray-950 flex flex-col p-0 md:p-4 lg:p-6">
      <div className="flex-1 flex flex-col max-w-[1280px] mx-auto w-full bg-white dark:bg-gray-900 shadow-2xl shadow-black/5 overflow-hidden md:rounded-[2.5rem] border border-gray-200/50 dark:border-gray-800/50">
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <div className="flex-1 flex flex-col overflow-hidden">
            <main className="flex-1 overflow-y-auto scrollbar-hide">
              <div className="p-4 md:p-8 lg:p-10">
                <div className="max-w-7xl mx-auto w-full">
                  {children}
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
