import React from 'react';
import { JournalItem } from '../components/JournalItem';
import { journals } from '../data/journals';
import { BookOpen, Sparkles } from 'lucide-react';
import { TimeTheme } from '../types';

interface JournalSectionProps {
  onToast: (msg: string, type: 'info' | 'success' | 'heart' | 'error') => void;
  activeTheme?: TimeTheme;
}

export const JournalSection: React.FC<JournalSectionProps> = ({ onToast, activeTheme = 'morning' }) => {
  return (
    <section
      id="journal-section"
      className={`py-32 md:py-48 px-6 md:px-12 border-b relative bg-grain transition-all duration-[1200ms] ${
        activeTheme === 'evening'
          ? 'bg-[#221A16]/30 border-[#5A483B]/20 text-[#EBE4DC]'
          : 'bg-cozy-cream/30 border-cozy-wood/5 text-cozy-dark'
      }`}
    >
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Title Block */}
        <div className="text-center space-y-4 max-w-xl mx-auto">
          <span className={`text-xs sm:text-sm font-bold uppercase tracking-[0.25em] flex items-center justify-center gap-1.5 transition-colors ${
            activeTheme === 'evening' ? 'text-cozy-warm-yellow' : 'text-cozy-moss'
          }`}>
            <BookOpen size={15} />
            Nhật ký sau giờ làm
          </span>
          <h2 className={`font-serif text-3xl sm:text-4xl md:text-5xl font-semibold transition-colors ${
            activeTheme === 'evening' ? 'text-[#EBE4DC]' : 'text-cozy-dark'
          }`}>
            Những câu chuyện vụn vặt
          </h2>
          <p className={`text-sm sm:text-base leading-relaxed font-sans text-balance transition-colors ${
            activeTheme === 'evening' ? 'text-[#EBE4DC]/80' : 'text-cozy-dark/80'
          }`}>
            Lưu lại những thước phim đời thường mộc mạc, những góc làm việc ngăn nắp hay những cảm xúc vu vơ của tuổi trẻ công sở đầy khát khao nhưng cũng cần vỗ về.
          </p>
        </div>

        {/* Masonry-like Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {journals.map((journal) => (
            <JournalItem
              key={journal.id}
              journal={journal}
              onToast={onToast}
              activeTheme={activeTheme}
            />
          ))}
        </div>

        {/* Bottom invitation statement */}
        <div className="text-center max-w-sm mx-auto pt-8 space-y-3 border-t border-cozy-wood/10">
          <p className={`text-sm italic transition-colors ${
            activeTheme === 'evening' ? 'text-[#EBE4DC]/70' : 'text-cozy-dark/70'
          }`}>
            Bạn cũng muốn kể về góc bàn của mình?
          </p>
          <a
            href="mailto:gocnho@tancaroi.vn"
            className={`inline-flex items-center gap-1 text-sm font-bold uppercase tracking-wider underline transition-colors ${
              activeTheme === 'evening' ? 'text-cozy-warm-yellow hover:text-[#F2D7A5]' : 'text-cozy-wood hover:text-cozy-moss'
            }`}
          >
            Gửi nhật ký của bạn cho chúng mình &rarr;
          </a>
        </div>
      </div>
    </section>
  );
};
