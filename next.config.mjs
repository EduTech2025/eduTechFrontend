/** @type {import('next').NextConfig} */
const nextConfig = {
     images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'onlinepngtools.com',
      },
    ]
  
  },
  
};

export default nextConfig;
