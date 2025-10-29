import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Server configuration
  server: {
    // Configure allowed hosts for security
    // Define which hosts are allowed to access the server
    allowedHosts: [
      'localhost',
      '127.0.0.1',
      // To allow the JetBrains remote host, uncomment the line below:
      // 'ojj-gbub-ohh.app.eu-west-1.matter.jetbrains.ai',
    ],
    
    cors: {
      origin: /^https?:\/\/(www\.)?lovely(\.com)?$/,
    },
    middlewareMode: false,
    configureServer(server) {
      // Middleware to check Host header and block unauthorized hosts
      server.middlewares.use((req, res, next) => {
        const host = req.headers.host
        const allowedHosts = [
          'localhost',
          '127.0.0.1',
          'localhost:5173', // Vite's default port
          '127.0.0.1:5173',
          // Uncomment to allow JetBrains remote URL:
          // 'ojj-gbub-ohh.app.eu-west-1.matter.jetbrains.ai',
        ]
        
        // Check if the host is in the allowed list
        const isAllowed = allowedHosts.some(allowedHost => 
          host === allowedHost || host?.startsWith(allowedHost + ':')
        )
        
        if (!isAllowed && host) {
          res.statusCode = 403
          res.setHeader('Content-Type', 'text/plain')
          res.end(`Blocked request. This host ("${host}") is not allowed.\nTo allow this host, add "${host}" to \`server.allowedHosts\` in vite.config.js.`)
          return
        }
        
        // Original origin check
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
