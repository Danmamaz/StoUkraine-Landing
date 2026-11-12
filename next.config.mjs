/**
 * The landing is served from a sub-path of the STO domain (Cloudflare Worker
 * proxies it to Vercel, WordPress keeps the rest). Set NEXT_PUBLIC_BASE_PATH
 * (e.g. "/fasad") once the final path is agreed; empty = site root.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath,
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
