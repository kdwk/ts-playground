import { rect, type Frame } from "../frame";
import { Element } from "./element";

export class ColumnElement implements Element {
  children: Element[] = [];

  constructor(children: Element[]) {
    this.children = children;
  }

  draw(): Frame {
    const childrenFrames = rect(this.children.map((child) => child.draw()));
    return childrenFrames.flat();
  }
}
