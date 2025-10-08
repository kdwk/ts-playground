import { onKeypress } from "../hooks";
import { LEFT, RIGHT } from "../utils/key_sequences";
import { Widget } from "../widget";
import { Text } from "./text";

export class TextSlideshow extends Widget {
  i: number = 0;
  strings: string[] = [""];

  constructor({ i = 0, strings = [""] }: { i?: number; strings?: string[] }) {
    super();
    this.i = i;
    this.strings = strings;
    onKeypress((event) => {
      switch (event.sequence) {
        case LEFT:
          if (this.i > 0) {
            this.setState(() => (this.i -= 1));
          }
          break;
        case RIGHT:
          if (this.i < this.strings.length - 1) {
            this.setState(() => (this.i += 1));
          }
          break;
      }
    });
  }

  build(): Widget {
    return new Text(this.strings.at(this.i) ?? "");
  }
}
