/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'media.istockphoto.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',
        port: '',
        pathname: '/**',
      },
         {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
        {
        protocol: "http",
        hostname: "res.cloudinary.com",
      },
       {
        protocol: "https",
        hostname: "*.r2.dev",
        port: '',
        pathname: '/**',
      },
    ],
  },
  allowedDevOrigins: ['http://10.134.72.197:3000'],
};

export default nextConfig;
