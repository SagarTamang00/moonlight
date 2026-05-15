import React, { useEffect, useState } from 'react'
import gsap from 'gsap'

import { sendContactForm } from '../../api/contactApi'

export const Collaboration = ({ isOpen, onClose }) => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact_number: '',
    subject: '',
    message: ''
  })

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  // HANDLE INPUT
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  // HANDLE SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault()

    setLoading(true)
    setSuccess(false)

    try {

      await sendContactForm(formData)

      setSuccess(true)

      setFormData({
        name: '',
        email: '',
        contact_number: '',
        subject: '',
        message: ''
      })

      setTimeout(() => {
        onClose()
      }, 1500)

    } catch (err) {

      console.log(err)
      alert('Failed to send message')

    } finally {

      setLoading(false)
    }
  }

  // MODAL OPEN/CLOSE ANIMATION
  useEffect(() => {

    if (isOpen) {

      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = 'hidden'

      if (window.lenis) {
        window.lenis.stop()
      }

      gsap.to('.modal-overlay', {
        opacity: 1,
        duration: 0.3,
        display: 'block',
        ease: 'power2.out'
      })

      gsap.fromTo(
        '.modal-content',
        {
          y: 50,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          delay: 0.1,
          ease: 'back.out(1.7)'
        }
      )

    } else {

      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''

      if (window.lenis) {
        window.lenis.start()
      }

      gsap.to('.modal-content', {
        y: 20,
        opacity: 0,
        duration: 0.2,
        ease: 'power2.in'
      })

      gsap.to('.modal-overlay', {
        opacity: 0,
        duration: 0.3,
        delay: 0.1,
        display: 'none',
        ease: 'power2.in'
      })
    }

    return () => {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''

      if (window.lenis) {
        window.lenis.start()
      }
    }

  }, [isOpen])

  return (
    <div
      data-lenis-prevent="true"
      className="
        modal-overlay
        fixed
        inset-0
        z-[100]
        bg-black/80
        backdrop-blur-md
        hidden
        overflow-y-auto
      "
    >

      <div className="min-h-full flex items-center justify-center p-4 py-12">

        <div
          className="
            modal-content
            w-full
            max-w-lg
            bg-moon-grey/20
            border
            border-white/10
            rounded-2xl
            p-6
            sm:p-8
            relative
            overflow-hidden
          "
        >

          {/* GLOW */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/5 rounded-full blur-3xl pointer-events-none" />

          {/* CLOSE */}
          <button
            onClick={onClose}
            className="
              absolute
              top-4
              right-4
              sm:top-6
              sm:right-6
              text-moon-silver
              hover:text-white
              transition-colors
            "
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* TITLE */}
          <h2 className="text-3xl sm:text-4xl font-cinematic text-white mb-2 pr-8">
            Collaboration
          </h2>

          <p className="text-sm text-white/50 mb-6">
            Let's create something cinematic together.
          </p>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="space-y-4 sm:space-y-5 relative z-10"
          >

            {/* NAME */}
            <div>

              <label className="block text-[10px] sm:text-xs uppercase tracking-widest text-moon-silver mb-2">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                placeholder="Your full name"
                value={formData.name}
                onChange={handleChange}
                required
                className="
                  w-full
                  bg-white/5
                  border
                  border-white/10
                  rounded-lg
                  px-4
                  py-3
                  text-white
                  text-sm
                  focus:outline-none
                  focus:border-white/40
                  transition-colors
                "
              />
            </div>

            {/* EMAIL */}
            <div>

              <label className="block text-[10px] sm:text-xs uppercase tracking-widest text-moon-silver mb-2">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="
                  w-full
                  bg-white/5
                  border
                  border-white/10
                  rounded-lg
                  px-4
                  py-3
                  text-white
                  text-sm
                  focus:outline-none
                  focus:border-white/40
                  transition-colors
                "
              />
            </div>

            {/* CONTACT */}
            <div>

              <label className="block text-[10px] sm:text-xs uppercase tracking-widest text-moon-silver mb-2">
                Contact Number
              </label>

              <input
                type="text"
                name="contact_number"
                placeholder="Phone number"
                value={formData.contact_number}
                onChange={handleChange}
                required
                className="
                  w-full
                  bg-white/5
                  border
                  border-white/10
                  rounded-lg
                  px-4
                  py-3
                  text-white
                  text-sm
                  focus:outline-none
                  focus:border-white/40
                  transition-colors
                "
              />
            </div>

            {/* SUBJECT */}
            <div>

              <label className="block text-[10px] sm:text-xs uppercase tracking-widest text-moon-silver mb-2">
                Subject
              </label>

              <input
                type="text"
                name="subject"
                placeholder="Project subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="
                  w-full
                  bg-white/5
                  border
                  border-white/10
                  rounded-lg
                  px-4
                  py-3
                  text-white
                  text-sm
                  focus:outline-none
                  focus:border-white/40
                  transition-colors
                "
              />
            </div>

            {/* MESSAGE */}
            <div>

              <label className="block text-[10px] sm:text-xs uppercase tracking-widest text-moon-silver mb-2">
                Message
              </label>

              <textarea
                name="message"
                rows="5"
                placeholder="Tell us about your collaboration idea..."
                value={formData.message}
                onChange={handleChange}
                required
                className="
                  w-full
                  bg-white/5
                  border
                  border-white/10
                  rounded-lg
                  px-4
                  py-3
                  text-white
                  text-sm
                  focus:outline-none
                  focus:border-white/40
                  transition-colors
                  resize-none
                "
              />
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                bg-white
                text-black
                font-cinematic
                text-lg
                py-3
                rounded-lg
                hover:bg-gray-200
                transition-colors
                disabled:opacity-50
              "
            >
              {loading ? 'SENDING...' : 'SEND MESSAGE'}
            </button>

            {/* SUCCESS */}
            {success && (
              <p className="text-green-400 text-sm text-center">
                Message sent successfully ✔
              </p>
            )}

          </form>
        </div>
      </div>
    </div>
  )
}