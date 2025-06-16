import type { NextConfig } from "next";

// Safely get REPLIT_DOMAINS, fallback to empty array if not defined
const replOrigins = process.env.REPLIT_DOMAINS?.split(",") || [];

// Optional: Export your custom config separately
const customConfig = {
  allowedDevOrigins: [replOrigins[0] || "http://localhost:3000"],
};

// Only standard keys inside this object
const nextConfig: NextConfig = {
  reactStrictMode: true,
};

export default nextConfig;
export { customConfig };
