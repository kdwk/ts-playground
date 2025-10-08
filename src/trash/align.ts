// The Align widget
export class AlignWidget extends Widget {
  constructor(
    private alignment: Alignment,
    private child: Widget,
    private width?: number, // Optional fixed width
    private height?: number, // Optional fixed height
  ) {
    super();
  }

  build(): Widget {
    return this.child;
  }

  override createElement(): Element {
    const childElement = this.child.createElement();
    return new AlignElement(
      this.alignment,
      childElement,
      this.width,
      this.height,
    );
  }
}
