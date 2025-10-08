import { Widget } from "../widget";
import { onKeypress } from "../hooks";
import { Text } from "./text";

export class Counter extends Widget {
  i: number = 0;

  constructor(i: number) {
    super();
    this.i = i;
    onKeypress((event) => {
      switch (event.sequence) {
        case "+":
          this.setState(() => (this.i += 1));
          break;
        case "-":
          this.setState(() => (this.i -= 1));
          break;
      }
    });
  }

  build(): Widget {
    return new Text(this.i.toString());
  }
}
