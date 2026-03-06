export default function GradientBackground() {
  return (
    <div
      aria-hidden
      className="
        fixed inset-0 -z-50 overflow-hidden
        bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.4),rgba(240,240,240,0.25))]
      "
    >
      {/* BLOBS PASTELS VIFS PILOTÉS PAR CSS VARS */}
      <div className="blob blob-1 mix-blend-screen animate-blob-1" />
      <div className="blob blob-2 mix-blend-screen animate-blob-2" />
      <div className="blob blob-3 mix-blend-screen animate-blob-3" />
    </div>
  );
}