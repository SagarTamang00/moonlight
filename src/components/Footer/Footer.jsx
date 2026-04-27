import React, { useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

const SOCIALS = ['IG', 'X', 'YT', 'VIMEO']

export const Footer = () => {
  const footerRef = useRef(null)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  useGSAP(() => {
    gsap.fromTo('.ft-logo', { opacity: 0, y: 50 }, {
      opacity: 1, y: 0, duration: 1.3, ease: 'power4.out',
      scrollTrigger: { trigger: footerRef.current, start: 'top 88%' }
    })
    gsap.fromTo('.ft-fade', { opacity: 0, y: 16 }, {
      opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.07,
      scrollTrigger: { trigger: '.ft-fade', start: 'top 92%' }
    })
  }, { scope: footerRef })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email.trim()) setSubmitted(true)
  }

  return (
    <footer
      ref={footerRef}
      className="relative w-full overflow-hidden"
      style={{ background: '#080808', borderTop: '1px solid rgba(255,255,255,0.08)' }}
    >
      {/* Film strip top */}
      <div className="w-full flex overflow-hidden" style={{ height: '2px' }}>
        {Array.from({ length: 100 }).map((_, i) => (
          <div key={i} className="shrink-0" style={{
            width: i % 5 === 4 ? '14px' : '5px',
            height: '2px',
            background: i % 5 === 4 ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.05)',
          }} />
        ))}
      </div>

      <div className="w-full max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16 py-16 lg:py-20 flex flex-col gap-12">

        {/* ── Top: Logo + nav ── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">

          {/* Logo block */}
          <div className="ft-logo" style={{ opacity: 0 }}>
            <p className="text-[10px] tracking-[0.4em] text-white/50 uppercase mb-3">
              Est. 2025 — Kathmandu Nepal
            </p>
            <h2
              className="font-cinematic text-white leading-none"
              style={{ fontSize: 'clamp(2.8rem, 7vw, 5.5rem)', letterSpacing: '-0.02em' }}
            >
              MOONLIGHT
            </h2>
            <h2
              className="font-cinematic leading-none"
              style={{
                fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
                letterSpacing: '-0.02em',
                color: 'rgba(255,255,255,0.28)',
              }}
            >
              MOTION PICTURES
            </h2>
          </div>

        </div>

        {/* ── Divider ── */}
        <div className="ft-fade w-full h-px" style={{ background: 'rgba(255,255,255,0.08)', opacity: 0 }} />

        {/* ── Bottom row ── */}
        <div className="ft-fade flex flex-col sm:flex-row sm:items-center justify-between gap-6" style={{ opacity: 0 }}>

          {/* Copyright */}
          <p className="text-[11px] tracking-[0.2em] text-white/50 uppercase">
            © {new Date().getFullYear()} Moonlight Motion Pictures
          </p>

          {/* Newsletter */}
          {submitted ? (
            <p className="text-[11px] tracking-widest text-white/55">You're on the list ✓</p>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-3 border-b border-white/30 pb-1.5 focus-within:border-white/60 transition-colors duration-300">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="bg-transparent text-[12px] text-white/75 placeholder-white/35 outline-none w-44"
              />
              <button
                type="submit"
                className="text-[10px] tracking-[0.25em] uppercase text-white/55 hover:text-white transition-colors duration-200"
              >
                Join →
              </button>
            </form>
          )}

          {/* Socials */}
          <div className="flex items-center gap-5">
            {SOCIALS.map((s) => (
              <a
                key={s}
                href="#"
                className="text-[11px] tracking-[0.2em] text-white/50 hover:text-white transition-colors duration-200"
              >
                {s}
              </a>
            ))}
          </div>

        </div>
      </div>

      {/* Film strip bottom */}
      <div className="w-full flex overflow-hidden" style={{ height: '2px' }}>
        {Array.from({ length: 100 }).map((_, i) => (
          <div key={i} className="shrink-0" style={{
            width: i % 5 === 4 ? '14px' : '5px',
            height: '2px',
            background: i % 5 === 4 ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.05)',
          }} />
        ))}
      </div>
    </footer>
  )
}