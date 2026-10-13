import Image from "next/image";

export type WorkMediaTone = "ocean" | "workshop" | "coffee" | "admin" | "forest" | "paper";

type Props = {
  src: string | null;
  alt: string;
  label: string;
  tone: WorkMediaTone;
  className?: string;
  priority?: boolean;
};

const toneClasses: Record<WorkMediaTone, string> = {
  ocean: "bg-[#082f44] text-white",
  workshop: "bg-[#251c19] text-[#f4e3cf]",
  coffee: "bg-[#e8d6bd] text-[#513829]",
  admin: "bg-[#10243a] text-white",
  forest: "bg-[#163d2c] text-[#f5edd9]",
  paper: "bg-[#f0e8da] text-[#1e2833]",
};

export default function WorkMedia({
  src,
  alt,
  label,
  tone,
  className = "",
  priority = false,
}: Props) {
  return (
    <div
      className={[
        "relative isolate overflow-hidden rounded-[26px] border border-white/65 shadow-[0_24px_70px_rgba(39,31,77,0.12)]",
        toneClasses[tone],
        className,
      ].join(" ")}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(min-width: 1280px) 1100px, (min-width: 768px) 90vw, 100vw"
          className="object-contain"
        />
      ) : (
        <div
          role="img"
          aria-label={alt}
          className="absolute inset-0 flex items-center justify-center p-8 text-center"
        >
          <span className="max-w-[80%] text-2xl font-semibold tracking-[-0.04em] sm:text-4xl">
            {label}
          </span>
        </div>
      )}
    </div>
  );
}
