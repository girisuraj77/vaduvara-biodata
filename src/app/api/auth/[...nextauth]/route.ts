import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth-options";

async function handler(req: Request, context: any) {
  // In Next.js 15, params is a promise that must be awaited
  await context.params;
  return await NextAuth(authOptions)(req, context);
}

export { handler as GET, handler as POST };
