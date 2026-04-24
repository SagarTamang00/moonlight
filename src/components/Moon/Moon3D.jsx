import React, { useEffect, useRef } from 'react'
import { useLoader, useFrame } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'

export const Moon3D = ({ moonRef, onReady }) => {
  const [colorMap, displacementMap] = useLoader(TextureLoader, [
    '/moon-texture.jpg',
    '/moon-displacement.jpg'
  ])

  const orbitRef = useRef()

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
          
        </group>
      </group>

    </group>
  )
}
