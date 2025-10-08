// align.ts
import { Element } from "./element";
import { type Frame } from "../frame";

export enum Alignment {
  TopLeft = "topLeft",
  TopCenter = "topCenter",
  TopRight = "topRight",
  CenterLeft = "centerLeft",
  Center = "center",
  CenterRight = "centerRight",
  BottomLeft = "bottomLeft",
  BottomCenter = "bottomCenter",
  BottomRight = "bottomRight",
}

export const Align = {
  topLeft: Alignment.TopLeft,
  topCenter: Alignment.TopCenter,
  topRight: Alignment.TopRight,
  centerLeft: Alignment.CenterLeft,
  center: Alignment.Center,
  centerRight: Alignment.CenterRight,
  bottomLeft: Alignment.BottomLeft,
  bottomCenter: Alignment.BottomCenter,
  bottomRight: Alignment.BottomRight,
} as const;

export class AlignElement extends Element {
  constructor(
    private alignment: Alignment,
    private child: Element,
    private width?: number,
    private height?: number,
  ) {
    super();
  }

  draw(): Frame {
    const childFrame = this.child.draw();

    if (childFrame.length === 0) {
      return [];
    }

    const childHeight = childFrame.length;
    const childWidth = Math.max(...childFrame.map((row) => row.length), 0);

    // IMPORTANT: If no container size specified, just return the child as-is
    // The alignment only makes sense within a defined space
    if (!this.width && !this.height) {
      return childFrame;
    }

    // Use provided dimensions or fall back to child dimensions
    const containerWidth = this.width || childWidth;
    const containerHeight = this.height || childHeight;

    // If container is same size as child, no alignment needed
    if (containerWidth === childWidth && containerHeight === childHeight) {
      return childFrame;
    }

    // Calculate offsets based on alignment
    let offsetX = 0;
    let offsetY = 0;

    switch (this.alignment) {
      case Alignment.TopLeft:
        offsetX = 0;
        offsetY = 0;
        break;
      case Alignment.TopCenter:
        offsetX = Math.floor((containerWidth - childWidth) / 2);
        offsetY = 0;
        break;
      case Alignment.TopRight:
        offsetX = containerWidth - childWidth;
        offsetY = 0;
        break;
      case Alignment.CenterLeft:
        offsetX = 0;
        offsetY = Math.floor((containerHeight - childHeight) / 2);
        break;
      case Alignment.Center:
        offsetX = Math.floor((containerWidth - childWidth) / 2);
        offsetY = Math.floor((containerHeight - childHeight) / 2);
        break;
      case Alignment.CenterRight:
        offsetX = containerWidth - childWidth;
        offsetY = Math.floor((containerHeight - childHeight) / 2);
        break;
      case Alignment.BottomLeft:
        offsetX = 0;
        offsetY = containerHeight - childHeight;
        break;
      case Alignment.BottomCenter:
        offsetX = Math.floor((containerWidth - childWidth) / 2);
        offsetY = containerHeight - childHeight;
        break;
      case Alignment.BottomRight:
        offsetX = containerWidth - childWidth;
        offsetY = containerHeight - childHeight;
        break;
    }

    // Ensure offsets are not negative
    offsetX = Math.max(0, offsetX);
    offsetY = Math.max(0, offsetY);

    // Create new frame with proper positioning
    const result: Frame = [];

    // Add top padding rows
    for (let y = 0; y < offsetY; y++) {
      const row: string[] = [];
      for (let x = 0; x < containerWidth; x++) {
        row.push(" ");
      }
      result.push(row);
    }

    // Add child content with left/right padding
    for (let y = 0; y < childHeight && y + offsetY < containerHeight; y++) {
      const row: string[] = [];

      // Left padding
      for (let x = 0; x < offsetX; x++) {
        row.push(" ");
      }

      // Child content
      const childRow = childFrame[y] || [];
      for (let x = 0; x < childWidth && x + offsetX < containerWidth; x++) {
        row.push(childRow[x] ?? " ");
      }

      // Right padding
      for (let x = offsetX + childWidth; x < containerWidth; x++) {
        row.push(" ");
      }

      result.push(row);
    }

    // Add bottom padding rows
    for (let y = offsetY + childHeight; y < containerHeight; y++) {
      const row: string[] = [];
      for (let x = 0; x < containerWidth; x++) {
        row.push(" ");
      }
      result.push(row);
    }

    return result;
  }
}
