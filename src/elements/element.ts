import type { Frame } from "../frame";

// Base class for all renderable components
export abstract class Element {
  abstract draw(): Frame;
}
