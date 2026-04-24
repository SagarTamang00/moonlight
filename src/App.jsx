import React, { useRef, useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, Stars } from '@react-three/drei'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

import { LenisWrapper } from './utils/LenisWrapper'
import { Moon3D } from './components/Moon/Moon3D'
import { Hero } from './components/Hero/Hero'
import { About } from './components/About/About'
import { Team } from './components/Team/Team'
import { Header } from './components/Header/Header'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const containerRef = useRef(null)
  const moonRef = useRef(null)
  const gapRef = useRef(null)
  const [moonReady, setMoonReady] = useState(false)
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight })

  useEffect(() => {
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useGSAP(() => {
    if (!moonReady || !moonRef.current) return

    // Calculate exact 3D position of the gap DOM element
    let startX = -1.0
    if (gapRef.current) {
      const rect = gapRef.current.getBoundingClientRect()
      const px = rect.left + rect.width / 2
      const ndcX = (px / window.innerWidth) * 2 - 1
      const fov = 45 * Math.PI / 180
      const heightAtZ0 = 2 * Math.tan(fov / 2) * 5
      const widthAtZ0 = heightAtZ0 * (window.innerWidth / window.innerHeight)
      startX = ndcX * (widthAtZ0 / 2)
    }

    // Ensure initial state
    gsap.set(moonRef.current.position, { 
      x: startX, 
      y: 0, 
      z: 0 
    })
    gsap.set(moonRef.current.scale, { 
      x: window.innerWidth < 1024 ? 0.65 : 0.6, 
      y: window.innerWidth < 1024 ? 0.65 : 0.6, 
      z: window.innerWidth < 1024 ? 0.65 : 0.6 
    })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
      }
    })

    // Phase 1: Scroll to About section (zoom in massively on the moon's surface)
    tl.to(moonRef.current.position, {
      x: 0, // Keep centered
      y: window.innerWidth < 1024 ? 2 : 0,  // On mobile/tablet move up
      z: 0,
      duration: 1,
      ease: 'power2.inOut'
    }, 0)
    
    const targetScale = window.innerWidth < 768 ? 1.1 : window.innerWidth < 1024 ? 1.4 : 1.8
    
    tl.to(moonRef.current.scale, {
      x: targetScale,
      y: targetScale,
      z: targetScale,
      duration: 1,
      ease: 'power2.inOut'
    }, 0)
    
    tl.to(moonRef.current.rotation, {
      y: Math.PI * 1.5,
      x: Math.PI * 0.2,
      duration: 1,
      ease: 'none'
    }, 0)

    // Fade in tooltip
    tl.to('.about-tooltip', {
      autoAlpha: 1,
      x: 0,
      duration: 0.3,
      ease: 'power2.out'
    }, 0.5)

    // Phase 2: Scroll to Team section (rotate moon more, stay in place)
    tl.to(moonRef.current.rotation, {
      y: Math.PI * 3,
      x: Math.PI * 0.4,
      duration: 1,
      ease: 'power1.inOut'
    }, 1)
    
    tl.to('.about-tooltip', {
      autoAlpha: 0,
      x: -12,
      duration: 0.2
    }, 1.0)

    tl.to('.team-tooltip', {
      autoAlpha: 1,
      x: 0,
      duration: 0.3,
      ease: 'power2.out'
    }, 1.2)

  }, { scope: containerRef, dependencies: [moonReady, windowSize.width] })

  return (
    <LenisWrapper>
      <div ref={containerRef} className="relative w-full text-moon-white bg-moon-black min-h-screen">
        
        {/* Fixed 3D Canvas Layer */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
            <ambientLight intensity={0.01} />
            <directionalLight position={[10, 0, 2]} intensity={4} color="#ffffff" />
            {/* Starry Background */}
            <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
            
            <Moon3D moonRef={moonRef} onReady={() => setMoonReady(true)} />
          </Canvas>
        </div>

        {/* HTML Content Overlay */}
        <div className="relative z-10 w-full flex flex-col">
          <Header />
          <Hero gapRef={gapRef} />
          <About />
          <Team />
        </div>

      </div>
    </LenisWrapper>
  )
}

export default App
