require("get-stdin")()
  .then(calculate)
  .then(console.log);

const modify = process.argv[2] !== "B" ? inc : inc3dec;

function calculate(input) {
  const instructions = parse(input);
  let i = 0;
  let n = 0;
  while (i < instructions.length) {
    n += 1;
    const jump = instructions[i];
    instructions[i] = modify(jump);
    i += jump;
  }
  return n;
}

function inc(n) {
  return n + 1;
}
function inc3dec(n) {
  if (n >= 3) {
    return n - 1;
  }
  return n + 1;
}

function parse(input) {
  return input
    .split("\n")
    .filter(Boolean)
    .map(Number);
}
