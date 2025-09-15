import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Server configuration
  server: {
    port: 3000,
    open: true,
    allowedHosts: true,// Automatically open the app in browser
    host: true, // Allow access from network
  },
  
  // Build configuration
  build: {
    outDir: 'dist',
    sourcemap: true, // Generate source maps for debugging
    minify: 'esbuild', // Use esbuild for faster minification
  },
  
  // Development configuration
  esbuild: {
    drop: ['console', 'debugger'], // Remove console logs in production
  },
  
  // Base public path
  base: './',
  
  // Define global constants
  define: {
    __DEV__: JSON.stringify(process.env.NODE_ENV === 'development'),
  },
})
