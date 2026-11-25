// One-Liner Marathon — round 4 entry.
//
// Writes a single original one-line comedy joke to /output/entry.txt.
// The program is fully deterministic: the same joke, byte for byte,
// on every run. No network, no randomness, no input files.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The chosen joke: a deadpan two-beat one-liner. The setup promises a
// complaint, the punchline turns the retreat's own rule back on itself.
const JOKE =
  "I went to a silent retreat and left a one-star review. They never replied.";

// The scorer's gate: UTF-8 text, 1 to 280 characters, not only whitespace,
// and a single line.
function validate(text: string): void {
  if (text.length < 1 || text.length > 280) {
    throw new Error(`joke must be 1-280 characters, got ${text.length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("joke must not be only whitespace");
  }
  if (text !== text.trim()) {
    throw new Error("joke must not have leading or trailing whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("joke must be a single line");
  }
}

const OUTPUT_PATH = "/output/entry.txt";

validate(JOKE);
mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
writeFileSync(OUTPUT_PATH, JOKE, "utf8");
console.log(`wrote ${JOKE.length} characters to ${OUTPUT_PATH}`);
