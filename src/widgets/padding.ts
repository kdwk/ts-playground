import { Widget, Element } from "../widget";
import { PaddingElement } from "../elements/padding";

export class Padding extends Widget {
  constructor(
    private padding:
      | number
      | { top?: number; bottom?: number; left?: number; right?: number },
    private child: Widget,
  ) {
    super();
  }

  // Padding doesn't rebuild into other widgets
  // It modifies the rendering at the Element level
  build(): Widget {
    return this;
  }

  override createElement(): Element {
    return new PaddingElement(this.padding, this.child.createElement());
  }
}
