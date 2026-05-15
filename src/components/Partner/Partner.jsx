import React from "react";
import usePartners from "../../hooks/usePartners";
import { ExternalLink } from "lucide-react";

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
      className="relative w-full bg-black py-24 overflow-hidden"
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {partners.map((partner) => {
            const websiteUrl = partner.website
              ? partner.website.startsWith("http")
                ? partner.website
                : `https://${partner.website}`
              : null;

            return (
              <div
                key={partner.id}
                className="group relative rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl overflow-hidden transition-all duration-500 hover:border-white/20 hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(255,255,255,0.08)]"
              >
                {/* Top Glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-b from-white/[0.06] via-transparent to-transparent" />

                {/* Logo Section */}
                <div className="h-[220px] flex items-center justify-center p-8">
                  <img
                    src={`http://localhost:5000${partner.logo}`}
                    alt={partner.name}
                    className="max-h-[100px] max-w-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>

                {/* Bottom Content */}
                <div className="border-t border-white/10 px-6 py-5">
                  <h3 className="text-white text-lg font-semibold mb-2">
                    {partner.name}
                  </h3>

                  {/* Separate Button */}
                  {websiteUrl ? (
                    <a
                      href={websiteUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="relative z-20 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white transition-all duration-300 hover:bg-white hover:text-black"
                    >
                      Visit Website
                    </a>

                  ) : (
                    <button
                      disabled
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-gray-500 cursor-not-allowed"
                    >
                      No Website
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Partners;