import React, { useRef, useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, Stars } from '@react-three/drei'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

import { LenisWrapper } from './utils/LenisWrapper'
import { Moon3D } from './components/Moon/Moon3D'
import { Hero } from './components/Hero/Hero'
import { About } from './components/About/About'
import { Team } from './components/Team/Team'
import Partners from './components/Partner/Partner'
import News from './components/News/News'
import { Projects } from './components/Projects/Projects'
import { CompletedProjects } from './components/Projects/CompletedProjects'
import { MediaGallery } from './components/Media/MediaGallery'
import { Footer } from './components/Footer/Footer'
import { Header } from './components/Header/Header'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { AllProjectsPage } from './pages/AllProjectsPage'
import { AllUpcomingProjectsPage } from './pages/AllUpcomingProjectsPage'
import AdminLogin from "./Admin/AdminLogin"
import AdminDashboard from "./Admin/AdminDashboard"
import AdminLayout from "./Admin/AdminLayout"
import AdminSettings from "./Admin/AdminSettings"
import AdminSocialLinks from "./Admin/AdminSocialLinks"
import AdminTeam from "./Admin/AdminTeam"
import AdminPartners from "./Admin/AdminPartners"
import AdminProjects from "./Admin/AdminProjects"
import AdminNewsBlogs from "./Admin/AdminNewsBlogs"
import AdminAudition from "./Admin/AdminAuditions"
import AdminProjectCategories from "./Admin/AdminProjectCategories"
import AdminProjectLinks from "./Admin/AdminProjectLinks"
import AdminProjectMedia from "./Admin/AdminProjectMedia"
import AdminProfile from "./Admin/AdminProfile"
import AuditionModal from './components/Audition/AuditionModal'
import Collaboration from './components/Header/Collaboration'
import AuditionApply from "./pages/AuditionApply";
import NotFound from "./pages/NotFound";
import ResetPassword from "./pages/ResetPassword";
import { BackToTop } from "./components/BackToTop/BackToTop";




gsap.registerPlugin(ScrollTrigger)

