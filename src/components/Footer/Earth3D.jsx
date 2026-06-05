import React, { useRef, useEffect } from "react";
import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { Html } from "@react-three/drei";
import * as THREE from "three";

// Marker position: Front-right of the globe
// Lat ~ 28 N, Lon ~ 20 (relative to front +Z)
const MARKER_POS = [0.301, 0.469, 0.828];

// Earth rotation to align Kathmandu with the MARKER_POS (with un-mirrored texture)
// Adjusted based on visual calibration from the Pacific Ocean (shifted 70 deg West)
const EARTH_ROTATION_Y = 0.1;

// Helper to extract a valid URL to open in a new tab
const getExternalMapUrl = (url) => {
  if (!url) return "https://maps.google.com/?q=Kathmandu+Nepal";

  let src = url;
  if (url.includes("<iframe")) {
    const match = url.match(/src="([^"]+)"/);
    if (match) src = match[1];
  }

  // If it's an old-style embed with a q= parameter, use that
  const qMatch = src.match(/[?&]q=([^&]+)/);
  if (qMatch) {
    return `https://www.google.com/maps/search/?api=1&query=${qMatch[1]}`;
  }

  // Convert Google Maps Embed URL to a searchable standard URL
  if (src.includes("/maps/embed")) {
    // !2s contains the exact place name or address, which is much more accurate
    // than !2d/!3d which only represent the viewport center
    const placeMatch = src.match(/!2s([^!]+)/);
    if (placeMatch) {
      return `https://www.google.com/maps/search/?api=1&query=${placeMatch[1]}`;
    }

    // Fallback to coordinates if it's a coordinate-only dropped pin
    const lonMatch = src.match(/!2d([^!]+)/);
    const latMatch = src.match(/!3d([^!]+)/);
    if (latMatch && lonMatch) {
      return `https://www.google.com/maps/search/?api=1&query=${latMatch[1]},${lonMatch[1]}`;
    }
  }

  if (src.startsWith("http")) return src;
  return `https://maps.google.com/maps?q=${encodeURIComponent(src)}`;
};

const KathmanduMarker = ({ locationText }) => {
  const ringRef = useRef();
  const mapUrl = getExternalMapUrl(locationText);

  useFrame(({ clock }) => {
    if (ringRef.current) {
      const t = clock.getElapsedTime();
      const pulseFactor = (t * 1.5) % 1;
      const scale = 1 + pulseFactor * 1.8;
      ringRef.current.scale.set(scale, scale, 1);
      ringRef.current.material.opacity = 1 - pulseFactor;
    }
  });

  const handleMarkerClick = (e) => {
    e?.stopPropagation();
    window.open(mapUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <group position={MARKER_POS} onUpdate={(self) => self.lookAt(0, 0, 0)}>
      {/* Inner glowing core */}
      <mesh
        onClick={handleMarkerClick}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          document.body.style.cursor = "default";
        }}
      >
        <sphereGeometry args={[0.025, 16, 16]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>

      {/* Pulsing ring */}
      <mesh ref={ringRef} pointerEvents="none">
        <ringGeometry args={[0.06, 0.05, 32]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={1}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* HTML Line and Box matching the user's sketch */}
      <Html position={[0, 0, 0]} center zIndexRange={[100, 0]}>
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center pointer-events-auto cursor-pointer group"
          onClick={handleMarkerClick}
          onMouseEnter={() => (document.body.style.cursor = "pointer")}
          onMouseLeave={() => (document.body.style.cursor = "default")}
        >
          {/* The line extending to the right */}
          <div className="w-10 sm:w-16 h-[1px] bg-white/40 group-hover:bg-white/80 transition-colors" />

          {/* The text box */}
          <div className="border border-white/20 bg-black/60 p-2 px-3 backdrop-blur-md group-hover:bg-black/80 group-hover:border-white/40 transition-colors ml-0">
            <div className="text-[10px] sm:text-[11px] tracking-[0.25em] font-semibold text-white uppercase leading-none mb-1.5">
              KATHMANDU
            </div>
            <div className="text-[9px] sm:text-[10px] tracking-[0.25em] font-semibold text-white/60 uppercase leading-none">
              NEPAL
            </div>
          </div>
        </div>
      </Html>
    </group>
  );
};

const Globe = ({ locationText }) => {
  const earthTexture = useLoader(TextureLoader, "/earth.jpg");

  // Fix Three.js default texture mirroring so East is on the right!
  useEffect(() => {
    earthTexture.wrapS = THREE.RepeatWrapping;
    earthTexture.repeat.x = -1;
    earthTexture.needsUpdate = true;
  }, [earthTexture]);

  return (
    // Globe placed on the left side of the scene
    <group position={[-0.5, 0, 0]}>
      {/* The Earth Globe, rotated to align Nepal with the marker */}
      <mesh castShadow receiveShadow rotation={[0, EARTH_ROTATION_Y, 0]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          map={earthTexture}
          roughness={0.6}
          metalness={0.1}
        />
      </mesh>

      {/* Marker is fixed relative to the camera, Earth rotates under it */}
      <KathmanduMarker locationText={locationText} />

      {/* Atmosphere shell centered on the globe */}
      <mesh scale={1.03}>
        <sphereGeometry args={[1, 64, 64]} />
        <shaderMaterial
          vertexShader={`
            varying vec3 vNormal;
            void main() {
              vNormal = normalize(normalMatrix * normal);
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `}
          fragmentShader={`
            varying vec3 vNormal;
            void main() {
              float intensity = pow(0.75 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.5);
              gl_FragColor = vec4(0.2, 0.5, 1.0, 1.0) * intensity;
            }
          `}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
          transparent
          depthWrite={false}
        />
      </mesh>
    </group>
  );
};

export const Earth3D = ({ locationText }) => {
  return (
    <div className="w-full h-full select-none outline-none relative">
      <Canvas
        camera={{ position: [0, 0, 2.7], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent", outline: "none" }}
      >
        {/* Cinematic lighting setup */}
        <ambientLight intensity={0.4} />
        {/* Key directional sunlight */}
        <directionalLight position={[5, 3, 5]} intensity={2.2} />
        {/* Soft blue rim/fill light for ambient space glow */}
        <pointLight position={[-8, -4, -6]} intensity={0.8} color="#0a84ff" />

        <Globe locationText={locationText} />
      </Canvas>
    </div>
  );
};

export default Earth3D;
