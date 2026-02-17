import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Production optimizations
  compress: true,

  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },

  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.clerk.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },

  // Redirects for common paths
  async redirects() {
    return [];
  },

  // Rewrites for API or external services
  async rewrites() {
    return [];
  },

  // Experimental features for performance
  experimental: {
    optimizePackageImports: ['lucide-react', '@clerk/nextjs'],
  },

  // Strict mode enabled by default in dev, can explicitly set for production
  reactStrictMode: true,

  // Powered by header - disable for security
  poweredByHeader: false,
};

export default nextConfig;
