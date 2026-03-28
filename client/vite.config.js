// vite.config.js
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          reactVendor: ["react", "react-dom"],
          chart: ["chart.js", "react-chartjs-2"],
        },
      },
    },
  },
});