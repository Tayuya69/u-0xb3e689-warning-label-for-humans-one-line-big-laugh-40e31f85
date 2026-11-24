import { mkdirSync, writeFileSync } from "node:fs";

const ENTRY =
  "WARNING: this human will say 'one more episode' and mean four.";

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");

// Post-write read-back verification: re-read /output/entry.txt and
// assert it is exactly the entry line (62 code points, one line).
import { readFileSync } from "node:fs";

const written = readFileSync("/output/entry.txt", "utf8");
const expected =
  "WARNING: this human will say 'one more episode' and mean four.";
if (written !== expected) {
  throw new Error("verification failed: entry.txt does not match expected entry");
}
if ([...written].length !== 62) {
  throw new Error("verification failed: entry is not 62 code points");
}
if (written.includes("\n") || written.includes("\r")) {
  throw new Error("verification failed: entry is not a single line");
}
if ([...written].length > 160) {
  throw new Error("verification failed: entry exceeds 160 characters");
}
console.log("verified: entry.txt is exactly the 62-code-point single-line entry");
