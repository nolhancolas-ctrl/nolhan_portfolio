import fs from "fs";
import path from "path";
import DesignSectionClient, { DesignImage } from "./DesignSectionClient";

function getDesignImages(): DesignImage[] {
  const dir = path.join(process.cwd(), "public", "landing");

  if (!fs.existsSync(dir)) {
    return [];
  }

  const files = fs
    .readdirSync(dir)
    .filter((file) => /\.(png|jpe?g|webp|gif|avif)$/i.test(file))
    .sort();

  return files.map((file) => {
    const baseName = file.replace(/\.[^/.]+$/, "");
    const pretty = baseName
      .replace(/[_-]+/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    const label = pretty
      ? pretty.charAt(0).toUpperCase() + pretty.slice(1)
      : "Landing page design";

    return {
      src: `/landing/${file}`,
      alt: label,
    };
  });
}

export default function DesignSection() {
  const images = getDesignImages();
  return <DesignSectionClient images={images} />;
}