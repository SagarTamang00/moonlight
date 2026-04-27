import React, { useEffect, useState } from 'react'
import gsap from 'gsap'

export const AuditionModal = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = 'hidden'
      if (window.lenis) window.lenis.stop()
      
      gsap.to('.modal-overlay', { opacity: 1, duration: 0.3, display: 'block', ease: 'power2.out' })
      gsap.fromTo('.modal-content',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, delay: 0.1, ease: 'back.out(1.7)' }
      )
    } else {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
      if (window.lenis) window.lenis.start()
      
      gsap.to('.modal-content', { y: 20, opacity: 0, duration: 0.2, ease: 'power2.in' })
      gsap.to('.modal-overlay', { opacity: 0, duration: 0.3, delay: 0.1, display: 'none', ease: 'power2.in' })
    }

    return () => {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
      if (window.lenis) window.lenis.start()
    }
  }, [isOpen])

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Application submitted successfully! (Demo)')
    onClose()
  }

  return (
    <div data-lenis-prevent="true" className="modal-overlay fixed inset-0 z-[100] bg-black/80 backdrop-blur-md hidden overflow-y-auto">
      <div className="min-h-full flex items-center justify-center p-4 py-12">
        <div className="modal-content w-full max-w-lg bg-moon-grey/20 border border-white/10 rounded-2xl p-6 sm:p-8 relative overflow-hidden">
          {/* Decorative background element */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 text-moon-silver hover:text-white transition-colors"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>

        <h2 className="text-3xl sm:text-4xl font-cinematic text-white mb-2 pr-8">JOIN THE CAST</h2>
        <p className="text-moon-silver text-xs sm:text-sm mb-6 sm:mb-8">Submit your portfolio for upcoming Moonlight productions.</p>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 relative z-10">
          <div>
            <label className="block text-[10px] sm:text-xs uppercase tracking-widest text-moon-silver mb-1 sm:mb-2">Full Name</label>
            <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 sm:px-4 sm:py-3 text-white text-sm sm:text-base focus:outline-none focus:border-white/40 transition-colors" />
          </div>
          <div>
            <label className="block text-[10px] sm:text-xs uppercase tracking-widest text-moon-silver mb-1 sm:mb-2">Email Address</label>
            <input required type="email" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 sm:px-4 sm:py-3 text-white text-sm sm:text-base focus:outline-none focus:border-white/40 transition-colors" />
          </div>
          <div>
            <label className="block text-[10px] sm:text-xs uppercase tracking-widest text-moon-silver mb-1 sm:mb-2">Phone Number</label>
            <input required type="phone" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 sm:px-4 sm:py-3 text-white text-sm sm:text-base focus:outline-none focus:border-white/40 transition-colors" />
          </div>
          <div>
            <label className="block text-[10px] sm:text-xs uppercase tracking-widest text-moon-silver mb-1 sm:mb-2">Address</label>
            <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 sm:px-4 sm:py-3 text-white text-sm sm:text-base focus:outline-none focus:border-white/40 transition-colors" />
          </div>
          <button type="submit" className="w-full bg-white text-black font-cinematic text-lg sm:text-xl py-3 sm:py-4 rounded-lg hover:bg-gray-200 transition-colors mt-2 sm:mt-4">
            SUBMIT APPLICATION
          </button>
        </form>
        </div>
      </div>
    </div>
  )
}
