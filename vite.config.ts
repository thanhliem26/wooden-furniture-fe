import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path";

// https://vitejs.dev/config/
/* eslint-disable */
// @ts-ignore
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@/api": path.resolve(__dirname, "./src/api"),
        "@/store": path.resolve(__dirname, "./src/store"),
        "@/assets": path.resolve(__dirname, "./src/assets"),
        "@/components": path.resolve(__dirname, "./src/components"),
        "@/constants": path.resolve(__dirname, "./src/constants"),
        "@/features": path.resolve(__dirname, "./src/features"),
        "@/layouts": path.resolve(__dirname, "./src/layouts"),
        "@/utils": path.resolve(__dirname, "./src/utils"),
        "@/routers": path.resolve(__dirname, "./src/routers"),
        "@/hoc": path.resolve(__dirname, "./src/hoc"),
        "@/pages": path.resolve(__dirname, "./src/pages"),
      },
      dedupe: ['react', 'react-dom'],
    },
    base: '/',
    define: {
      ...Object.entries(env).reduce((obj, [key, value]) => ({
        ...obj,
        [`import.meta.env.${key}`]: JSON.stringify(value)}
      ), {})
    },
    server: {
      hmr: {
        overlay: false,
      },
      port: env.PORT || 5173,
    },
    build: {
      esnext: 'esnext',
      // outDir: 'build',
      // sourcemap: true, 
      chunkSizeWarningLimit: 100,
      rollupOptions: {
        output: {
          assetFileNames: (assetInfo: any) => {
            let extType = assetInfo.name.split('.').at(1)
            if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
              extType = 'img'
            }
            return `assets/${extType}/[name]-[hash][extname]`
          },
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
        },
      },
    },
  }
})
