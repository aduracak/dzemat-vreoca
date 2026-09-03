import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
  showDzematBadge?: boolean;
  textColor?: string;
  variant?: 'horizontal' | 'stacked' | 'icon-only';
}

export const IslamskaZajednicaLogo: React.FC<LogoProps> = ({
  className = '',
  size = 42,
  showText = true,
  showDzematBadge = true,
  textColor = 'text-[#00793c]',
  variant = 'horizontal',
}) => {
  return (
    <div className={`inline-flex items-center gap-2.5 sm:gap-3 select-none ${className}`}>
      {/* Official Islamic Community Logo Emblem */}
      <img
        src="/iz-logo.png"
        alt="Islamska zajednica u Bosni i Hercegovini Logo"
        width={size}
        height={size}
        className="shrink-0 object-contain transition-transform duration-300 group-hover:scale-105"
        style={{ width: `${size}px`, height: `${size}px` }}
      />

      {showText && variant === 'horizontal' && (
        <div className="flex flex-col text-left leading-[1.12]">
          <span className={`text-[11px] sm:text-[13px] font-bold tracking-[0.03em] ${textColor} font-serif uppercase`}>
            ISLAMSKA ZAJEDNICA
          </span>
          <span className={`text-[9.5px] sm:text-[11px] font-bold tracking-[0.05em] ${textColor} font-serif uppercase`}>
            U BOSNI I HERCEGOVINI
          </span>
          {showDzematBadge && (
            <span className="text-[10px] text-stone-500 font-medium tracking-wide mt-0.5">
              Džemat Vreoca • Ilidža
            </span>
          )}
        </div>
      )}

      {showText && variant === 'stacked' && (
        <div className="flex flex-col items-center text-center mt-2 leading-snug">
          <span className={`text-xs font-bold uppercase tracking-wider ${textColor} font-serif`}>
            ISLAMSKA ZAJEDNICA
          </span>
          <span className={`text-[10px] font-bold uppercase tracking-wider ${textColor} font-serif`}>
            U BOSNI I HERCEGOVINI
          </span>
          <span className="text-[11px] text-stone-500 mt-0.5">
            Džemat Vreoca • Medžlis IZ Sarajevo
          </span>
        </div>
      )}
    </div>
  );
};


