import React from 'react';
import { motion } from 'motion/react';

interface CozyLogoProps {
  className?: string;
  size?: number;
}

export const CozyLogo: React.FC<CozyLogoProps> = ({ className = '', size = 36 }) => {
  return (
    <div 
      className={`relative flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Decorative backdrop glow */}
      <div className="absolute inset-0 bg-[#E8B86D]/15 rounded-full blur-md animate-pulse duration-3000" />

      {/* Main SVG Icon */}
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full relative z-10 filter drop-shadow-[0_2px_4px_rgba(48,41,34,0.1)]"
      >
        {/* Soft background warm sunset/evening circle */}
        <circle 
          cx="50" 
          cy="50" 
          r="44" 
          className="fill-[#FCFAF2] stroke-[#302922]/8" 
          strokeWidth="1.5"
        />

        {/* Ambient Warm Glow Cone representing lamp light */}
        <motion.path
          d="M50 32 L20 85 L80 85 Z"
          className="fill-gradient"
          fill="url(#lampGlow)"
          opacity="0.25"
          initial={{ opacity: 0.2 }}
          animate={{ opacity: [0.2, 0.35, 0.2] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Crescent Moon */}
        <path
          d="M68 22 C68 31.94 59.94 40 50 40 C46.5 40 43.2 39 40.5 37.3 C44.5 42.5 50.8 45.8 58 45.8 C70 45.8 79.8 36 79.8 24 C79.8 19.5 78.4 15.3 76 12 C71.3 16.5 68 19 68 22 Z"
          fill="#E8B86D"
          className="opacity-90"
        />

        {/* Cozy Lamp Stem and Shade */}
        {/* Base */}
        <path 
          d="M32 78 H52" 
          stroke="#302922" 
          strokeWidth="3.5" 
          strokeLinecap="round" 
        />
        {/* Stem curve */}
        <path 
          d="M42 78 C42 60 48 50 48 44" 
          stroke="#302922" 
          strokeWidth="3" 
          strokeLinecap="round" 
        />
        {/* Shade */}
        <path 
          d="M40 44 L56 44 L60 34 L36 34 Z" 
          fill="#7C8F79" 
          stroke="#302922" 
          strokeWidth="2.5" 
          strokeLinejoin="round" 
        />
        {/* Tiny golden bulb */}
        <circle cx="48" cy="45" r="2.5" fill="#E8B86D" />

        {/* Steaming Coffee Cup on the right side */}
        <g transform="translate(18, 5)">
          {/* Cup body */}
          <path 
            d="M42 66 C42 71.5 45.5 73 50 73 C54.5 73 58 71.5 58 66 H42 Z" 
            fill="#302922" 
          />
          {/* Cup handle */}
          <path 
            d="M58 68 C61 68 62 70 61.5 71 C61 72 59 72 58 71" 
            stroke="#302922" 
            strokeWidth="1.8" 
            strokeLinecap="round" 
          />
          {/* Steams */}
          <motion.path
            d="M46 62 Q47.5 58 46 55"
            stroke="#E8B86D"
            strokeWidth="1.5"
            strokeLinecap="round"
            animate={{ y: [0, -3, 0], opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
          />
          <motion.path
            d="M50 61 Q51.5 57 50 54"
            stroke="#E8B86D"
            strokeWidth="1.5"
            strokeLinecap="round"
            animate={{ y: [0, -4, 0], opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
          />
          <motion.path
            d="M54 62 Q55.5 58 54 55"
            stroke="#E8B86D"
            strokeWidth="1.5"
            strokeLinecap="round"
            animate={{ y: [0, -3, 0], opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1.1 }}
          />
        </g>

        {/* Tiny Magic Sparkle in the sky */}
        <motion.path
          d="M26 24 L27.5 28 L31.5 29.5 L27.5 31 L26 35 L24.5 31 L20.5 29.5 L24.5 28 Z"
          fill="#E8B86D"
          animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Linear Gradient Definition for Lamp Glow */}
        <defs>
          <radialGradient id="lampGlow" cx="48%" cy="44%" r="40%" fx="48%" fy="44%">
            <stop offset="0%" stopColor="#E8B86D" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#E8B86D" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#E8B86D" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
};
