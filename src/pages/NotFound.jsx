import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center">
      <div className="relative z-10">
        <h1 
          className="text-8xl md:text-[150px] font-bold tracking-tighter mb-4"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          404
        </h1>
        <p className="text-xl md:text-2xl text-gray-400 mb-10 max-w-md mx-auto">
          The page you are looking for has drifted into the void.
        </p>
        
        <Link 
          to="/" 
          className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white text-black font-semibold hover:scale-105 transition-transform duration-300"
        >
          Return Home
        </Link>
      </div>

      {/* Decorative background elements to match the cinematic feel */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 rounded-full blur-[100px]" />
      </div>
    </div>
  );
};

export default NotFound;
