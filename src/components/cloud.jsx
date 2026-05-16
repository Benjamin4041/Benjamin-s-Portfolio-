import * as THREE from "three";
import { useRef, useState, useMemo, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Billboard, Text, TrackballControls } from "@react-three/drei";

function Word({ children, ...props }) {
  const color = new THREE.Color();
  const fontProps = {
    fontSize: 2.5,
    letterSpacing: -0.05,
    lineHeight: 1,
    "material-toneMapped": false,
  };
  const ref = useRef();
  const [hovered, setHovered] = useState(false);
  const over = (e) => (e.stopPropagation(), setHovered(true));
  const out = () => setHovered(false);
  // Change the mouse cursor on hover¨
  useEffect(() => {
    if (hovered) document.body.style.cursor = "pointer";
    return () => (document.body.style.cursor = "auto");
  }, [hovered]);
  // Tie component to the render-loop
  useFrame(({ camera }) => {
    ref.current.material.color.lerp(
      color.set(hovered ? "#fa2720" : "white"),
      0.1
    );
  });
  return (
    <Billboard {...props}>
      <Text
        ref={ref}
        onPointerOver={over}
        onPointerOut={out}
        onClick={() => console.log("clicked")}
        {...fontProps}
        children={children}
      />
    </Billboard>
  );
}
("");
function Cloud({
  words = [
    "Design Systems",
    "E2E Testing",
    "R3F",
    "Performance Optimization",
    "Software Testing",
    "SEO Optimization",
    "Progressive Enhancement",
    "Accessibility",
    "Auditing",
    "Build Automation",
    "Responsive Web Design",
    "UX Design / Strategy",
    "JavaScript",
    "React",
    "CSS-in-JS",
    "TypeScript",
    "Sass",
    "MongoDB",
    "NodeJS",
    "Express.js",
  ],
  radius = 100,
}) {
  const wordPositions = useMemo(() => {
    const temp = [];
    const spherical = new THREE.Spherical();

    for (let i = 0; i < words.length; i++) {
      const phi = Math.acos(2 * Math.random() - 1); // random phi [0, π]
      const theta = Math.random() * Math.PI * 2; // random theta [0, 2π]
      const position = new THREE.Vector3().setFromSpherical(
        spherical.set(radius, phi, theta)
      );
      temp.push([position, words[i]]);
    }
    return temp;
  }, [words, radius]);

  return wordPositions.map(([pos, word], index) => (
    <Word key={index} position={pos} children={word} />
  ));
}

export default function Canv() {
  return (
    <Canvas
      style={{ background: "#222" }}
      dpr={[1, 2]}
      camera={{ position: [0, 0, 35], fov: 90 }}
    >
      <fog attach="fog" args={["#202025", 0, 80]} />
      <Suspense fallback={null}>
        <group rotation={[0.2, 0.3, 0.2]}>
          <Cloud radius={10} />
        </group>
      </Suspense>
      <TrackballControls />
    </Canvas>
  );
}
