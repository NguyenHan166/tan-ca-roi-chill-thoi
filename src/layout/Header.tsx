import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, Heart, Sparkles, Music, CloudRain, Coffee, Trees } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CozyLogo } from '../components/CozyLogo';
import { tracks } from '../components/AudioPlayerMini';

interface HeaderProps {
  isAudioPlaying: boolean;
  onToggleAudio: () => void;
  savedCount: number;
  onOpenFavorites: () => void;
  activeTheme: 'morning' | 'afternoon' | 'evening';
  onChangeTheme: (theme: 'morning' | 'afternoon' | 'evening') => void;
  onToast: (msg: string, type: 'info' | 'success' | 'heart' | 'error') => void;
  activeTrackId?: string;
  onChangeTrack?: (trackId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  isAudioPlaying,
  onToggleAudio,
  savedCount,
  onOpenFavorites,
  activeTheme,
  onChangeTheme,
  onToast,
  activeTrackId,
  onChangeTrack,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const renderTrackIcon = (name: string, size = 14) => {
    switch (name) {
      case 'CloudRain':
        return <CloudRain size={size} />;
      case 'Coffee':
        return <Coffee size={size} />;
      case 'Trees':
        return <Trees size={size} />;
      default:
        return <Music size={size} />;
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const menuItems = [
    { label: 'Trang chủ', id: 'hero' },
    { label: 'Chọn mood', id: 'mood-selector' },
    { label: 'Góc nhỏ', id: 'desk-interactive' },
    { label: 'Nhật ký', id: 'journal-section' },
    { label: 'Về chúng mình', id: 'about-us' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-cozy-ivory/80 backdrop-blur-md border-b border-cozy-wood/10 py-3 shadow-sm'
            : 'bg-transparent py-5'
        }`}
        id="app-navigation-header"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleScrollTo('hero')}
            className="flex items-center gap-2 group cursor-pointer focus:outline-none"
          >
            <motion.div
              whileHover={{ scale: 1.08, rotate: 3 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <CozyLogo size={38} />
            </motion.div>
            <span className="font-serif text-lg sm:text-xl font-bold text-cozy-dark tracking-tight group-hover:text-cozy-wood transition-colors">
              Tan Ca Rồi
            </span>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-medium text-cozy-dark/85">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleScrollTo(item.id)}
                className="hover:text-cozy-wood cursor-pointer transition-colors relative py-1 focus:outline-none group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cozy-wood transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </nav>

          {/* Right Side Controls */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Manual Theme Selector inside Header */}
            <div className="hidden lg:flex items-center bg-cozy-cream/40 border border-cozy-wood/10 rounded-full p-1 text-[10px]">
              <button
                onClick={() => {
                  onChangeTheme('morning');
                }}
                className={`px-2 py-1 rounded-full transition-all cursor-pointer ${
                  activeTheme === 'morning' ? 'bg-cozy-wood text-cozy-ivory font-semibold' : 'text-cozy-dark/60 hover:text-cozy-dark'
                }`}
              >
                Sáng
              </button>
              <button
                onClick={() => {
                  onChangeTheme('afternoon');
                }}
                className={`px-2 py-1 rounded-full transition-all cursor-pointer ${
                  activeTheme === 'afternoon' ? 'bg-cozy-wood text-cozy-ivory font-semibold' : 'text-cozy-dark/60 hover:text-cozy-dark'
                }`}
              >
                Chiều
              </button>
              <button
                onClick={() => {
                  onChangeTheme('evening');
                }}
                className={`px-2 py-1 rounded-full transition-all cursor-pointer ${
                  activeTheme === 'evening' ? 'bg-cozy-wood text-cozy-ivory font-semibold' : 'text-cozy-dark/60 hover:text-cozy-dark'
                }`}
              >
                Đêm
              </button>
            </div>

            {/* Ambient Sound Icon */}
            <button
              onClick={onToggleAudio}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 border border-cozy-wood/10 cursor-pointer ${
                isAudioPlaying
                  ? 'bg-cozy-wood text-cozy-ivory'
                  : 'bg-cozy-ivory text-cozy-dark hover:bg-cozy-cream/30'
              }`}
              aria-label={isAudioPlaying ? 'Tắt âm thanh môi trường' : 'Bật âm thanh môi trường'}
            >
              {isAudioPlaying ? (
                <div className="relative">
                  <Volume2 size={16} />
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-cozy-warm-yellow animate-ping" />
                </div>
              ) : (
                <VolumeX size={16} className="opacity-70" />
              )}
            </button>

            {/* Favorites Drawer Toggle */}
            <button
              onClick={onOpenFavorites}
              className="w-9 h-9 rounded-full bg-cozy-ivory hover:bg-cozy-cream/30 border border-cozy-wood/10 text-cozy-dark flex items-center justify-center relative cursor-pointer"
              aria-label="Mở góc yêu thích"
            >
              <Heart size={16} />
              {savedCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-mono font-bold flex items-center justify-center border-2 border-cozy-ivory px-1">
                  {savedCount}
                </span>
              )}
            </button>

            {/* CTA action button */}
            <button
              onClick={() => handleScrollTo('desk-interactive')}
              className="hidden sm:inline-flex items-center px-4 py-2 rounded-full bg-cozy-wood text-cozy-ivory hover:bg-cozy-moss text-xs font-semibold transition-all shadow-sm active:scale-97 cursor-pointer"
            >
              Chill một chút
            </button>

            {/* Mobile Hamburger toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden w-9 h-9 rounded-full bg-cozy-ivory border border-cozy-wood/10 flex items-center justify-center text-cozy-dark cursor-pointer"
              aria-label="Mở menu"
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Slide Navigation Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-[#302922] z-[9990] cursor-pointer md:hidden"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed top-0 right-0 h-full w-4/5 max-w-sm bg-cozy-ivory border-l border-cozy-wood/10 shadow-2xl z-[9991] flex flex-col p-6 md:hidden"
            >
              <div className="flex items-center justify-between mb-8">
                <span className="font-serif text-base font-bold text-cozy-dark">
                  Menu Góc Nhỏ
                </span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-8 h-8 rounded-full hover:bg-cozy-wood/5 flex items-center justify-center text-cozy-dark cursor-pointer"
                  aria-label="Đóng menu"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Theme switcher on Mobile menu */}
              <div className="mb-6 bg-cozy-cream/50 rounded-2xl p-4 border border-cozy-wood/5">
                <span className="text-[10px] uppercase font-bold text-cozy-moss tracking-wider block mb-2">
                  Chọn không gian:
                </span>
                <div className="grid grid-cols-3 gap-1.5 text-xs text-center">
                  <button
                    onClick={() => {
                      onChangeTheme('morning');
                      onToast('Đã đổi sang màu ban sáng.', 'success');
                    }}
                    className={`py-1.5 rounded-xl cursor-pointer ${
                      activeTheme === 'morning' ? 'bg-cozy-wood text-cozy-ivory font-semibold' : 'bg-cozy-ivory border border-cozy-wood/10 text-cozy-dark/80'
                    }`}
                  >
                    Sáng
                  </button>
                  <button
                    onClick={() => {
                      onChangeTheme('afternoon');
                      onToast('Đã đổi sang màu ban chiều.', 'success');
                    }}
                    className={`py-1.5 rounded-xl cursor-pointer ${
                      activeTheme === 'afternoon' ? 'bg-cozy-wood text-cozy-ivory font-semibold' : 'bg-cozy-ivory border border-cozy-wood/10 text-cozy-dark/80'
                    }`}
                  >
                    Chiều
                  </button>
                  <button
                    onClick={() => {
                      onChangeTheme('evening');
                      onToast('Đã đổi sang màu ban đêm.', 'success');
                    }}
                    className={`py-1.5 rounded-xl cursor-pointer ${
                      activeTheme === 'evening' ? 'bg-cozy-wood text-cozy-ivory font-semibold' : 'bg-cozy-ivory border border-cozy-wood/10 text-cozy-dark/80'
                    }`}
                  >
                    Đêm
                  </button>
                </div>
              </div>

              {/* Audio controller inside mobile menu */}
              {activeTrackId && onChangeTrack && (
                <div className="mb-6 bg-cozy-cream/30 rounded-2xl p-4 border border-cozy-wood/5">
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-[10px] uppercase font-bold text-cozy-moss tracking-wider">
                      Âm thanh nền:
                    </span>
                    <button
                      onClick={onToggleAudio}
                      className={`text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 cursor-pointer transition-all ${
                        isAudioPlaying
                          ? 'bg-cozy-wood text-cozy-ivory'
                          : 'bg-cozy-wood/5 text-cozy-dark hover:bg-cozy-wood/10'
                      }`}
                    >
                      {isAudioPlaying ? (
                        <>
                          <Volume2 size={12} />
                          <span>Đang Phát</span>
                        </>
                      ) : (
                        <>
                          <VolumeX size={12} />
                          <span>Đang Tắt</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    {tracks.map((track) => {
                      const isActive = activeTrackId === track.id;
                      return (
                        <button
                          key={track.id}
                          onClick={() => {
                            onChangeTrack(track.id);
                            if (!isAudioPlaying) {
                              onToggleAudio();
                            }
                          }}
                          className={`w-full flex items-center gap-2.5 p-2 rounded-xl text-left text-xs transition-all duration-200 cursor-pointer ${
                            isActive
                              ? 'bg-cozy-wood text-cozy-ivory font-semibold shadow-sm'
                              : 'bg-cozy-ivory hover:bg-cozy-cream/30 border border-cozy-wood/5 text-cozy-dark'
                          }`}
                        >
                          <span className={isActive ? 'text-cozy-warm-yellow' : 'text-cozy-wood'}>
                            {renderTrackIcon(track.iconName, 13)}
                          </span>
                          <span className="truncate">{track.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Navigation list */}
              <div className="flex flex-col gap-4">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleScrollTo(item.id)}
                    className="text-left py-2 border-b border-cozy-wood/5 text-sm font-medium text-cozy-dark hover:text-cozy-wood transition-colors cursor-pointer"
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Mobile CTA */}
              <div className="mt-auto pt-6 space-y-4">
                <button
                  onClick={() => handleScrollTo('desk-interactive')}
                  className="w-full inline-flex items-center justify-center py-3 rounded-full bg-cozy-wood hover:bg-cozy-moss text-cozy-ivory text-xs font-bold transition-colors"
                >
                  Chill một chút
                </button>
                <p className="text-[10px] text-center text-cozy-dark/40 italic leading-normal">
                  “Một góc nhỏ dành cho những người đã có một ngày hơi dài.”
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
