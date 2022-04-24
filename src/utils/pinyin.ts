import { TONES_MAP } from "./counst"

export const removeTone = (pinyin: string) => {
  return pinyin
    .split("")
    .map((c) => TONES_MAP[c] || c)
    .join("")
}

export const addTone = (pinyin: string, tone: number) => {
  return pinyin
}

export const splitPinyin = (pinyin: string) => {
  const [sheng, ...rest] = pinyin.split(/(?=[aeiou])/)
  return [sheng, rest.join("")]
}
