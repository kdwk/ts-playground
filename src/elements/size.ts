// elements/size.ts
import { Element } from "./element";
import { type Frame } from "../frame";

export class SizeElement extends Element {
  constructor(
    private child: Element,
    private width?: number,
    private height?: number,
  ) {
    super();
  }

  draw(): Frame {
    const childFrame = this.child.draw();

    // If no constraints, just return child frame as-is
    if (this.width === undefined && this.height === undefined) {
      return childFrame;
    }

    // Calculate current dimensions
    const currentHeight = childFrame.length;
    const currentWidth = Math.max(...childFrame.map((row) => row.length), 0);

    // Determine target dimensions
    const targetWidth = this.width ?? currentWidth;
    const targetHeight = this.height ?? currentHeight;

    const result: Frame = [];

    // Create sized frame
    for (let i = 0; i < targetHeight; i++) {
      const row: string[] = [];

      if (i < currentHeight) {
        // We have content for this row
        const sourceRow = childFrame[i] || [];

        for (let j = 0; j < targetWidth; j++) {
          // Use nullish coalescing to ensure we always push a string
          row.push(sourceRow[j] ?? " ");
        }
      } else {
        // Empty row (beyond child content)
        for (let j = 0; j < targetWidth; j++) {
          row.push(" ");
        }
      }

      result.push(row);
    }

    return result;
  }
}
