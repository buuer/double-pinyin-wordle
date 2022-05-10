declare module "pinyin/lib/web-pinyin" {
  interface iPinyin {
    (
      word: string,
      option?: {
        style?: string
        mode?: string
      }
    ): string[][]
    STYLE_INITIALS: string
    STYLE_TONE: string
    STYLE_TONE2: string
    STYLE_TO3NE: string
    STYLE_NORMAL: string
  }

  const pinyin: iPinyin
  export default pinyin
}
