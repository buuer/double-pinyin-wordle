import toPinyin from "pinyin/lib/web-pinyin"
import { TONES_MAP } from "./counst"

export const splitTone = (pinyin: string = "") => {
  let tone = 0
  const p = pinyin
    .split("")
    .map((c) => {
      if (TONES_MAP[c]) {
        tone = TONES_MAP[c][1]
        return TONES_MAP[c][0]
      }
      return c
    })
    .join("")
  return [p, tone] as const
}

export const addTone = (pinyin: string, tone: number) => {
  return pinyin
}

export const wordToPinyin = (word: string) =>
  toPinyin(word, { style: toPinyin.STYLE_TONE }).map(([pinyin]) => {
    const [withoutTone, tone] = splitTone(pinyin)
    const [p1, p2] = withoutTone.split(/(?=[aeiou])/)
    const sheng = p2 ? p1 : ""
    const yun = pinyin.replace(sheng, "")
    return [sheng, yun, tone] as const
  })
