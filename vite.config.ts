import { defineConfig } from "vite"
import path from "path"
import Unocss from "unocss/vite"
import react from "@vitejs/plugin-react"

export default defineConfig({
  base: "./",
  resolve: {
    alias: {
      "~/": `${path.resolve(__dirname, "src")}/`,
    },
  },
  plugins: [react(), Unocss()],
})
