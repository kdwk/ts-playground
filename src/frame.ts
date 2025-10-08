import { ensureSameLength, range } from "./utils/array_utils";

export type Frame = string[][];

/**
 * Renders a frame to the terminal by printing each character.
 */
export function printFrame(frame: Frame) {
  // Clear the terminal screen before drawing
  console.clear();
  for (const row of frame) {
    for (const col of row) {
      process.stdout.write(col);
    }
    process.stdout.write("\n");
  }
}

export function rect(frames: Frame[]): Frame[] {
  const framesSameHeight = ensureSameLength(frames, []);
  return framesSameHeight.map((frame) => ensureSameLength(frame, " "));
}

export function frameSize(frame: Frame): { width: number; height: number } {
  return {
    width: (frame.at(0) ?? []).length,
    height: frame.length,
  };
}
