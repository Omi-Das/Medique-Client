import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  
  turbopack: {
    root: __dirname, 
  },

  // 🎯 এখানে ডাটাবেজ থেকে আসা সব ছবির ডোমেন অনুমতি যুক্ত করা হলো
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '://unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;

// import { fileURLToPath } from 'url';
// import path from 'path';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactCompiler: true,
  
//   turbopack: {
//     root: __dirname, 
//   },
// };

// export default nextConfig;

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   /* config options here */
//   reactCompiler: true,
// };

// export default nextConfig;
