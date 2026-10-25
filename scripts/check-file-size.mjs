// File-size law (adapted from ReelsXpress-Platform scripts/check-file-size.mjs):
// one logic per file — 400 lines for code, 600 for tests. Route wrappers
// that are framework-forced are exempt only if named in EXCEPTIONS below,
// with the reason, and nowhere else.
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import process from "node:process";

export const CODE_CEILING = 400;
export const TEST_CEILING = 600;
export const SRC_ROOT = "src";

export const EXCEPTIONS = new Map([]);

export function countLines(source) {
  const lines = source.split(/\r?\n/u);
  if (lines.at(-1) === "") lines.pop();
  return lines.length;
}

export function ceilingFor(filePath) {
  return /\.test\.(ts|tsx)$/u.test(filePath) ? TEST_CEILING : CODE_CEILING;
}

function main() {
  const tracked = execFileSync("git", ["ls-files", "--", SRC_ROOT], {
    encoding: "utf8",
  })
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  const files = tracked.filter(
    (filePath) => /\.(ts|tsx)$/u.test(filePath) && !filePath.endsWith(".d.ts"),
  );
  const violations = [];
  for (const filePath of files) {
    if (EXCEPTIONS.has(filePath)) continue;
    const lines = countLines(readFileSync(filePath, "utf8"));
    const ceiling = ceilingFor(filePath);
    if (lines > ceiling) violations.push(`${filePath} ${lines} lines (ceiling ${ceiling})`);
  }
  if (violations.length > 0) {
    console.error("File-size law violations:\n" + violations.join("\n"));
    process.exit(1);
  }
  console.log(`File-size law OK: ${files.length} files checked.`);
}

main();
