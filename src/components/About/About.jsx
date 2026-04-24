import React, { useRef, useState, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

export const About = () => {
  const sectionRef = useRef(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Handle Scroll Lock
  useEffect(() => {
    if (isModalOpen) {
      window.lenis?.stop()
    } else {
      window.lenis?.start()
    }
  }, [isModalOpen])

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

  // Animate counters when modal opens
  useGSAP(() => {
    if (isModalOpen) {
      const counters = gsap.utils.toArray('.counter-val')
      counters.forEach(counter => {
        counter.innerHTML = '0' // Reset
        const target = parseFloat(counter.getAttribute('data-target'))
        gsap.to(counter, {
          innerHTML: target,
          snap: { innerHTML: 1 },
          duration: 2,
          ease: 'power2.out'
        })
      })
    }
  }, { scope: sectionRef, dependencies: [isModalOpen] })

  return (
    <section ref={sectionRef} id="about-section" className="relative h-[100dvh] lg:h-screen w-full flex items-center justify-center">

      {/* Tooltip Indicator */}
      <div 
        className="about-tooltip invisible fixed top-[15%] sm:top-[25%] lg:top-[35%] left-[5%] sm:left-[10%] lg:left-[20%] xl:left-[25%] bg-white/10 backdrop-blur-md border border-white/20 px-3 sm:px-6 py-2 sm:py-3 rounded-full text-white cursor-pointer z-50 transform whitespace-nowrap hover:bg-white/20 hover:scale-105 transition-all duration-300"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white animate-pulse"></span>
          <span className="text-xs sm:text-sm font-medium tracking-wider uppercase">About Us</span>
        </div>
        {/* Tooltip pointer */}
        <div className="absolute top-1/2 -right-2 -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 bg-white/10 border-r border-t border-white/20 transform rotate-45 backdrop-blur-md"></div>
        {/* Connecting line */}
        <div className="absolute top-1/2 left-full w-[8vw] lg:w-[12vw] h-[1px] bg-gradient-to-r from-white/40 to-transparent"></div>
      </div>

      {/* Modal Overlay */}
      <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-12 bg-black/70 backdrop-blur-lg transition-all duration-500 ${isModalOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        
        <div className={`relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-10 lg:p-12 text-moon-white shadow-2xl transition-all duration-700 delay-100 ${isModalOpen ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
          
          {/* Close Button */}
          <button 
            onClick={() => setIsModalOpen(false)}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 hover:rotate-90 transition-all duration-300 border border-white/10 text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-cinematic mb-4 lg:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
            ABOUT US
          </h2>
          <p className="text-sm sm:text-base md:text-lg font-light leading-relaxed text-moon-silver">
            We are a visionary production house dedicated to crafting immersive, cinematic experiences.
            Like the moon illuminating the night sky, we bring brilliant ideas out of the darkness and into the light.
            Our team blends cutting-edge technology with timeless storytelling to create digital masterpieces.
          </p>

          {/* Counters */}
          <div className="flex gap-6 sm:gap-8 md:gap-12 mt-8 lg:mt-12 flex-wrap">
            <div>
              <span className="block text-3xl sm:text-4xl md:text-5xl font-cinematic text-white"><span className="counter-val" data-target="50">0</span>+</span>
              <span className="text-moon-silver text-xs sm:text-sm tracking-widest uppercase mt-1 sm:mt-2 block">Projects</span>
            </div>
            <div>
              <span className="block text-3xl sm:text-4xl md:text-5xl font-cinematic text-white"><span className="counter-val" data-target="15">0</span>+</span>
              <span className="text-moon-silver text-xs sm:text-sm tracking-widest uppercase mt-1 sm:mt-2 block">Awards</span>
            </div>
            <div>
              <span className="block text-3xl sm:text-4xl md:text-5xl font-cinematic text-white"><span className="counter-val" data-target="10">0</span>+</span>
              <span className="text-moon-silver text-xs sm:text-sm tracking-widest uppercase mt-1 sm:mt-2 block">Years</span>
            </div>
          </div>
        </div>
        
      </div>

    </section>
  )
}
