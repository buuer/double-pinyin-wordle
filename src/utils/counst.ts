export const STATUS = {
  BASE: 0,
  ABSENT: 1,
  PRESENT: 2,
  CORRENT: 3,
}

export const KEY_BOARD_QWERTY = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["_half", "a", "s", "d", "f", "g", "h", "j", "k", "l", "_half"],
  ["enter", "z", "x", "c", "v", "b", "n", "m", "backspace"],
]

export const SHENG_MU = ["zh", "ch", "sh"]
export const VOWEL = ["a", "o", "e", "i", "u"]

export const TONES = {
  a: ["a", "ā", "á", "ǎ", "à"],
  o: ["o", "ō", "ó", "ǒ", "ò"],
  e: ["e", "ē", "é", "ě", "è"],
  i: ["i", "ī", "í", "ǐ", "ì"],
  u: ["u", "ū", "ú", "ǔ", "ù"],
  v: ["ü", "ǖ", "ǘ", "ǚ", "ǜ"],
}

export const TONES_MAP = Object.entries(TONES).reduce((pre, [key, value]) => {
  value.forEach((tone) => (pre[tone] = key))
  return pre
}, {} as Record<string, string>)
