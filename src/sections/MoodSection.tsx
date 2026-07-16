import React from 'react';
import { Mood } from '../types';
import { moods } from '../data/moods';
import { BatteryLow, Sparkles, CloudRain, LayoutGrid, Coffee, Heart, Volume2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface MoodSectionProps {
  selectedMoodId: string;
  onSelectMood: (moodId: string) => void;
  onToast: (msg: string, type: 'info' | 'success' | 'heart' | 'error') => void;
}

export const MoodSection: React.FC<MoodSectionProps> = ({
  selectedMoodId,
  onSelectMood,
  onToast,
}) => {
  const currentMood = moods.find((m) => m.id === selectedMoodId) || moods[0];

  // Helper to map string to actual Lucide component
  const getMoodIcon = (name: string, isSelected: boolean) => {
    const props = {
      size: 20,
      className: isSelected ? 'text-[#FFFDF8] scale-110 transition-transform duration-500' : 'text-cozy-wood'
    };
    switch (name) {
      case 'BatteryLow':
        return <BatteryLow {...props} />;
      case 'Sparkles':
        return <Sparkles {...props} />;
      case 'CloudRain':
        return <CloudRain {...props} />;
      case 'LayoutGrid':
        return <LayoutGrid {...props} />;
      case 'Coffee':
        return <Coffee {...props} />;
      default:
        return <Heart {...props} />;
    }
  };

  const getMoodThumb = (id: string) => {
    switch (id) {
      case 'tired':
        return 'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?q=80&w=400&auto=format&fit=crop';
      case 'focus':
        return 'https://images.unsplash.com/photo-1547082299-de196ea013d6?q=80&w=400&auto=format&fit=crop';
      case 'rain':
        return 'https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?q=80&w=400&auto=format&fit=crop';
      case 'decor':
        return 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=400&auto=format&fit=crop';
      case 'lazy':
        return 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=400&auto=format&fit=crop';
      default:
        return 'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?q=80&w=400&auto=format&fit=crop';
    }
  };

  const handleMoodClick = (mood: Mood) => {
    onSelectMood(mood.id);
    onToast(`Đã chuyển sang mood: ${mood.name}`, 'success');
  };

  return (
    <section
      id="mood-selector"
      className="py-32 md:py-48 px-6 md:px-12 bg-[#FFFDF8] border-b border-cozy-wood/5 relative overflow-hidden bg-grain"
    >
      {/* Background cinematic blurry colors */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-cozy-moss/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-cozy-warm-yellow/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        
        {/* Poetic Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-cozy-moss">
            Bình minh hay Chiều tà
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-cozy-dark">
            Tâm trạng bạn lúc này?
          </h2>
          <p className="text-sm sm:text-base text-cozy-dark/80 leading-relaxed font-sans">
            Hãy chọn một trạng thái cảm xúc phản chiếu của bạn lúc này. Góc nhỏ sẽ tự động khơi dậy những lời thủ thỉ, những nốt nhạc rì rào và gợi ý các mảnh ghép thích hợp nhất.
          </p>
        </div>

        {/* Mood Selection Card Row: Highly elegant grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-5 md:gap-6">
          {moods.map((mood) => {
            const isSelected = mood.id === selectedMoodId;
            return (
              <button
                key={mood.id}
                onClick={() => handleMoodClick(mood)}
                className={`flex flex-col text-left rounded-[28px] p-6 border transition-cozy h-full relative overflow-hidden cursor-pointer group/card ${
                  isSelected
                    ? 'bg-cozy-wood border-cozy-wood text-cozy-ivory shadow-2xl shadow-cozy-wood/20 -translate-y-2'
                    : 'bg-cozy-cream/15 border-cozy-wood/10 text-cozy-dark/85 hover:bg-cozy-cream/35 hover:-translate-y-1'
                }`}
                aria-label={`Chọn tâm trạng: ${mood.name}`}
              >
                {/* Tiny background desaturated artwork with overlay */}
                <div className="absolute inset-0 z-0 opacity-10 mix-blend-overlay">
                  <img
                    src={getMoodThumb(mood.id)}
                    alt=""
                    className="w-full h-full object-cover grayscale transition-transform duration-1000 group-hover/card:scale-105"
                  />
                </div>

                {/* Visual Icon */}
                <div className={`w-11 h-11 rounded-full flex items-center justify-center mb-6 transition-all duration-500 relative z-10 ${
                  isSelected ? 'bg-white/15 text-[#FFFDF8]' : 'bg-cozy-ivory border border-cozy-wood/10 text-cozy-wood'
                }`}>
                  {getMoodIcon(mood.icon, isSelected)}
                </div>

                {/* Text Content */}
                <div className="space-y-2 flex-1 flex flex-col justify-between relative z-10">
                  <div>
                    <h3 className="font-serif text-base sm:text-lg font-bold leading-tight mb-2">
                      {mood.name}
                    </h3>
                    <p className={`text-xs sm:text-sm leading-relaxed line-clamp-4 transition-colors duration-500 font-medium ${
                      isSelected ? 'text-[#FFFDF8]' : 'text-cozy-dark/80'
                    }`}>
                      {mood.description}
                    </p>
                  </div>

                  {/* Elegant micro divider */}
                  <div className={`w-6 h-0.5 rounded-full mt-4 transition-all duration-500 ${
                    isSelected ? 'bg-cozy-warm-yellow' : 'bg-cozy-wood/20'
                  }`} />
                </div>
              </button>
            );
          })}
        </div>

        {/* Dynamic Poetry Quote Box */}
        <div className="bg-[#FFFDF8] border border-cozy-wood/5 rounded-[32px] p-8 md:p-12 shadow-2xl shadow-cozy-dark/5 max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedMoodId}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-center"
            >
              {/* Cinematic Quote Block */}
              <div className="md:col-span-2 space-y-4 border-b md:border-b-0 md:border-r border-cozy-wood/10 pb-8 md:pb-0 md:pr-12 text-left">
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-cozy-moss block">
                  Lời tâm sự vỗ về
                </span>
                <p className="font-serif text-xl md:text-3xl text-cozy-dark leading-relaxed font-bold italic text-balance">
                  “ {currentMood.quote} ”
                </p>
                <span className="text-xs text-cozy-dark/60 font-mono block">
                  — Lắng lòng cùng Tan Ca Rồi.
                </span>
              </div>

              {/* Suggestions Block */}
              <div className="space-y-4 text-left">
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-cozy-moss block">
                  Giai điệu đồng điệu
                </span>

                <div className="flex items-center gap-3.5 bg-cozy-cream/30 border border-cozy-wood/5 rounded-2xl p-3.5">
                  <div className="w-10 h-10 rounded-full bg-cozy-wood text-[#FFFDF8] flex items-center justify-center animate-pulse shrink-0">
                    <Volume2 size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] text-cozy-dark/45 block uppercase font-mono tracking-wider">Khuyên phát:</span>
                    <span className="text-sm font-semibold text-cozy-dark block truncate">
                      {currentMood.recommendedAudioId === 'rain' && 'Mưa rơi hiên nhà cũ'}
                      {currentMood.recommendedAudioId === 'lofi' && 'Bản nhạc Lofi hoàng hôn'}
                      {currentMood.recommendedAudioId === 'cafe' && 'Quán nước quen xôn xao'}
                      {currentMood.recommendedAudioId === 'nature' && 'Tiếng đêm thôn quê yên bình'}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-cozy-dark/60 leading-relaxed font-sans italic">
                  * Chúng mình đã đồng bộ tần số âm thanh và bộ sưu tập tương ứng với trạng thái của bạn dưới trang chủ.
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
