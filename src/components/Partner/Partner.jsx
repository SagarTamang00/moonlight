import React, { useRef, useState, useEffect } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import usePartners from "../../hooks/usePartners";

const Partners = () => {
  const { partners, loading } = usePartners();

  if (loading) {
    return (
      <section className="w-full py-24 bg-black text-white flex items-center justify-center">
        <p className="text-lg tracking-wide animate-pulse">
          Loading Partners...
        </p>
      </section>
    );
  }

  return (
    <section
      id="partners"
      className="relative w-full min-h-screen overflow-hidden py-24"
    >
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-white/5 blur-[160px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">

        {/* Heading */}
        <div className="text-center mb-16">


          <h2
            style={{
              fontFamily: "'Syne', sans-serif",
            }}
            className="text-4xl sm:text-5xl md:text-6xl text-white font-bold"
          >
            Our Partners
          </h2>

        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">

          {partners.map((partner) => (

            <a
              key={partner.id}
              href={partner.website_link || "#"}
              target="_blank"
              rel="noreferrer"
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-md transition-all duration-500 hover:border-white/30 hover:-translate-y-2"
            >

              {/* Card */}
              <div className="relative h-[170px] flex items-center justify-center p-6">

                {/* Glow */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

                {/* Image */}
                <img
                  src={`http://localhost:5000${partner.logo}`}
                  alt={partner.name}
                  className="relative z-10 max-h-[90px] max-w-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500"
                />  

              </div>

              {/* Bottom Overlay */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-all duration-500">

                <h3 className="text-white text-sm font-semibold tracking-wide">
                  {partner.name}
                </h3>

                {partner.website_link && (
                  <p className="text-gray-400 text-xs mt-1 truncate">
                    Visit Website →
                  </p>
                )}
              </div>

            </a>
          ))}

        </div>
      </div>
    </section>
  );
};

export default Partners;