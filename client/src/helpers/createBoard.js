export default function createBoard(len) {
  let words = [];
  for (let i = 0; i < len; i++) {
    words.push(getEmptyWord(len));
  }
  return words;
}

function getEmptyWord(len) {
  let emptyWord = [];
  for (let i = 0; i < len; i++) {
    emptyWord.push("");
  }

  return emptyWord;
}
