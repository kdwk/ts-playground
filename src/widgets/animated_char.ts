import { sleep } from "bun";
import { loop } from "../hooks";
import { Widget } from "../widget";
import { range } from "../utils/array_utils";
import { Text } from "./text";
import { Column } from "./column";

export class AnimatedChar extends Widget {
  elapsedTicks: number = 0;
  width: number = 10;

  constructor(width: number) {
    super();
    this.width = width;
    loop(async () => {
      await sleep(15);
      this.setState(() => (this.elapsedTicks += 1));
    });
  }

  build(): Widget {
    const c = Math.sin(((this.elapsedTicks - 90) * Math.PI) / 180);
    const index = Math.max(
      0,
      Math.min(
        Math.round(c * (this.width / 2) + this.width / 2),
        this.width - 1,
      ),
    );
    const s = range(this.width).map((i) => (i === index ? "⚪️" : " "));
    return new Column([new Text(s.join("")), new Text(index.toString())]);
  }
}
