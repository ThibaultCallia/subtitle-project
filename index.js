import fs, { existsSync } from "fs";
const folderToRead = process.argv[2];
if (!fs.existsSync(folderToRead)) {
  console.log("no such file");
  process.exit();
}

const folderContents = fs.readdirSync(folderToRead);
let allContent = "";

for (let i = 0; i < folderContents.length; i++) {
  allContent += fs.readFileSync(folderToRead + "/" + folderContents[i]);
}
allContent = allContent
  .replace(/[^(a-z)]/gi, " ")
  .replace(/ +/g, " ")
  .toLowerCase();

const arr = allContent.split(" ").filter((a) => a.length > 1);
const wordsOcc = arr.reduce(function (obj, word) {
  obj[word] = obj[word] + 1 || 1;
  return obj;
}, {});

const uniqueWords = Object.keys(wordsOcc);
uniqueWords.sort((a, b) => wordsOcc[b] - wordsOcc[a]);

console.log(uniqueWords);
