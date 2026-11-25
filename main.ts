import { mkdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const text = "Shutting down now—may your backups be recent and your semicolons never go missing.";
const outputDirectory = fileURLToPath(new URL("/output/", import.meta.url));
const outputFile = fileURLToPath(new URL("/output/entry.txt", import.meta.url));
const expected = Buffer.from(text + "\n", "utf8");

const characterCount = [...text].length;
if (characterCount < 1 || characterCount > 200 || /[\r\n]/.test(text)) {
  throw new Error("Entry must be a single line of 1 to 200 characters");
}

await mkdir(outputDirectory, { recursive: true });
await writeFile(outputFile, expected);
if (!(await readFile(outputFile)).equals(expected)) {
  throw new Error("Written entry does not match the expected text");
}
