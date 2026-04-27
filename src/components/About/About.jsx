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

      <div className="relative z-10 w-full max-w-5xl mx-auto px-8 py-12 sm:px-12 sm:py-16 lg:px-16 flex flex-col items-center text-center rounded-[2.5rem] backdrop-blur-md bg-black/40 border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.6)]">
        <h2 className="text-4xl sm:text-5xl md:text-7xl font-cinematic mb-6 lg:mb-8 text-white opacity-0 about-title transform translate-y-8 [text-shadow:_0_2px_10px_rgb(0_0_0_/_80%)] tracking-wider">
          ABOUT US
        </h2>
        <p className="max-w-3xl text-base sm:text-lg md:text-xl lg:text-2xl font-light leading-relaxed text-gray-100 opacity-0 about-text transform translate-y-8 [text-shadow:_0_2px_4px_rgb(0_0_0_/_80%)]">
          Moonlight Motion Pictures is a Kathmandu-based film production company focused on creating engaging and high-quality cinematic content. We are passionate about storytelling and committed to bringing fresh ideas, new talent, and creative vision to the Nepali film industry.

          From concept to screen, we aim to produce films that entertain, inspire, and connect with audiences everywhere.
        </p>

        {/* Counters */}
        <div className="flex gap-10 sm:gap-16 md:gap-24 mt-12 lg:mt-16 flex-wrap justify-center opacity-0 about-stats transform translate-y-8 text-white">
          <div className="flex flex-col items-center [text-shadow:_0_2px_10px_rgb(0_0_0_/_80%)]">
            <span className="block text-5xl sm:text-6xl md:text-7xl font-cinematic"><span className="counter-val" data-target="50">0</span>+</span>
            <span className="text-sm sm:text-base tracking-[0.2em] uppercase mt-4 block text-gray-300">Projects</span>
          </div>
          <div className="flex flex-col items-center [text-shadow:_0_2px_10px_rgb(0_0_0_/_80%)]">
            <span className="block text-5xl sm:text-6xl md:text-7xl font-cinematic"><span className="counter-val" data-target="15">0</span>+</span>
            <span className="text-sm sm:text-base tracking-[0.2em] uppercase mt-4 block text-gray-300">Awards</span>
          </div>
          <div className="flex flex-col items-center [text-shadow:_0_2px_10px_rgb(0_0_0_/_80%)]">
            <span className="block text-5xl sm:text-6xl md:text-7xl font-cinematic"><span className="counter-val" data-target="10">0</span>+</span>
            <span className="text-sm sm:text-base tracking-[0.2em] uppercase mt-4 block text-gray-300">Years</span>
          </div>
        </div>
      </div>

    </section>
  )
}
