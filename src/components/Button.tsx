"use client";

import { ButtonHTMLAttributes } from "react";

const COLORS = {
  primary: "bg-[#e94e1b] hover:bg-[#d13d0e] text-white border-transparent",
  secondary: "bg-[#0072bc] hover:bg-[#005b99] text-white border-transparent",
  outline:
    "bg-white text-[#e94e1b] border border-[#e94e1b] hover:bg-[#e94e1b] hover:text-white",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "outline";
}

export default function Button({
  children,
  className = "",
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`px-5 py-2 rounded font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${COLORS[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
