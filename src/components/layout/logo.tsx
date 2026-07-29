import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  className?: string;
  variant?: "default" | "light" | "footer";
}

export function Logo({ className, variant = "default" }: LogoProps) {
  const isFooter = variant === "footer";

  return (
    <Link href="/" className={`flex items-center group p-0 ${className}`}>
      <div className={`relative flex items-center justify-center overflow-hidden rounded-lg ${isFooter ? "bg-white p-1.5" : "p-0"}`}>
        <Image
          src="/brand-logo.png"
          alt="Vadhuvar Biodata"
          width={220}
          height={140}
          className="h-12 sm:h-14 w-auto object-contain min-w-[140px]"
          priority
        />
      </div>
    </Link>
  );
}

