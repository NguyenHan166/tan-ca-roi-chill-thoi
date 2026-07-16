import React from 'react';
import { JournalItem } from '../components/JournalItem';
import { journals } from '../data/journals';
import { BookOpen, Sparkles } from 'lucide-react';

interface JournalSectionProps {
  onToast: (msg: string, type: 'info' | 'success' | 'heart' | 'error') => void;
}

export const JournalSection: React.FC<JournalSectionProps> = ({ onToast }) => {
  return (
    <section
      id="journal-section"
      className="py-32 md:py-48 px-6 md:px-12 bg-cozy-cream/30 border-b border-cozy-wood/5 relative bg-grain"
    >
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Title Block */}
        <div className="text-center space-y-4 max-w-xl mx-auto">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-cozy-moss flex items-center justify-center gap-1.5">
            <BookOpen size={15} />
            Nhật ký sau giờ làm
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-cozy-dark">
            Những câu chuyện vụn vặt
          </h2>
          <p className="text-sm sm:text-base text-cozy-dark/80 leading-relaxed font-sans text-balance">
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
            />
          ))}
        </div>

        {/* Bottom invitation statement */}
        <div className="text-center max-w-sm mx-auto pt-8 space-y-3 border-t border-cozy-wood/10">
          <p className="text-sm text-cozy-dark/70 italic">
            Bạn cũng muốn kể về góc bàn của mình?
          </p>
          <a
            href="mailto:gocnho@tancaroi.vn"
            className="inline-flex items-center gap-1 text-sm text-cozy-wood hover:text-cozy-moss font-bold uppercase tracking-wider underline transition-colors"
          >
            Gửi nhật ký của bạn cho chúng mình &rarr;
          </a>
        </div>
      </div>
    </section>
  );
};
