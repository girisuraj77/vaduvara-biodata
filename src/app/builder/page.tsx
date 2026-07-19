"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const BuilderContainer = dynamic(
  () => import("@/components/builder/builder-container").then((mod) => mod.BuilderContainer),
  { ssr: false }
);

export default function BuilderPage() {
  return (
    <div className="min-h-screen bg-zinc-50 pt-20">
      <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading Builder...</div>}>
        <BuilderContainer />
      </Suspense>
    </div>
  );
}
