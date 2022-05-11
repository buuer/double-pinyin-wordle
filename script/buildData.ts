import fs from "fs-extra"
import path from "path"

const DATA_PATH = path.resolve(__dirname, "./src/data/idiom.4.txt")
const OUT_PATH = path.resolve(__dirname, "./src/data")

const readRawText = async (path: string): Promise<string[][]> => {
  const data = await fs.readFile(path, "utf8")
  return data
    .split("\n")
    .map((line) => line.trim().split(/\s+/).filter(Boolean))
    .filter((l) => l.length)
}

const main = async () => {
  const rawData = await readRawText(DATA_PATH)
  const dict = rawData.reduce((acc, [word, ...pinyin]) => {
    acc[word] = pinyin.join(" ")
    return acc
  }, {} as Record<string, string>)
  await fs.writeFile(
    path.resolve(OUT_PATH, "idiom.json"),
    JSON.stringify(dict, null, 2)
  )
  console.log("done", rawData.length, "line")
}

main()
