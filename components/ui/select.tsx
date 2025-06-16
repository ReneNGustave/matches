import * as React from "react";

export function Select({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

export function SelectTrigger({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <button className={`border px-3 py-2 rounded ${className}`}>{children}</button>;
}

export function SelectValue() {
  return <span>Select...</span>;
}

export function SelectContent({ children }: { children: React.ReactNode }) {
  return <div className="border mt-2 rounded">{children}</div>;
}

export function SelectItem({ children, value }: { children: React.ReactNode; value: string }) {
  return <div data-value={value} className="px-3 py-2 hover:bg-gray-100 cursor-pointer">{children}</div>;
}