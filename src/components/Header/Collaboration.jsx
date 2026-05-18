import React, { useEffect, useState } from 'react'
import gsap from 'gsap'
import { CheckCircle2 } from "lucide-react"

import { sendContactForm } from '../../api/contactApi'

const Collaboration = ({ isOpen, onClose }) => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact_number: '',
    subject: '',
    message: ''
  })

  const [loading, setLoading] = useState(false)
  const [successModal, setSuccessModal] = useState(false)

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

    try {
      await sendContactForm(formData)

      setSuccessModal(true)

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
      document.documentElement.style.overflow = ''

      if (window.lenis) window.lenis.stop()

      gsap.to('.modal-overlay', {
        opacity: 1,
        duration: 0.3,
        display: 'block',
        ease: 'power2.out'
      })

      gsap.fromTo(
        '.modal-content',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, delay: 0.1, ease: 'back.out(1.7)' }
      )

    } else {

      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''

      if (window.lenis) window.lenis.start()

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
      if (window.lenis) window.lenis.start()
    }

  }, [isOpen])

  return (
    <div
      data-lenis-prevent="true"
      className="modal-overlay fixed inset-0 z-[100] bg-black/80 backdrop-blur-md hidden overflow-y-auto"
    >

      <div className="min-h-full flex items-center justify-center p-4 py-12">

        <div className="modal-content w-full max-w-lg bg-moon-grey/20 border border-white/10 rounded-2xl p-6 sm:p-8 relative overflow-hidden">

          <div className="absolute -top-24 -right-24 w-48 h-48 bg-black rounded-full blur-3xl pointer-events-none" />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 text-moon-silver hover:text-white transition-colors"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <h2 className="text-3xl sm:text-4xl font-cinematic text-white mb-2 pr-8">
            Collaboration
          </h2>

          <p className="text-sm text-white/50 mb-6">
            Let's create something cinematic together.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 relative z-10">

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm"
              placeholder="Full Name"
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm"
              placeholder="Email Address"
            />

            <input
              type="text"
              name="contact_number"
              value={formData.contact_number}
              onChange={handleChange}
              required
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm"
              placeholder="Contact Number"
            />

            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm"
              placeholder="Subject"
            />

            <textarea
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm resize-none"
              placeholder="Message"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-black font-cinematic text-lg py-3 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
            >
              {loading ? 'SENDING...' : 'SEND MESSAGE'}
            </button>

          </form>

        </div>
      </div>

      {successModal && (
        <div className="fixed inset-0 z-[99999] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6">

          <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#0d0d0d] p-6 sm:p-8 text-center">

            <CheckCircle2 className="text-white w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-5" />

            <p className="text-[10px] uppercase tracking-[0.35em] text-white/40 mb-3">
              Message Sent
            </p>

            <h2 className="text-white font-bold mb-4 text-2xl sm:text-3xl">
              Thank You
            </h2>

            <p className="text-white/60 mb-8 text-sm sm:text-base">
              Your message has been successfully sent.
            </p>

            <button
              onClick={() => setSuccessModal(false)}
              className="w-full h-11 sm:h-12 rounded-2xl bg-white text-black uppercase tracking-[0.25em] text-xs sm:text-sm font-semibold"
            >
              Close
            </button>

          </div>

        </div>
      )}

    </div>
  )
}

export default Collaboration;