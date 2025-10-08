import { Element } from "./element";
import { rect, type Frame } from "../frame";
import { range } from "../utils/array_utils";

export class RowElement implements Element {
  children: Element[] = [];

  constructor(children: Element[]) {
    this.children = children;
  }

  draw(): Frame {
    const childrenFrames = rect(this.children.map((child) => child.draw()));
    return range(childrenFrames[0]?.length ?? 0).map((i) =>
      childrenFrames.map((frame) => frame[i]!).flat(),
    );
  }
}
