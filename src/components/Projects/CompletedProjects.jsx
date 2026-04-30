import React, { useRef, useState, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Link } from 'react-router-dom'
import { releasedProjects } from './projectsData'

gsap.registerPlugin(ScrollTrigger)

const getYouTubeEmbedUrl = (url) => {
  if (!url) return '';
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11)
    ? `https://www.youtube.com/embed/${match[2]}?autoplay=1&rel=0`
    : url;
};

export const CompletedProjects = () => {
  const sectionRef = useRef(null)
  const [activeVideo, setActiveVideo] = useState(null)
  const [expandedProject, setExpandedProject] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    setIsPlaying(false)
  }, [activeVideo])



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
            <h2
              className="text-5xl sm:text-6xl lg:text-8xl font-cinematic text-white leading-none"
              style={{ textShadow: '0 0 60px rgba(255,255,255,0.08)' }}
            >
              COMPLETED<br />
              <span className="text-white/20">WORKS</span>
            </h2>
          </div>
          <div className="flex justify-end">
            <Link 
              to="/all-projects" 
              className="group relative px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/20 rounded-full text-white text-xs tracking-[0.2em] uppercase transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                View All Projects
                <span className="text-base group-hover:translate-x-1 transition-transform duration-300">→</span>
              </span>
              <div className="absolute inset-0 w-full h-full bg-white/10 scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out"></div>
            </Link>
          </div>
        </div>

        {/* Project rows */}
        <div className="flex flex-col divide-y divide-white/[0.07]">
          {releasedProjects.slice(0, 4).map((project) => {
            const isExpanded = expandedProject === project.id

            return (
              <div key={project.id} className="cp-project-row opacity-0">

                {/* ── Top bar: always visible ─────────────────────── */}
                <div
                  className="group flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-12 py-10 lg:py-14 cursor-pointer select-none"
                  onClick={() => toggleExpand(project.id)}
                >
                  {/* Index */}
                  <span className="text-xs text-white/20 w-8 shrink-0 hidden lg:block">
                    {project.index}
                  </span>

                  {/* Thumbnail strip */}
                  <div className="relative w-full lg:w-64 xl:w-80 aspect-[16/9] shrink-0 overflow-hidden bg-black/20">
                    {/* Blurred background to fill empty space without black bars */}
                    <img
                      src={project.coverImage}
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover blur-xl opacity-40 grayscale group-hover:grayscale-0 transition-all duration-700 scale-110"
                    />
                    {/* Actual uncut poster */}
                    <img
                      src={project.coverImage}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-700 scale-95 group-hover:scale-100"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-500" />
                    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/80 to-transparent" />
                    <span className="absolute bottom-3 left-4 text-[10px] text-white/70 tracking-widest font-semibold drop-shadow-md z-10">
                      {project.seasons ? `${project.seasons.length} SEASONS` : `${project.videos?.length || 0} VIDEOS`}
                    </span>
                  </div>

                  {/* Meta */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-[10px] text-white/80 tracking-[0.25em] uppercase">{project.releaseYear}</span>
                      <span className="w-px h-3 bg-white/40" />
                      <span className="text-[10px] text-white/80 tracking-[0.2em] uppercase">{project.genre}</span>
                      <span className="w-px h-3 bg-white/40" />
                      <span className="text-[10px] text-white/80 tracking-[0.2em] uppercase">{project.runtime}</span>
                    </div>

                    <h3 className="text-3xl sm:text-4xl lg:text-5xl font-cinematic text-white leading-none mb-4 group-hover:text-white/90 transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-sm text-white/80 tracking-[0.15em] uppercase">
                      {project.awards}
                    </p>
                  </div>

                  {/* Expand toggle */}
                  <div className="hidden lg:flex items-center gap-3 shrink-0">
                    <span className="text-xs text-white/80 tracking-widest uppercase">
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
                  style={{ maxHeight: isExpanded ? '3000px' : '0px' }}
                >
                  <div className="pb-12 lg:pb-16 flex flex-col gap-10">

                    {/* Description */}
                    <p className="text-base lg:text-lg text-white/90 font-light leading-relaxed max-w-3xl border-l border-white/20 pl-6">
                      {project.description}
                    </p>

                    {/* Video label */}
                    <p className="text-[10px] tracking-[0.35em] uppercase text-white/70">
                      — AVAILABLE FOOTAGE
                    </p>

                    {/* Video grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                      {project.seasons ? project.seasons.map((season) => {
                        const trailer = season.episodes?.[0]
                        if (!trailer) return null
                        const isActive = activeVideo === trailer.id
                        return (
                          <div key={season.seasonNumber} className="flex flex-col gap-2">
                            <button
                              onClick={(e) => { e.stopPropagation(); setActiveVideo(isActive ? null : trailer.id) }}
                              className={`group/v relative aspect-[16/9] w-full overflow-hidden text-left transition-all duration-300 ${isActive ? 'ring-1 ring-white/60 ring-offset-2 ring-offset-black' : 'ring-1 ring-white/10 hover:ring-white/30'}`}
                            >
                              <img src={trailer.thumb} alt={trailer.label} className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${isActive ? 'grayscale-0 scale-105' : 'grayscale group-hover/v:grayscale-0 group-hover/v:scale-105'}`} />
                              <div className={`absolute inset-0 transition-all duration-300 ${isActive ? 'bg-black/20' : 'bg-black/60 group-hover/v:bg-black/35'}`} />
                              <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-0 group-hover/v:opacity-100'}`}>
                                <div className="w-9 h-9 rounded-full bg-white/15 backdrop-blur-sm border border-white/30 flex items-center justify-center">
                                  {isActive ? <span className="w-3 h-3 flex gap-[3px] items-center"><span className="block w-[3px] h-3 bg-white rounded-sm" /><span className="block w-[3px] h-3 bg-white rounded-sm" /></span> : <svg className="w-3 h-3 text-white ml-0.5" viewBox="0 0 12 12" fill="currentColor"><path d="M2 1.5l9 4.5-9 4.5V1.5z" /></svg>}
                                </div>
                              </div>
                              <div className="absolute bottom-0 left-0 right-0 p-2.5 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                                <p className="text-[10px] text-white/80 leading-tight truncate">{trailer.label}</p>
                                <p className="text-[9px] text-white/35 mt-0.5">{trailer.duration}</p>
                              </div>
                            </button>
                            {season.playlistLink && (
                              <a
                                href={season.playlistLink}
                                target="_blank"
                                rel="noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="w-full py-1.5 flex items-center justify-center gap-1.5 text-center text-[9px] uppercase tracking-widest text-white/70 hover:text-white hover:bg-white/10 border border-white/20 rounded transition-colors"
                              >
                                Watch Playlist ↗
                              </a>
                            )}
                          </div>
                        )
                      }) : project.videos?.map((video) => {
                        const isActive = activeVideo === video.id
                        return (
                          <div key={video.id} className="flex flex-col gap-2">
                            <button
                              onClick={(e) => { e.stopPropagation(); setActiveVideo(isActive ? null : video.id) }}
                              className={`group/v relative aspect-[16/9] w-full overflow-hidden text-left transition-all duration-300 ${isActive ? 'ring-1 ring-white/60 ring-offset-2 ring-offset-black' : 'ring-1 ring-white/10 hover:ring-white/30'}`}
                            >
                              <img src={video.thumb} alt={video.label} className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${isActive ? 'grayscale-0 scale-105' : 'grayscale group-hover/v:grayscale-0 group-hover/v:scale-105'}`} />
                              <div className={`absolute inset-0 transition-all duration-300 ${isActive ? 'bg-black/20' : 'bg-black/60 group-hover/v:bg-black/35'}`} />
                              <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-0 group-hover/v:opacity-100'}`}>
                                <div className="w-9 h-9 rounded-full bg-white/15 backdrop-blur-sm border border-white/30 flex items-center justify-center">
                                  {isActive ? <span className="w-3 h-3 flex gap-[3px] items-center"><span className="block w-[3px] h-3 bg-white rounded-sm" /><span className="block w-[3px] h-3 bg-white rounded-sm" /></span> : <svg className="w-3 h-3 text-white ml-0.5" viewBox="0 0 12 12" fill="currentColor"><path d="M2 1.5l9 4.5-9 4.5V1.5z" /></svg>}
                                </div>
                              </div>
                              <div className="absolute bottom-0 left-0 right-0 p-2.5 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                                <p className="text-[10px] text-white/80 leading-tight truncate">{video.label}</p>
                                <p className="text-[9px] text-white/35 mt-0.5">{video.duration}</p>
                              </div>
                            </button>
                            {video.playlistLink && (
                              <a
                                href={video.playlistLink}
                                target="_blank"
                                rel="noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="w-full py-1.5 flex items-center justify-center gap-1.5 text-center text-[9px] uppercase tracking-widest text-white/70 hover:text-white hover:bg-white/10 border border-white/20 rounded transition-colors"
                              >
                                Watch Full Movie ↗
                              </a>
                            )}
                          </div>
                        )
                      })}
                    </div>

                    {/* Active video player placeholder */}
                    {activeVideo && (() => {
                      const allVideos = project.seasons 
                        ? project.seasons.flatMap(s => s.episodes || []) 
                        : (project.videos || []);
                      const videoData = allVideos.find(v => v.id === activeVideo);
                      return (
                        <div className="relative w-full aspect-video bg-black/60 flex items-center justify-center border border-white/10 overflow-hidden">

                          {isPlaying && videoData?.youtubeLink ? (
                            <div className="relative w-[90%] md:w-[85%] lg:w-[80%] aspect-video z-10 bg-black rounded-lg overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.6)] border border-white/10">
                              <iframe
                                className="absolute inset-0 w-full h-full"
                                src={getYouTubeEmbedUrl(videoData.youtubeLink)}
                                title={videoData.label}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                              ></iframe>
                            </div>
                          ) : (
                            <>
                              {/* Background Thumbnail */}
                              {videoData?.thumb && (
                                <>
                                  <img
                                    src={videoData.thumb}
                                    alt={videoData.label}
                                    className="absolute inset-0 w-full h-full object-cover opacity-60"
                                  />
                                  <div className="absolute inset-0 bg-black/40" />
                                </>
                              )}

                              <div className="relative z-10 text-center">
                                <div
                                  onClick={(e) => { e.stopPropagation(); setIsPlaying(true) }}
                                  className="w-16 h-16 rounded-full border border-white/20 bg-black/50 backdrop-blur-sm flex items-center justify-center mx-auto mb-4 hover:bg-white/10 transition-colors cursor-pointer"
                                >
                                  <svg className="w-6 h-6 text-white ml-1" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" />
                                  </svg>
                                </div>
                                <p className="text-white text-sm tracking-widest uppercase mb-6 font-semibold drop-shadow-md">
                                  {videoData?.label}
                                </p>
                                {videoData?.youtubeLink ? (
                                  <a
                                    href={videoData.youtubeLink}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-block px-6 py-2.5 border border-white/40 bg-black/50 hover:bg-white/20 backdrop-blur-sm text-white text-[10px] tracking-widest uppercase transition-colors"
                                  >
                                    Watch on YouTube
                                  </a>
                                ) : (
                                  <p className="text-white/40 text-[10px] tracking-wider bg-black/50 px-4 py-2 inline-block rounded">PLAYER EMBED AREA</p>
                                )}
                              </div>
                            </>
                          )}

                          {/* Close */}
                          <button
                            onClick={(e) => { e.stopPropagation(); setActiveVideo(null); setIsPlaying(false) }}
                            className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full border border-white/20 bg-black/50 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:border-white/50 transition-colors"
                          >
                            <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                              <line x1="1" y1="1" x2="11" y2="11" /><line x1="11" y1="1" x2="1" y2="11" />
                            </svg>
                          </button>
                        </div>
                      )
                    })()}

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