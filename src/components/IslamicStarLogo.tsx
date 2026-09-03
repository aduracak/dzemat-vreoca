import React from 'react';

interface IslamicStarLogoProps {
  className?: string;
  size?: number;
  color?: string;
}

export const IslamicStarLogo: React.FC<IslamicStarLogoProps> = ({
  className = '',
  size = 36,
  color = '#1b3d2f',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
    >
      {/* Outer 8-pointed geometric star (Rub el Hizb style from reference screenshot) */}
      <rect
        x="18"
        y="18"
        width="64"
        height="64"
        rx="2"
        stroke={color}
        strokeWidth="2.8"
        strokeLinejoin="round"
        fill="none"
      />
      <rect
        x="18"
        y="18"
        width="64"
        height="64"
        rx="2"
        stroke={color}
        strokeWidth="2.8"
        strokeLinejoin="round"
        fill="none"
        transform="rotate(45 50 50)"
      />
      
      {/* Inner concentric geometric circles */}
      <circle
        cx="50"
        cy="50"
        r="22"
        stroke={color}
        strokeWidth="1.8"
        fill="none"
      />
      <circle
        cx="50"
        cy="50"
        r="11"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
      />
      {/* Center dot */}
      <circle
        cx="50"
        cy="50"
        r="2.5"
        fill={color}
      />
    </svg>
  );
};
