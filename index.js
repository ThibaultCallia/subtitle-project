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
const wordsArray = createArray(folderToRead);

const choices = [
  "List all occurrences (sorted according to occurrence)",
  "List all occurrences (sorted alphabetically)",
  "Occurrence of one word",
  "Compare multiple words",
];
const choice = rl.keyInSelect(choices, "What do you wish to do?");
switch (choice) {
  case 0:
    console.log(sortAll(wordsArray));
    process.exit();
  case 1:
    console.log(sortAllAlpha(wordsArray));
    process.exit();
  case 2:
    console.log(specificWord(wordsArray));
    process.exit();
  case 3:
    console.log(compareWords(wordsArray));
    process.exit();
  default:
    console.log("Bye!");
    process.exit();
}

console.log(sortAllAlpha(wordsArray));
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
  //reduce to object with keys (word) and values (occurrence)
  const wordsOcc = arr.reduce(function (obj, word) {
    obj[word] = obj[word] + 1 || 1;
    return obj;
  }, {});

  // create new array with words and occurrences merged as string
  const arr2 = [];
  for (const key in wordsOcc) {
    if (wordsOcc.hasOwnProperty(key)) {
      arr2.push(`${key} ${wordsOcc[key]}`);
    }
  }

  // new object with previously created string as keys and occurrence as value
  const obj = {};
  arr2.forEach((element) => {
    obj[element] = parseInt(element.replace(/[a-z ']/g, ""), 10);
  });

  // create array with only keys and sort that according to values
  const uniqueWordsSorted = Object.keys(obj);
  uniqueWordsSorted.sort((a, b) => obj[b] - obj[a]);

  return uniqueWordsSorted;
}

function sortAllAlpha(arr) {
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
  const obj = {};
  arr2.forEach((element) => {
    obj[element] = parseInt(element.replace(/[a-z ']/g, ""), 10);
  });

  const uniqueWordsSorted = Object.keys(obj);
  uniqueWordsSorted.sort();

  return uniqueWordsSorted;
}
function specificWord(arr) {
  const word = rl.question("Which word?\n");
  const occurrence = arr.filter((x) => x == word.toLowerCase()).length;
  return `${word} occurs ${occurrence} times in ${folderToRead}.\n`;
}

function compareWords(arr) {
  const words = [];
  let word = "";
  let counter = 1;
  let reply = "\n";

  // create array of words with readline
  do {
    word = rl.question(`type word ${counter} or type STOP\n`);
    counter++;
    words.push(word);
  } while (word != "STOP");
  words.pop();
  if (words.length == 0) {
    process.exit();
  }

  // Form reply
  reply += `${words[0]} occurs ${
    arr.filter((x) => x == words[0].toLowerCase()).length
  } times in ${folderToRead}.\n`;
  for (let i = 1; i < words.length; i++) {
    const occurrence = arr.filter((x) => x == words[i].toLowerCase()).length;
    reply += `${words[i]}: ${occurrence} times.\n`;
  }

  return reply;
}
