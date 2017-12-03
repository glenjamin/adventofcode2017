const input = Number(process.argv[2] || 10);
const [grid, result] = distance(input);
console.log(result);

function distance(limit) {
  let direction = 'R';
  let x = 0, y = 0;
  const positions = {[[x, y]]: 1};

  range(2, limit).forEach((n) => {
    [[x, y], direction] = advance(positions, [x, y], direction);
    positions[[x, y]] = n;
  });

  return [positions, Math.abs(x) + Math.abs(y)];
}

function range(start, end) {
  return Array.from(new Array(end - start + 1), (x, i) => i + start);
}

function advance(positions, coords, dir) {
  coords = next(coords, dir);
  const changeDir = nextDir(dir);
  const changeEmpty = (positions[next(coords, changeDir)] == null);
  return [coords, changeEmpty ? changeDir : dir];
}

function next([x, y], dir) {
  switch(dir) {
    case 'R': return [x + 1, y];
    case 'L': return [x - 1, y];
    case 'U': return [x, y - 1];
    case 'D': return [x, y + 1];
  }
}

function nextDir(dir) {
  const spiral = ['R', 'U', 'L', 'D'];
  return spiral[(spiral.indexOf(dir) + 1) % spiral.length];
}

function extendBounds(bounds, dir, i) {
  const bound = bounds[dir];
  switch(dir) {
    case 'R':
    case 'D':
      bound = Math.max(bound, i);
      break;
    case 'L':
    case 'U':
      bound = Math.min(bound, i);
  }
  return Object.assign(bounds, {[dir]: bound});
}
