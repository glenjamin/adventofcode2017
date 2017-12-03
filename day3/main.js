const input = Number(process.argv[2] || 10);
const task = process.argv[3] || "A";
if (task === "A") {
  const result = buildGrid(
    input,
    (n, values, coords) => n,
    ([x, y]) => Math.abs(x) + Math.abs(y)
  );
  console.log(result);
} else {
  const result = buildGrid(
    input,
    (n, values, coords) =>
      adjacent(coords)
        .map(coord => values[coord])
        .reduce((sum, i) => sum + (i || 0), 0),
    (coords, values) => values[coords]
  );
  console.log(result);
}

function buildGrid(limit, fillIn, answer) {
  let direction = "R";
  let coords = [0, 0];
  let n = 1;
  const values = { [coords]: n };
  let i = 2;

  while (n < limit) {
    [coords, direction] = advance(values, coords, direction);
    values[coords] = n = fillIn(i, values, coords);
    i += 1;
  }

  return answer(coords, values);
}

function range(start, end) {
  return Array.from(new Array(end - start + 1), (x, i) => i + start);
}

function advance(positions, coords, dir) {
  coords = next(coords, dir);
  const changeDir = nextDir(dir);
  const changeEmpty = positions[next(coords, changeDir)] == null;
  return [coords, changeEmpty ? changeDir : dir];
}

function next([x, y], dir) {
  switch (dir) {
    case "R":
      return [x + 1, y];
    case "L":
      return [x - 1, y];
    case "U":
      return [x, y - 1];
    case "D":
      return [x, y + 1];
  }
}

function nextDir(dir) {
  const spiral = ["R", "U", "L", "D"];
  return spiral[(spiral.indexOf(dir) + 1) % spiral.length];
}

function adjacent(coords) {
  return [
    next(coords, "R"),
    next(next(coords, "R"), "U"),
    next(next(coords, "R"), "D"),
    next(coords, "L"),
    next(next(coords, "L"), "U"),
    next(next(coords, "L"), "D"),
    next(coords, "U"),
    next(coords, "D")
  ];
}
