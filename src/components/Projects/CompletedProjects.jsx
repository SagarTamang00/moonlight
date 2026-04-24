import React, { useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

export const CompletedProjects = () => {
  const sectionRef = useRef(null)
  const [activeVideo, setActiveVideo] = useState(null)
  const [expandedProject, setExpandedProject] = useState(null)

  const releasedProjects = [
    {
      id: 1,
      index: '01',
      title: 'LUNAR ECHOES',
      releaseYear: '2025',
      awards: 'Winner — Best Visual Effects',
      genre: 'Sci-Fi Feature',
      runtime: '2h 14m',
      description:
        'A breathtaking journey into the silent voids of space, exploring the profound isolation and sheer beauty of the lunar surface. It redefined cinematic immersion with revolutionary practical effects blended with state-of-the-art CGI.',
      coverImage:
        'https://images.unsplash.com/photo-1541873676-a18131494184?q=80&w=1918&auto=format&fit=crop',
      videos: [
        { id: 'v1a', label: 'Official Trailer', duration: '2:34', thumb: 'https://images.unsplash.com/photo-1509773896068-7fd415d91e2e?q=80&w=600&auto=format&fit=crop' },
        { id: 'v1b', label: 'Teaser Cut', duration: '1:02', thumb: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=600&auto=format&fit=crop' },
        { id: 'v1c', label: 'Behind the Lens', duration: '8:17', thumb: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?q=80&w=600&auto=format&fit=crop' },
        { id: 'v1d', label: 'VFX Breakdown', duration: '5:49', thumb: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop' },
      ],
    },
    {
      id: 2,
      index: '02',
      title: 'NEON SYNDICATE',
      releaseYear: '2024',
      awards: 'Nominee — Outstanding Series',
      genre: 'Cyberpunk Mini-Series',
      runtime: '6 Episodes',
      description:
        'Set in a dystopian metropolis illuminated only by synthetic neon glow, it follows the intertwined lives of outcasts fighting against a megacorporation\'s total control. Praised for its intense pacing and phenomenal score.',
      coverImage:
        'https://images.unsplash.com/photo-1555861496-faa66bfcb368?q=80&w=2070&auto=format&fit=crop',
      videos: [
        { id: 'v2a', label: 'Series Trailer', duration: '3:11', thumb: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=600&auto=format&fit=crop' },
        { id: 'v2b', label: 'Episode 1 Clip', duration: '4:22', thumb: 'https://images.unsplash.com/photo-1523821741446-edb2b68bb7a0?q=80&w=600&auto=format&fit=crop' },
        { id: 'v2c', label: 'Score Featurette', duration: '6:58', thumb: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=600&auto=format&fit=crop' },
      ],
    },
    {
      id: 3,
      index: '03',
      title: 'THE ABYSS',
      releaseYear: '2023',
      awards: 'Winner — Best Sound Design',
      genre: 'Psychological Horror',
      runtime: '1h 58m',
      description:
        'A terrifying descent into the deepest parts of the ocean. Utilizing groundbreaking underwater cinematography and a highly immersive, claustrophobic soundscape that kept audiences on the edge of their seats.',
      coverImage:
        'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?q=80&w=2070&auto=format&fit=crop',
      videos: [
        { id: 'v3a', label: 'Main Trailer', duration: '2:48', thumb: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?q=80&w=600&auto=format&fit=crop' },
        { id: 'v3b', label: 'Director\'s Cut Promo', duration: '1:33', thumb: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?q=80&w=600&auto=format&fit=crop' },
        { id: 'v3c', label: 'Sound Design Reel', duration: '7:05', thumb: 'https://images.unsplash.com/photo-1516912481808-3406841bd33c?q=80&w=600&auto=format&fit=crop' },
        { id: 'v3d', label: 'Cast Interviews', duration: '12:44', thumb: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=600&auto=format&fit=crop' },
        { id: 'v3e', label: 'Underwater BTS', duration: '9:20', thumb: 'https://images.unsplash.com/photo-1551244072-5d12893278bc?q=80&w=600&auto=format&fit=crop' },
      ],
    },
  ]

  useGSAP(() => {
    gsap.fromTo('.cp-headline', { opacity: 0, y: 40 }, {
      opacity: 1, y: 0, duration: 1.2, ease: 'power4.out',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
    })

    gsap.utils.toArray('.cp-project-row').forEach((row, i) => {
      gsap.fromTo(row, { opacity: 0, y: 60 }, {
        opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: i * 0.1,
        scrollTrigger: { trigger: row, start: 'top 80%' }
      })
    })
  }, { scope: sectionRef })

  const toggleExpand = (id) => {
    setExpandedProject(prev => prev === id ? null : id)
    setActiveVideo(null)
  }

  return (
    <section
      ref={sectionRef}
      id="completed-projects-section"
      className="relative w-full py-24 lg:py-40 overflow-hidden"
    >
      {/* Faint grain overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")', backgroundSize: '200px 200px' }} />

      <div className="relative z-10 w-full max-w-[95vw] xl:max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">

        {/* Section header */}
        <div className="cp-headline mb-20 lg:mb-32 flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-white/10 pb-10">
          <div>
            <p className="text-xs tracking-[0.35em] uppercase text-white/40 mb-4 font-mono">Selected Works</p>
            <h2
              className="text-5xl sm:text-6xl lg:text-8xl font-cinematic text-white leading-none"
              style={{ textShadow: '0 0 60px rgba(255,255,255,0.08)' }}
            >
              COMPLETED<br />
              <span className="text-white/20">WORKS</span>
            </h2>
          </div>
          <p className="text-sm text-white/30 max-w-xs text-right font-light tracking-wide hidden sm:block">
            Award-winning films &amp; series crafted with uncompromising vision.
          </p>
        </div>

        {/* Project rows */}
        <div className="flex flex-col divide-y divide-white/[0.07]">
          {releasedProjects.map((project) => {
            const isExpanded = expandedProject === project.id

            return (
              <div key={project.id} className="cp-project-row opacity-0">

                {/* ── Top bar: always visible ─────────────────────── */}
                <div
                  className="group flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-12 py-10 lg:py-14 cursor-pointer select-none"
                  onClick={() => toggleExpand(project.id)}
                >
                  {/* Index */}
                  <span className="font-mono text-xs text-white/20 w-8 shrink-0 hidden lg:block">
                    {project.index}
                  </span>

                  {/* Thumbnail strip */}
                  <div className="relative w-full lg:w-64 xl:w-80 aspect-[16/9] shrink-0 overflow-hidden">
                    <img
                      src={project.coverImage}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors duration-500" />
                    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/80 to-transparent" />
                    <span className="absolute bottom-3 left-4 font-mono text-[10px] text-white/50 tracking-widest">
                      {project.videos.length} VIDEOS
                    </span>
                  </div>

                  {/* Meta */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-[10px] font-mono text-white/30 tracking-[0.25em] uppercase">{project.releaseYear}</span>
                      <span className="w-px h-3 bg-white/20" />
                      <span className="text-[10px] font-mono text-white/30 tracking-[0.2em] uppercase">{project.genre}</span>
                      <span className="w-px h-3 bg-white/20" />
                      <span className="text-[10px] font-mono text-white/30 tracking-[0.2em] uppercase">{project.runtime}</span>
                    </div>

                    <h3 className="text-3xl sm:text-4xl lg:text-5xl font-cinematic text-white leading-none mb-4 group-hover:text-white/90 transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-sm text-white/30 tracking-[0.15em] uppercase font-mono">
                      {project.awards}
                    </p>
                  </div>

                  {/* Expand toggle */}
                  <div className="hidden lg:flex items-center gap-3 shrink-0">
                    <span className="text-xs text-white/30 tracking-widest uppercase font-mono">
                      {isExpanded ? 'Close' : 'View All'}
                    </span>
                    <div className={`w-8 h-8 rounded-full border border-white/20 flex items-center justify-center transition-all duration-500 ${isExpanded ? 'rotate-45 bg-white/10' : 'group-hover:border-white/50'}`}>
                      <svg className="w-3 h-3 text-white/60" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <line x1="6" y1="1" x2="6" y2="11" />
                        <line x1="1" y1="6" x2="11" y2="6" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* ── Expanded panel: video gallery + description ── */}
                <div
                  className={`overflow-hidden transition-all duration-700 ease-in-out`}
                  style={{ maxHeight: isExpanded ? '900px' : '0px' }}
                >
                  <div className="pb-12 lg:pb-16 flex flex-col gap-10">

                    {/* Description */}
                    <p className="text-base lg:text-lg text-white/50 font-light leading-relaxed max-w-3xl border-l border-white/10 pl-6">
                      {project.description}
                    </p>

                    {/* Video label */}
                    <p className="text-[10px] tracking-[0.35em] uppercase font-mono text-white/25">
                      — AVAILABLE FOOTAGE
                    </p>

                    {/* Video grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                      {project.videos.map((video) => {
                        const isActive = activeVideo === video.id
                        return (
                          <button
                            key={video.id}
                            onClick={(e) => { e.stopPropagation(); setActiveVideo(isActive ? null : video.id) }}
                            className={`group/v relative aspect-[16/9] overflow-hidden text-left transition-all duration-300 ${isActive ? 'ring-1 ring-white/60 ring-offset-2 ring-offset-black' : 'ring-1 ring-white/10 hover:ring-white/30'}`}
                          >
                            <img
                              src={video.thumb}
                              alt={video.label}
                              className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${isActive ? 'grayscale-0 scale-105' : 'grayscale group-hover/v:grayscale-0 group-hover/v:scale-105'}`}
                            />
                            {/* Dark overlay */}
                            <div className={`absolute inset-0 transition-all duration-300 ${isActive ? 'bg-black/20' : 'bg-black/60 group-hover/v:bg-black/35'}`} />

                            {/* Play icon */}
                            <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-0 group-hover/v:opacity-100'}`}>
                              <div className="w-9 h-9 rounded-full bg-white/15 backdrop-blur-sm border border-white/30 flex items-center justify-center">
                                {isActive
                                  ? <span className="w-3 h-3 flex gap-[3px] items-center"><span className="block w-[3px] h-3 bg-white rounded-sm" /><span className="block w-[3px] h-3 bg-white rounded-sm" /></span>
                                  : <svg className="w-3 h-3 text-white ml-0.5" viewBox="0 0 12 12" fill="currentColor"><path d="M2 1.5l9 4.5-9 4.5V1.5z" /></svg>
                                }
                              </div>
                            </div>

                            {/* Label + duration */}
                            <div className="absolute bottom-0 left-0 right-0 p-2.5 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                              <p className="text-[10px] font-mono text-white/80 leading-tight truncate">{video.label}</p>
                              <p className="text-[9px] font-mono text-white/35 mt-0.5">{video.duration}</p>
                            </div>
                          </button>
                        )
                      })}
                    </div>

                    {/* Active video player placeholder */}
                    {activeVideo && (
                      <div className="relative w-full aspect-video bg-black/60 flex items-center justify-center border border-white/10">
                        <div className="text-center">
                          <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center mx-auto mb-4">
                            <svg className="w-6 h-6 text-white/40 ml-1" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" />
                            </svg>
                          </div>
                          <p className="text-white/30 font-mono text-xs tracking-widest uppercase">
                            {project.videos.find(v => v.id === activeVideo)?.label}
                          </p>
                          <p className="text-white/15 font-mono text-[10px] mt-1 tracking-wider">PLAYER EMBED AREA</p>
                        </div>

                        {/* Close */}
                        <button
                          onClick={(e) => { e.stopPropagation(); setActiveVideo(null) }}
                          className="absolute top-4 right-4 w-7 h-7 rounded-full border border-white/20 flex items-center justify-center text-white/40 hover:text-white hover:border-white/50 transition-colors"
                        >
                          <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <line x1="1" y1="1" x2="11" y2="11" /><line x1="11" y1="1" x2="1" y2="11" />
                          </svg>
                        </button>
                      </div>
                    )}

                  </div>
                </div>

              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}