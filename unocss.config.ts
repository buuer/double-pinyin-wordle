import { defineConfig, presetIcons, presetTypography, presetWind } from "unocss"
import transformerVariantGroup from "@unocss/transformer-variant-group"
import transformerDirective from "@unocss/transformer-directives"

export default defineConfig({
  shortcuts: [["activatable", "cursor-pointer active:opacity-65"]],
  theme: {
    colors: {
      wordle: {
        green: "var(--green)",
        yellow: "var(--yellow)",
        gray: "var(--gray)",
      },
    },

    breakpoints: {
      mxs: "320px",
      msm: "375px",
      mmd: "390px",
      mlg: "410px",
    },
  },
  presets: [presetWind(), presetIcons(), presetTypography()],
  transformers: [transformerVariantGroup(), transformerDirective()],
})
