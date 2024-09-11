/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'res.cloudinary.com',
            port: '',
            pathname: '/doszepgy2/**', // Allow all images from your Cloudinary account
          },
          
        ],
          domains: ['images.unsplash.com'],
    },
    experimental: {
      missingSuspenseWithCSRBailout: false,
    },
    
};

export default nextConfig;