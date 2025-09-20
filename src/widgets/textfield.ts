import { onKeypress } from "../hooks";
import { Widget } from "../widget";
import { Text } from "./text";

export class TextField extends Widget {
    buffer: string = "";

    constructor({placeholder = ""} : {placeholder?:string }) {
        super();
        this.buffer = placeholder;
        onKeypress((event) => {
            switch (event.name) {
                case "backspace":
                    this.buffer = this.buffer.substring(0, this.buffer.length - 1);
                    break;

                case "space":
                    this.buffer += " ";
                    break;

                case "return":
                    this.buffer += "\n";
                    break;
            
                default:
                    this.buffer += event.sequence ?? "";
                    break;
            }
        })
    }

    build(): Widget {
        return new Text(this.buffer);
    }
}