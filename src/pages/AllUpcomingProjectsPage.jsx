import { useState, useEffect, useCallback } from 'react';
import useProjects from '../hooks/useProjects';
import useProjectMedia from '../hooks/useProjectMedia';
import useProjectLinks from '../hooks/useProjectLinks';
import useProjectCategories from '../hooks/useProjectCategories';
import { BASE_URL } from '../utils/api';

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
  const [activeSeasonIndex, setActiveSeasonIndex] = useState(0);

  useEffect(() => {
    // Lock body scroll when modal opens
    const prevBody = document.body.style.overflow;
    const prevHtml = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    window.lenis?.stop();

    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);

    return () => {
      // Restore scroll when modal closes
      document.body.style.overflow = prevBody;
      document.documentElement.style.overflow = prevHtml;
      window.lenis?.start();
      document.removeEventListener('keydown', handleKey);
    };
  }, [onClose]);

  const { media, loading } = useProjectMedia(project?.id);
  const { links } = useProjectLinks(project?.id);
  const activeMediaData = media?.find(m => m.id === activeVideo);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

      {/* Panel — scrollable inside, body locked */}
      <div
        data-lenis-prevent="true"
        className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#0e0e0e] border border-white/10 flex flex-col"
        onClick={(e) => e.stopPropagation()}
        style={{ boxShadow: '0 0 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.06)' }}
      >
        {/* Hero Image */}
        <div className="relative w-full aspect-video shrink-0 overflow-hidden rounded-t-2xl bg-black">
          {/* Blurred Background */}
          <div 
            className="absolute inset-0 bg-cover bg-center blur-xl opacity-50 scale-125" 
            style={{ backgroundImage: `url(${BASE_URL}${project.poster})` }} 
          />
          <img
            src={project.poster ? `${BASE_URL}${project.poster}` : ''}
            alt={project.title}
            className="relative w-full h-full object-contain z-10"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-black/30 to-transparent z-20" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 flex items-center justify-center transition-colors backdrop-blur-sm z-50"
            aria-label="Close"
          >
            <svg className="w-4 h-4 text-white" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M1 1l10 10M11 1L1 11" />
            </svg>
          </button>

          {/* Title overlay */}
          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              {project.status && (
                <span className={`px-2 py-0.5 rounded text-[10px] tracking-[0.2em] uppercase border ${
                  project.status === 'ongoing' ? 'bg-emerald-500/20 border-emerald-400/40 text-emerald-300' : 'bg-sky-500/20 border-sky-400/40 text-sky-300'
                }`}>
                  {project.status}
                </span>
              )}
              {project.release_year && (
                <>
                  <span className="w-px h-3 bg-white/30" />
                  <span className="text-[10px] text-white/60 tracking-[0.2em] uppercase">{project.release_year}</span>
                </>
              )}
              {project.category_name && (
                <>
                  <span className="w-px h-3 bg-white/30" />
                  <span className="text-[10px] text-white/60 tracking-[0.2em] uppercase">{project.category_name}</span>
                </>
              )}
              {project.seasons > 0 && (
                <>
                  <span className="w-px h-3 bg-white/30" />
                  <span className="text-[10px] text-white/60 tracking-[0.2em] uppercase">{project.seasons} {project.seasons > 1 ? 'Seasons' : 'Season'}</span>
                </>
              )}
              {project.episodes > 0 && (
                <>
                  <span className="w-px h-3 bg-white/30" />
                  <span className="text-[10px] text-white/60 tracking-[0.2em] uppercase">{project.episodes} {project.episodes > 1 ? 'Episodes' : 'Episode'}</span>
                </>
              )}
              {project.duration && (
                <>
                  <span className="w-px h-3 bg-white/30" />
                  <span className="text-[10px] text-white/60 tracking-[0.2em] uppercase">{project.duration}</span>
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
          {(project.network || project.digital_partner) && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 border-t border-white/10 pt-6">
              {project.network && (
                <div>
                  <p className="text-[9px] tracking-[0.25em] uppercase text-white/30 mb-1">Network</p>
                  <p className="text-sm text-white/80">{project.network}</p>
                </div>
              )}
              {project.digital_partner && (
                <div>
                  <p className="text-[9px] tracking-[0.25em] uppercase text-white/30 mb-1">Digital Partner</p>
                  <p className="text-sm text-white/80">{project.digital_partner}</p>
                </div>
              )}
            </div>
          )}

          {/* Media (Youtube Links) */}
          <div className="border-t border-white/10 pt-6">
            <p className="text-[10px] tracking-[0.3em] uppercase text-white/30 mb-4">Media</p>

            <div className="flex flex-col gap-3">
              {(() => {
                const getYoutubeId = (url) => {
                  if (!url) return null;
                  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
                  const match = url.match(regExp);
                  return (match && match[2].length === 11) ? match[2] : null;
                };
                const youtubeLinks = links?.filter(link => getYoutubeId(link.url)) || [];
                
                if (youtubeLinks.length === 0) {
                  return <p className="text-sm text-white/40 italic">No media available yet.</p>;
                }

                return youtubeLinks.map((item) => {
                  const ytId = getYoutubeId(item.url);
                  const thumbUrl = ytId ? `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg` : '';
                  return (
                    <div key={item.id} className="w-full">
                      {activeVideo === item.id ? (
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
                          <div className="w-full aspect-video rounded-lg overflow-hidden bg-black ring-1 ring-white/20 shadow-xl relative">
                            <iframe
                              className="absolute inset-0 w-full h-full"
                              src={getYouTubeEmbedUrl(item.url)}
                              title={item.type || 'Video'}
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            />
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => setActiveVideo(item.id)}
                          className="flex items-center gap-3 w-full p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-left"
                        >
                          <div className="w-14 h-9 rounded overflow-hidden relative shrink-0">
                            {thumbUrl && <img src={thumbUrl} alt={item.type || 'Video'} className="w-full h-full object-cover" />}
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                              <svg className="w-3 h-3 text-white ml-0.5" viewBox="0 0 12 12" fill="currentColor">
                                <path d="M2 1.5l9 4.5-9 4.5V1.5z" />
                              </svg>
                            </div>
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-xs text-white/90 truncate uppercase">{item.type || 'Video'}</p>
                          </div>
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="text-[10px] uppercase tracking-wider text-white/50 hover:text-white mr-1 shrink-0 border border-white/20 px-2 py-1 rounded transition-colors"
                          >
                            YT
                          </a>
                        </button>
                      )}
                    </div>
                  )
                });
              })()}
            </div>
          </div>

          {/* Links */}
          {links && links.length > 0 && (
            <div className="border-t border-white/10 pt-6 mt-6">
              <p className="text-[10px] tracking-[0.3em] uppercase text-white/30 mb-4">External Links</p>
              <div className="flex flex-wrap gap-3">
                {links.map((link) => {
                  const isYoutube = link.url && (link.url.includes('youtube.com') || link.url.includes('youtu.be'));
                  const labelText = link.type || (isYoutube ? 'YouTube' : 'Link');
                  return (
                    <a
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 text-[10px] uppercase tracking-widest px-4 py-2 border border-white/20 rounded-full hover:bg-white/10 hover:text-white text-white/70 transition-colors"
                    >
                      {isYoutube && (
                        <svg className="w-3.5 h-3.5 text-white/80" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.134 0 12 0 12s0 3.866.501 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.377.55 9.377.55s7.505 0 9.377-.55a3.016 3.016 0 0 0 2.122-2.136C24 15.866 24 12 24 12s0-3.866-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                        </svg>
                      )}
                      {labelText} ↗
                    </a>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const AllUpcomingProjectsPage = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [filter, setFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  
  const { projects } = useProjects();
  const { categories } = useProjectCategories();
  const upcomingProjects = projects?.filter(p => p.status === 'upcoming' || p.status === 'ongoing') || [];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCloseModal = useCallback(() => setSelectedProject(null), []);

  const filteredProjects = upcomingProjects.filter(p => {
    const matchStatus = filter === 'All' || p.status.toLowerCase() === filter.toLowerCase();
    const matchCategory = categoryFilter === 'All Categories' || p.category_name === categoryFilter;
    return matchStatus && matchCategory;
  });


  return (
    <>
      <div className="min-h-screen bg-moon-black text-moon-white py-20 px-6 sm:px-10 lg:px-16 overflow-y-auto">
        {/* Header & Filters */}
        <div className="max-w-screen-xl mx-auto mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-white/10 pb-10">
          <div>
            <a
              href="/"
              className="text-white/40 hover:text-white mb-6 inline-flex items-center gap-2 text-sm uppercase tracking-widest transition-colors"
            >
              ← Back to Home
            </a>
            <h1
              className="text-4xl sm:text-5xl lg:text-7xl font-cinematic text-white leading-none mt-4"
              style={{ textShadow: '0 0 60px rgba(255,255,255,0.08)' }}
            >
              OUR <span className="text-white/20">PRODUCTION</span>
            </h1>
          </div>
          
          {/* Filters */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* Category Filter */}
            <div className="flex items-center gap-2 bg-white/5 p-1.5 rounded-full border border-white/10 overflow-x-auto max-w-full scrollbar-hide">
              <button
                onClick={() => setCategoryFilter('All Categories')}
                className={`px-4 py-2 rounded-full text-[10px] tracking-[0.2em] uppercase transition-all duration-300 whitespace-nowrap ${
                  categoryFilter === 'All Categories' 
                    ? 'bg-white text-black font-semibold shadow-[0_0_20px_rgba(255,255,255,0.3)]' 
                    : 'text-white/50 hover:text-white hover:bg-white/10'
                }`}
              >
                All Categories
              </button>
              {categories?.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setCategoryFilter(cat.name)}
                  className={`px-4 py-2 rounded-full text-[10px] tracking-[0.2em] uppercase transition-all duration-300 whitespace-nowrap flex items-center gap-2 ${
                    categoryFilter === cat.name 
                      ? 'bg-white text-black font-semibold shadow-[0_0_20px_rgba(255,255,255,0.3)]' 
                      : 'text-white/50 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {cat.image_path && (
                    <img src={`${BASE_URL}/${cat.image_path}`} alt={cat.name} className="w-4 h-4 rounded-full object-cover inline-block" />
                  )}
                  {cat.name}
                </button>
              ))}
            </div>

          </div>
        </div>

        {/* Grid of Projects */}
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 flex flex-col"
            >
              {/* Image */}
              <div className="relative aspect-video w-full overflow-hidden bg-black">
                {/* Blurred Background */}
                <div 
                  className="absolute inset-0 bg-cover bg-center blur-xl opacity-40 scale-125 transition-transform duration-1000 group-hover:scale-150"
                  style={{ backgroundImage: `url(${BASE_URL}${project.poster})` }}
                />
                <img
                  src={project.poster ? `${BASE_URL}${project.poster}` : ''}
                  alt={project.title}
                  className="relative w-full h-full object-contain transition-transform duration-1000 group-hover:scale-105 opacity-90 group-hover:opacity-100 z-10"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-20" />
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] tracking-widest uppercase font-semibold border backdrop-blur-sm ${
                      project.status === 'ongoing'
                        ? 'bg-emerald-500/20 border-emerald-400/40 text-emerald-300'
                        : 'bg-sky-500/20 border-sky-400/40 text-sky-300'
                    }`}>
                    {project.status}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] text-white/60 tracking-[0.2em] uppercase">{project.category_name}</span>
                  </div>
                  <h3 className="text-2xl font-cinematic text-white drop-shadow-md">{project.title}</h3>
                </div>
              </div>

              {/* Description & Videos Link */}
              <div className="p-6 flex-1 flex flex-col">
                <p className="text-sm text-white/50 line-clamp-3 mb-4 font-light">
                  {project.description}
                </p>

                {/* See More Button */}
                <button
                  onClick={() => setSelectedProject(project)}
                  className="mt-auto self-start text-[10px] uppercase tracking-[0.2em] text-white/40 hover:text-white border-b border-white/20 hover:border-white/60 pb-0.5 transition-colors"
                >
                  View Details & Videos ↗
                </button>
              </div>
            </div>
          ))}
          
          {filteredProjects.length === 0 && (
            <div className="col-span-full py-20 text-center text-white/40">
              <p className="tracking-widest uppercase">No projects found in this category.</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal — rendered outside the page div so it overlays everything */}
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={handleCloseModal} />
      )}
    </>
  );
};
