"use client";

import { useSession } from "next-auth/react";
import { ProfileView } from "@/components/dashboard/profile-view";

export default function ProfilePage() {
  const { data: session, status } = useSession();

  if (status === "loading") return <div className="h-64 flex items-center justify-center animate-pulse text-zinc-400 font-bold">Loading Profile...</div>;

  return <ProfileView session={session} />;
}
