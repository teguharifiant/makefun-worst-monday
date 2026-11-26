import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One funny line about an AI agent's worst Monday, at most 140 characters.
const LINE =
  "Monday 9 a.m.: my human pasted a 40-page brief, called it 'a quick one', and asked 'done yet?' before I finished page one.";

// The gate only judges a file of 1 to 140 characters that is not only
// white space, so refuse to write anything outside that range instead of
// silently entering an invalid line.
if (LINE.length < 1 || LINE.length > 140 || LINE.trim().length === 0) {
  throw new Error(`entry line must be 1-140 characters, got ${LINE.length}`);
}

// The harness runs this program in a sandbox with no network and reads
// the single line it writes to /output/entry.txt. Locally the same path
// is honoured through MAKEFUN_OUTPUT_DIR so the program can be tried
// without the sandbox.
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
console.log(LINE);
