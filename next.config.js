/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: { bodySizeLimit: "2mb" },
  },
  // Supabase packages are still listed in package.json but unused in demo mode
  // They won't cause runtime errors since createClient() is stubbed out
};

module.exports = nextConfig;
