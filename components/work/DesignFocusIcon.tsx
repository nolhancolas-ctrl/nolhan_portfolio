type Props = { index: number };

export default function DesignFocusIcon({ index }: Props) {
  return (
    <span aria-hidden="true" className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/80 bg-white/65 text-[#75639d] shadow-[0_6px_20px_rgba(68,50,117,0.06)]">
      <svg viewBox="0 0 32 32" width="21" height="21" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        {index === 0 && <><path d="M6 12V8a2 2 0 0 1 2-2h4M20 6h4a2 2 0 0 1 2 2v4M26 20v4a2 2 0 0 1-2 2h-4M12 26H8a2 2 0 0 1-2-2v-4" /><circle cx="16" cy="16" r="4" /></>}
        {index === 1 && <><path d="M16 5 18.5 13.5 27 16l-8.5 2.5L16 27l-2.5-8.5L5 16l8.5-2.5L16 5Z" /><path d="M23 5v4M21 7h4" /></>}
        {index === 2 && <><path d="m16 5 11 6-11 6L5 11l11-6ZM5 16l11 6 11-6M5 21l11 6 11-6" /></>}
      </svg>
    </span>
  );
}
