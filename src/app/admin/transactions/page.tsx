"use client";

import { useState, useEffect, useCallback } from "react";
import { 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  MoreHorizontal,
  Download,
  CheckCircle2,
  Clock,
  XCircle,
  CreditCard,
  User as UserIcon,
  Calendar,
  Hash,
  ExternalLink,
  ShieldCheck
} from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Modal } from "@/components/ui/modal";

const statusColors = {
  SUCCESS: "bg-green-100 text-green-700 border-green-200",
  PENDING: "bg-yellow-100 text-yellow-700 border-yellow-200",
  FAILED: "bg-red-100 text-red-700 border-red-200",
};

const statusIcons = {
  SUCCESS: CheckCircle2,
  PENDING: Clock,
  FAILED: XCircle,
};

export default function TransactionsPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const limit = 10;

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/transactions?page=${page}&limit=${limit}&search=${search}&status=${status}`);
      const data = await res.json();
      setOrders(data.orders);
      setTotalPages(data.pagination.pages);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setLoading(false);
    }
  }, [page, search, status]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const openDetails = (order: any) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Transactions</h1>
          <p className="text-gray-500 text-sm">Monitor all payments and order statuses.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="search"
              placeholder="Search orders..."
              className="w-full pl-9 h-10 rounded-md border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </div>
          <select
            className="h-10 rounded-md border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary font-bold"
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setPage(1);
            }}
          >
            <option value="ALL">All Status</option>
            <option value="SUCCESS">Success</option>
            <option value="PENDING">Pending</option>
            <option value="FAILED">Failed</option>
          </select>
          <Button variant="outline" size="icon" className="rounded-md">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 border rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 dark:bg-gray-800/50 border-b text-gray-400 font-bold uppercase text-[10px] tracking-widest">
              <tr>
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Package</th>
                <th className="px-6 py-4 text-center">Amount</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-6 py-4" colSpan={7}>
                      <div className="h-10 bg-gray-100 dark:bg-gray-800 rounded w-full" />
                    </td>
                  </tr>
                ))
              ) : orders.length === 0 ? (
                <tr>
                  <td className="px-6 py-8 text-center text-gray-500" colSpan={7}>
                    No transactions found.
                  </td>
                </tr>
              ) : (
                orders.map((order: any) => {
                  const Icon = statusIcons[order.status as keyof typeof statusIcons] || Clock;
                  return (
                    <tr key={order.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors group">
                      <td className="px-6 py-4">
                        <p className="font-mono text-xs font-bold text-gray-400 uppercase tracking-tighter">
                          {order.razorpayOrderId?.split('_')[1] || order.id.slice(-8)}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-bold text-gray-900 dark:text-white leading-tight">{order.user?.name || "Guest Checkout"}</p>
                        <p className="text-[10px] text-gray-400 font-medium">{order.user?.email || order.email || order.mobile || "N/A"}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded text-[10px] font-black uppercase">
                          {order.packageId === "word_download" ? "Word Format" : "Premium Format"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center font-black text-gray-900 dark:text-white">₹{order.amount}</td>
                      <td className="px-6 py-4">
                        <span className={cn(
                          "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border",
                          statusColors[order.status as keyof typeof statusColors]
                        )}>
                          <Icon className="w-3 h-3" />
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-500 text-xs font-medium">
                        {format(new Date(order.createdAt), "MMM d, h:mm a")}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 px-4 font-black uppercase text-[10px] tracking-widest text-primary hover:bg-primary/5 rounded-full"
                          onClick={() => openDetails(order)}
                        >
                          View Transaction
                        </Button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 border-t flex items-center justify-between bg-gray-50/50 dark:bg-gray-800/50">
          <p className="text-xs text-gray-400 font-medium">
            Showing <span className="text-gray-900 dark:text-white font-bold">{orders.length}</span> of {totalPages * limit} orders
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="rounded-full px-4 h-8 text-[10px] font-black uppercase tracking-widest"
              disabled={page === 1}
              onClick={() => setPage(p => p - 1)}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="rounded-full px-4 h-8 text-[10px] font-black uppercase tracking-widest"
              disabled={page === totalPages}
              onClick={() => setPage(p => p + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      </div>

      {/* Transaction Details Modal */}
      {selectedOrder && (
        <Modal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)}
          title="Transaction Insights"
          className="max-w-md"
        >
          <div className="p-8 space-y-8 animate-in slide-in-from-bottom-4 duration-500">
            {/* Amount Header */}
            <div className="text-center space-y-2">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-3xl mb-2">
                <CreditCard className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-4xl font-black">₹{selectedOrder.amount}</h2>
              <div className={cn(
                "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border",
                statusColors[selectedOrder.status as keyof typeof statusColors]
              )}>
                {selectedOrder.status}
              </div>
            </div>

            <div className="space-y-6">
              {/* Order Info */}
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50/50 dark:bg-gray-800/50 rounded-2xl border">
                  <div className="flex items-center gap-3">
                    <Hash className="h-4 w-4 text-gray-400" />
                    <div>
                      <p className="text-[10px] font-black uppercase text-gray-400">Order Reference</p>
                      <p className="text-sm font-bold font-mono">{selectedOrder.razorpayOrderId || selectedOrder.id}</p>
                    </div>
                  </div>
                  <ExternalLink className="h-4 w-4 text-gray-300 hover:text-primary cursor-pointer" />
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50/50 dark:bg-gray-800/50 rounded-2xl border">
                  <div className="flex items-center gap-3">
                    <UserIcon className="h-4 w-4 text-gray-400" />
                    <div>
                      <p className="text-[10px] font-black uppercase text-gray-400">Customer</p>
                      <p className="text-sm font-bold">{selectedOrder.user?.name || "Guest Checkout"}</p>
                      <p className="text-[10px] text-gray-500">{selectedOrder.user?.email || selectedOrder.email || selectedOrder.mobile || "N/A"}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50/50 dark:bg-gray-800/50 rounded-2xl border">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <div>
                      <p className="text-[10px] font-black uppercase text-gray-400">Date & Time</p>
                      <p className="text-sm font-bold">{format(new Date(selectedOrder.createdAt), "PPP, h:mm a")}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Package Summary */}
              <div className="p-6 bg-primary/5 rounded-[2rem] border border-primary/10 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5 text-primary" />
                    <span className="text-sm font-black uppercase tracking-wide">Purchase Item</span>
                  </div>
                  <span className="px-2 py-1 bg-primary text-white text-[10px] font-black rounded-lg uppercase">
                    {selectedOrder.packageId === "word_download" ? "Word Format" : "Premium Format"}
                  </span>
                </div>
                <div className="h-px bg-primary/10" />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 font-bold">Total Charged</span>
                  <span className="font-black text-primary text-lg">₹{selectedOrder.amount}</span>
                </div>
              </div>
            </div>

            <Button 
              className="w-full h-14 rounded-full font-black uppercase tracking-widest text-xs shadow-xl shadow-primary/20"
              onClick={() => setIsModalOpen(false)}
            >
              Close Record
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
}
