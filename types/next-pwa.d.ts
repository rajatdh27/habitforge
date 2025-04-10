declare module 'next-pwa' {
    import { NextConfig } from 'next';
  
    interface PWAOptions {
      dest: string;
      disable?: boolean;
      register?: boolean;
      skipWaiting?: boolean;
      // Add more PWA options here if needed
    }
  
    const withPWA: (options: PWAOptions) => (nextConfig: NextConfig) => NextConfig;
    export default withPWA;
  }
  