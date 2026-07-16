import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowDown, Volume2, Coffee } from 'lucide-react';

interface HeroSectionProps {
  onStartChill: () => void;
  onExploreCorner: () => void;
  activeTheme: 'morning' | 'afternoon' | 'evening';
  isAudioPlaying: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartChill,
  onExploreCorner,
  activeTheme,
  isAudioPlaying,
}) => {
  // Theme styling overrides
  const getThemeOverlay = () => {
    switch (activeTheme) {
      case 'morning':
        return 'bg-amber-100/10 mix-blend-soft-light backdrop-brightness-110';
      case 'afternoon':
        return 'bg-[#E8B86D]/20 mix-blend-color-burn backdrop-contrast-105';
      case 'evening':
        return 'bg-[#1F1B17]/40 backdrop-brightness-[0.75]';
      default:
        return 'bg-black/30';
    }
  };

  const getThemeBackground = () => {
    switch (activeTheme) {
      case 'morning':
        // Morning cozy workstation
        return 'https://images.unsplash.com/photo-1517502884422-41eaaced0168?q=80&w=1600';
      case 'afternoon':
        // Afternoon golden sunshine desk setup
        return 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1600';
      case 'evening':
        // Evening warm twilight desk setup with lamp
        return 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1600';
      default:
        return 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1600';
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-[#2B241E] bg-grain"
    >
      {/* Background Cinematic Image with transition */}
      <div className="absolute inset-0 z-0">
        <img
          src={getThemeBackground()}
          alt="Cinematic desk setup background"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover opacity-60 transition-all duration-1000 ease-in-out scale-102"
        />
        {/* Dynamic theme color treatment overlay */}
        <div className={`absolute inset-0 transition-all duration-1000 ${getThemeOverlay()}`} />
        
        {/* Extra vignette shading for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-cozy-dark via-transparent to-cozy-dark/25" />
      </div>

      {/* Floating Leaves or Dust particles simulation */}
      <div className="absolute top-1/4 left-10 md:left-24 text-[#E8B86D]/15 pointer-events-none select-none z-10 animate-drift">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17 8C12 8 8 12 8 17C8 12 12 8 17 8M21 2C11.5 2 4 9.5 4 19H20C20 9.5 21 2 21 2Z" />
        </svg>
      </div>
      <div className="absolute bottom-1/4 right-10 md:right-32 text-[#66705A]/15 pointer-events-none select-none z-10 animate-drift" style={{ animationDelay: '4s' }}>
        <svg width="50" height="50" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17 8C12 8 8 12 8 17C8 12 12 8 17 8M21 2C11.5 2 4 9.5 4 19H20C20 9.5 21 2 21 2Z" />
        </svg>
      </div>

      {/* Hero Content Box */}
      <div className="max-w-4xl mx-auto px-4 md:px-8 text-center relative z-10 space-y-8 select-none">
        
        {/* Eyebrow badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cozy-ivory/10 backdrop-blur-md border border-cozy-ivory/10"
        >
          <Sparkles size={11} className="text-cozy-warm-yellow fill-cozy-warm-yellow animate-pulse" />
          <span className="text-[10px] md:text-xs font-semibold tracking-widest text-cozy-cream uppercase">
            Chậm lại một chút
          </span>
        </motion.div>

        {/* Big heading */}
        <div className="space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-serif text-4xl sm:text-5xl md:text-7xl font-bold text-cozy-ivory tracking-tight leading-[1.1] whitespace-pre-line"
          >
            TAN CA RỒI,<br />
            <span className="text-cozy-warm-yellow relative inline-block">
              CHILL THÔI.
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-cozy-warm-yellow/30 rounded-full" />
            </span>
          </motion.h1>
        </div>

        {/* Beautiful text explanation */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="max-w-xl mx-auto text-sm md:text-base font-medium text-cozy-cream/80 leading-relaxed font-sans"
        >
          Một góc nhỏ dành cho những người đã có một ngày hơi dài. Bật chút âm thanh rì rào, chọn một tâm trạng bất kỳ và ở lại đây bao lâu cũng được nhé.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
        >
          <button
            onClick={onStartChill}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-cozy-warm-yellow hover:bg-cozy-ivory text-cozy-dark font-semibold text-sm transition-all duration-300 shadow-lg hover:shadow-cozy-warm-yellow/20 hover:scale-103 active:scale-97 cursor-pointer group"
          >
            <Volume2 size={16} className={`${isAudioPlaying ? 'animate-bounce' : 'group-hover:scale-110 transition-transform'}`} />
            Bật chế độ chill
          </button>

          <button
            onClick={onExploreCorner}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-cozy-ivory/10 hover:bg-cozy-ivory/25 text-cozy-ivory font-semibold text-sm transition-all duration-300 backdrop-blur-sm border border-cozy-ivory/10 hover:scale-103 active:scale-97 cursor-pointer"
          >
            <Coffee size={16} />
            Dự báo thời tiết bình yên
          </button>
        </motion.div>

        {/* Disclaimer / Notice statement */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="pt-6"
        >
          <p className="text-[10px] md:text-xs text-cozy-cream/55 italic">
            Không quảng cáo ồn ào. Chỉ có những thứ khiến ngày của bạn dễ chịu hơn.
          </p>
        </motion.div>
      </div>

      {/* Floating Animated scroll indicator at bottom */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 select-none text-cozy-cream/60">
        <span className="text-[10px] uppercase tracking-widest font-semibold">Cuộn xuống</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          className="w-8 h-8 rounded-full border border-cozy-cream/20 flex items-center justify-center text-cozy-cream"
        >
          <ArrowDown size={14} />
        </motion.div>
      </div>
    </section>
  );
};
