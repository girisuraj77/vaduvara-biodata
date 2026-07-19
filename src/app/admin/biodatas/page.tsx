import { prisma } from "@/lib/prisma";
import { 
  FileText, 
  Search, 
  User, 
  Calendar,
  MoreHorizontal,
  Plus,
  Download
} from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function AdminBiodatasPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ userId?: string, search?: string }> 
}) {
  const { userId, search } = await searchParams;

  const biodatas = await prisma.biodata.findMany({
    where: {
      AND: [
        userId ? { userId } : {},
        search ? {
          title: { contains: search, mode: 'insensitive' }
        } : {}
      ]
    },
    include: {
      user: {
        select: { name: true, email: true }
      },
      order: {
        select: { id: true, razorpayPaymentId: true, razorpayOrderId: true }
      }
    },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Biodata Management</h1>
          <p className="text-gray-500">
            {userId ? "Filtering biodatas for specific user" : "View and manage all user biodatas."}
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 border rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 dark:bg-gray-800/50 border-b text-gray-500 dark:text-gray-400 font-bold uppercase text-[10px] tracking-widest">
              <tr>
                <th className="px-6 py-4">Biodata</th>
                <th className="px-6 py-4">Owner</th>
                <th className="px-6 py-4">Contact Details</th>
                <th className="px-6 py-4">Order Reference</th>
                <th className="px-6 py-4">Created</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {biodatas.length === 0 ? (
                <tr>
                  <td className="px-6 py-12 text-center text-gray-500" colSpan={6}>
                    <div className="flex flex-col items-center gap-2">
                      <FileText className="h-10 w-10 text-gray-200" />
                      <p>No biodatas found.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                biodatas.map((bio: any) => (
                  <tr key={bio.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-12 bg-gray-100 rounded-lg flex items-center justify-center border shrink-0">
                          <FileText className="h-5 w-5 text-gray-400" />
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 dark:text-white leading-tight">{bio.title || "Untitled"}</p>
                          <p className="text-[10px] text-gray-400 font-mono mt-0.5">{bio.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-semibold text-gray-700 dark:text-gray-300">{bio.user?.name || "Guest Checkout"}</span>
                        <span className="text-[10px] text-gray-400 font-mono">{bio.userId ? "Registered Account" : "Direct Checkout"}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-0.5">
                        <span className="font-semibold text-gray-700 dark:text-gray-300 text-xs truncate max-w-[180px]">{bio.email || bio.user?.email || "No Email"}</span>
                        <span className="text-[10px] text-gray-400 font-bold">{bio.mobile || "No Mobile"}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-0.5">
                        {bio.order ? (
                          <>
                            <span className="font-semibold text-rose-600 dark:text-rose-400 text-[11px] font-mono whitespace-nowrap">
                              {bio.order.razorpayPaymentId || bio.order.razorpayOrderId || bio.orderId}
                            </span>
                            <span className="text-[9px] bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 px-1.5 py-0.5 rounded font-black uppercase tracking-wider self-start mt-0.5">
                              Paid ₹49
                            </span>
                          </>
                        ) : (
                          <span className="text-[10px] bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 px-1.5 py-0.5 rounded font-black uppercase tracking-wider self-start">
                            Free Download
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-xs whitespace-nowrap">
                        <Calendar className="h-3.5 w-3.5" />
                        {format(new Date(bio.createdAt), "MMM d, yyyy")}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link 
                          href={`/preview?bioId=${bio.id}&admin=true`}
                          target="_blank"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 hover:bg-primary/20 text-primary hover:text-primary rounded-lg text-xs font-bold transition-all"
                        >
                          <Download size={14} />
                          <span>Download</span>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
