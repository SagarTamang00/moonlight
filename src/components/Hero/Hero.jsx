import React, { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

export const Hero = ({ gapRef }) => {
  const cometRef = useRef(null)
  const dotRef = useRef(null)
  const tailRef = useRef(null)
  const subtitleRef = useRef(null)
  const mouseRef = useRef(null)

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 1.5 })

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
      rotation: -45,
    })

    // Initial state for the Motion Pictures subtitle
    gsap.set(subtitleRef.current, {
      opacity: 0,
      y: 10,
    })

    // Initial state for mouse indicator
    gsap.set(mouseRef.current, {
      opacity: 0,
      y: 10,
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

    // Motion Pictures subtitle fades up
    tl.to(subtitleRef.current, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: 'power2.out',
    }, "-=0.3")

    // Mouse indicator fades in after subtitle
    tl.to(mouseRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power2.out',
    }, "-=0.6")

  })

  return (
    <section className="relative h-[100dvh] md:h-screen w-full flex items-center justify-center overflow-hidden">
      <div className="relative z-10 flex flex-col items-center justify-center">

        {/* Main MOONLIGHT title row */}
        <div className="flex items-center justify-center text-[20vw] sm:text-[18vw] md:text-[15vw] font-cinematic leading-none select-none pointer-events-none">
          <span
            className="text-white tracking-[0.1em] sm:tracking-[0.12em] md:tracking-[0.15em] transition-colors duration-700 ease-in-out hover:text-white/0 pointer-events-auto cursor-default"
            style={{ WebkitTextStroke: 'calc(1px + 0.1vw) white' }}
          >
            M
          </span>

          {/* This gap is where the 3D moon will initially sit */}
          <span ref={gapRef} className="inline-block w-[16vw] sm:w-[14vw] md:w-[12vw]"></span>

          <span
            className="text-white tracking-[0.1em] sm:tracking-[0.12em] md:tracking-[0.15em] transition-colors duration-700 ease-in-out hover:text-white/0 pointer-events-auto cursor-default"
            style={{ WebkitTextStroke: 'calc(1px + 0.1vw) white' }}
          >
            O
          </span>
          <span
            className="text-white tracking-[0.1em] sm:tracking-[0.12em] md:tracking-[0.15em] transition-colors duration-700 ease-in-out hover:text-white/0 pointer-events-auto cursor-default"
            style={{ WebkitTextStroke: 'calc(1px + 0.1vw) white' }}
          >
            N
          </span>
          <span
            className="text-white tracking-[0.1em] sm:tracking-[0.12em] md:tracking-[0.15em] transition-colors duration-700 ease-in-out hover:text-white/0 pointer-events-auto cursor-default"
            style={{ WebkitTextStroke: 'calc(1px + 0.1vw) white' }}
          >
            L
          </span>

          {/* The 'I' with the animated comet dot */}
          <span className="relative inline-flex flex-col items-center justify-center mr-[0.1em] sm:mr-[0.12em] md:mr-[0.15em]">
            {/* Container for the dot and comet */}
            <div className="absolute -top-[12%] md:-top-[15%] left-1/2 -translate-x-1/2 w-[3vw] h-[3vw] sm:w-[2.5vw] sm:h-[2.5vw] md:w-[1.8vw] md:h-[1.8vw] z-20">

              {/* The final landed dot and its glowing ray */}
              <div className="absolute inset-0 w-full h-full flex items-center justify-center">

                {/* The glowing perfect ray (lens flare) */}
                <div ref={tailRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[18vw] sm:w-[12vw] h-[6px] sm:h-[8px] flex items-center justify-center">
                  <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-white to-transparent"></div>
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent blur-[3px] opacity-90"></div>
                  <div className="absolute inset-0 w-full h-[20px] bg-gradient-to-r from-transparent via-white/60 to-transparent blur-[8px] opacity-50"></div>
                </div>

                {/* The stationary bright dot */}
                <div ref={dotRef} className="w-full h-full bg-white rounded-full shadow-[0_0_20px_4px_rgba(255,255,255,0.8)] relative z-10"></div>
              </div>

              {/* The comet flying in */}
              <div ref={cometRef} className="absolute inset-0 w-full h-full flex items-center justify-center">
                <div className="absolute top-1/2 left-[70%] w-[50vw] h-[4px] sm:h-[6px] bg-gradient-to-r from-white via-white/80 to-transparent origin-left transform rotate-[145deg] -translate-y-1/2 blur-[1px]"></div>
                <div className="w-full h-full bg-white rounded-full shadow-[0_0_40px_10px_rgba(255,255,255,1)] relative z-10"></div>
              </div>
            </div>

            {/* Letter I */}
            <span
              className="text-white transition-colors duration-700 ease-in-out hover:text-white/0 pointer-events-auto cursor-default"
              style={{ WebkitTextStroke: 'calc(1px + 0.1vw) white' }}
            >
              I
            </span>
          </span>

          <span
            className="text-white tracking-[0.1em] sm:tracking-[0.12em] md:tracking-[0.15em] transition-colors duration-700 ease-in-out hover:text-white/0 pointer-events-auto cursor-default"
            style={{ WebkitTextStroke: 'calc(1px + 0.1vw) white' }}
          >
            G
          </span>
          <span
            className="text-white tracking-[0.1em] sm:tracking-[0.12em] md:tracking-[0.15em] transition-colors duration-700 ease-in-out hover:text-white/0 pointer-events-auto cursor-default"
            style={{ WebkitTextStroke: 'calc(1px + 0.1vw) white' }}
          >
            H
          </span>
          <span
            className="text-white tracking-[0.1em] sm:tracking-[0.12em] md:tracking-[0.15em] transition-colors duration-700 ease-in-out hover:text-white/0 pointer-events-auto cursor-default"
            style={{ WebkitTextStroke: 'calc(1px + 0.1vw) white' }}
          >
            T
          </span>
        </div>

        {/* Motion Pictures subtitle */}
        <div
          ref={subtitleRef}
          className="text-moon-silver uppercase tracking-[0.35em] sm:tracking-[0.45em] md:tracking-[0.55em] text-[16px] sm:text-[19px] md:text-[22px] mt-2 sm:mt-3 md:mt-4 select-none pointer-events-none"
        >
          Motion Pictures
        </div>

      </div>

      {/* Animated mouse scroll indicator */}
      <div
        ref={mouseRef}
        className="absolute bottom-8 sm:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        {/* Mouse body */}
        <div className="w-[22px] h-[34px] rounded-full border border-white/30 flex justify-center pt-[6px]">
          {/* Scroll wheel dot — animates with CSS */}
          <div
            className="w-[3px] h-[6px] bg-white/60 rounded-full"
            style={{
              animation: 'scrollDot 1.8s ease-in-out infinite',
            }}
          />
        </div>

        {/* Chevron arrows below */}
        <div className="flex flex-col items-center gap-[2px]" style={{ animation: 'fadeChevron 1.8s ease-in-out infinite' }}>
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
            <path d="M1 1L5 5L9 1" stroke="white" strokeOpacity="0.4" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
            <path d="M1 1L5 5L9 1" stroke="white" strokeOpacity="0.2" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* Keyframes injected inline */}
        <style>{`
          @keyframes scrollDot {
            0%   { transform: translateY(0);   opacity: 1; }
            50%  { transform: translateY(8px); opacity: 0.3; }
            100% { transform: translateY(0);   opacity: 1; }
          }
          @keyframes fadeChevron {
            0%, 100% { opacity: 0.5; transform: translateY(0); }
            50%       { opacity: 1;   transform: translateY(3px); }
          }
        `}</style>
      </div>
    </section>
  )
}