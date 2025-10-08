import { Rgb } from "../utils/color";
import { Widget } from "../widget";
import { Row } from "./row";
import { Text } from "./text";

export class TabBar extends Widget {
  i: number = 0;
  tabNames: string[] = [""];

  constructor(i: number, tabNames: string[] = [""]) {
    super();
    this.i = i;
    this.tabNames = tabNames;
  }

  build(): Widget {
    return new Row(
      this.tabNames.map((tabName, i) =>
        i === this.i
          ? new Text(tabName, {
              color: Rgb(0, 154, 255)!,
              highlight: Rgb(235, 235, 235)!,
              bold: true,
            })
          : new Text(tabName),
      ),
    );
  }
}
