import { sleep } from "bun";
import { printFrame } from "./frame";
import type { Widget } from "./widget";
import readline from "node:readline";

// Configures the terminal for interactive UI mode
function setup() {
  // Raw mode captures each keypress immediately without waiting for Enter
  process.stdin.setRawMode(true);
  // Keeps the process running and listening for input
  process.stdin.resume();
  // Ensures input is interpreted as UTF-8 text
  process.stdin.setEncoding("utf-8");
  // Enables keyboard events to be emitted for each keypress
  readline.emitKeypressEvents(process.stdin);
}

// Flag to control when the render loop should stop
let shouldExit = false;
// Public function to signal that the app should terminate
export const exit = () => {
  shouldExit = true;
};

// Restores the terminal to its normal state
function teardown() {
  // Clear the entire terminal screen
  console.clear();
  // Disable raw mode, returning terminal to normal line-buffered input
  process.stdin.setRawMode(false);
}

// Main render function that creates a continuous update loop for the widget
export async function render(widget: Widget) {
  // Prepare terminal for UI rendering
  setup();

  // Create initial element tree from widget and render it
  let elementTree = widget.createElement();
  printFrame(elementTree.draw());

  // Main render loop - runs until exit() is called
  while (true) {
    // Recreate element tree each frame (allows widget state to update)
    elementTree = widget.createElement();
    // Draw the current frame to the terminal
    printFrame(elementTree.draw());

    // Check if we should stop rendering
    if (shouldExit) {
      break;
    }

    // Wait 10ms before next frame (~100 FPS)
    await sleep(10);
  }

  // Clean up terminal settings
  teardown();
  // Exit the process cleanly
  process.exit(0);
}
