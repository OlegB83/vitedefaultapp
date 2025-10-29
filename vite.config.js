import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Server configuration
  server: {
    cors: {
      origin: /^https?:\/\/(www\.)?lovely(\.com)?$/,
    },
    middlewareMode: false,
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const origin = req.headers.origin
        if (origin && !origin.includes('lovely')) {
          res.statusCode = 403
          res.end('Access denied: host not allowed.')
          return
        }
        next()
      })
    },
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
