import React, { useRef, useState, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

export const Projects = () => {
  const sectionRef = useRef(null)
  const [selectedProject, setSelectedProject] = useState(null)

  const projects = [
    {
      id: 1,
      title: 'Project Nova',
      category: 'Sci-Fi Epic',
      release: 'Fall 2026',
      description: 'A visual masterpiece set in the distant future where humanity explores the outer reaches of the galaxy. Featuring groundbreaking VFX and immersive storytelling.',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop',
    },
    {
      id: 2,
      title: 'Eclipse',
      category: 'Psychological Thriller',
      release: 'Winter 2027',
      description: 'When the moon goes dark, so do the minds of the citizens. A gripping thriller that explores the boundaries of human consciousness.',
      image: 'https://images.unsplash.com/photo-1532767153582-b1a0e5145009?q=80&w=1974&auto=format&fit=crop',
    },
    {
      id: 3,
      title: 'Stardust',
      category: 'Animated Feature',
      release: 'Spring 2027',
      description: 'A beautifully animated journey of a young star trying to find its place in the cosmos. Perfect for audiences of all ages.',
      image: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=2044&auto=format&fit=crop',
    }
  ]

  // Handle Scroll Lock for modal
  useEffect(() => {
    if (selectedProject) {
      window.lenis?.stop()
    } else {
      window.lenis?.start()
    }
  }, [selectedProject])

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 60%',
      onEnter: () => {
        gsap.to('.projects-title', { opacity: 1, y: 0, duration: 1, ease: 'power3.out' })
        gsap.to('.project-card', { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          stagger: 0.2, 
          ease: 'power3.out',
          delay: 0.3 
        })
      }
    })
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} id="projects-section" className="relative min-h-[100dvh] lg:h-screen w-full flex items-center justify-center py-20 lg:py-0">
      
      <div className="relative z-10 w-full max-w-[95vw] lg:max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 flex flex-col items-center">
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-cinematic mb-12 lg:mb-20 text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-gray-900 opacity-0 projects-title translate-y-8 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] text-center">
          UPCOMING HIGHLIGHTS
        </h2>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10 w-full">
          {projects.map((project) => (
            <div 
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="project-card opacity-0 translate-y-12 group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 aspect-[4/5] cursor-pointer hover:border-white/30 transition-all duration-500"
            >
              {/* Image Background */}
              <img 
                src={project.image} 
                alt={project.title} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-60 group-hover:opacity-90 grayscale group-hover:grayscale-0"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>

              {/* Content */}
              <div className="absolute inset-0 p-6 lg:p-8 flex flex-col justify-end">
                <span className="text-moon-silver text-xs lg:text-sm tracking-[0.2em] uppercase mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  {project.category}
                </span>
                <h3 className="text-3xl lg:text-4xl font-cinematic text-white mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                  {project.title}
                </h3>
                <div className="h-[2px] w-0 bg-white group-hover:w-12 transition-all duration-500 delay-150 mb-4"></div>
                <div className="overflow-hidden h-0 group-hover:h-8 transition-all duration-500 delay-200">
                  <span className="text-white text-sm uppercase tracking-widest flex items-center gap-2">
                    Explore <span className="text-lg">→</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-12 bg-black/80 backdrop-blur-xl transition-all duration-500 ${selectedProject ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        
        {selectedProject && (
          <div className={`relative w-full max-w-5xl overflow-hidden bg-black/50 border border-white/20 rounded-3xl text-moon-white shadow-[0_0_50px_rgba(255,255,255,0.1)] transition-all duration-700 delay-100 ${selectedProject ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-12'}`}>
            
            {/* Close Button */}
            <button 
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 w-12 h-12 flex items-center justify-center rounded-full bg-black/50 hover:bg-white hover:text-black transition-all duration-300 border border-white/20 text-white z-50 group"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="flex flex-col lg:flex-row h-full lg:h-[70vh]">
              {/* Modal Image */}
              <div className="w-full lg:w-1/2 h-64 lg:h-full relative overflow-hidden">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title} 
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/80 hidden lg:block"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent lg:hidden"></div>
              </div>

              {/* Modal Content */}
              <div className="w-full lg:w-1/2 p-8 sm:p-12 lg:p-16 flex flex-col justify-center relative">
                <span className="text-moon-silver text-sm tracking-[0.3em] uppercase mb-4 inline-block">
                  {selectedProject.category}
                </span>
                <h2 className="text-5xl sm:text-6xl md:text-7xl font-cinematic mb-6 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                  {selectedProject.title}
                </h2>
                
                <div className="flex items-center gap-4 mb-8">
                  <span className="px-4 py-1 rounded-full border border-white/20 text-xs tracking-widest uppercase">
                    In Production
                  </span>
                  <span className="text-moon-silver text-sm tracking-widest uppercase">
                    Est. {selectedProject.release}
                  </span>
                </div>

                <p className="text-base sm:text-lg font-light leading-relaxed text-gray-300 mb-10">
                  {selectedProject.description}
                </p>

                <button className="self-start relative overflow-hidden group px-8 py-4 border border-white/30 rounded-full text-white text-sm font-medium tracking-widest uppercase transition-all duration-300">
                  <span className="relative z-10 group-hover:text-black transition-colors duration-300">Register Interest</span>
                  <div className="absolute inset-0 w-full h-full bg-white scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out"></div>
                </button>
              </div>
            </div>

          </div>
        )}
      </div>

    </section>
  )
}
