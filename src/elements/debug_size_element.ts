import { frameSize, type Frame } from "../frame";
import { Element } from "./element";
import { Text } from "../widgets/text";
import { ColumnElement } from "./column_element";

export class DebugSizeElement implements Element {
  child: Element;

  constructor(child: Element) {
    this.child = child;
  }

  draw(): Frame {
    const childFrame = this.child.draw();
    const size = frameSize(childFrame);
    return new ColumnElement([
      this.child,
      new Text(
        "(w: " + size.width + ", h: " + size.height + ")",
      ).createElement(),
    ]).draw();
  }
}
