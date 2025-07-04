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
            alt="Meddalian Logo"
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
      {/* Buttons on the right */}
      <div className="flex gap-3">
        <Link href="/login">
          <Button variant="outline" className="rounded-full px-6">
            Login
          </Button>
        </Link>
        <Link href="/register">
          <Button variant="primary" className="rounded-full px-6">
            Sign Up
          </Button>
        </Link>
      </div>
    </nav>
  );
}
