import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      components: path.resolve(__dirname, "src/components"),
      styles: path.resolve(__dirname, "src/styles"),
      pages: path.resolve(__dirname, "src/pages"),
      models: path.resolve(__dirname, "src/models"),
      router: path.resolve(__dirname, "src/router"),
      utils: path.resolve(__dirname, "src/utils"),
      helper: path.resolve(__dirname, "src/helper"),
      services: path.resolve(__dirname, "src/services"),
      configs: path.resolve(__dirname, "src/configs"),
      constants: path.resolve(__dirname, "src/constants"),
      data: path.resolve(__dirname, "src/data"),
      Firebase: path.resolve(__dirname, "src/Firebase"),
    },
  },
})
