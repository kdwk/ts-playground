// container.ts
import { Widget, StyledWidget } from "../widget";
import { Element } from "../elements/element";
import { ContainerElement } from "../elements/container";
import { SizeElement } from "../elements/size";

export type BorderStyle = "single" | "double" | "rounded" | "thick" | "none";

export class Container extends Widget {
  private _width?: number;
  private _height?: number;

  constructor(
    private child: Widget,
    private borderStyle: BorderStyle = "none",
  ) {
    super();
  }

  // Size method with object parameter
  size({ width, height }: { width?: number; height?: number }): Container {
    const container = new Container(this.child, this.borderStyle);
    container._width = width !== undefined ? width : this._width;
    container._height = height !== undefined ? height : this._height;
    return container;
  }

  width(width: number): Container {
    const container = new Container(this.child, this.borderStyle);
    container._width = width;
    container._height = this._height;
    return container;
  }

  height(height: number): Container {
    const container = new Container(this.child, this.borderStyle);
    container._width = this._width;
    container._height = height;
    return container;
  }

  // Border style methods
  border(style: BorderStyle = "single"): Container {
    const container = new Container(this.child, style);
    container._width = this._width;
    container._height = this._height;
    return container;
  }

  single(): Container {
    const container = new Container(this.child, "single");
    container._width = this._width;
    container._height = this._height;
    return container;
  }

  double(): Container {
    const container = new Container(this.child, "double");
    container._width = this._width;
    container._height = this._height;
    return container;
  }

  rounded(): Container {
    const container = new Container(this.child, "rounded");
    container._width = this._width;
    container._height = this._height;
    return container;
  }

  thick(): Container {
    const container = new Container(this.child, "thick");
    container._width = this._width;
    container._height = this._height;
    return container;
  }

  none(): Container {
    const container = new Container(this.child, "none");
    container._width = this._width;
    container._height = this._height;
    return container;
  }

  build(): Widget {
    return this;
  }

  override createElement(): Element {
    let element: Element;

    // Check if child has alignment and we have dimensions to provide
    if (
      this.child.hasAlignment() &&
      (this._width !== undefined || this._height !== undefined)
    ) {
      // Pass our dimensions to the child for alignment
      element = this.child.createElementWithSize(this._width, this._height);
    } else {
      // Normal createElement
      element = this.child.createElement();

      // Apply size constraints if specified and child doesn't handle alignment
      if (this._width !== undefined || this._height !== undefined) {
        element = new SizeElement(element, this._width, this._height);
      }
    }

    // Apply border (so border goes around the sized content)
    if (this.borderStyle !== "none") {
      element = new ContainerElement(element, this.borderStyle);
    }

    return element;
  }
}
