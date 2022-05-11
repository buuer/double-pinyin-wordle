import toPinyin from "pinyin/lib/web-pinyin"
import { TONES_MAP } from "./counst"
import { identity } from "./func"
import idiom from "~/data/idiom.json"

export const splitTone = (pinyin: string = "") => {
  let tone = 0
  const p = pinyin
    .split("")
    .map((c) => {
      if (TONES_MAP[c]) {
        tone = TONES_MAP[c][1]
        return tone ? TONES_MAP[c][0] : c
      }
      return c
    })
    .join("")
  return [p, tone] as const
}

export const addTone = (pinyin: string, tone: number) => {
  return pinyin
}

export const wordToPinyin = (word: string) => {
  const idiomPinyin = (idiom as Record<string, string>)[word]
  const wordPinyin = idiomPinyin
    ? idiomPinyin.split(" ")
    : toPinyin(word, { style: toPinyin.STYLE_TONE }).flatMap(identity)

  return wordPinyin.map((pinyin) => {
    const [withoutTone, tone] = splitTone(pinyin)
    const [p1, p2] = withoutTone.split(/(?=[aeiıouü])/)
    const sheng = p2 ? p1 : ""
    const yun = pinyin.replace(sheng, "")
    return [sheng, yun, tone] as const
  })
}
