import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      components: path.resolve(__dirname, "src/components"),
      pages: path.resolve(__dirname, "src/pages"),
      styles: path.resolve(__dirname, "src/styles"),
      models: path.resolve(__dirname, "src/models"),
      router: path.resolve(__dirname, "src/router"),
      utils: path.resolve(__dirname, "src/utils"),
      services: path.resolve(__dirname, "src/services"),
      configs: path.resolve(__dirname, "src/configs"),
    },
  },
})

