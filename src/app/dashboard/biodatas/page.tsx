"use client";

import { useEffect, useState, useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { BiodataList } from "@/components/dashboard/biodata-list";
import { useBuilderStore } from "@/store/builder-store";

export default function BiodatasPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const { loadBiodata, resetForm } = useBuilderStore();
  const [biodatas, setBiodatas] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchLockRef = useRef(false);

  useEffect(() => {
    if (!session || fetchLockRef.current) return;

    const fetchBiodatas = async () => {
      try {
        const bioRes = await fetch("/api/user/biodata");
        if (bioRes.ok) {
          const data = await bioRes.json();
          setBiodatas(data.biodatas || []);
        }
      } catch (err) {
        console.error("Failed to fetch biodatas", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLockRef.current = true;
    fetchBiodatas();

    // Reset lock after 1 second to allow for future manual refreshes if needed
    setTimeout(() => {
      fetchLockRef.current = false;
    }, 1000);
  }, [session]);

  if (isLoading) return <div className="h-64 flex items-center justify-center animate-pulse text-zinc-400 font-bold">Loading Biodatas...</div>;

  return (
    <BiodataList
      biodatas={biodatas}
      activePackage={null}
      onLoad={loadBiodata}
      onReset={resetForm}
      router={router}
    />
  );
}
