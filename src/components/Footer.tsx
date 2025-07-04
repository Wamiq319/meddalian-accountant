import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-100 text-center py-6 mt-16 text-gray-600 text-sm">
      <div>
        &copy; {new Date().getFullYear()} Meddalian Accountant. All rights
        reserved. | Contact: info@meddalian.com
      </div>
    </footer>
  );
}
