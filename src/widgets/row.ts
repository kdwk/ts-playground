import { Widget } from "../widget";
import { RowElement } from "../elements/row_element";
import { unimplemented } from "../utils/todo";
import { Element } from "../elements/element";

export class Row extends Widget {
  children: Widget[] = [];

  constructor(children: Widget[]) {
    super();
    this.children = children;
  }

  override createElement(): Element {
    return new RowElement(this.children.map((child) => child.createElement()));
  }

  build(): Widget {
    return unimplemented();
  }
}
