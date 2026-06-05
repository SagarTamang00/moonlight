import usePartners from "../../hooks/usePartners";
import { BASE_URL } from "../../utils/api";
import { motion } from "framer-motion";

const Partners = () => {
  const { partners, loading } = usePartners();

  if (loading) {
    return (
      <section className="w-full min-h-screen bg-black flex items-center justify-center">
        <p className="text-white text-lg tracking-widest animate-pulse">
          Loading Partners...
        </p>
      </section>
    );
  }

  return (
    <section className="relative w-full py-28 overflow-hidden bg-black">

      {/* Glow background */}
      <div className="absolute inset-0">
        <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-white/5 blur-[200px] rounded-full" />
        <div className="absolute bottom-[-250px] right-[-200px] w-[700px] h-[700px] bg-purple-500/10 blur-[180px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="text-center mb-20">
          <p className="text-[11px] tracking-[0.35em] text-gray-500 uppercase">
            Trusted Network
          </p>
          <h2
            style={{ fontFamily: "'Syne', sans-serif" }}
            className="mt-4 text-5xl md:text-6xl font-bold text-white"
          >
            Our Partners
          </h2>
          <div className="mt-6 w-28 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent mx-auto" />
        </div>

        {/* GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {partners.map((partner, index) => {
            const websiteUrl = partner.website
              ? partner.website.startsWith("http")
                ? partner.website
                : `https://${partner.website}`
              : null;

            return (
              <motion.div
                key={partner.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.04 }}
                className="group"
                style={{ perspective: "1000px" }}
              >
                {/* Flip container */}
                <div
                  className="relative w-full"
                  style={{
                    transformStyle: "preserve-3d",
                    height: "320px",
                  }}
                >
                  {/* Inner wrapper that flips */}
                  <div
                    className="absolute inset-0 transition-transform duration-700 ease-in-out group-hover:[transform:rotateY(180deg)]"
                    style={{ transformStyle: "preserve-3d" }}
                  >

                    {/* FRONT */}
                    <div
                      className="absolute inset-0 rounded-[22px] border border-white/10 bg-white/[0.03] backdrop-blur-2xl p-6 flex flex-col items-center justify-center text-center"
                      style={{ backfaceVisibility: "hidden" }}
                    >
                      {/* Logo */}
                      <div className="w-[140px] h-[140px] rounded-[26px] bg-white/10 border border-white/15 flex items-center justify-center overflow-hidden shadow-inner">
                        {partner.logo ? (
                          <img
                            src={`${BASE_URL}${partner.logo}`}
                            alt={partner.name}
                            className="w-full h-full object-contain p-3"
                          />
                        ) : (
                          <span className="text-white text-2xl font-semibold">
                            {partner.name.slice(0, 2).toUpperCase()}
                          </span>
                        )}
                      </div>

                      {/* Name */}
                      <h3
                        style={{ fontFamily: "'Syne', sans-serif" }}
                        className="mt-5 text-[15px] font-bold text-white tracking-tight"
                      >
                        {partner.name}
                      </h3>

                      {/* Category pill */}
                      <div className="mt-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                        <p className="text-[10px] tracking-widest text-gray-400 uppercase">
                          {partner.type}
                        </p>
                      </div>
                    </div>

                    {/* BACK */}
                    <div
                      className="absolute inset-0 rounded-[22px] border border-white/20 bg-white/[0.07] backdrop-blur-2xl p-6 flex flex-col items-center justify-between text-center"
                      style={{
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                      }}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <h3
                          style={{ fontFamily: "'Syne', sans-serif" }}
                          className="text-[15px] font-bold text-white tracking-tight"
                        >
                          {partner.name}
                        </h3>
                        <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10">
                          <p className="text-[10px] tracking-widest text-gray-400 uppercase">
                            {partner.type}
                          </p>
                        </div>
                      </div>

                      <p className="text-[12px] leading-relaxed text-gray-300 line-clamp-4">
                        {partner.description}
                      </p>

                      {websiteUrl ? (
                        
                          < a href={websiteUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-2 px-5 py-2 rounded-full bg-white/10 border border-white/20 text-white text-[10px] tracking-widest uppercase hover:bg-white/20 transition-all duration-300"
                        >
                          Visit Site →
                        </a>
                      ) : (
                        <div className="mt-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-white/30 text-[10px] tracking-widest uppercase">
                          No Website
                        </div>
                      )}
                    </div>

                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Partners;