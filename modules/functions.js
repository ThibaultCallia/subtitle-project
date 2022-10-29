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

  return allContent.split(" ").filter((a) => a.length > 0);
}

function sortAll(arr) {
  const wordsOcc = arr.reduce(function (obj, word) {
    obj[word] = obj[word] + 1 || 1;
    return obj;
  }, {});

  const uniqueWords = Object.keys(wordsOcc);
  uniqueWords.sort((a, b) => wordsOcc[b] - wordsOcc[a]);

  return uniqueWords;
}

function specificWord(word) {}
