import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  required?: boolean;
  variant?: "text" | "email" | "number" | "dropdown" | "textarea";
  options?: string[]; // for dropdown
}

export default function Input({
  label,
  error,
  required = false,
  variant = "text",
  options = [],
  className = "",
  ...props
}: InputProps) {
  const baseStyle = `block w-full rounded-xl border bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#e94e1b]/20 focus:border-[#e94e1b] transition-all duration-200 ${
    error
      ? "border-red-300 focus:ring-red-500/20 focus:border-red-500"
      : "border-gray-300 hover:border-gray-400"
  }`;

  return (
    <div className={`${label ? "space-y-1" : ""} ${className}`}>
      {label && (
        <label className="block font-medium text-gray-700 text-sm">
          {label} {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      {variant === "textarea" ? (
        <textarea
          className={`${baseStyle} resize-none`}
          rows={4}
          required={required}
          {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : variant === "dropdown" ? (
        <select
          className={baseStyle}
          required={required}
          {...(props as React.SelectHTMLAttributes<HTMLSelectElement>)}
        >
          <option value="">Select an option...</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      ) : (
        <div className="relative">
          {label.includes("(USD)") && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-base">
              $
            </span>
          )}
          <input
            type={variant}
            className={
              label.includes("(USD)") ? `${baseStyle} pl-8` : baseStyle
            }
            required={required}
            {...props}
          />
        </div>
      )}
      {error && (
        <div className="flex items-center gap-1 text-red-500 text-sm mt-1">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {error}
        </div>
      )}
    </div>
  );
}
