import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// Plugin personalizado para guardar la configuración localmente
function saveConfigPlugin() {
  return {
    name: 'save-config-plugin',
    configureServer(server) {
      server.middlewares.use('/api/save-config', (req, res, next) => {
        if (req.method === 'POST') {
          let body = '';
          req.on('data', chunk => {
            body += chunk.toString();
          });
          req.on('end', () => {
            try {
              const filePath = path.resolve(__dirname, 'src', 'data', 'config.json');
              const parsed = JSON.parse(body);
              fs.writeFileSync(filePath, JSON.stringify(parsed, null, 2));

              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true, message: 'Configuration saved to config.json' }));
            } catch (err) {
              res.statusCode = 500;
              res.end(JSON.stringify({ success: false, error: err.message }));
            }
          });
        } else {
          next();
        }
      });
    }
  }
}

export default defineConfig({
  plugins: [react(), saveConfigPlugin()],
  resolve: {
    dedupe: ['react', 'react-dom'],
  },
  optimizeDeps: {
    include: ['lucide-react'],
  },
  server: {
    port: 3000,
    open: true
  }
})
