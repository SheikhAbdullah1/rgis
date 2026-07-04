// import type { NextConfig } from "next";
// // @type {import('next').NextConfig} 

// const nextConfig: NextConfig = {
//   /* config options here */
//   allowedDevOrigins: ["192.168.100.4"],

// module.exports = nextConfig;
// };

// export default nextConfig;
// next.config.ts
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,  // ← ye add karo temporarily
  },
};

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   allowedDevOrigins: ["192.168.100.4"],
//   };
  
  module.exports = nextConfig;
  