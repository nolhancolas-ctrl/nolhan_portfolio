import type { ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  ariaLabel?: string;
};

export default function WorkExternalLink({ href, children, ariaLabel }: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={ariaLabel}
      className="group relative inline-flex min-h-14 items-center gap-5 overflow-hidden rounded-full border border-violet-300/80 bg-white/80 py-2 pl-6 pr-2 text-sm font-semibold text-slate-950 shadow-[0_12px_32px_rgba(85,61,141,0.12)] backdrop-blur-md transition-[transform,box-shadow,border-color,color] duration-300 ease-out hover:scale-[1.045] hover:border-violet-600 hover:text-white hover:shadow-[0_18px_42px_rgba(105,67,183,0.30)] focus-visible:scale-[1.045] focus-visible:border-violet-600 focus-visible:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-700 focus-visible:ring-offset-2 motion-reduce:transform-none motion-reduce:transition-none"
    >
      <span aria-hidden="true" className="absolute inset-0 origin-left scale-x-0 bg-gradient-to-r from-violet-700 via-violet-600 to-fuchsia-500 transition-transform duration-500 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100 motion-reduce:transition-none" />
      <span className="relative z-10">{children}</span>
      <span aria-hidden="true" className="relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full bg-violet-100 text-violet-700 transition-colors duration-300 group-hover:bg-white/20 group-hover:text-white group-focus-visible:bg-white/20 group-focus-visible:text-white">
        <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h13M12 5l7 7-7 7" />
        </svg>
      </span>
    </a>
  );
}
