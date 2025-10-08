import { onKeypress } from "../hooks";
import { range } from "../utils/array_utils";
import { Widget } from "../widget";
import { AnimatedChar } from "./animated_char";
import { Column } from "./column";
import { Text } from "./text";

export class MultiAnimatedChar extends Widget {
  i: number = 1;

  constructor() {
    super();
    onKeypress((event) => {
      switch (event.sequence) {
        case "+":
          this.setState(() => (this.i += 1));
          break;
        case "-":
          if (this.i > 0) {
            this.setState(() => (this.i -= 1));
          }
          break;
      }
    });
  }

  build(): Widget {
    return new Column([
      ...range(this.i).map((i) => new AnimatedChar(30)),
      new Text(this.i.toString()),
    ]);
  }
}