function App() {

  useEffect(() => {
  // 1. Disable right-click
  document.addEventListener("contextmenu", (e) => e.preventDefault());

  // 2. Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
  document.addEventListener("keydown", (e) => {
    if (
      e.key === "F12" ||
      (e.ctrlKey && e.shiftKey && e.key === "I") ||
      (e.ctrlKey && e.shiftKey && e.key === "J") ||
      (e.ctrlKey && e.shiftKey && e.key === "C") ||
      (e.ctrlKey && e.key === "u")
    ) {
      e.preventDefault();
    }
  });

  // 3. Infinite debugger loop — freezes devtools Sources tab
  const devtoolsBlock = setInterval(() => {
    debugger;
  }, 100);

  // 4. Detect devtools open via window size and wipe page
  const detectDevtools = setInterval(() => {
    if (
      window.outerWidth - window.innerWidth > 160 ||
      window.outerHeight - window.innerHeight > 160
    ) {
      document.body.innerHTML = "<h1>Not Allowed</h1>";
    }
  }, 500);

  return () => {
    clearInterval(devtoolsBlock);
    clearInterval(detectDevtools);
  };
}, []);
  const containerRef = useRef(null)
  const moonRef = useRef(null)
  const gapRef = useRef(null)
  const spotlightRef = useRef(null)
  const [moonReady, setMoonReady] = useState(false)
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight })
  const location = useLocation()

  const isAdminRoute = location.pathname.startsWith('/admin');

  // Calculate dynamic FOV to maintain constant horizontal scale
  // This prevents the moon from shrinking ("going backward") when DevTools open
  const referenceHeight = 1050;
  const K = Math.tan((45 * Math.PI / 180) / 2) / referenceHeight;
  const dynamicFov = 2 * Math.atan(K * windowSize.height) * (180 / Math.PI);

  useEffect(() => {
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useGSAP(() => {
    if (!moonReady || !moonRef.current) return

    // Calculate exact 3D position of the gap DOM element
    let startX = -1.0
    if (gapRef.current) {
      const rect = gapRef.current.getBoundingClientRect()
      // Shift moon slightly to the left (1.5vw) to prevent the 'O' from hiding it
      const px = rect.left + rect.width / 2 - (window.innerWidth * 0.015)
      const ndcX = (px / window.innerWidth) * 2 - 1
      const fov = dynamicFov * Math.PI / 180
      const heightAtZ0 = 2 * Math.tan(fov / 2) * 5
      const widthAtZ0 = heightAtZ0 * (window.innerWidth / window.innerHeight)
      startX = ndcX * (widthAtZ0 / 2)
    }

    // Ensure initial state
    gsap.set(moonRef.current.position, {
      x: startX,
      y: 0,
      z: 0
    })
    gsap.set(moonRef.current.scale, {
      x: window.innerWidth < 1024 ? 0.65 : 0.6,
      y: window.innerWidth < 1024 ? 0.65 : 0.6,
      z: window.innerWidth < 1024 ? 0.65 : 0.6
    })
    gsap.set(moonRef.current.rotation, {
      x: 0,
      y: 0,
      z: 0
    })

    if (spotlightRef.current?.light) {
      gsap.set(spotlightRef.current.light, {
        intensity: 0,
        angle: 0.4
      })
      gsap.set(spotlightRef.current.target.position, {
        x: -3,
        y: 0,
        z: 2
      })
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
      }
    })

    // Phase 1: Scroll to About section (zoom in massively on the moon's surface)
    tl.to(moonRef.current.position, {
      x: 0, // Keep centered
      y: window.innerWidth < 1024 ? 2 : 0,  // On mobile/tablet move up
      z: 0,
      duration: 1,
      ease: 'power2.inOut'
    }, 0)

    const targetScale = window.innerWidth < 768 ? 1.1 : window.innerWidth < 1024 ? 1.4 : 1.8

    tl.to(moonRef.current.scale, {
      x: targetScale,
      y: targetScale,
      z: targetScale,
      duration: 1,
      ease: 'power2.inOut'
    }, 0)

    tl.to(moonRef.current.rotation, {
      y: Math.PI * 1.5,
      x: Math.PI * 0.2,
      duration: 1,
      ease: 'none'
    }, 0)

    // === SATELLITE SPOTLIGHT: Focus on About section ===
    if (spotlightRef.current?.light) {
      const light = spotlightRef.current.light
      const target = spotlightRef.current.target

      // Spotlight powers on and aims toward About tooltip (right side)
      tl.to(light, {
        intensity: 8,
        angle: 0.5,
        duration: 0.4,
        ease: 'power2.in'
      }, 0.4)

      tl.to(target.position, {
        x: 4,
        y: 1,
        z: 3,
        duration: 0.5,
        ease: 'power2.inOut'
      }, 0.4)
    }

    // Phase 2: Scroll to Team section (rotate moon more, stay in place)
    tl.to(moonRef.current.rotation, {
      y: Math.PI * 3,
      x: Math.PI * 0.4,
      duration: 1,
      ease: 'power1.inOut'
    }, 1)

    // === SATELLITE SPOTLIGHT: Sweep to Team section ===
    if (spotlightRef.current?.light) {
      const light = spotlightRef.current.light
      const target = spotlightRef.current.target

      // Spotlight sweeps down to Team tooltip
      tl.to(light, {
        intensity: 12,
        angle: 0.6,
        duration: 0.4,
        ease: 'power2.inOut'
      }, 1.1)

      tl.to(target.position, {
        x: 4,
        y: -1,
        z: 3,
        duration: 0.5,
        ease: 'power2.inOut'
      }, 1.1)
    }

    // Phase 3: Scroll to Projects section (rotate moon further)
    tl.to(moonRef.current.rotation, {
      y: Math.PI * 4.5,
      x: Math.PI * 0.2,
      duration: 1,
      ease: 'power1.inOut'
    }, 2)

    // === SATELLITE SPOTLIGHT: Sweep to Projects section ===
    if (spotlightRef.current?.light) {
      const light = spotlightRef.current.light
      const target = spotlightRef.current.target

      // Spotlight sweeps to highlight from a different angle
      tl.to(light, {
        intensity: 8,
        angle: 0.8,
        duration: 0.4,
        ease: 'power2.inOut'
      }, 2.1)

      tl.to(target.position, {
        x: -4,
        y: 1,
        z: 3,
        duration: 0.5,
        ease: 'power2.inOut'
      }, 2.1)
    }

  }, { scope: containerRef, dependencies: [moonReady, windowSize.width] })

  return (
    <LenisWrapper disabled={isAdminRoute}>
      <Routes>
        <Route path="/" element={
          <div ref={containerRef} className="relative w-full text-moon-white bg-moon-black min-h-screen">

            {/* Fixed 3D Canvas Layer */}
            <div className="fixed inset-0 z-0 pointer-events-none">
              <Canvas camera={{ position: [0, 0, 5], fov: dynamicFov }}>
                <ambientLight intensity={0.01} />
                <directionalLight position={[10, 0, 2]} intensity={4} color="#ffffff" />
                {/* Starry Background */}
                <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />

                <Moon3D moonRef={moonRef} onReady={() => setMoonReady(true)} spotlightRef={spotlightRef} />
              </Canvas>
            </div>

            {/* HTML Content Overlay */}
            <div className="relative z-10 w-full flex flex-col">
              <AuditionModal />

              <Header />
              <Hero gapRef={gapRef} />
              <About />
              <Team />
              <Projects />
              <CompletedProjects />
              <MediaGallery />
              <Partners />
              <Footer />
              <BackToTop />
            </div>

          </div>
        } />
        <Route
          path="/audition"
          element={<AuditionApply />}
        />
        <Route path="/news" element={<News />} />

        <Route path="/all-projects" element={<AllProjectsPage />} />
        <Route path="/upcoming-projects" element={<AllUpcomingProjectsPage />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="settings" element={<AdminSettings />} />
          <Route path="team" element={<AdminTeam />} />
          <Route path="social-links" element={<AdminSocialLinks />} />
          <Route path="partners" element={<AdminPartners />} />
          <Route path="projects" element={<AdminProjects />} />
          <Route path="news-blogs" element={<AdminNewsBlogs />} />
          <Route path="auditions" element={<AdminAudition />} />
          <Route path="project-categories" element={<AdminProjectCategories />} />
          <Route path="project-links" element={<AdminProjectLinks />} />
          <Route path="project-media" element={<AdminProjectMedia />} />
          <Route path="profile" element={<AdminProfile />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </LenisWrapper>
  )
}

export default App
