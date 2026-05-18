  import React from "react";
  import usePartners from "../../hooks/usePartners";
  import { ExternalLink } from "lucide-react";
  import { BASE_URL } from "../../utils/api";

  const Partners = () => {
    const { partners, loading } = usePartners();

    if (loading) {
      return (
        <section className="w-full min-h-screen bg-black flex items-center justify-center">
          <p className="text-white text-lg tracking-wider animate-pulse">
            Loading Partners...
          </p>
        </section>
      );
    }

    return (
      <section
        id="partners"
        className="relative w-full py-24 overflow-hidden"
      >
        {/* Background Glow */}
        <div className="absolute top-[-150px] left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-white/5 blur-[180px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">

          {/* Heading */}
          <div className="text-center mb-20">
            <p className="uppercase tracking-[0.3em] text-gray-400 text-sm mb-4">
              Trusted Collaborations
            </p>

            <h2
              style={{
                fontFamily: "'Syne', sans-serif",
              }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-white"
            >
              Our Partners
            </h2>

            <div className="w-24 h-[2px] bg-white/20 mx-auto mt-6" />
          </div>

          {/* Partners Grid */}
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
    {partners.map((partner) => {
      const websiteUrl = partner.website
        ? partner.website.startsWith("http")
          ? partner.website
          : `https://${partner.website}`
        : null;

      return (
        <a
          key={partner.id}
          href={websiteUrl || "#"}
          target="_blank"
          rel="noreferrer"
          className="group relative block aspect-square rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03] backdrop-blur-xl hover:border-white/20 transition-all duration-300"
        >
          {/* LOGO */}
          <img

            src={`${BASE_URL}${partner.logo}`}
            alt={partner.name}
            className="w-full h-full object-contain p-6 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
          />

          {/* HOVER OVERLAY */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
            <p className="text-white text-sm sm:text-base font-semibold tracking-wide text-center px-3">
              {partner.name}
            </p>
          </div>
        </a>
      );
    })}
  </div>
        </div>
      </section>
    );
  };

  export default Partners;