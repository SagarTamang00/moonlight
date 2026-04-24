import React, { useRef, useState, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

export const About = () => {
  const sectionRef = useRef(null)
  // Removed modal scroll lock as we display content inline

  useGSAP(() => {
    // Pin the about section
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'center center',
      end: '+=1000',
      pin: true,
      pinSpacing: true,
    })
  }, { scope: sectionRef })

  useGSAP(() => {
    // Animate content when about section enters
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 60%',
      onEnter: () => {
        gsap.to('.about-title', { opacity: 1, y: 0, duration: 1, ease: 'power3.out' })
        gsap.to('.about-text', { opacity: 1, y: 0, duration: 1, delay: 0.2, ease: 'power3.out' })
        gsap.to('.about-stats', { opacity: 1, y: 0, duration: 1, delay: 0.4, ease: 'power3.out' })

        const counters = gsap.utils.toArray('.counter-val')
        counters.forEach(counter => {
          counter.innerHTML = '0'
          const target = parseFloat(counter.getAttribute('data-target'))
          gsap.to(counter, {
            innerHTML: target,
            snap: { innerHTML: 1 },
            duration: 2,
            ease: 'power2.out',
            delay: 0.5
          })
        })
      }
    })
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} id="about-section" className="relative h-[100dvh] lg:h-screen w-full flex items-center justify-center">

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 flex flex-col items-center text-center text-moon-white">
        <h2 className="text-4xl sm:text-5xl md:text-7xl font-cinematic mb-6 lg:mb-8 text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-gray-900 opacity-0 about-title transform translate-y-8 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
          ABOUT US
        </h2>
        <p className="max-w-2xl text-base sm:text-lg md:text-xl font-light leading-relaxed text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-gray-900 opacity-0 about-text transform translate-y-8 drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
          We are a visionary production house dedicated to crafting immersive, cinematic experiences.
          Like the moon illuminating the night sky, we bring brilliant ideas out of the darkness and into the light.
          Our team blends cutting-edge technology with timeless storytelling to create digital masterpieces.
        </p>

        {/* Counters */}
        <div className="flex gap-8 sm:gap-12 md:gap-20 mt-12 lg:mt-16 flex-wrap justify-center opacity-0 about-stats transform translate-y-8 text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-gray-900 drop-shadow-[0_0_12px_rgba(255,255,255,0.3)]">
          <div>
            <span className="block text-4xl sm:text-5xl md:text-6xl font-cinematic"><span className="counter-val" data-target="50">0</span>+</span>
            <span className="text-sm sm:text-base tracking-widest uppercase mt-2 block">Projects</span>
          </div>
          <div>
            <span className="block text-4xl sm:text-5xl md:text-6xl font-cinematic"><span className="counter-val" data-target="15">0</span>+</span>
            <span className="text-sm sm:text-base tracking-widest uppercase mt-2 block">Awards</span>
          </div>
          <div>
            <span className="block text-4xl sm:text-5xl md:text-6xl font-cinematic"><span className="counter-val" data-target="10">0</span>+</span>
            <span className="text-sm sm:text-base tracking-widest uppercase mt-2 block">Years</span>
          </div>
        </div>
      </div>

    </section>
  )
}
