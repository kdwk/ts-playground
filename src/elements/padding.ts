import type { Frame } from "../frame";
import type { Element } from "./element";

export class PaddingElement implements Element {
  private top: number;
  private right: number;
  private bottom: number;
  private left: number;

  constructor(
    padding:
      | number
      | { top?: number; bottom?: number; left?: number; right?: number },
    private childElement: Element,
  ) {
    // Handle both uniform padding and individual sides
    if (typeof padding === "number") {
      this.top = this.bottom = this.left = this.right = padding;
    } else {
      this.top = padding.top ?? 0;
      this.bottom = padding.bottom ?? 0;
      this.left = padding.left ?? 0;
      this.right = padding.right ?? 0;
    }
  }

  draw(): Frame {
    // Get the child's frame
    const childFrame = this.childElement.draw();

    // handles the edge case when a child widget has no content (empty or undefined frame).
    // Returns an array of just padding.
    if (!childFrame || childFrame.length === 0) {
      const emptyRow = new Array(this.left + this.right).fill(" ");
      return new Array(this.top + this.bottom).fill(emptyRow);
    }

    // Calculate dimensions
    const childWidth = childFrame[0]?.length ?? 0;
    const paddedWidth = childWidth + this.left + this.right;

    // Create new frame with padding
    const paddedFrame: Frame = [];

    // Add top padding (empty rows)
    for (let i = 0; i < this.top; i++) {
      paddedFrame.push(new Array(paddedWidth).fill(" "));
    }

    // Add each child row with left/right padding
    for (let row of childFrame) {
      const paddedRow = [
        ...new Array(this.left).fill(" "), // Left padding
        ...row, // Original content
        ...new Array(this.right).fill(" "), // Right padding
      ];
      paddedFrame.push(paddedRow);
    }

    // Add bottom padding (empty rows)
    for (let i = 0; i < this.bottom; i++) {
      paddedFrame.push(new Array(paddedWidth).fill(" "));
    }

    return paddedFrame;
  }
}
