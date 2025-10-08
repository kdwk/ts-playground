import { onKeypress } from "../hooks";
import { Widget } from "../widget";
import { Column } from "./column";
import { TabBar } from "./tab_bar";

export class Tabs extends Widget {
  private tabIndex: number = 0;
  private tabs: { name: string; content: Widget }[];
  static defaultTab = { name: "", content: new Column([]) };

  constructor({
    initialTab = 0,
    pages = [Tabs.defaultTab],
  }: {
    initialTab: number;
    pages: { name: string; content: Widget }[];
  }) {
    super();
    this.tabs = pages.length > 0 ? pages : [Tabs.defaultTab];
    this.setPage(initialTab);
    onKeypress((event) => {
      switch (event.name) {
        case "tab":
          this.setState(() =>
            this.setPage(event.shift ? this.tabIndex - 1 : this.tabIndex + 1),
          );
          break;

        default:
          break;
      }
    });
  }

  setPage(page: number) {
    this.tabIndex = Math.max(0, Math.min(page, this.tabs.length - 1));
  }

  build(): Widget {
    return new Column([
      new TabBar(
        this.tabIndex,
        this.tabs.map((tab) => tab.name),
      ),
      this.tabs[this.tabIndex]!.content,
    ]);
  }
}
