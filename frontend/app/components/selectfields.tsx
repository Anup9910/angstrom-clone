import React from "react";

interface selectFieldProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { label: string; value: string }[];
  placeholder?: string;
  disabled?: boolean;
}

export default function SelectField({
  label,
  value,
  onChange,
  placeholder,
  options,
  disabled = false,
}: selectFieldProps) {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-medium mb-2">{label}</label>
      <select
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="w-full px-3 py-2 border rounded-lg text-black focus:ring-2 focus:ring-blue-500 outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
