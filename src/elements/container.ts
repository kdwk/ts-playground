import { Element } from "./element";
import { type Frame } from "../frame";

const BORDERS = {
  single: {
    topLeft: "┌",
    topRight: "┐",
    bottomLeft: "└",
    bottomRight: "┘",
    horizontal: "─",
    vertical: "│",
  },
  double: {
    topLeft: "╔",
    topRight: "╗",
    bottomLeft: "╚",
    bottomRight: "╝",
    horizontal: "═",
    vertical: "║",
  },
  rounded: {
    topLeft: "╭",
    topRight: "╮",
    bottomLeft: "╰",
    bottomRight: "╯",
    horizontal: "─",
    vertical: "│",
  },
  thick: {
    topLeft: "┏",
    topRight: "┓",
    bottomLeft: "┗",
    bottomRight: "┛",
    horizontal: "━",
    vertical: "┃",
  },
};

export class ContainerElement extends Element {
  constructor(
    private child: Element,
    private borderStyle: "single" | "double" | "rounded" | "thick",
  ) {
    super();
  }

  draw(): Frame {
    const childFrame = this.child.draw();
    const border = BORDERS[this.borderStyle];

    // Clean the child frame first
    const cleanedFrame: Frame = childFrame.map((row) => {
      // Join, remove ANSI codes, then split back into characters
      const joined = row.join("");
      const cleaned = joined.replace(/\u001B\[[0-9;]*m/g, "");
      return [...cleaned]; // Use spread operator to handle multi-byte chars properly
    });

    // Now process the cleaned frame
    const innerWidth = Math.max(...cleanedFrame.map((row) => row.length), 0);
    const innerHeight = cleanedFrame.length;

    const result: Frame = [];

    // Top border
    const topRow: string[] = [border.topLeft];
    for (let i = 0; i < innerWidth; i++) {
      topRow.push(border.horizontal);
    }
    topRow.push(border.topRight);
    result.push(topRow);

    // Content with side borders
    for (let i = 0; i < innerHeight; i++) {
      const row: string[] = [border.vertical];
      const contentRow = cleanedFrame[i] || [];

      // Add content, padding with spaces if needed
      for (let j = 0; j < innerWidth; j++) {
        const cell = contentRow[j];
        row.push(cell !== undefined ? cell : " ");
      }
      row.push(border.vertical);
      result.push(row);
    }
    // Bottom border
    const bottomRow: string[] = [border.bottomLeft];
    for (let i = 0; i < innerWidth; i++) {
      bottomRow.push(border.horizontal);
    }
    bottomRow.push(border.bottomRight);
    result.push(bottomRow);

    return result;
  }
}
