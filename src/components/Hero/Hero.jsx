import React, { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

export const Hero = ({ gapRef }) => {
  const cometRef = useRef(null)
  const dotRef = useRef(null)
  const tailRef = useRef(null)

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 1.5 }) // Wait for the scene to load

    // Initial setup: Comet starts off-screen bottom-left
    gsap.set(cometRef.current, {
      x: '-50vw',
      y: '50vh',
      opacity: 0,
    })
    
    gsap.set(dotRef.current, { 
      opacity: 0, 
      scale: 0 
    })

    // Initial state for the glowing ray
    gsap.set(tailRef.current, {
      opacity: 0,
      scaleX: 0,
      scaleY: 0.1,
      rotation: -45, // Classic diagonal flare angle
    })

    // Comet flies in
    tl.to(cometRef.current, {
      opacity: 1,
      duration: 0.1
    })
    tl.to(cometRef.current, {
      x: 0,
      y: 0,
      duration: 1.2,
      ease: 'power2.out',
    })
    // Comet vanishes, dot pops in
    tl.to(cometRef.current, {
      opacity: 0,
      scale: 0,
      duration: 0.1
    })
    tl.to(dotRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.4,
      ease: 'back.out(2)'
    }, "-=0.1")
    
    // Ray bursts out and starts pulsing continuously
    tl.to(tailRef.current, {
      opacity: 1,
      scaleX: 1,
      scaleY: 1,
      duration: 0.6,
      ease: 'back.out(1.5)',
      onComplete: () => {
        // Smooth pulsing light ray loop
        gsap.to(tailRef.current, {
          scaleX: 1.4,
          scaleY: 1.2,
          opacity: 0.6,
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        })
        // Slight wave in angle
        gsap.to(tailRef.current, {
          rotation: -40,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        })
      }
    }, "-=0.2")

  })

  return (
    <section className="relative h-[100dvh] md:h-screen w-full flex items-center justify-center overflow-hidden">
      <div className="relative z-10 flex items-center justify-center text-[20vw] sm:text-[18vw] md:text-[15vw] font-cinematic leading-none select-none pointer-events-none">
        <span
          className="text-white tracking-[0.1em] sm:tracking-[0.12em] md:tracking-[0.15em]"
          style={{ WebkitTextStroke: 'calc(1px + 0.1vw) white' }}
        >
          M
        </span>
        
        {/* This gap is where the 3D moon will initially sit */}
        <span ref={gapRef} className="inline-block w-[16vw] sm:w-[14vw] md:w-[12vw]"></span>
        
        <span
          className="text-white tracking-[0.1em] sm:tracking-[0.12em] md:tracking-[0.15em]"
          style={{ WebkitTextStroke: 'calc(1px + 0.1vw) white' }}
        >
          ONL
        </span>

        {/* The 'I' with the animated comet dot */}
        <span className="relative inline-flex flex-col items-center justify-center mr-[0.1em] sm:mr-[0.12em] md:mr-[0.15em]">
          {/* Container for the dot and comet */}
          <div className="absolute -top-[12%] md:-top-[15%] left-1/2 -translate-x-1/2 w-[3vw] h-[3vw] sm:w-[2.5vw] sm:h-[2.5vw] md:w-[1.8vw] md:h-[1.8vw] z-20">
            
            {/* The final landed dot and its glowing ray */}
            <div className="absolute inset-0 w-full h-full flex items-center justify-center">
              
              {/* The glowing perfect ray (lens flare) that appears after landing */}
              <div ref={tailRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[18vw] sm:w-[12vw] h-[6px] sm:h-[8px] flex items-center justify-center">
                {/* Core bright line */}
                <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-white to-transparent"></div>
                {/* Soft intense glow */}
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent blur-[3px] opacity-90"></div>
                {/* Outer massive soft glow */}
                <div className="absolute inset-0 w-full h-[20px] bg-gradient-to-r from-transparent via-white/60 to-transparent blur-[8px] opacity-50"></div>
              </div>
              
              {/* The stationary bright dot */}
              <div ref={dotRef} className="w-full h-full bg-white rounded-full shadow-[0_0_20px_4px_rgba(255,255,255,0.8)] relative z-10"></div>
            </div>
            
            {/* The comet flying in (only visible during flight) */}
            <div ref={cometRef} className="absolute inset-0 w-full h-full flex items-center justify-center">
              {/* Comet trail - points bottom-left */}
              <div className="absolute top-1/2 left-[70%] w-[50vw] h-[4px] sm:h-[6px] bg-gradient-to-r from-white via-white/80 to-transparent origin-left transform rotate-[145deg] -translate-y-1/2 blur-[1px]"></div>
              
              {/* Comet head */}
              <div className="w-full h-full bg-white rounded-full shadow-[0_0_40px_10px_rgba(255,255,255,1)] relative z-10"></div>
            </div>
          </div>

          {/* Letter I without tracking, so the container fits it perfectly */}
          <span
            className="text-white"
            style={{ WebkitTextStroke: 'calc(1px + 0.1vw) white' }}
          >
            I
          </span>
        </span>

        <span
          className="text-white tracking-[0.1em] sm:tracking-[0.12em] md:tracking-[0.15em]"
          style={{ WebkitTextStroke: 'calc(1px + 0.1vw) white' }}
        >
          GHT
        </span>
      </div>

      {/* Subtitle */}
      <div className="absolute bottom-8 sm:bottom-10 left-1/2 -translate-x-1/2 text-moon-silver uppercase tracking-[0.2em] md:tracking-[0.3em] text-[10px] sm:text-xs md:text-sm whitespace-nowrap">
        Scroll to explore
      </div>
    </section>
  )
}