import { defineConfig, presetIcons, presetTypography, presetWind } from "unocss"
import transformerVariantGroup from "@unocss/transformer-variant-group"
import transformerDirective from "@unocss/transformer-directives"

export default defineConfig({
  shortcuts: [["activatable", "cursor-pointer active:opacity-65"]],
  theme: {
    colors: {
      wordle: {
        green: "#6aaa64",
        darkendGreen: "#538d4e",
        yellow: "#c9b458",
        darkendYellow: "#b59f3b",
        lightGray: "#d8d8d8",
        gray: "#86888a",
        darkGray: "#939598",
      },
    },
  },
  presets: [presetWind(), presetIcons(), presetTypography()],
  transformers: [transformerVariantGroup(), transformerDirective()],
})
