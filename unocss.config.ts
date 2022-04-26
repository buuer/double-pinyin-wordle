import { defineConfig, presetIcons, presetTypography, presetWind } from "unocss"
import transformerVariantGroup from "@unocss/transformer-variant-group"
import transformerDirective from "@unocss/transformer-directives"

export default defineConfig({
  shortcuts: [
    [
      "activatable",
      "cursor-pointer select-none active:opacity-65 transition-opacity",
    ],
  ],
  theme: {
    colors: {
      wordle: {
        green: "var(--green)",
        yellow: "var(--yellow)",
        gray: "var(--gray)",
      },
    },

    breakpoints: {
      msm: "320px",
      mmd: "375px",
      mlg: "410px",
    },
  },
  presets: [presetWind(), presetIcons(), presetTypography()],
  transformers: [transformerVariantGroup(), transformerDirective()],
})
