import React, { useEffect, useRef, useMemo } from 'react'
import { useLoader, useFrame } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import * as THREE from 'three'

export const Moon3D = ({ moonRef, onReady, spotlightRef }) => {
  const [colorMap, displacementMap] = useLoader(TextureLoader, [
    '/moon-texture.jpg',
    '/moon-displacement.jpg'
  ])

  const orbitRef = useRef()
  const internalSpotRef = useRef()
  const spotTargetRef = useRef()

  // Create a target object for the spotlight to track
  const spotTarget = useMemo(() => new THREE.Object3D(), [])

  // Make the satellite orbit independently
  useFrame((state, delta) => {
    if (orbitRef.current) {
      orbitRef.current.rotation.y += delta * 0.15 // Orbit speed around Y
      orbitRef.current.rotation.z += delta * 0.05 // Slight tumble
    }
  })

  useEffect(() => {
    if (moonRef.current) {
      onReady()
    }
  }, [moonRef, onReady])

  // Expose the spotlight ref to parent
  useEffect(() => {
    if (spotlightRef) {
      spotlightRef.current = {
        light: internalSpotRef.current,
        target: spotTarget
      }
    }
  }, [spotlightRef, spotTarget])

  return (
    <group ref={moonRef}>
      <mesh castShadow receiveShadow>
        {/* We use a high segment count for better displacement mapping */}
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          map={colorMap}
          displacementMap={displacementMap}
          displacementScale={0.05}
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>

      {/* Spotlight target - positioned where the beam should aim */}
      <primitive object={spotTarget} position={[-3, 0, 2]} />

      {/* Orbiting Satellite */}
      <group ref={orbitRef}>
        <group position={[1.4, 0, 0]}> {/* Orbit Distance */}
          
          {/* Central Body (Gold Foil Box) */}
          <mesh castShadow receiveShadow>
            <boxGeometry args={[0.08, 0.08, 0.08]} />
            <meshStandardMaterial color="#FFD700" metalness={0.7} roughness={0.4} />
          </mesh>

          {/* Top/Bottom Instrument Cylinders */}
          <mesh position={[0, 0.05, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.03, 0.03, 0.04, 16]} />
            <meshStandardMaterial color="#Silver" metalness={0.9} roughness={0.2} />
          </mesh>
          <mesh position={[0, -0.05, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.03, 0.03, 0.04, 16]} />
            <meshStandardMaterial color="#Silver" metalness={0.9} roughness={0.2} />
          </mesh>

          {/* Dish Antenna pointing slightly towards the moon */}
          <group position={[-0.05, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <mesh castShadow receiveShadow>
              <coneGeometry args={[0.06, 0.04, 16]} />
              <meshStandardMaterial color="#ffffff" metalness={0.5} roughness={0.5} />
            </mesh>
            <mesh position={[0, 0.02, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[0.002, 0.002, 0.04]} />
              <meshStandardMaterial color="#ffffff" />
            </mesh>
          </group>
          
          {/* Solar Panel Support Trusses */}
          <mesh position={[0, 0, 0.1]} rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.005, 0.005, 0.2, 8]} />
            <meshStandardMaterial color="#555555" metalness={0.8} />
          </mesh>
          <mesh position={[0, 0, -0.1]} rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.005, 0.005, 0.2, 8]} />
            <meshStandardMaterial color="#555555" metalness={0.8} />
          </mesh>

          {/* Solar Panel Array 1 */}
          <group position={[0, 0, 0.2]}>
            <mesh castShadow receiveShadow>
              <boxGeometry args={[0.15, 0.005, 0.18]} />
              <meshStandardMaterial color="#002255" metalness={0.9} roughness={0.1} />
            </mesh>
            {/* Grid Lines/Separators */}
            <mesh position={[0, 0.003, 0]}>
              <boxGeometry args={[0.152, 0.001, 0.002]} />
              <meshStandardMaterial color="#silver" />
            </mesh>
            <mesh position={[0, 0.003, 0]}>
              <boxGeometry args={[0.002, 0.001, 0.182]} />
              <meshStandardMaterial color="#silver" />
            </mesh>
          </group>

          {/* Solar Panel Array 2 */}
          <group position={[0, 0, -0.2]}>
            <mesh castShadow receiveShadow>
              <boxGeometry args={[0.15, 0.005, 0.18]} />
              <meshStandardMaterial color="#002255" metalness={0.9} roughness={0.1} />
            </mesh>
            {/* Grid Lines/Separators */}
            <mesh position={[0, 0.003, 0]}>
              <boxGeometry args={[0.152, 0.001, 0.002]} />
              <meshStandardMaterial color="#silver" />
            </mesh>
            <mesh position={[0, 0.003, 0]}>
              <boxGeometry args={[0.002, 0.001, 0.182]} />
              <meshStandardMaterial color="#silver" />
            </mesh>
          </group>
          
          {/* Small blinking red navigation light */}
          <pointLight color="#ff3333" intensity={0.5} distance={1} position={[0.04, 0.04, 0.04]} />
          <mesh position={[0.04, 0.04, 0.04]}>
            <sphereGeometry args={[0.005, 8, 8]} />
            <meshBasicMaterial color="#ff3333" />
          </mesh>

          {/* Satellite Spotlight Beam */}
          <spotLight
            ref={internalSpotRef}
            position={[0, 0, 0]}
            target={spotTarget}
            color="#88ccff"
            intensity={0}
            angle={0.4}
            penumbra={0.6}
            distance={12}
            decay={1.5}
            castShadow={false}
          />

          {/* Spotlight emitter lens glow */}
          <mesh position={[-0.06, 0, 0]}>
            <sphereGeometry args={[0.012, 8, 8]} />
            <meshBasicMaterial color="#88ccff" transparent opacity={0} className="sat-lens-glow" />
          </mesh>
          
        </group>
      </group>

    </group>
  )
}
