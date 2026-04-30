import React, { useState, useRef, useEffect } from 'react'
import { AuditionModal } from './AuditionModal'

export const Header = () => {
  const [isMuted, setIsMuted] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const audioRef = useRef(null)

  useEffect(() => {
    // Initialize audio (placeholder path - replace with actual galaxy sound)
    audioRef.current = new Audio('/sound.mp3')
    audioRef.current.loop = true
    audioRef.current.volume = 0.5

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
      }
    }
  }, [])

  const toggleSound = () => {
    if (!audioRef.current) return

    if (isMuted) {
      audioRef.current.play().catch(e => console.log("Audio play failed (user interaction required):", e))
      setIsMuted(false)
    } else {
      audioRef.current.pause()
      setIsMuted(true)
    }
  }

  return (
    <>
      <header className="fixed top-0 left-0 w-full p-6 md:p-10 z-[60] flex justify-between items-center mix-blend-difference pointer-events-none">

        {/* Sound Toggle */}
        <button
          onClick={toggleSound}
          className="group flex items-center gap-3 text-white hover:text-gray-300 transition-colors pointer-events-auto"
        >
          <div className="flex items-end gap-[2px] h-4">
            <span className={`w-1 bg-current transition-all duration-300 ${!isMuted ? 'h-full animate-pulse' : 'h-1'}`}></span>
            <span className={`w-1 bg-current transition-all duration-300 delay-75 ${!isMuted ? 'h-3 animate-pulse' : 'h-1'}`}></span>
            <span className={`w-1 bg-current transition-all duration-300 delay-150 ${!isMuted ? 'h-full animate-pulse' : 'h-1'}`}></span>
          </div>
          <span className="text-xs md:text-sm font-medium tracking-[0.2em] uppercase">
            {isMuted ? 'Sound Off' : 'Sound On'}
          </span>
        </button>

        {/* Audition Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="border border-white/30 hover:border-white px-5 py-2 md:px-6 md:py-2 rounded-full text-white text-xs md:text-sm font-medium tracking-widest uppercase transition-all duration-300 hover:bg-white hover:text-black pointer-events-auto"
        >
          For Collaboration
        </button>
      </header>

      <AuditionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
