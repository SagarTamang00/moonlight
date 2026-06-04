import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export const BackToTop = () => {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;

      if (totalScroll > 0) {
        setProgress((currentScroll / totalScroll) * 100);
      }

      if (currentScroll > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Initial check
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    if (window.lenis) {
      window.lenis.scrollTo(0);
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const size = 48;
  const strokeWidth = 2.5;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 z-[90] flex items-center justify-center rounded-full bg-black/60 text-white border border-white/10 backdrop-blur-md transition-all duration-500 shadow-[0_0_20px_rgba(0,0,0,0.5)] hover:border-white/35 active:scale-95 group
        ${visible ? "opacity-100 translate-y-0 visible" : "opacity-0 translate-y-6 invisible pointer-events-none"}
      `}
      style={{ width: `${size}px`, height: `${size}px` }}
      aria-label="Back to Top"
    >
      <svg
        className="absolute top-0 left-0 -rotate-90 pointer-events-none"
        width={size}
        height={size}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="rgba(255, 255, 255, 0.08)"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="rgba(255, 255, 255, 0.75)"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-[stroke-dashoffset] duration-75"
        />
      </svg>
      <ArrowUp
        size={18}
        className="relative z-10 transition-transform duration-300 group-hover:-translate-y-0.5 text-white/70 group-hover:text-white"
      />
    </button>
  );
};
