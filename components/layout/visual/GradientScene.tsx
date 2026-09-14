"use client";
import { useEffect, useState } from "react";
import { ShaderGradient, ShaderGradientCanvas } from "@shadergradient/react";
import { useThree } from "@react-three/fiber";

const defaultPalette = ["#aa8fe8", "#f5b094", "#f5f1ff"];

function RenderLifecycle({ active, onLost }: { active: boolean; onLost: () => void }) {
  const gl = useThree((state) => state.gl);
  const setFrameloop = useThree((state) => state.setFrameloop);
  useEffect(() => { setFrameloop(active ? "always" : "never"); }, [active, setFrameloop]);
  useEffect(() => {
    const canvas = gl.domElement;
    canvas.addEventListener("webglcontextlost", onLost);
    return () => canvas.removeEventListener("webglcontextlost", onLost);
  }, [gl, onLost]);
  return null;
}

export default function GradientScene({ active, compact }: { active: boolean; compact: boolean }) {
  const [palette, setPalette] = useState(defaultPalette);
  const [lost, setLost] = useState(false);
  useEffect(() => {
    const root = document.documentElement;
    // Preserve the existing work gallery's click-to-change background interaction.
    const update = () => setPalette(defaultPalette.map((fallback, i) => root.style.getPropertyValue(`--blob${i + 1}`).trim() || fallback));
    const observer = new MutationObserver(update);
    observer.observe(root, { attributes: true, attributeFilter: ["style"] });
    update();
    return () => observer.disconnect();
  }, []);
  if (lost) return null;
  return (
    <div className="portfolio-shader">
      <ShaderGradientCanvas style={{ width: "100%", height: "100%" }} pixelDensity={compact ? 1 : 1.25} fov={45}
        powerPreference="low-power" pointerEvents="none">
        <RenderLifecycle active={active} onLost={() => setLost(true)} />
        <ShaderGradient control="props" type="waterPlane" animate={active ? "on" : "off"}
          color1={palette[0]} color2={palette[1]} color3={palette[2]}
          uSpeed={0.16} uStrength={2.4} uDensity={1.1} uFrequency={5.5} uAmplitude={0}
          cDistance={3.9} cPolarAngle={115} cAzimuthAngle={180}
          rotationX={0} rotationY={0} rotationZ={235}
          positionX={-0.5} positionY={0.1} positionZ={0}
          lightType="3d" brightness={1.1} reflection={0.1} grain="off" wireframe={false} />
      </ShaderGradientCanvas>
    </div>
  );
}
