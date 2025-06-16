import * as React from "react";

export function Badge({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <span className={`inline-block bg-gray-200 text-sm px-2 py-1 rounded ${className}`}>{children}</span>;
}