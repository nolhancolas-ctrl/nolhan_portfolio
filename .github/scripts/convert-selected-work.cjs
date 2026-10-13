const sharp = require("sharp");
const fs = require("fs/promises");
const path = require("path");

const outputs = [
  ["atelier-home", "sites"],
  ["atelier-detail", "sites"],
  ["odyssea-home", "sites"],
  ["odyssea-stories", "sites"],
  ["aube-home", "sites"],
  ["aube-detail", "sites"],
  ["odyssea-admin", "software"],
];

(async () => {
  for (const [name, folder] of outputs) {
    const source = path.join("conversion-input", name + ".png");
    const target = path.join("public", "work", folder, name + ".webp");
    await fs.mkdir(path.dirname(target), { recursive: true });
    const before = (await fs.stat(source)).size;
    await sharp(source).webp({ quality: 84, effort: 6 }).toFile(target);
    const result = await sharp(target).metadata();
    const after = (await fs.stat(target)).size;
    if (result.format !== "webp") throw new Error(target + " is not a WebP file");
    console.log(name + ": " + result.width + "x" + result.height + ", " + before + " -> " + after + " bytes");
  }
})().catch((error) => { console.error(error); process.exitCode = 1; });
