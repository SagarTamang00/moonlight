import React, { useRef, useState, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

// ─────────────────────────────────────────────────────────────
// SHARED PROJECT DATA — import this in AllProjects.jsx too
// Max 3 projects are shown on the homepage. All projects appear
// on the /projects page. Future editors: add new projects here;
// the homepage always caps at 3 (the first 3 in this array).
// ─────────────────────────────────────────────────────────────
export const ALL_PROJECTS = [
  {
    id: 1,
    title: 'Kathghara (कठघरा)',
    category: 'Reality Courtroom / Political Talk Show',
    status: 'Ongoing',
    release: 'December 2025 (Ongoing)',
    description: 'A legal-themed political talk show hosted by Tikaram Yatri and judged by Mithila Sharma. The program brings public figures into a courtroom dock to answer for their actions under the theme.',
    image: '/kadhgara.jpeg',
    network: 'Himalaya TV',
    digital_partner: 'OSR Reality'
  },
  {
    id: 2,
    title: 'Sukul Guff',
    category: 'Authentic Nepali Podcast / Cultural Conversation Show',
    status: 'Upcoming',
    release: 'Coming Soon',
    description: 'A soulful Nepali-style podcast hosted by Avas Karmacharya, where meaningful conversations unfold in the heart of nature. Seated traditionally on a mat with chiya beside them, guests share stories, life experiences, ideas, and wisdom in a peaceful open-air setting.',
    image: '/nep.jpeg',
    network: 'Moonlight Motion Picture',
    digital_partner: 'Moonlight Originals'
  },
  {
    id: 3,
    title: 'Eclipse',
    category: 'Psychological Thriller',
    status: 'Upcoming',
    release: 'Winter 2027',
    description: 'When the moon goes dark, so do the minds of the citizens. A gripping thriller that explores the boundaries of human consciousness.',
    image: 'https://images.unsplash.com/photo-1532767153582-b1a0e5145009?q=80&w=1974&auto=format&fit=crop',
  },
  {
    id: 4,
    title: 'Stardust',
    category: 'Animated Feature',
    status: 'Upcoming',
    release: 'Spring 2027',
    description: 'A beautifully animated journey of a young star trying to find its place in the cosmos. Perfect for audiences of all ages.',
    image: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=2044&auto=format&fit=crop',
  }
]

// Homepage always shows exactly the first 3 projects
const HOMEPAGE_PROJECTS = ALL_PROJECTS.slice(0, 3)

// ── Shared project card ──────────────────────────────────────
export const ProjectCard = ({ project, onClick, animClass = '' }) => (
  <div
    onClick={() => onClick(project)}
    className={`${animClass} group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 aspect-[4/5] cursor-pointer hover:border-white/30 transition-all duration-500`}
  >
    <img
      src={project.image}
      alt={project.title}
      className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-60 group-hover:opacity-90 grayscale group-hover:grayscale-0"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

    {/* Status badge */}
    <div className="absolute top-4 right-4">
      <span className={`px-3 py-1 rounded-full text-[10px] tracking-widest uppercase font-semibold border backdrop-blur-sm ${project.status === 'Ongoing'
          ? 'bg-emerald-500/20 border-emerald-400/40 text-emerald-300'
          : 'bg-sky-500/20 border-sky-400/40 text-sky-300'
        }`}>
        {project.status}
      </span>
    </div>

    <div className="absolute inset-0 p-6 lg:p-8 flex flex-col justify-end">
      <span className="text-gray-400 text-xs lg:text-sm tracking-[0.2em] uppercase mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
        {project.category}
      </span>
      <h3 className="text-3xl lg:text-4xl font-cinematic text-white mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
        {project.title}
      </h3>
      <div className="h-[2px] w-0 bg-white group-hover:w-12 transition-all duration-500 delay-150 mb-4" />
      <div className="overflow-hidden h-0 group-hover:h-8 transition-all duration-500 delay-200">
        <span className="text-white text-sm uppercase tracking-widest flex items-center gap-2">
          Explore <span className="text-lg">→</span>
        </span>
      </div>
    </div>
  </div>
)

// ── Shared project modal ─────────────────────────────────────
export const ProjectModal = ({ project, onClose }) => {
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = 'hidden'
      window.lenis?.stop()
    } else {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
      window.lenis?.start()
    }
    return () => {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
      window.lenis?.start()
    }
  }, [project])

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-12 bg-black/80 backdrop-blur-xl transition-all duration-500 ${project ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
      {project && (
        <div
          data-lenis-prevent="true"
          className="relative w-full max-w-5xl overflow-y-auto overflow-x-hidden max-h-[90vh] bg-black/50 border border-white/20 rounded-2xl sm:rounded-3xl text-white shadow-[0_0_50px_rgba(255,255,255,0.1)] scale-100 opacity-100"
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 sm:top-6 sm:right-6 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-black/50 hover:bg-white hover:text-black transition-all duration-300 border border-white/20 text-white z-50 group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-90 transition-transform duration-300">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="flex flex-col lg:flex-row h-auto lg:min-h-[60vh]">
            <div className="w-full lg:w-1/2 h-48 sm:h-64 lg:h-auto relative overflow-hidden shrink-0">
              <img src={project.image} alt={project.title} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/80 hidden lg:block" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent lg:hidden" />
              <div className="absolute top-4 left-4">
                <span className={`px-3 py-1 rounded-full text-[10px] tracking-widest uppercase font-semibold border backdrop-blur-sm ${project.status === 'Ongoing'
                    ? 'bg-emerald-500/20 border-emerald-400/40 text-emerald-300'
                    : 'bg-sky-500/20 border-sky-400/40 text-sky-300'
                  }`}>{project.status}</span>
              </div>
            </div>

            <div className="w-full lg:w-1/2 p-6 sm:p-10 lg:p-16 flex flex-col justify-center">
              <span className="text-gray-400 text-xs sm:text-sm tracking-[0.3em] uppercase mb-3 sm:mb-4 inline-block">
                {project.category}
              </span>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-cinematic mb-4 sm:mb-6 text-white leading-none drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                {project.title}
              </h2>
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                <span className="px-3 py-1 rounded-full border border-white/20 text-[10px] sm:text-xs tracking-widest uppercase">
                  In Production
                </span>
                <span className="text-gray-400 text-[10px] sm:text-sm tracking-widest uppercase">
                  Est. {project.release}
                </span>
              </div>
              <p className="text-sm sm:text-base lg:text-lg font-light leading-relaxed text-gray-300 mb-8 sm:mb-10">
                {project.description}
              </p>
              <button className="self-start relative overflow-hidden group px-6 py-3 sm:px-8 sm:py-4 border border-white/30 rounded-full text-white text-xs sm:text-sm font-medium tracking-widest uppercase transition-all duration-300">
                <span className="relative z-10 group-hover:text-black transition-colors duration-300">Register Interest</span>
                <div className="absolute inset-0 w-full h-full bg-white scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Homepage section ─────────────────────────────────────────
export const Projects = ({ onNavigateToAll }) => {
  const sectionRef = useRef(null)
  const [selectedProject, setSelectedProject] = useState(null)

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 60%',
      onEnter: () => {
        gsap.to('.projects-title', { opacity: 1, y: 0, duration: 1, ease: 'power3.out' })
        gsap.to('.project-card', {
          opacity: 1, y: 0, duration: 0.8,
          stagger: 0.2, ease: 'power3.out', delay: 0.3
        })
      }
    })
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} id="projects-section" className="relative min-h-[100dvh] w-full flex items-center justify-center py-20">
      <div className="relative z-10 w-full max-w-[95vw] lg:max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 flex flex-col items-center">

        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-cinematic mb-12 lg:mb-20 text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-gray-900 opacity-0 projects-title translate-y-8 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] text-center">
          UPCOMING / ONGOING HIGHLIGHTS
        </h2>

        {/* Always exactly 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10 w-full">
          {HOMEPAGE_PROJECTS.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={setSelectedProject}
              animClass="project-card opacity-0 translate-y-12"
            />
          ))}
        </div>

        {/* See More — navigates to /projects page */}
        <div className="mt-14 flex flex-col items-center gap-3">
          <button
            onClick={onNavigateToAll}
            className="relative overflow-hidden group px-12 py-4 border border-white/30 rounded-full text-white text-xs font-medium tracking-[0.25em] uppercase transition-all duration-300 hover:border-white"
          >
            <span className="relative z-10 group-hover:text-black transition-colors duration-300 flex items-center gap-3">
              See All Projects
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
              </svg>
            </span>
            <div className="absolute inset-0 w-full h-full bg-white scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out" />
          </button>

        </div>
      </div>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  )
}