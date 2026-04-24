import React, { useRef, useState, useEffect } from 'react'
import useEmblaCarousel from 'embla-carousel-react'

export const Team = () => {
  const sectionRef = useRef(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [emblaRef] = useEmblaCarousel({ 
    align: 'start',
    skipSnaps: false,
    containScroll: 'trimSnaps'
  })

  // Handle Scroll Lock
  useEffect(() => {
    if (isModalOpen) {
      window.lenis?.stop()
    } else {
      window.lenis?.start()
    }
  }, [isModalOpen])

  const teamMembers = [
    { name: 'Elena Rostova', role: 'Creative Director', image: '/team_elena.png' },
    { name: 'Marcus Chen', role: 'VFX Supervisor', image: '/team_marcus.png' },
    { name: 'Sarah Jenkins', role: 'Lead Animator', image: '/team_sarah.png' },
    { name: 'David Kim', role: 'Technical Artist', image: '/team_david.png' },
  ]

  return (
    <section ref={sectionRef} id="team-section" className="relative h-[100dvh] lg:h-screen w-full flex items-center justify-center">
      
      {/* Tooltip Indicator (Right Side) */}
      <div 
        className="team-tooltip invisible fixed top-[75%] sm:top-[65%] lg:top-[50%] right-[5%] sm:right-[10%] lg:right-[20%] xl:right-[25%] bg-white/10 backdrop-blur-md border border-white/20 px-3 sm:px-6 py-2 sm:py-3 rounded-full text-white cursor-pointer z-50 transform whitespace-nowrap hover:bg-white/20 hover:scale-105 transition-all duration-300"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="flex items-center gap-2 sm:gap-3 flex-row-reverse">
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white animate-pulse"></span>
          <span className="text-xs sm:text-sm font-medium tracking-wider uppercase">Our Team</span>
        </div>
        {/* Tooltip pointer */}
        <div className="absolute top-1/2 -left-2 -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 bg-white/10 border-l border-b border-white/20 transform rotate-45 backdrop-blur-md"></div>
        {/* Connecting line */}
        <div className="absolute top-1/2 right-full w-[8vw] lg:w-[12vw] h-[1px] bg-gradient-to-l from-white/40 to-transparent"></div>
      </div>

      {/* Modal Overlay */}
      <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-12 bg-black/70 backdrop-blur-lg transition-all duration-500 ${isModalOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        
        <div className={`relative w-full max-w-[95vw] lg:max-w-6xl max-h-[90vh] overflow-y-auto bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-10 lg:p-12 text-moon-white shadow-2xl transition-all duration-700 delay-100 ${isModalOpen ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
          
          {/* Close Button */}
          <button 
            onClick={() => setIsModalOpen(false)}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 hover:rotate-90 transition-all duration-300 border border-white/10 text-white z-50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-cinematic mb-6 lg:mb-10 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
            MEET THE CREATORS
          </h2>
          
          <div className="w-full overflow-hidden">
            {/* Embla Carousel viewport */}
            <div 
              ref={emblaRef}
              data-lenis-prevent="true"
              className="w-full overflow-hidden"
            >
              <div className="flex gap-4 sm:gap-6 lg:gap-8 cursor-grab active:cursor-grabbing touch-pan-y">
                {teamMembers.map((member, i) => (
                  <div key={i} className="flex-shrink-0 w-[70vw] sm:w-[45vw] lg:w-[25vw] xl:w-[20vw] group relative overflow-hidden rounded-2xl bg-moon-grey/30 border border-white/10 aspect-[3/4]">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105 opacity-70 group-hover:opacity-100 grayscale group-hover:grayscale-0 pointer-events-none"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 p-4 sm:p-6 lg:p-8 w-full pointer-events-none text-left">
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-cinematic text-white transform translate-y-0 lg:translate-y-2 group-hover:translate-y-0 transition-transform duration-300">{member.name}</h3>
                      <p className="text-moon-silver text-[10px] sm:text-xs lg:text-sm tracking-widest uppercase mt-1 lg:mt-2 lg:opacity-0 group-hover:opacity-100 transform translate-y-0 lg:translate-y-4 group-hover:translate-y-0 transition-all duration-300 lg:delay-100">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
