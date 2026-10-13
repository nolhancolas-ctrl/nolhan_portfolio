import Image from "next/image";

export type WorkMediaTone = "ocean" | "workshop" | "coffee" | "admin" | "forest" | "paper";

type Props = {
  src: string | null;
  alt: string;
  label: string;
  tone: WorkMediaTone;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
};

const fallbackTone: Record<WorkMediaTone, string> = {
  ocean: "from-[#e0f1f2] to-[#d9e3ef]",
  workshop: "from-[#f3e7de] to-[#e9d8d0]",
  coffee: "from-[#f5e8da] to-[#eadfd6]",
  admin: "from-[#e3eaf2] to-[#dedaf1]",
  forest: "from-[#e4efe8] to-[#e5ebdc]",
  paper: "from-[#f5efe8] to-[#eae4e4]",
};

export default function WorkMedia({
  src,
  alt,
  label,
  tone,
  width = 1600,
  height = 1000,
  className = "",
  priority = false,
}: Props) {
  return (
    <div className={`overflow-hidden rounded-[26px] border border-white/80 bg-white/55 p-1.5 shadow-[0_18px_50px_rgba(53,39,93,0.10)] backdrop-blur-md ${className}`}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          sizes="(min-width: 1280px) 1100px, (min-width: 768px) 90vw, 100vw"
          className="block h-auto w-full rounded-[20px]"
        />
      ) : (
        <div
          role="img"
          aria-label={alt}
          style={{ aspectRatio: `${width} / ${height}` }}
          className={`flex items-center justify-center rounded-[20px] bg-gradient-to-br p-8 text-center ${fallbackTone[tone]}`}
        >
          <span className="max-w-[80%] text-2xl font-semibold tracking-[-0.04em] text-slate-900 sm:text-4xl">{label}</span>
        </div>
      )}
    </div>
  );
}
