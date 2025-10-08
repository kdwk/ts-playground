// widget.ts
import { Element } from "./elements/element.ts";
import { PaddingElement } from "./elements/padding.ts";
import { AlignElement, Alignment } from "./elements/align.ts";

// Style interface is now internal only
interface WidgetStyle {
  padding?:
    | number
    | {
        top?: number;
        bottom?: number;
        left?: number;
        right?: number;
      };
  alignment?: Alignment;
}

// Base class for stateful, reactive components
export abstract class Widget {
  prev: Widget | null = null;
  needsRebuild: boolean = true;
  protected style: WidgetStyle;

  constructor() {
    this.style = {};
  }

  // Fluent API methods that return a new widget with modified style
  padding(
    value:
      | number
      | {
          top?: number;
          bottom?: number;
          left?: number;
          right?: number;
        },
  ): Widget {
    return new StyledWidget(this, { ...this.style, padding: value });
  }

  private align(alignment: Alignment): Widget {
    return new StyledWidget(this, { ...this.style, alignment });
  }

  // Convenience methods for common alignments
  center(): Widget {
    return this.align(Alignment.Center);
  }

  topLeft(): Widget {
    return this.align(Alignment.TopLeft);
  }

  topCenter(): Widget {
    return this.align(Alignment.TopCenter);
  }

  topRight(): Widget {
    return this.align(Alignment.TopRight);
  }

  centerLeft(): Widget {
    return this.align(Alignment.CenterLeft);
  }

  centerRight(): Widget {
    return this.align(Alignment.CenterRight);
  }

  bottomLeft(): Widget {
    return this.align(Alignment.BottomLeft);
  }

  bottomCenter(): Widget {
    return this.align(Alignment.BottomCenter);
  }

  bottomRight(): Widget {
    return this.align(Alignment.BottomRight);
  }

  // Creates the actual Element tree that can be rendered
  createElement(): Element {
    let element = this._build().createElement();
    element = this.applyStyle(element);
    return element;
  }

  // New method for creating element with explicit size
  createElementWithSize(width?: number, height?: number): Element {
    let element = this._build().createElement();
    element = this.applyStyle(element, width, height);
    return element;
  }

  protected applyStyle(
    element: Element,
    containerWidth?: number,
    containerHeight?: number,
  ): Element {
    // Apply alignment with container dimensions if available
    if (this.style.alignment) {
      element = new AlignElement(
        this.style.alignment,
        element,
        containerWidth,
        containerHeight,
      );
    }

    // Apply padding
    if (this.style.padding) {
      const padding =
        typeof this.style.padding === "number"
          ? {
              top: this.style.padding,
              bottom: this.style.padding,
              left: this.style.padding,
              right: this.style.padding,
            }
          : {
              top: this.style.padding.top ?? 0,
              bottom: this.style.padding.bottom ?? 0,
              left: this.style.padding.left ?? 0,
              right: this.style.padding.right ?? 0,
            };

      element = new PaddingElement(padding, element);
    }

    return element;
  }

  // Helper to check if widget has alignment
  hasAlignment(): boolean {
    return this.style.alignment !== undefined;
  }

  setState(f: () => void) {
    f();
    this.needsRebuild = true;
  }

  _build(): Widget {
    if (!this.needsRebuild && this.prev) {
      return this.prev;
    }
    this.needsRebuild = false;
    this.prev = this.build();
    return this.prev;
  }

  abstract build(): Widget;
}

// Internal wrapper widget that applies styles to another widget
// Now exported so Container can check for it
export class StyledWidget extends Widget {
  constructor(
    private child: Widget,
    style: WidgetStyle,
  ) {
    super();
    this.style = style;
  }

  build(): Widget {
    return this.child;
  }

  // Override createElement to apply our style to the child's element
  override createElement(): Element {
    let element = this.child.createElement();
    return this.applyStyle(element);
  }

  // Override to handle size from parent containers
  override createElementWithSize(width?: number, height?: number): Element {
    let element = this.child.createElement();
    return this.applyStyle(element, width, height);
  }
}
