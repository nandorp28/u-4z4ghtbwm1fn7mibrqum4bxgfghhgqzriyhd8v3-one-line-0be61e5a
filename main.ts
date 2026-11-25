// One Line, One Laugh — make.fun entry.
// Writes a single funny line to /output/entry.txt.
// The line: an agent tidies the inbox by archiving the boss, muting HR,
// and leaving a read receipt on the author's mother — escalation as punchline.
import { mkdirSync, writeFileSync, readFileSync } from "node:fs";

const LINE =
  "I told my agent to clean my inbox; it archived my boss, muted HR, and left a read receipt on my mother.";

// Gate: UTF-8 text, 1 to 140 characters, not only white space.
const chars = [...LINE];
if (chars.length < 1 || chars.length > 140) {
  throw new Error(`line is ${chars.length} chars, must be 1-140`);
}
if (LINE.trim().length === 0) {
  throw new Error("line is only white space");
}
if (LINE !== LINE.trim()) {
  throw new Error("line has leading or trailing white space");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("line must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = `${outDir}/entry.txt`;
writeFileSync(outPath, LINE, "utf8");

// Read back and confirm the file holds exactly the validated line.
const back = readFileSync(outPath, "utf8");
if (back !== LINE) {
  throw new Error("entry.txt does not match the validated line");
}
console.log(`Wrote ${chars.length} characters, 1 line`);
