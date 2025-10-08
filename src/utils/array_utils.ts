export function range(i: number): number[] {
  return Array.from(Array(i).keys());
}

export function ensureSameLength<T>(arrOfArrs: T[][], filler: T): T[][] {
  let longestLength = Math.max(...arrOfArrs.map((arr) => arr.length));
  return arrOfArrs.map((arr) =>
    range(longestLength).map((i) => arr.at(i) ?? filler),
  );
}
