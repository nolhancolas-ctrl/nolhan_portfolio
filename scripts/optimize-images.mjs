import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const projectRoot = process.cwd();
const publicRoot = path.join(projectRoot, "public");
const sourceRoots = ["app", "components", "hooks", "lib", "types"];
const sourceExtensions = new Set([".ts", ".tsx", ".js", ".jsx", ".css", ".json"]);
const rasterExtensions = new Set([".png", ".jpg", ".jpeg", ".webp", ".avif"]);

async function walk(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await walk(fullPath)));
    } else {
      files.push(fullPath);
    }
  }

  return files;
}

function imageSettings(relativePath, extension) {
  const normalized = relativePath.replaceAll("\\", "/");

  if (normalized.startsWith("landing/")) {
    return { width: 1280, quality: 82 };
  }

  if (normalized.startsWith("logos/")) {
    return { width: 768, quality: 88 };
  }

  if (normalized.startsWith("app/")) {
    return { width: 1080, quality: 82 };
  }

  if (extension === ".avif") {
    return { width: 1600, quality: 62 };
  }

  return { width: 1600, quality: 82 };
}

async function folderSize(directory) {
  const files = await walk(directory);
  let total = 0;

  for (const file of files) {
    const stat = await fs.stat(file);
    total += stat.size;
  }

  return total;
}

function formatSize(bytes) {
  return `${(bytes / 1024 / 1024).toFixed(2)} Mo`;
}

const totalBefore = await folderSize(publicRoot);
const publicFiles = await walk(publicRoot);
const converted = [];
const recompressed = [];
const skipped = [];

for (const sourcePath of publicFiles) {
  const extension = path.extname(sourcePath).toLowerCase();

  if (!rasterExtensions.has(extension)) {
    continue;
  }

  const relativePath = path.relative(publicRoot, sourcePath);
  const settings = imageSettings(relativePath, extension);
  const before = (await fs.stat(sourcePath)).size;

  const sameFormat = extension === ".webp" || extension === ".avif";
  const targetPath = sameFormat
    ? sourcePath
    : sourcePath.slice(0, -extension.length) + ".webp";

  const temporaryPath = `${targetPath}.optimizing`;

  let pipeline = sharp(sourcePath)
    .rotate()
    .resize({
      width: settings.width,
      withoutEnlargement: true,
      fit: "inside",
    });

  if (extension === ".avif") {
    pipeline = pipeline.avif({
      quality: settings.quality,
      effort: 6,
    });
  } else {
    pipeline = pipeline.webp({
      quality: settings.quality,
      alphaQuality: 92,
      effort: 6,
      smartSubsample: true,
    });
  }

  await pipeline.toFile(temporaryPath);

  const after = (await fs.stat(temporaryPath)).size;

  if (after >= before * 0.98) {
    await fs.rm(temporaryPath, { force: true });
    skipped.push({
      file: relativePath,
      reason: "gain inférieur à 2 %",
      before,
      after,
    });
    continue;
  }

  await fs.rm(targetPath, { force: true });
  await fs.rename(temporaryPath, targetPath);

  const targetRelativePath = path.relative(publicRoot, targetPath);

  if (sameFormat) {
    recompressed.push({
      source: relativePath,
      target: targetRelativePath,
      before,
      after,
    });
  } else {
    converted.push({
      source: relativePath,
      target: targetRelativePath,
      before,
      after,
    });
  }
}

const sourceFiles = [];

for (const rootName of sourceRoots) {
  const root = path.join(projectRoot, rootName);

  try {
    for (const file of await walk(root)) {
      if (sourceExtensions.has(path.extname(file).toLowerCase())) {
        sourceFiles.push(file);
      }
    }
  } catch {
    // Dossier optionnel absent.
  }
}

for (const file of sourceFiles) {
  let contents = await fs.readFile(file, "utf8");
  const initialContents = contents;

  for (const item of converted) {
    const oldRelative = item.source.replaceAll("\\", "/");
    const newRelative = item.target.replaceAll("\\", "/");

    contents = contents
      .split(`/${oldRelative}`)
      .join(`/${newRelative}`)
      .split(`public/${oldRelative}`)
      .join(`public/${newRelative}`);
  }

  // Références construites dynamiquement.
  contents = contents
    .split("/app/app${appId}1.jpg")
    .join("/app/app${appId}1.webp")
    .split("/app/app${appId}${pageIndex}.jpg")
    .join("/app/app${appId}${pageIndex}.webp")
    .split("/landing/designed${idx}.png")
    .join("/landing/designed${idx}.webp");

  if (contents !== initialContents) {
    await fs.writeFile(file, contents);
  }
}

// Les références pointent maintenant vers les fichiers WebP.
for (const item of converted) {
  await fs.rm(path.join(publicRoot, item.source), { force: true });
}

const totalAfter = await folderSize(publicRoot);

const report = {
  generatedAt: new Date().toISOString(),
  totalBefore,
  totalAfter,
  savedBytes: totalBefore - totalAfter,
  reductionPercent: Number(
    (((totalBefore - totalAfter) / totalBefore) * 100).toFixed(1),
  ),
  converted,
  recompressed,
  skipped,
};

await fs.writeFile(
  path.join(projectRoot, "scripts", "image-optimization-report.json"),
  JSON.stringify(report, null, 2),
);

console.log("");
console.log("Optimisation terminée");
console.log(`Avant     : ${formatSize(totalBefore)}`);
console.log(`Après     : ${formatSize(totalAfter)}`);
console.log(`Économie  : ${formatSize(totalBefore - totalAfter)}`);
console.log(`Réduction : ${report.reductionPercent} %`);
console.log(`Converties: ${converted.length}`);
console.log(`Recompressées: ${recompressed.length}`);
console.log(`Conservées: ${skipped.length}`);
