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
    },
  }
})
