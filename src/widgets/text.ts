import { Rgb } from "../utils/color";
import { Widget } from "../widget";
import { Column } from "./column";
import { Row } from "./row";
import { SingleChar } from "./single_char";

export class Text extends Widget {
  s: string = "";

  constructor(
    s: string,
    {
      color,
      highlight,
      bold = false,
    }: { color?: Rgb; highlight?: Rgb; bold?: boolean } = {},
  ) {
    super();
    const foregroudSequence = color
      ? "\x1b[38;2;" + [color.r, color.g, color.b].join(";") + "m"
      : "";
    const backgroundSequence = highlight
      ? "\x1b[48;2;" + [highlight.r, highlight.g, highlight.b].join(";") + "m"
      : "";
    const boldnessSequence = bold ? "\x1b[1m" : "";
    const endSequence = "\x1b[0m";
    this.s =
      foregroudSequence +
      backgroundSequence +
      boldnessSequence +
      s +
      endSequence;
  }

  build(): Widget {
    return new Column(
      this.s
        .split("\n")
        .map((line) => new Row([...line].map((char) => new SingleChar(char)))),
    );
  }
}
