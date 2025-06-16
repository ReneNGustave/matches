import * as React from "react";

export function Tabs({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

export function TabsList({ children }: { children: React.ReactNode }) {
  return <div className="flex space-x-2">{children}</div>;
}

export function TabsTrigger({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <button className={`px-3 py-2 bg-gray-200 rounded ${className}`}>{children}</button>;
}

export function TabsContent({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}