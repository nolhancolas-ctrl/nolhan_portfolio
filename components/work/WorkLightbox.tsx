"use client";

import { useEffect, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Counter from "yet-another-react-lightbox/plugins/counter";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

export type WorkLightboxSlide = {
  src: string;
  alt: string;
  title?: string;
};

type WorkLightboxProps = {
  slides: WorkLightboxSlide[];
  index: number;
  open: boolean;
  sectionLabel: string;
  onClose: () => void;
  labels: {
    close: string;
    previous: string;
    next: string;
    zoomIn: string;
    zoomOut: string;
  };
};

export default function WorkLightbox({
  slides,
  index,
  open,
  sectionLabel,
  onClose,
  labels,
}: WorkLightboxProps) {
  const [viewIndex, setViewIndex] = useState(index);

  useEffect(() => {
    if (open) setViewIndex(index);
  }, [index, open]);

  const currentSlide = slides[viewIndex];

  return (
    <Lightbox
      open={open}
      close={onClose}
      index={viewIndex}
      slides={slides.map((slide) => ({
        src: slide.src,
        alt: slide.alt,
      }))}
      plugins={[Counter, Zoom]}
      animation={{
        fade: 220,
        swipe: 360,
        zoom: 280,
      }}
      carousel={{
        finite: false,
        imageFit: "contain",
        padding: "7%",
      }}
      controller={{
        closeOnBackdropClick: true,
        closeOnPullDown: true,
      }}
      zoom={{
        maxZoomPixelRatio: 3,
        zoomInMultiplier: 2,
        scrollToZoom: true,
      }}
      counter={{
        separator: " / ",
        container: {
          className: "work-lightbox-counter",
        },
      }}
      labels={{
        Close: labels.close,
        Previous: labels.previous,
        Next: labels.next,
        "Zoom in": labels.zoomIn,
        "Zoom out": labels.zoomOut,
      }}
      on={{
        view: ({ index: nextIndex }) => setViewIndex(nextIndex),
      }}
      render={{
        controls: () =>
          currentSlide ? (
            <div className="work-lightbox-meta" aria-live="polite">
              <span>{sectionLabel}</span>
              <strong>{currentSlide.title ?? currentSlide.alt}</strong>
            </div>
          ) : null,
      }}
    />
  );
}
