// vite.config.ts
import { defineConfig, loadEnv } from "file:///mnt/d/freelc/CICD/FE/node_modules/vite/dist/node/index.js";
import react from "file:///mnt/d/freelc/CICD/FE/node_modules/@vitejs/plugin-react-swc/index.mjs";
import path from "path";
var __vite_injected_original_dirname = "/mnt/d/freelc/CICD/FE";
var vite_config_default = defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@/api": path.resolve(__vite_injected_original_dirname, "./src/api"),
        "@/store": path.resolve(__vite_injected_original_dirname, "./src/store"),
        "@/assets": path.resolve(__vite_injected_original_dirname, "./src/assets"),
        "@/components": path.resolve(__vite_injected_original_dirname, "./src/components"),
        "@/constants": path.resolve(__vite_injected_original_dirname, "./src/constants"),
        "@/features": path.resolve(__vite_injected_original_dirname, "./src/features"),
        "@/layouts": path.resolve(__vite_injected_original_dirname, "./src/layouts"),
        "@/utils": path.resolve(__vite_injected_original_dirname, "./src/utils"),
        "@/routers": path.resolve(__vite_injected_original_dirname, "./src/routers"),
        "@/hoc": path.resolve(__vite_injected_original_dirname, "./src/hoc"),
        "@/pages": path.resolve(__vite_injected_original_dirname, "./src/pages")
      },
      dedupe: ["react", "react-dom"]
    },
    base: "/",
    define: {
      ...Object.entries(env).reduce((obj, [key, value]) => ({
        ...obj,
        [`import.meta.env.${key}`]: JSON.stringify(value)
      }), {})
    },
    server: {
      hmr: {
        overlay: false
      },
      port: env.PORT || 5173
    },
    build: {
      esnext: "esnext"
      // outDir: 'build',
      // sourcemap: true, 
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvbW50L2QvZnJlZWxjL0NJQ0QvRkVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9tbnQvZC9mcmVlbGMvQ0lDRC9GRS92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vbW50L2QvZnJlZWxjL0NJQ0QvRkUvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcsIGxvYWRFbnYgfSBmcm9tICd2aXRlJ1xyXG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3Qtc3djJ1xyXG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xyXG5cclxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cclxuLyogZXNsaW50LWRpc2FibGUgKi9cclxuLy8gQHRzLWlnbm9yZVxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgY29tbWFuZCwgbW9kZSB9KSA9PiB7XHJcbiAgY29uc3QgZW52ID0gbG9hZEVudihtb2RlLCBwcm9jZXNzLmN3ZCgpLCAnJylcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIHBsdWdpbnM6IFtyZWFjdCgpXSxcclxuICAgIHJlc29sdmU6IHtcclxuICAgICAgYWxpYXM6IHtcclxuICAgICAgICBcIkAvYXBpXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9zcmMvYXBpXCIpLFxyXG4gICAgICAgIFwiQC9zdG9yZVwiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4vc3JjL3N0b3JlXCIpLFxyXG4gICAgICAgIFwiQC9hc3NldHNcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuL3NyYy9hc3NldHNcIiksXHJcbiAgICAgICAgXCJAL2NvbXBvbmVudHNcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuL3NyYy9jb21wb25lbnRzXCIpLFxyXG4gICAgICAgIFwiQC9jb25zdGFudHNcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuL3NyYy9jb25zdGFudHNcIiksXHJcbiAgICAgICAgXCJAL2ZlYXR1cmVzXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9zcmMvZmVhdHVyZXNcIiksXHJcbiAgICAgICAgXCJAL2xheW91dHNcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuL3NyYy9sYXlvdXRzXCIpLFxyXG4gICAgICAgIFwiQC91dGlsc1wiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4vc3JjL3V0aWxzXCIpLFxyXG4gICAgICAgIFwiQC9yb3V0ZXJzXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9zcmMvcm91dGVyc1wiKSxcclxuICAgICAgICBcIkAvaG9jXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9zcmMvaG9jXCIpLFxyXG4gICAgICAgIFwiQC9wYWdlc1wiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4vc3JjL3BhZ2VzXCIpLFxyXG4gICAgICB9LFxyXG4gICAgICBkZWR1cGU6IFsncmVhY3QnLCAncmVhY3QtZG9tJ10sXHJcbiAgICB9LFxyXG4gICAgYmFzZTogJy8nLFxyXG4gICAgZGVmaW5lOiB7XHJcbiAgICAgIC4uLk9iamVjdC5lbnRyaWVzKGVudikucmVkdWNlKChvYmosIFtrZXksIHZhbHVlXSkgPT4gKHtcclxuICAgICAgICAuLi5vYmosXHJcbiAgICAgICAgW2BpbXBvcnQubWV0YS5lbnYuJHtrZXl9YF06IEpTT04uc3RyaW5naWZ5KHZhbHVlKX1cclxuICAgICAgKSwge30pXHJcbiAgICB9LFxyXG4gICAgc2VydmVyOiB7XHJcbiAgICAgIGhtcjoge1xyXG4gICAgICAgIG92ZXJsYXk6IGZhbHNlLFxyXG4gICAgICB9LFxyXG4gICAgICBwb3J0OiBlbnYuUE9SVCB8fCA1MTczLFxyXG4gICAgfSxcclxuICAgIGJ1aWxkOiB7XHJcbiAgICAgIGVzbmV4dDogJ2VzbmV4dCcsXHJcbiAgICAgIC8vIG91dERpcjogJ2J1aWxkJyxcclxuICAgICAgLy8gc291cmNlbWFwOiB0cnVlLCBcclxuICAgIH0sXHJcbiAgfVxyXG59KVxyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQWlQLFNBQVMsY0FBYyxlQUFlO0FBQ3ZSLE9BQU8sV0FBVztBQUNsQixPQUFPLFVBQVU7QUFGakIsSUFBTSxtQ0FBbUM7QUFPekMsSUFBTyxzQkFBUSxhQUFhLENBQUMsRUFBRSxTQUFTLEtBQUssTUFBTTtBQUNqRCxRQUFNLE1BQU0sUUFBUSxNQUFNLFFBQVEsSUFBSSxHQUFHLEVBQUU7QUFFM0MsU0FBTztBQUFBLElBQ0wsU0FBUyxDQUFDLE1BQU0sQ0FBQztBQUFBLElBQ2pCLFNBQVM7QUFBQSxNQUNQLE9BQU87QUFBQSxRQUNMLFNBQVMsS0FBSyxRQUFRLGtDQUFXLFdBQVc7QUFBQSxRQUM1QyxXQUFXLEtBQUssUUFBUSxrQ0FBVyxhQUFhO0FBQUEsUUFDaEQsWUFBWSxLQUFLLFFBQVEsa0NBQVcsY0FBYztBQUFBLFFBQ2xELGdCQUFnQixLQUFLLFFBQVEsa0NBQVcsa0JBQWtCO0FBQUEsUUFDMUQsZUFBZSxLQUFLLFFBQVEsa0NBQVcsaUJBQWlCO0FBQUEsUUFDeEQsY0FBYyxLQUFLLFFBQVEsa0NBQVcsZ0JBQWdCO0FBQUEsUUFDdEQsYUFBYSxLQUFLLFFBQVEsa0NBQVcsZUFBZTtBQUFBLFFBQ3BELFdBQVcsS0FBSyxRQUFRLGtDQUFXLGFBQWE7QUFBQSxRQUNoRCxhQUFhLEtBQUssUUFBUSxrQ0FBVyxlQUFlO0FBQUEsUUFDcEQsU0FBUyxLQUFLLFFBQVEsa0NBQVcsV0FBVztBQUFBLFFBQzVDLFdBQVcsS0FBSyxRQUFRLGtDQUFXLGFBQWE7QUFBQSxNQUNsRDtBQUFBLE1BQ0EsUUFBUSxDQUFDLFNBQVMsV0FBVztBQUFBLElBQy9CO0FBQUEsSUFDQSxNQUFNO0FBQUEsSUFDTixRQUFRO0FBQUEsTUFDTixHQUFHLE9BQU8sUUFBUSxHQUFHLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLEtBQUssT0FBTztBQUFBLFFBQ3BELEdBQUc7QUFBQSxRQUNILENBQUMsbUJBQW1CLEdBQUcsRUFBRSxHQUFHLEtBQUssVUFBVSxLQUFLO0FBQUEsTUFBQyxJQUNoRCxDQUFDLENBQUM7QUFBQSxJQUNQO0FBQUEsSUFDQSxRQUFRO0FBQUEsTUFDTixLQUFLO0FBQUEsUUFDSCxTQUFTO0FBQUEsTUFDWDtBQUFBLE1BQ0EsTUFBTSxJQUFJLFFBQVE7QUFBQSxJQUNwQjtBQUFBLElBQ0EsT0FBTztBQUFBLE1BQ0wsUUFBUTtBQUFBO0FBQUE7QUFBQSxJQUdWO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
