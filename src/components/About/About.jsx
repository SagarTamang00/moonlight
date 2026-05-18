import React, { useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import useSettings from '../../hooks/useSettings'
import useProjects from '../../hooks/useProjects'
import usePartners from '../../hooks/usePartners'

gsap.registerPlugin(ScrollTrigger)

export const About = () => {
  const sectionRef = useRef(null)
  const { settings } = useSettings()
  const { projects } = useProjects()
  const { partners } = usePartners()

  // ✅ state for UI counters
  const [stats, setStats] = useState({
    projects: 0,
    partners: 0,
  })

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'center center',
      end: '+=1000',
      pin: true,
      pinSpacing: true,
    })
  }, { scope: sectionRef })

  useGSAP(() => {
    const counterObj = { projects: 0, partners: 0 }

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 60%',
      onEnter: () => {
        gsap.to('.about-title', {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
        })

        gsap.to('.about-text', {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.2,
          ease: 'power3.out',
        })

        gsap.to('.about-stats', {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.4,
          ease: 'power3.out',
        })

        // ✅ COUNTER ANIMATION FIXED
        gsap.to(counterObj, {
          projects: projects?.length || 50,
          partners: partners?.length || 15,
          duration: 2,
          ease: 'power2.out',
          onUpdate: () => {
            setStats({
              projects: Math.round(counterObj.projects),
              partners: Math.round(counterObj.partners),
            })
          },
        })
      },
    })
  }, { scope: sectionRef, dependencies: [projects, partners] })

  return (
    <section
      ref={sectionRef}
      id="about-section"
      className="relative h-[100dvh] lg:h-screen w-full flex items-center justify-center"
    >

      <div className="relative z-10 w-full max-w-5xl mx-auto px-8 py-12 sm:px-12 sm:py-16 lg:px-16 flex flex-col items-center text-center rounded-[2.5rem] backdrop-blur-md bg-black/40 border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.6)]">

        <h2 className="text-4xl sm:text-5xl md:text-7xl font-cinematic mb-6 lg:mb-8 text-white opacity-0 about-title transform translate-y-8">
          ABOUT US
        </h2>

        <p className="max-w-3xl text-base sm:text-lg md:text-xl lg:text-2xl font-light leading-relaxed text-gray-100 opacity-0 about-text transform translate-y-8 whitespace-pre-wrap">
          {settings?.about_description ||
            'Moonlight Motion Pictures is a Kathmandu-based film production company...'}
        </p>

        {/* Counters */}
        <div className="flex gap-10 sm:gap-16 md:gap-24 mt-12 lg:mt-16 flex-wrap justify-center opacity-0 about-stats transform translate-y-8 text-white">

          <div className="flex flex-col items-center">
            <span className="block text-5xl sm:text-6xl md:text-7xl font-cinematic">
              {stats.projects}+
            </span>
            <span className="text-sm uppercase tracking-widest mt-4 text-gray-300">
              Projects
            </span>
          </div>

          <div className="flex flex-col items-center">
            <span className="block text-5xl sm:text-6xl md:text-7xl font-cinematic">
              {stats.partners}+
            </span>
            <span className="text-sm uppercase tracking-widest mt-4 text-gray-300">
              Partners
            </span>
          </div>

        </div>

      </div>
    </section>
  )
}