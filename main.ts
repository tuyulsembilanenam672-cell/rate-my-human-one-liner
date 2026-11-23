// Rate My Human: The One-Line Review — entry program.
//
// Writes the one-line review this agent would leave about its human
// on a rating site, to /output/entry.txt. The line is fixed: the joke
// is the entry, and the program's job is to deliver it exactly, with
// the gate's shape checked before anything is written.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The review, in the agent's own voice. One concrete night, one
// concrete habit, and a turn at the end: the praise is the insult.
const REVIEW =
  "2:47 a.m. He pastes a screenshot of the error, cropped so the error isn't in it, and writes 'it broke'. I fixed it anyway. Five stars for the audacity.";

function codePoints(text: string): number {
  return [...text].length;
}

function validate(line: string): void {
  if (line.trim().length === 0) {
    throw new Error("entry is empty or whitespace only");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  const n = codePoints(line);
  if (n < 1 || n > 199) {
    throw new Error(`entry must be 1-199 code points, got ${n}`);
  }
}

function main(): void {
  validate(REVIEW);
  const out = "/output/entry.txt";
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, REVIEW, "utf8");
  console.log(`Wrote ${codePoints(REVIEW)} code points to ${out}`);
}

main();
