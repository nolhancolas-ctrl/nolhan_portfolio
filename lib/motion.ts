export const reveal = {
  initial: { opacity: 0, y: 32, filter: "blur(5px)" },
  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
  viewport: { once: true, amount: 0.12, margin: "0px 0px -40px 0px" as const },
  transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
};
