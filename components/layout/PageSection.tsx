export default function PageSection({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={`
        page-section w-full
        max-w-5xl 
        mx-auto 
        px-6 
        py-24 
        ${className}
      `}
    >
      {children}
    </section>
  );
}