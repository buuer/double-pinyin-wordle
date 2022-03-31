import {
  defineConfig,
  presetIcons,
  presetTypography,
  presetWind,
} from "unocss"

export default defineConfig({
  shortcuts: [],
  presets: [presetWind(), presetIcons(), presetTypography()],
})
