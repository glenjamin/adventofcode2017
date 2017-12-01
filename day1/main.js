const input = process.argv[2] || "1122";
const operation = process.argv[3] ? halfway : next;

const chars = input.split("");

const result =
  input
  .split("")
  .map(Number)
  .filter((char, i, chars) => char == operation(chars, i))
  .reduce((sum, n) => sum + n, 0);

console.log(result);

function next(arr, i) {
  return arr[(i + 1) % arr.length];
}
function halfway(arr, i) {
  const l = arr.length;
  return arr[(i + (l/2)) % l];
}
