import Link from "next/link";
import Image from "next/image";
import Button from "./Button";

export default function Navbar() {
  return (
    <nav className="w-full bg-white shadow flex items-center justify-between px-6 py-4">
      {/* Logo and call info on the left */}
      <div className="flex items-center gap-4">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="MEDALLION Logo"
            width={48}
            height={48}
            priority
          />
        </Link>
        <div className="flex flex-col">
          <span className="text-blue-700 font-bold text-base sm:text-lg">
            Call: 07574555585
          </span>
          <span className="text-gray-600 text-xs sm:text-sm">
            Fast Accounting and Tax solutions
          </span>
        </div>
      </div>
      {/* Right side - empty for now */}
      <div></div>
    </nav>
  );
}
