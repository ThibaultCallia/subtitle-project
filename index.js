import fs, { existsSync, readlinkSync } from "fs";
import rl from "readline-sync";

/*const folderToRead =
  process.argv[2] ||
  rl.question("Please provide folder \n(or enter STOP to quit\n)");

  ---> This would first check for a third variable in terminal (node index ...)
        If nothing provided, rl.question is chosen
*/

const folderToRead = rl.question("Please provide folder \n");
// if (folderToRead == "STOP") {
//   process.exit();
// }
if (!fs.existsSync(folderToRead)) {
  console.log("no such file");
  process.exit();
}

// readline question : what do you want to do?
//    - Look for specific word
//    - Sort all words
//    -

const wordsArray = createArray(folderToRead);
console.log(sortAll(wordsArray));
// console.log(sortAll(arr));

function createArray(folderToRead) {
  // folderContents = array or file names (strings)
  const folderContents = fs.readdirSync(folderToRead);

  let allContent = "";

  // AllContent = string with all content of files
  folderContents.forEach((element) => {
    allContent += fs.readFileSync(folderToRead + "/" + element);
  });

  // Create rule to get rid of uppercase words?
  allContent = allContent
    .replace(/[^a-z']/gi, " ")
    .replace(/ +/g, " ")
    .toLowerCase();

  // change logic to exempt " I " or " I'" from lower case letters? Only I's with space around

  return allContent
    .split(" ")
    .filter((a) => a.length > 0)
    .map((x) => x.replace(/'s/, ""))
    .map((x) => x.replace(/s'/, "s"));
}

function sortAll(arr) {
  const wordsOcc = arr.reduce(function (obj, word) {
    obj[word] = obj[word] + 1 || 1;
    return obj;
  }, {});
  const arr2 = [];

  for (const key in wordsOcc) {
    if (wordsOcc.hasOwnProperty(key)) {
      arr2.push(`${key} ${wordsOcc[key]}`);
    }
  }
  return arr2;

  const uniqueWords = Object.keys(wordsOcc);
  uniqueWords.sort((a, b) => wordsOcc[b] - wordsOcc[a]);

  return uniqueWords;
}

function specificWord(word) {}
