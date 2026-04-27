import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { releasedProjects } from '../components/Projects/projectsData';

const getYouTubeEmbedUrl = (url) => {
  if (!url) return '';
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11)
    ? `https://www.youtube.com/embed/${match[2]}?autoplay=1&rel=0`
    : url;
};

// ── Modal ──────────────────────────────────────────────────────────────────────
const ProjectModal = ({ project, onClose }) => {
  const [activeVideo, setActiveVideo] = useState(null);

  useEffect(() => {
    // Lock body scroll when modal opens
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);

    return () => {
      // Restore scroll when modal closes
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', handleKey);
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

      {/* Panel — scrollable inside, body locked */}
      <div
        className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#0e0e0e] border border-white/10 flex flex-col"
        onClick={(e) => e.stopPropagation()}
        style={{ boxShadow: '0 0 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.06)' }}
      >
        {/* Hero Image */}
        <div className="relative w-full aspect-video shrink-0 overflow-hidden rounded-t-2xl">
          <img
            src={project.coverImage}
            alt={project.title}
            className="w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-black/30 to-transparent" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 flex items-center justify-center transition-colors backdrop-blur-sm"
            aria-label="Close"
          >
            <svg className="w-4 h-4 text-white" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M1 1l10 10M11 1L1 11" />
            </svg>
          </button>

          {/* Title overlay */}
          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              {project.releaseYear && (
                <span className="text-[10px] text-white/60 tracking-[0.2em] uppercase">{project.releaseYear}</span>
              )}
              {project.genre && (
                <>
                  <span className="w-px h-3 bg-white/30" />
                  <span className="text-[10px] text-white/60 tracking-[0.2em] uppercase">{project.genre}</span>
                </>
              )}
              {project.duration && (
                <>
                  <span className="w-px h-3 bg-white/30" />
                  <span className="text-[10px] text-white/60 tracking-[0.2em] uppercase">{project.duration}</span>
                </>
              )}
              {project.language && (
                <>
                  <span className="w-px h-3 bg-white/30" />
                  <span className="text-[10px] text-white/60 tracking-[0.2em] uppercase">{project.language}</span>
                </>
              )}
            </div>
            <h2 className="text-3xl sm:text-4xl font-cinematic text-white drop-shadow-lg leading-tight">
              {project.title}
            </h2>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8 flex flex-col gap-8">

          {/* Description */}
          {project.description && (
            <div>
              <p className="text-[10px] tracking-[0.3em] uppercase text-white/30 mb-3">About</p>
              <p className="text-sm text-white/70 leading-relaxed font-light">{project.description}</p>
            </div>
          )}

          {/* Meta Grid */}
          {(project.director || project.producer || project.studio || project.cast) && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 border-t border-white/10 pt-6">
              {project.director && (
                <div>
                  <p className="text-[9px] tracking-[0.25em] uppercase text-white/30 mb-1">Director</p>
                  <p className="text-sm text-white/80">{project.director}</p>
                </div>
              )}
              {project.producer && (
                <div>
                  <p className="text-[9px] tracking-[0.25em] uppercase text-white/30 mb-1">Producer</p>
                  <p className="text-sm text-white/80">{project.producer}</p>
                </div>
              )}
              {project.studio && (
                <div>
                  <p className="text-[9px] tracking-[0.25em] uppercase text-white/30 mb-1">Studio</p>
                  <p className="text-sm text-white/80">{project.studio}</p>
                </div>
              )}
              {project.cast && (
                <div className="col-span-2 sm:col-span-3">
                  <p className="text-[9px] tracking-[0.25em] uppercase text-white/30 mb-1">Cast</p>
                  <p className="text-sm text-white/80 leading-relaxed">
                    {Array.isArray(project.cast) ? project.cast.join(', ') : project.cast}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Videos */}
          {project.videos && project.videos.length > 0 && (
            <div className="border-t border-white/10 pt-6">
              <p className="text-[10px] tracking-[0.3em] uppercase text-white/30 mb-4">Videos</p>
              <div className="flex flex-col gap-3">
                {project.videos.map((video) => (
                  <div key={video.id} className="w-full">
                    {activeVideo === video.id && video.youtubeLink ? (
                      <div className="w-full mb-1 relative">
                        <button
                          onClick={() => setActiveVideo(null)}
                          className="absolute -top-2 -right-2 z-10 w-6 h-6 rounded-full bg-white/20 hover:bg-white/40 border border-white/30 flex items-center justify-center transition-colors"
                          aria-label="Close video"
                        >
                          <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M1 1l10 10M11 1L1 11" />
                          </svg>
                        </button>
                        <div className="w-full aspect-video rounded-lg overflow-hidden bg-black ring-1 ring-white/20 shadow-xl">
                          <iframe
                            className="w-full h-full"
                            src={getYouTubeEmbedUrl(video.youtubeLink)}
                            title={video.label}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => setActiveVideo(video.id)}
                        className="flex items-center gap-3 w-full p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-left"
                      >
                        <div className="w-14 h-9 rounded overflow-hidden relative shrink-0">
                          <img src={video.thumb} alt={video.label} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <svg className="w-3 h-3 text-white ml-0.5" viewBox="0 0 12 12" fill="currentColor">
                              <path d="M2 1.5l9 4.5-9 4.5V1.5z" />
                            </svg>
                          </div>
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs text-white/90 truncate">{video.label}</p>
                          <p className="text-[9px] text-white/40">{video.duration}</p>
                        </div>
                        {video.youtubeLink && (
                          <a
                            href={video.youtubeLink}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="text-[10px] uppercase tracking-wider text-white/50 hover:text-white mr-1 shrink-0 border border-white/20 px-2 py-1 rounded"
                          >
                            YT
                          </a>
                        )}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ── Main Page ──────────────────────────────────────────────────────────────────
export const AllProjectsPage = () => {
  const [activeVideo, setActiveVideo] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCloseModal = useCallback(() => setSelectedProject(null), []);

  return (
    <>
      <div className="min-h-screen bg-moon-black text-moon-white py-20 px-6 sm:px-10 lg:px-16 overflow-y-auto">
        {/* Header */}
        <div className="max-w-screen-xl mx-auto mb-16 flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-white/10 pb-10">
          <div>
            <Link
              to="/"
              className="text-white/40 hover:text-white mb-6 inline-flex items-center gap-2 text-sm uppercase tracking-widest transition-colors"
            >
              ← Back to Home
            </Link>
            <h1
              className="text-4xl sm:text-5xl lg:text-7xl font-cinematic text-white leading-none mt-4"
              style={{ textShadow: '0 0 60px rgba(255,255,255,0.08)' }}
            >
              ALL <span className="text-white/20">PROJECTS</span>
            </h1>
          </div>
        </div>

        {/* Grid of Projects */}
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {releasedProjects.map((project) => (
            <div
              key={project.id}
              className="group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 flex flex-col"
            >
              {/* Image */}
              <div className="relative aspect-video w-full overflow-hidden">
                <img
                  src={project.coverImage}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] text-white/60 tracking-[0.2em] uppercase">{project.releaseYear}</span>
                    <span className="w-px h-3 bg-white/30" />
                    <span className="text-[10px] text-white/60 tracking-[0.2em] uppercase">{project.genre}</span>
                  </div>
                  <h3 className="text-2xl font-cinematic text-white drop-shadow-md">{project.title}</h3>
                </div>
              </div>

              {/* Description & Videos */}
              <div className="p-6 flex-1 flex flex-col">
                <p className="text-sm text-white/50 line-clamp-3 mb-4 font-light">
                  {project.description}
                </p>

                {/* See More Button */}
                <button
                  onClick={() => setSelectedProject(project)}
                  className="self-start mb-5 text-[10px] uppercase tracking-[0.2em] text-white/40 hover:text-white border-b border-white/20 hover:border-white/60 pb-0.5 transition-colors"
                >
                  See More ↗
                </button>

                <div className="mt-auto">
                  <p className="text-[10px] tracking-[0.3em] uppercase text-white/30 mb-3">Videos</p>
                  <div className="flex flex-col gap-3">
                    {project.videos && project.videos.map((video) => (
                      <div key={video.id} className="w-full">
                        {activeVideo === video.id && video.youtubeLink ? (
                          <div className="w-full mb-2 relative">
                            <button
                              onClick={() => setActiveVideo(null)}
                              className="absolute -top-2 -right-2 z-10 w-6 h-6 rounded-full bg-white/20 hover:bg-white/40 border border-white/30 flex items-center justify-center transition-colors"
                              aria-label="Close video"
                            >
                              <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M1 1l10 10M11 1L1 11" />
                              </svg>
                            </button>
                            <div className="w-full aspect-video rounded overflow-hidden bg-black ring-1 ring-white/20 shadow-xl">
                              <iframe
                                className="w-full h-full"
                                src={getYouTubeEmbedUrl(video.youtubeLink)}
                                title={video.label}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                              />
                            </div>
                          </div>
                        ) : (
                          <button
                            onClick={() => setActiveVideo(video.id)}
                            className="flex items-center gap-3 w-full p-2 rounded bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-left"
                          >
                            <div className="w-12 h-8 rounded overflow-hidden relative shrink-0">
                              <img src={video.thumb} alt={video.label} className="w-full h-full object-cover" />
                              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                <svg className="w-3 h-3 text-white ml-0.5" viewBox="0 0 12 12" fill="currentColor">
                                  <path d="M2 1.5l9 4.5-9 4.5V1.5z" />
                                </svg>
                              </div>
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-xs text-white/90 truncate">{video.label}</p>
                              <p className="text-[9px] text-white/40">{video.duration}</p>
                            </div>
                            {video.youtubeLink && (
                              <a
                                href={video.youtubeLink}
                                target="_blank"
                                rel="noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="text-[10px] uppercase tracking-wider text-white/50 hover:text-white mr-2 shrink-0 border border-white/20 px-2 py-1 rounded"
                              >
                                YT
                              </a>
                            )}
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal — rendered outside the page div so it overlays everything */}
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={handleCloseModal} />
      )}
    </>
  );
};