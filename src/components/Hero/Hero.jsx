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

    gsap.set(cometRef.current, {
      x: '-50vw',
      y: '50vw',
      opacity: 0,
    })

    gsap.set(dotRef.current, {
      opacity: 0,
      scale: 0,
    })

    gsap.set(tailRef.current, {
      opacity: 0,
      scaleX: 0,
      scaleY: 0.1,
      rotation: -45,
    })

    gsap.set(subtitleRef.current, {
      opacity: 0,
      y: 10,
    })

    gsap.set(mouseRef.current, {
      opacity: 0,
      y: 10,
    })

    tl.to(cometRef.current, {
      opacity: 1,
      duration: 0.1,
    })

    tl.to(cometRef.current, {
      x: 0,
      y: 0,
      duration: 1.2,
      ease: 'power2.out',
    })

    tl.to(cometRef.current, {
      opacity: 0,
      scale: 0,
      duration: 0.1,
    })

    tl.to(
      dotRef.current,
      {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        ease: 'back.out(2)',
      },
      '-=0.1'
    )

    tl.to(
      tailRef.current,
      {
        opacity: 1,
        scaleX: 1,
        scaleY: 1,
        duration: 0.6,
        ease: 'back.out(1.5)',
        onComplete: () => {
          gsap.to(tailRef.current, {
            scaleX: 1.4,
            scaleY: 1.2,
            opacity: 0.6,
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          })

          gsap.to(tailRef.current, {
            rotation: -40,
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          })
        },
      },
      '-=0.2'
    )

    tl.to(
      subtitleRef.current,
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power2.out',
      },
      '-=0.3'
    )

    tl.to(
      mouseRef.current,
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
      },
      '-=0.6'
    )
  })

  return (
    <section className="relative h-[100dvh] md:h-screen w-full flex items-center justify-center overflow-hidden">
      <div className="relative z-10 flex flex-col items-center justify-center">

        {/* LOGO */}
        <div className="flex items-center justify-center text-[20vw] sm:text-[18vw] md:text-[15vw] font-cinematic leading-none select-none pointer-events-none overflow-visible">

          {/* M */}
          <span
            className="text-white tracking-[0.1em] sm:tracking-[0.12em] md:tracking-[0.15em] pointer-events-auto hover:text-transparent transition-colors duration-300"
            style={{ WebkitTextStroke: 'calc(1px + 0.1vw) white' }}
          >
            M
          </span>

          {/* FIXED GAP FOR MOON */}
          <span
            ref={gapRef}
            className="inline-block w-[24vw] sm:w-[20vw] md:w-[16vw]"
          ></span>

          {/* O */}
          <span
            className="text-white tracking-[0.1em] sm:tracking-[0.12em] md:tracking-[0.15em] pointer-events-auto hover:text-transparent transition-colors duration-300"
            style={{ WebkitTextStroke: 'calc(1px + 0.1vw) white' }}
          >
            O
          </span>

          {/* N */}
          <span
            className="text-white tracking-[0.1em] sm:tracking-[0.12em] md:tracking-[0.15em] pointer-events-auto hover:text-transparent transition-colors duration-300"
            style={{ WebkitTextStroke: 'calc(1px + 0.1vw) white' }}
          >
            N
          </span>

          {/* L */}
          <span
            className="text-white tracking-[0.1em] sm:tracking-[0.12em] md:tracking-[0.15em] pointer-events-auto hover:text-transparent transition-colors duration-300"
            style={{ WebkitTextStroke: 'calc(1px + 0.1vw) white' }}
          >
            L
          </span>

          {/* I */}
          <span className="relative inline-flex flex-col items-center justify-center mr-[0.1em]">

            {/* DOT AREA */}
            <div className="absolute -top-[14%] left-1/2 -translate-x-1/2 w-[3vw] h-[3vw] sm:w-[2.5vw] sm:h-[2.5vw] md:w-[1.8vw] md:h-[1.8vw] z-20">

              {/* Glow */}
              <div className="absolute inset-0 flex items-center justify-center">

                <div
                  ref={tailRef}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[18vw] sm:w-[12vw] h-[6px]"
                >
                  <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-white to-transparent"></div>
                  <div className="absolute inset-0 blur-[3px] bg-gradient-to-r from-transparent via-white to-transparent"></div>
                </div>

                <div
                  ref={dotRef}
                  className="w-full h-full bg-white rounded-full shadow-[0_0_20px_4px_rgba(255,255,255,0.8)]"
                ></div>
              </div>

              {/* COMET */}
              <div
                ref={cometRef}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="absolute top-1/2 left-[70%] w-[50vw] h-[4px] bg-gradient-to-r from-white via-white/80 to-transparent origin-left rotate-[135deg] -translate-y-1/2 blur-[1px]"></div>

                <div className="w-full h-full bg-white rounded-full shadow-[0_0_40px_10px_rgba(255,255,255,1)]"></div>
              </div>
            </div>

            <span
              className="text-white pointer-events-auto hover:text-transparent transition-colors duration-300"
              style={{ WebkitTextStroke: 'calc(1px + 0.1vw) white' }}
            >
              I
            </span>
          </span>

          {/* G */}
          <span
            className="text-white tracking-[0.1em] pointer-events-auto hover:text-transparent transition-colors duration-300"
            style={{ WebkitTextStroke: 'calc(1px + 0.1vw) white' }}
          >
            G
          </span>

          {/* H */}
          <span
            className="text-white tracking-[0.1em] pointer-events-auto hover:text-transparent transition-colors duration-300"
            style={{ WebkitTextStroke: 'calc(1px + 0.1vw) white' }}
          >
            H
          </span>

          {/* T */}
          <span
            className="text-white tracking-[0.1em] pointer-events-auto hover:text-transparent transition-colors duration-300"
            style={{ WebkitTextStroke: 'calc(1px + 0.1vw) white' }}
          >
            T
          </span>
        </div>

        {/* Subtitle */}
        <div
          ref={subtitleRef}
          className="text-moon-silver uppercase tracking-[0.55em] text-[16px] sm:text-[19px] md:text-[22px] mt-4"
        >
          Motion Pictures
        </div>
      </div>

      {/* Mouse */}
      <div
        ref={mouseRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="w-[22px] h-[34px] rounded-full border border-white/30 flex justify-center pt-[6px]">
          <div
            className="w-[3px] h-[6px] bg-white/60 rounded-full"
            style={{
              animation: 'scrollDot 1.8s ease-in-out infinite',
            }}
          ></div>
        </div>

        <style>{`
          @keyframes scrollDot {
            0% { transform: translateY(0); opacity:1; }
            50% { transform: translateY(8px); opacity:.3; }
            100% { transform: translateY(0); opacity:1; }
          }
        `}</style>
      </div>
    </section>
  )
}