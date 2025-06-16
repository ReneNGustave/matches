import * as React from "react";

export function Textarea({ value, onChange, placeholder = "", className = "" }: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  className?: string;
}) {
  return (
    <textarea
      className={`w-full p-2 border rounded ${className}`}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
}