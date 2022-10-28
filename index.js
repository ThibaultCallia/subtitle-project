import fs from "fs";

const folderContents = fs.readdirSync("friends_first-season_english");
let allContent = "";

for (let i = 0; i < folderContents.length; i++) {
  allContent += fs.readFileSync(
    "friends_first-season_english/" + folderContents[i]
  );
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
