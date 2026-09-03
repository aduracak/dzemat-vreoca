import React from 'react';

export const VreocaMosqueVisual: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative w-full h-full overflow-hidden select-none ${className}`}>
      {/* Real Full Panoramic Image of Vreoca Mosque */}
      <img
        src="/vreoca-hero-bg.jpg"
        alt="Džamija Vreoca Ilidža - Panorama"
        className="w-full h-full object-cover object-[73%_25%] sm:object-[72%_20%] lg:object-[76%_18%] scale-100"
      />

      {/* Warm Ambient Sunlight Glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-amber-950/5 via-transparent to-amber-200/10 pointer-events-none" />

      {/* Smooth, Misty Left-to-Right Fade (matching the mockup screenshot) */}
      <div className="absolute inset-y-0 left-0 w-full sm:w-[70%] lg:w-[54%] bg-gradient-to-r from-[#fafaf9] via-[#fafaf9]/90 sm:via-[#fafaf9]/80 to-transparent pointer-events-none" />
      
      {/* Top subtle fade for floating navbar */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#fafaf9]/70 via-[#fafaf9]/20 to-transparent pointer-events-none" />

      {/* Bottom subtle edge blend */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#fafaf9] via-[#fafaf9]/60 to-transparent pointer-events-none" />
    </div>
  );
};



