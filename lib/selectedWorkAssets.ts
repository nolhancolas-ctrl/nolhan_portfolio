import fs from "fs";
import path from "path";
import type { SelectedWorkMedia } from "@/types/selectedWork";

const assetPaths: Record<keyof SelectedWorkMedia, string> = {
  odysseaHome: "work/sites/odyssea-home.webp",
  odysseaStories: "work/sites/odyssea-stories.webp",
  atelierHome: "work/sites/atelier-home.webp",
  atelierDetail: "work/sites/atelier-detail.webp",
  aubeHome: "work/sites/aube-home.webp",
  aubeDetail: "work/sites/aube-detail.webp",
  odysseaAdmin: "work/software/odyssea-admin-dashboard.webp",
  odysseaAdminStories: "work/software/odyssea-admin-stories.webp",
  odysseaAdminPortfolio: "work/software/odyssea-admin-portfolio.webp",
  terraLogo: "logo/terra-sculptura.webp",
  aubeLogo: "logo/aube-coffee.webp",
  atelierLogo: "logo/nomad.webp",
  odysseaLogo: "logo/odyssea-vision.webp",
};

export function getSelectedWorkMedia(): SelectedWorkMedia {
  const media = {} as SelectedWorkMedia;

  (Object.keys(assetPaths) as Array<keyof SelectedWorkMedia>).forEach((key) => {
    const relativePath = assetPaths[key];
    const absolutePath = path.join(process.cwd(), "public", ...relativePath.split("/"));
    media[key] = fs.existsSync(absolutePath) ? "/" + relativePath : null;
  });

  return media;
}
