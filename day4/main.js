require("get-stdin")()
  .then(calculate)
  .then(console.log);

const processWord = process.argv[2] !== "B" ? x => x : sortWord;

function calculate(input) {
  return input
    .split("\n")
    .filter(Boolean)
    .map(s =>
      s
        .trim()
        .split(/\s+/)
        .map(processWord)
    )
    .filter(unique).length;
}

function sortWord(word) {
  return word
    .split("")
    .sort()
    .join("");
}
function unique(words) {
  return words.length === new Set(words).size;
}
