import { defineConfig } from "vite"
import path from "path"
import Unocss from "unocss/vite"
import react from "@vitejs/plugin-react"
import AutoImport from "unplugin-auto-import/vite"

export default defineConfig({
  base: "./",
  resolve: {
    alias: {
      "~/": `${path.resolve(__dirname, "src")}/`,
    },
  },
  plugins: [
    react(),
    Unocss(),
    AutoImport({
      imports: ["react"],
      dts: "src/auto-imports.d.ts",
    }),
  ],
})
