/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  transpilePackages: ['three'],
  // We run lint manually via `npm run lint`. Skip it in the build
  // step so deployments aren't blocked by stylistic warnings.
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
