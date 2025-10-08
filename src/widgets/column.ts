import { ColumnElement } from "../elements/column_element";
import { unimplemented } from "../utils/todo";
import { Widget } from "../widget";
import { Element } from "../elements/element";

/**
 * A widget that arranges its children vertically in a column.
 */
export class Column extends Widget {
  // Array of child widgets to be arranged vertically
  children: Widget[] = [];

  /**
   * Creates a new Column widget.
   * @param children - Array of widgets to stack vertically
   */
  constructor(children: Widget[]) {
    super(); // call the parent class Widget constructor
    this.children = children;
  }

  /**
   * Directly creates the element without building
   */
  override createElement(): Element {
    // Convert all child widgets to their corresponding elements
    // and pass them to ColumnElement which handles the actual layout
    return new ColumnElement(
      this.children.map((child) => child.createElement()),
    );
  }

  /**
   * Never called because createElement is overridden
   */
  build(): Widget {
    return unimplemented();
  }
}
