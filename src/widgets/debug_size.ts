import { DebugSizeElement } from "../elements/debug_size_element";
import { unimplemented } from "../utils/todo";
import { Widget } from "../widget";
import { Element } from "../elements/element";

export class DebugSize extends Widget {
  child: Widget;

  constructor(child: Widget) {
    super();
    this.child = child;
  }

  override createElement(): Element {
    return new DebugSizeElement(this.child.createElement());
  }

  build(): Widget {
    return unimplemented();
  }
}
