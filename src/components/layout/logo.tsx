import Image from "next/image";
import Link from "next/link";

export function Logo({ className, variant = "default" }: { className?: string; variant?: "default" | "light" | "footer" }) {
  const isFooter = variant === "footer";

  return (
    <Link href="/" className={`flex items-center gap-2 group ${className}`}>
      <div className={`relative flex items-center justify-center overflow-hidden rounded-lg ${isFooter ? "bg-white p-1.5" : ""}`}>
        {/* Desktop Logo (hidden on mobile, visible on sm and up) */}
        <div className="hidden sm:block">
          <Image
            src="/brand-logo.png"
            alt="Vadhuvar Biodata"
            width={180}
            height={120}
            // className="h-15 w-auto object-contain"  
            priority
          />
        </div>

        {/* Mobile Logo (visible on mobile, hidden on sm and up) */}
        <div className="block sm:hidden">
          <Image
            src="/brand-icon.png"
            alt="Vadhuvar Biodata Icon"
            width={40}
            height={40}
            className="h-10 w-10 object-contain"
            priority
          />
        </div>
      </div>
    </Link>
  );
}
