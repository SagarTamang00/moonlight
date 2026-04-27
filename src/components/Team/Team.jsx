import React, { useRef, useState, useEffect } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

export const Team = () => {
  const sectionRef = useRef(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [emblaRef] = useEmblaCarousel({
    align: 'start',
    skipSnaps: false,
    containScroll: 'trimSnaps',
  })

  useGSAP(
    () => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 60%',
        onEnter: () => {
          gsap.to('.team-title', {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
          })

          gsap.to('.team-carousel', {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: 0.2,
            ease: 'power3.out',
          })
        },
      })
    },
    { scope: sectionRef }
  )

  const teamMembers = [
    {
      name: 'Santosh Bhandari',
      role: 'CEO',
      image: '/santosh.jpeg',
    },
    {
      name: 'Thaman Kumar Bhandari',
      role: 'Executive Producer',
      image: '/thaman.jpeg',
    },
    // {
    //   name: 'Sarah Jenkins',
    //   role: 'Lead Animator',
    //   image: '/team_sarah.png',
    // },
    // {
    //   name: 'David Kim',
    //   role: 'Technical Artist',
    //   image: '/team_david.png',
    // },
  ]

  return (
    <section
      ref={sectionRef}
      id="team-section"
      className="relative h-[100dvh] lg:h-screen w-full flex items-center justify-center"
    >
      <div className="relative z-10 w-full max-w-[95vw] lg:max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 flex flex-col items-center">
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-cinematic mb-10 lg:mb-16 text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-gray-900 opacity-0 team-title translate-y-8">
          MEET THE CREATORS
        </h2>

        <div className="w-full overflow-hidden opacity-0 team-carousel translate-y-8">
          <div
            ref={emblaRef}
            className="w-full overflow-hidden"
          >
            <div className="flex gap-6 sm:gap-8 lg:gap-10 cursor-grab active:cursor-grabbing touch-pan-y">
              {teamMembers.map((member, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 w-[75vw] sm:w-[45vw] lg:w-[28vw] xl:w-[24vw] group relative overflow-hidden rounded-2xl bg-moon-grey/30 border border-white/10 aspect-[3/4]"
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105 opacity-70 group-hover:opacity-100 grayscale group-hover:grayscale-0 pointer-events-none"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none"></div>

                  <div className="absolute bottom-0 left-0 p-6 lg:p-8 w-full pointer-events-none text-left">
                    <h3 className="text-2xl lg:text-3xl font-cinematic text-white transition-transform duration-300">
                      {member.name}
                    </h3>

                    <p className="text-moon-silver text-xs lg:text-sm tracking-widest uppercase mt-2 lg:opacity-0 group-hover:opacity-100 transition-all duration-300 lg:delay-100">
                      {member.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}