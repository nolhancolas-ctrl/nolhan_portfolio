// lib/workAssets.ts
import fs from "fs";
import path from "path";
import type { WorkImage } from "@/types/work";

function fileToLabel(file: string, fallback: string): string {
  const base = file.replace(/\.[^/.]+$/, "");
  const pretty = base.replace(/[_-]+/g, " ").trim();
  if (!pretty) return fallback;
  return pretty.charAt(0).toUpperCase() + pretty.slice(1);
}

function getImagesFromFolder(folder: string, fallbackAlt: string): WorkImage[] {
  const dir = path.join(process.cwd(), "public", folder);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((file) => /\.(png|jpe?g|webp|gif|avif)$/i.test(file))
    .sort()
    .map((file) => ({
      src: `/${folder}/${file}`,
      alt: fileToLabel(file, fallbackAlt),
    }));
}

export function getLogoImages(): WorkImage[] {
  return getImagesFromFolder("logos", "Logo");
}

// tes fichiers sont softwares1.png, softwares2.png, etc. à la racine public.
// Si tu les mets plus tard dans /public/softwares/, change juste "softwares" ici.
export function getSoftwareImages(): WorkImage[] {
  // Si tu crées un dossier /public/softwares, mets "softwares" en 1er param.
  return getImagesFromFolder("", "Software screen");
}