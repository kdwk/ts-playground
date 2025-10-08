import { sleep } from "bun";
import { Widget } from "../widget";
import { Text } from "./text";

export class LoadString extends Widget {
  s: string = "Loading";

  constructor() {
    super();
    (async () => {
      await sleep(2000);
      this.setState(() => (this.s = "Done!"));
    })();
  }

  build(): Widget {
    return new Text(this.s);
  }
}
