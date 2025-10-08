const inRange = (x: number) => 0 <= x && x < 256;

export const Rgb = (r: number, g: number, b: number): Rgb | null =>
  inRange(r) && inRange(g) && inRange(b)
    ? {
        r,
        g,
        b,
      }
    : null;

export type Rgb = { r: number; g: number; b: number };
