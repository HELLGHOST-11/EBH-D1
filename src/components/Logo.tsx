import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  const dimensions = {
    sm: { width: 130, height: 44 },
    md: { width: 170, height: 58 },
    lg: { width: 220, height: 74 }
  };

  const { width, height } = dimensions[size] || dimensions.md;

  return (
    <div className={`inline-flex items-center cursor-pointer select-none ${className}`}>
      <svg
        width={width}
        height={height}
        viewBox="0 0 120 70"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-auto h-full"
      >
        {/* EXIM Row */}
        <g transform="translate(1, 2)">
          {/* Letter E in Red */}
          <path
            d="M 0,0 H 26 V 7 H 9 V 13 H 22 V 19 H 9 V 25 H 26 V 32 H 0 Z"
            fill="#E31B23"
          />
          {/* Arrow overlay inside red E */}
          <path
            d="M 12,13 L 21,16 L 12,19 V 17 H 7 V 15 H 12 Z"
            fill="#FFFFFF"
          />
          <path
            d="M 18,12 L 26,16 L 18,20 L 20,16 Z"
            fill="#E31B23"
          />

          {/* Letter X in Green */}
          <path
            d="M 29,0 H 37 L 45,15 L 53,0 H 61 L 49.5,16 L 62,32 H 54 L 45,17 L 36,32 H 28 L 40.5,16 Z"
            fill="#007A3D"
          />

          {/* Letter I in Green */}
          <path
            d="M 64,0 H 72 V 32 H 64 Z"
            fill="#007A3D"
          />

          {/* Letter M in Green */}
          <path
            d="M 75,0 H 84 L 92,18 L 100,0 H 109 V 32 H 101 V 11 L 94,26 H 90 L 83,11 V 32 H 75 Z"
            fill="#007A3D"
          />
        </g>

        {/* BANK Gray Bar */}
        <rect x="1" y="37" width="110" height="13" fill="#808285" rx="0.5" />
        <text
          x="56"
          y="46.5"
          fill="#FFFFFF"
          fontSize="9.5"
          fontWeight="800"
          fontFamily="Arial, Helvetica, sans-serif"
          textAnchor="middle"
          letterSpacing="7.5"
        >
          BANK
        </text>

        {/* HOSPITAL Red Text */}
        <text
          x="56"
          y="64"
          fill="#E31B23"
          fontSize="9.5"
          fontWeight="700"
          fontFamily="Arial, Helvetica, sans-serif"
          textAnchor="middle"
          letterSpacing="3.6"
        >
          HOSPITAL
        </text>
      </svg>
    </div>
  );
};
