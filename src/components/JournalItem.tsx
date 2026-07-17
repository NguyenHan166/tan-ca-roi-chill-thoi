import React, { useState } from 'react';
import { Journal, TimeTheme } from '../types';
import { Play, BookOpen, Clock, X, Calendar, Sparkles, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface JournalItemProps {
  journal: Journal;
  onToast: (msg: string, type: 'info' | 'success' | 'heart' | 'error') => void;
  activeTheme?: TimeTheme;
}

export const JournalItem: React.FC<JournalItemProps> = ({ journal, onToast, activeTheme = 'morning' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    onToast(`Đang mở: ${journal.title.slice(0, 30)}...`, 'info');
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    if (!isLiked) {
      onToast('Cảm ơn bạn đã thả tim cho bài viết!', 'heart');
    }
  };

  return (
    <>
      <article
        onClick={handleOpen}
        className={`border rounded-[32px] overflow-hidden hover:shadow-2xl transition-all duration-500 group cursor-pointer flex flex-col h-full ${
          activeTheme === 'evening'
            ? 'bg-[#1C1713] border-[#5A483B]/40 hover:shadow-cozy-warm-yellow/5'
            : 'bg-[#FFFDF8] border-cozy-wood/5 hover:shadow-cozy-wood/5'
        } ${
          journal.featured ? 'md:col-span-2 md:flex-row' : ''
        }`}
        id={`journal-card-${journal.id}`}
      >
        {/* Thumbnail Wrapper */}
        <div
          className={`relative overflow-hidden bg-cozy-cream/30 shrink-0 ${
            journal.featured ? 'md:w-1/2 aspect-[4/3] md:aspect-auto' : 'aspect-[16/10]'
          }`}
        >
          <img
            src={journal.thumbnail}
            alt={journal.title}
            referrerPolicy="no-referrer"
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-103 filter brightness-[0.96]"
          />

          {/* Dark artistic overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-cozy-dark/45 via-transparent to-transparent opacity-85 pointer-events-none" />

          {/* Video Play / Article Icon */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {journal.type === 'video' ? (
              <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-md text-cozy-dark flex items-center justify-center shadow-md transform group-hover:scale-105 transition-transform duration-500">
                <Play size={16} className="ml-0.5 fill-cozy-dark text-cozy-dark" />
              </div>
            ) : (
              <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-md text-cozy-dark flex items-center justify-center shadow-md transform group-hover:scale-105 transition-transform duration-500">
                <BookOpen size={16} className="text-cozy-dark" />
              </div>
            )}
          </div>

          {/* Video Duration Badge */}
          {journal.type === 'video' && journal.duration && (
            <span className="absolute bottom-4 right-4 inline-flex items-center gap-1 px-2.5 py-1 rounded bg-cozy-dark/80 text-[#FFFDF8] text-[9px] font-medium font-mono">
              <Clock size={10} />
              {journal.duration}
            </span>
          )}

          {/* Post Type Badge */}
          <span className={`absolute top-4 left-4 inline-flex items-center gap-1 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider ${
            activeTheme === 'evening' ? 'bg-cozy-warm-yellow text-[#181310]' : 'bg-cozy-wood/90 text-[#FFFDF8]'
          }`}>
            Câu chuyện chữa lành
          </span>
        </div>

        {/* Text Area */}
        <div className={`p-8 flex-1 flex flex-col justify-between ${
          journal.featured ? 'md:w-1/2' : ''
        }`}>
          <div className="space-y-4">
            <div className={`flex items-center gap-1.5 text-xs uppercase tracking-[0.1em] font-bold transition-colors ${
              activeTheme === 'evening' ? 'text-[#EBE4DC]/50' : 'text-cozy-dark/65'
            }`}>
              <Calendar size={13} />
              <span>{journal.date}</span>
            </div>

            <h4 className={`font-serif text-2xl font-bold italic leading-snug transition-colors ${
              activeTheme === 'evening' ? 'text-[#EBE4DC] group-hover:text-cozy-warm-yellow' : 'text-cozy-dark group-hover:text-cozy-wood'
            }`}>
              {journal.title}
            </h4>

            <p className={`text-sm sm:text-base leading-relaxed font-sans transition-colors ${
              activeTheme === 'evening' ? 'text-[#EBE4DC]/80' : 'text-cozy-dark/80'
            }`}>
              {journal.excerpt}
            </p>
          </div>

          <div className={`pt-6 border-t flex items-center justify-between mt-6 ${
            activeTheme === 'evening' ? 'border-[#5A483B]/20' : 'border-cozy-wood/10'
          }`}>
            <span className={`text-sm font-bold transition-colors flex items-center gap-1 ${
              activeTheme === 'evening' ? 'text-cozy-warm-yellow group-hover:text-[#F2D7A5]' : 'text-cozy-wood group-hover:text-cozy-moss'
            }`}>
              Đọc câu chuyện &rarr;
            </span>

            {/* Tiny interaction buttons */}
            <button
              onClick={handleLike}
              className={`transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider ${
                activeTheme === 'evening' ? 'text-[#EBE4DC]/60 hover:text-red-400' : 'text-cozy-dark/60 hover:text-red-500'
              }`}
              aria-label="Thả tim bài viết"
            >
              <Heart size={15} className={isLiked ? 'text-red-500 fill-red-500' : ''} />
              <span>{isLiked ? 'Đã thích' : 'Yêu thích'}</span>
            </button>
          </div>
        </div>
      </article>

      {/* Editorial Popup Viewer Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            {/* Modal Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-[#1F1B17] backdrop-blur-sm cursor-pointer"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 20 }}
              transition={{ type: 'spring', damping: 28 }}
              className={`relative border rounded-[32px] max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl z-10 flex flex-col transition-colors duration-500 ${
                activeTheme === 'evening'
                  ? 'bg-[#1C1713] border-[#5A483B]/40 text-[#EBE4DC]'
                  : 'bg-[#FFFDF8] border-cozy-wood/5 text-cozy-dark'
              }`}
              role="dialog"
              aria-modal="true"
            >
              {/* Sticky Close Header */}
              <div className={`sticky top-0 px-6 py-4 border-b flex items-center justify-between z-10 transition-colors ${
                activeTheme === 'evening'
                  ? 'bg-[#1C1713]/95 backdrop-blur-md border-[#5A483B]/20'
                  : 'bg-[#FFFDF8]/95 backdrop-blur-md border-cozy-wood/10'
              }`}>
                <span className={`text-xs sm:text-sm uppercase tracking-widest font-bold flex items-center gap-1.5 ${
                  activeTheme === 'evening' ? 'text-cozy-warm-yellow' : 'text-cozy-moss'
                }`}>
                  <Sparkles size={13} className="text-cozy-warm-yellow fill-cozy-warm-yellow animate-spin" />
                  Góc Đọc Trải Nghiệm Chữa Lành
                </span>
                <button
                  onClick={() => setIsOpen(false)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-colors ${
                    activeTheme === 'evening' ? 'hover:bg-[#2D231D] text-[#EBE4DC]' : 'hover:bg-cozy-wood/5 text-cozy-dark'
                  }`}
                  aria-label="Đóng bài viết"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Main Content Area */}
              <div className="p-6 md:p-8 space-y-6">
                {/* Elegant typography reading cover image */}
                <div className="aspect-[21/9] w-full rounded-2xl overflow-hidden shadow-sm">
                  <img
                    src={journal.thumbnail}
                    alt={journal.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover filter brightness-[0.96]"
                  />
                </div>

                {/* Typography and Reading layout */}
                <div className="space-y-4">
                  <div className={`flex items-center gap-3 text-sm font-semibold transition-colors ${
                    activeTheme === 'evening' ? 'text-[#EBE4DC]/70' : 'text-cozy-dark/70'
                  }`}>
                    <Calendar size={14} />
                    <span>{journal.date}</span>
                    <span>•</span>
                    <span>Bởi Tan Ca Rồi Team</span>
                  </div>

                  <h3 className={`font-serif text-3xl font-bold italic leading-snug transition-colors ${
                    activeTheme === 'evening' ? 'text-[#EBE4DC]' : 'text-cozy-dark'
                  }`}>
                    {journal.title}
                  </h3>

                  <div className={`h-px ${
                    activeTheme === 'evening' ? 'bg-[#5A483B]/20' : 'bg-cozy-wood/15'
                  }`} />

                  {/* Body text paragraphs */}
                  <div className={`font-editorial text-base md:text-lg space-y-5 leading-relaxed whitespace-pre-line text-justify font-serif transition-colors ${
                    activeTheme === 'evening' ? 'text-[#EBE4DC]/95' : 'text-cozy-dark/95'
                  }`}>
                    {journal.content && journal.content.length > 0 ? (
                      journal.content.map((paragraph, idx) => (
                        <p key={idx}>{paragraph}</p>
                      ))
                    ) : (
                      <>
                        <p>
                          Cảm giác cuối ngày trở về phòng luôn mang lại một sắc thái cảm xúc rất đặc biệt. Sau 8 tiếng quay cuồng với báo cáo, họp hành, hay những chiếc email dồn dập ở văn phòng, việc có được một góc nhỏ thuộc về riêng mình là điều vô cùng quý giá.
                        </p>
                        <p>
                          “Chỉ cần chiếc bàn gọn gàng hơn một chút, đầu óc cũng có thể nhẹ nhõm hơn.” Câu nói ấy thật chẳng sai chút nào. Khi chúng ta xếp lại cây bút, lau sạch vệt nước loang trên gỗ sồi và vặn lên chiếc đèn xếp ly màu vàng dịu, căn phòng dường như bừng sáng một luồng sinh khí ấm áp khôn tả.
                        </p>
                        <p>
                          Chúng mình tạo dựng nên góc nhỏ <strong>“Tan Ca Rồi”</strong> với hy vọng mang lại cho bạn một nơi nương náu yên lành sau những ngày mệt mỏi rã rời ngoài kia. Tại đây không có những thanh âm hối hả của cuộc gọi nhỡ, không có tiếng chuông thông báo giục giã công việc. Chỉ có tiếng mưa rơi rào rạc bên bậu cửa sổ gỗ, một tách trà nhâm nhi ấm sực, và vài món đồ trang trí đơn sơ giúp ngày của bạn kết thúc theo cách trọn vẹn nhất có thể.
                        </p>
                        <p className={`italic pt-2 ${
                          activeTheme === 'evening' ? 'text-cozy-warm-yellow' : 'text-cozy-moss'
                        }`}>
                          “Hôm nay mệt rồi, mình nghỉ một chút thôi. Ngày mai chúng mình lại bước tiếp vững vàng nhé.”
                        </p>
                      </>
                    )}
                  </div>
                </div>

                {/* Footer Interaction */}
                <div className={`pt-6 border-t flex items-center justify-between ${
                  activeTheme === 'evening' ? 'border-[#5A483B]/20' : 'border-cozy-wood/5'
                }`}>
                  <button
                    onClick={handleLike}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all cursor-pointer text-xs font-medium ${
                      activeTheme === 'evening'
                        ? 'border-[#5A483B]/40 hover:border-red-400 hover:bg-red-950/20 text-[#EBE4DC]'
                        : 'border-cozy-wood/10 hover:border-red-200 hover:bg-red-50/30 text-cozy-dark'
                    }`}
                  >
                    <Heart size={14} className={isLiked ? 'text-red-500 fill-red-500' : activeTheme === 'evening' ? 'text-[#EBE4DC]/50' : 'text-cozy-dark/50'} />
                    <span>{isLiked ? 'Cảm ơn bạn đã thả tim!' : 'Thả tim bài viết'}</span>
                  </button>

                  <a
                    href={journal.mediaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-1 text-xs font-semibold underline ${
                      activeTheme === 'evening' ? 'text-cozy-warm-yellow hover:text-[#F2D7A5]' : 'text-cozy-wood hover:text-cozy-moss'
                    }`}
                  >
                    Ghé thăm Tan Ca Rồi &rarr;
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
