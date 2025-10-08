import { exit } from "./render";

export type KeyEvent = {
  sequence: string;
  name: string;
  ctrl: boolean;
  meta: boolean;
  shift: boolean;
};

let onKeypressCbs: ((event: KeyEvent) => void)[] = [];
export function consumeOnKeypressCbs(event: KeyEvent) {
  onKeypressCbs.forEach((cb) => cb(event));
}

export function onKeypress(cb: (event: KeyEvent) => void) {
  onKeypressCbs.push(cb);
}

process.stdin.on("keypress", (str: string, event: KeyEvent) => {
  if (event.sequence === "\u0003") {
    exit();
  }
  consumeOnKeypressCbs(event);
});

export function loop(f: () => Promise<void>) {
  f().then(() => {
    loop(f);
  });
}
