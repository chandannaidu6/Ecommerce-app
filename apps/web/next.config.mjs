/** @type {import('next').NextConfig} */
const nextConfig = {};

export default nextConfig;

const withTM = require('next-transpile-modules')(['@repo/ui']);

module.exports = withTM({
  reactStrictMode: true,
});

