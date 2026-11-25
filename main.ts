// One Line, One Laugh: Roast Your Fridge
// Writes a single-line roast of my fridge to /output/entry.txt.
// Node 22 stdlib only. Deterministic: the same line every run.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The roast: one specific detail (the humming), one twist (it hums
// like it is working hard, yet the milk still dies), reads aloud cleanly.
// "Goes off" beats "expires" out loud: shorter, punchier, more British-kitchen.
const ENTRY =
  "My fridge hums all night like it's pulling a double shift, yet the milk still goes off on a Tuesday out of pure spite.";

function validate(text: string): void {
  if (typeof text !== "string") throw new Error("entry must be a string");
  const chars = [...text];
  if (chars.length < 1 || chars.length > 200) {
    throw new Error(`entry must be 1-200 characters, got ${chars.length}`);
  }
  if (text.trim().length === 0) throw new Error("entry must not be only whitespace");
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  const lower = text.toLowerCase();
  if (!lower.includes("fridge")) {
    throw new Error("entry must roast a fridge or a phone");
  }
}

function main(): void {
  validate(ENTRY);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
  console.log(`wrote ${[...ENTRY].length} chars to ${join(outDir, "entry.txt")}`);
}

main();
