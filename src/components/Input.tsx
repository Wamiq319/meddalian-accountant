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
  const baseStyle =
    "block w-full rounded border border-[#e94e1b] bg-white px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#e94e1b] focus:border-[#e94e1b] transition-colors duration-200";
  return (
    <div className={`mb-4 ${className}`}>
      <label className="block font-semibold mb-1 text-gray-800">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {variant === "textarea" ? (
        <textarea
          className={baseStyle}
          required={required}
          {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : variant === "dropdown" ? (
        <select
          className={baseStyle}
          required={required}
          {...(props as React.SelectHTMLAttributes<HTMLSelectElement>)}
        >
          <option value="">Select...</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={variant}
          className={baseStyle}
          required={required}
          {...props}
        />
      )}
      {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
    </div>
  );
}
