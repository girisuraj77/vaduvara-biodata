import { 
  FileText, 
  CreditCard, 
  ArrowUpRight,
  ShoppingBag,
  DollarSign
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { format } from "date-fns";
import { prisma } from "@/lib/prisma";

async function getStatsData() {
  try {
    const [
      biodataCount,
      orderCount,
      totalRevenue,
      recentOrders
    ] = await Promise.all([
      prisma.biodata.count(),
      prisma.order.count(),
      prisma.order.aggregate({
        where: { status: "SUCCESS" },
        _sum: { amount: true }
      }),
      prisma.order.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: { user: { select: { name: true, email: true } } }
      })
    ]);

    return {
      stats: {
        biodatas: biodataCount,
        orders: orderCount,
        revenue: totalRevenue._sum.amount || 0
      },
      recentOrders
    };
  } catch (error) {
    console.error("Dashboard Stats Fetch Error:", error);
    return null;
  }
}

export default async function AdminDashboard() {
  const data = await getStatsData();

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <p className="text-red-500 font-bold">Error loading dashboard stats</p>
          <p className="text-gray-500 text-sm">Please check your database connection.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="space-y-1">
        <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-gray-900 to-gray-500 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">Dashboard Overview</h1>
        <p className="text-gray-500 text-sm">Real-time statistics and transaction activity.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="border-none shadow-xl shadow-black/5 bg-white/50 dark:bg-gray-900/50 backdrop-blur-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-black uppercase text-gray-400 tracking-wider">Total Biodatas</CardTitle>
            <FileText className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold">{data.stats.biodatas}</div>
            <p className="text-[10px] text-gray-400 font-medium mt-1">Created drafts & copies</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-xl shadow-black/5 bg-white/50 dark:bg-gray-900/50 backdrop-blur-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-black uppercase text-gray-400 tracking-wider">Total Orders</CardTitle>
            <ShoppingBag className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold">{data.stats.orders}</div>
            <p className="text-[10px] text-gray-400 font-medium mt-1">Paid checkout processes</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-xl shadow-black/5 bg-white/50 dark:bg-gray-900/50 backdrop-blur-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-black uppercase text-gray-400 tracking-wider">Revenue Generated</CardTitle>
            <DollarSign className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold text-emerald-600">₹{data.stats.revenue}</div>
            <p className="text-[10px] text-gray-400 font-medium mt-1">Success checkouts summary</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6">
        <Card className="border-none shadow-xl shadow-black/5 bg-white/50 dark:bg-gray-900/50 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="text-lg font-black">Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.recentOrders.map((order: any) => (
                <div key={order.id} className="flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 shadow-sm transition-all hover:scale-[1.01]">
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-2.5 rounded-full">
                      <CreditCard className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-black truncate max-w-[200px]">{order.user?.name || order.email || "Guest Checkout"}</p>
                      <p className="text-[10px] text-gray-400 font-bold uppercase">{order.packageId === "word_download" ? "Word Format (₹49)" : "Premium Format (₹49)"}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-primary">₹{order.amount}</p>
                    <p className="text-[10px] text-gray-400 font-medium">{format(new Date(order.createdAt), "MMM d, h:mm a")}</p>
                  </div>
                </div>
              ))}
              <Link href="/admin/transactions" className="flex items-center justify-center gap-2 py-3 text-xs text-primary font-black uppercase tracking-widest hover:underline transition-all">
                View all transactions <ArrowUpRight className="h-3 w-3" />
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
