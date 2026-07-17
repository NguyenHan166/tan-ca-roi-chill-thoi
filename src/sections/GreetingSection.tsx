import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Coffee, Compass, Sun, Moon, Sunrise, Sunset, Sparkles, Check, CheckCircle2 } from 'lucide-react';
import { TimeTheme } from '../types';

interface GreetingSectionProps {
  activeTheme: TimeTheme;
}

interface ChecklistItem {
  id: string;
  text: string;
}

export const GreetingSection: React.FC<GreetingSectionProps> = ({ activeTheme }) => {
  const [completedItems, setCompletedItems] = useState<Record<string, boolean>>({});
  const [score, setScore] = useState(0);

  // Clear completed checklist when theme changes, so users can experience each theme freshly!
  useEffect(() => {
    setCompletedItems({});
  }, [activeTheme]);

  const toggleCheck = (id: string) => {
    setCompletedItems(prev => {
      const nextState = !prev[id];
      if (nextState) {
        setScore(s => s + 1);
      } else {
        setScore(s => Math.max(0, s - 1));
      }
      return { ...prev, [id]: nextState };
    });
  };

  // Theme content configurations
  const themeData = {
    morning: {
      badge: 'Bình minh trong veo',
      badgeIcon: <Sunrise size={13} className="text-yellow-500 animate-pulse" />,
      title: (
        <>
          Chào sớm mai trong trẻo,<br />
          <span className="font-serif italic font-light text-cozy-moss">tách cà phê ấm áp đã sẵn sàng rọi nắng.</span>
        </>
      ),
      description: 'Khi bình minh xua tan màn sương sớm, chiếc bàn nhỏ đón lấy từng vệt nắng tinh khôi khẽ lướt qua các thớ gỗ sồi dẻo dai. Đây chính là khoảnh khắc tuyệt vời để bạn tĩnh tâm, nạp đầy nguồn năng lượng thanh khiết lành mạnh cho ngày dài.',
      checklist: [
        { id: 'morning-1', text: 'Pha một tách cà phê phin đắng nhẹ hoặc ly trà lài nóng ☕' },
        { id: 'morning-2', text: 'Hé cửa sổ đón lấy gió trời mát dịu và ánh ban mai ☀️' },
        { id: 'morning-3', text: 'Hít sâu một hơi trong 5 giây để làm sạch tinh thần 🌱' }
      ],
      congrats: 'Sớm mai đầy năng lượng! Chúc bạn gặt hái nhiều niềm vui thanh bình hôm nay nhé.'
    },
    afternoon: {
      badge: 'Nắng chiều vàng nhạt',
      badgeIcon: <Sunset size={13} className="text-orange-400 animate-bounce-slow" />,
      title: (
        <>
          Một buổi chiều an yên,<br />
          <span className="font-serif italic font-light text-cozy-clay">trút hết mỏi mệt bên hương trà lài dìu dặt.</span>
        </>
      ),
      description: 'Vạt nắng hoàng hôn óng ả màu hổ phách rót dốc nghiêng bên ô cửa. Đừng hối hả quá bạn ơi, hãy dừng lại dăm ba phút, nhâm nhi một cốc trà chiều thơm ngát, vươn vai thư giãn để dọn dẹp lại những xao động chất chồng trong trí óc.',
      checklist: [
        { id: 'afternoon-1', text: 'Đứng dậy vươn vai dãn mỏi cơ vai gáy sau hàng giờ gõ máy 🧘‍♀️' },
        { id: 'afternoon-2', text: 'Nhấp một ngụm trà mật ong gừng sả làm dịu cổ họng 🍯' },
        { id: 'afternoon-3', text: 'Bật bản nhạc cafe jazz dìu dặt cho căn phòng ngập nắng 🎵' }
      ],
      congrats: 'Tuyệt lắm! Năng lượng ban chiều đã được tái tạo hoàn mỹ. Thong thả tận hưởng nhé.'
    },
    evening: {
      badge: 'Đêm phòng trà thầm lặng',
      badgeIcon: <Moon size={13} className="text-indigo-300 animate-pulse" />,
      title: (
        <>
          Ngoài kia ồn ào giông bão quá,<br />
          <span className="font-serif italic font-light text-cozy-warm-yellow/90">ở đây mình thắp nến ấm áp, bình yên thôi.</span>
        </>
      ),
      description: 'Thành phố lên đèn lộng lẫy, dòng xe cộ hối hả rủ nhau về nhà. Hãy khép hờ ô cửa sổ gỗ sồi rêu phong, vặn nhỏ chiếc đèn bàn vàng êm dịu. Góc trú ẩn này được sinh ra để che chở bạn khỏi những deadline ngột ngạt và lo toan tan sở.',
      checklist: [
        { id: 'evening-1', text: 'Tắt hết các thông báo từ các ứng dụng làm việc bận rộn 📴' },
        { id: 'evening-2', text: 'Vặn nhỏ đèn sồi ấm, bật một ngọn nến hương sả gỗ thông bập bùng 🕯️' },
        { id: 'evening-3', text: 'Rót cốc nước ấm nhẹ nhàng ngâm chân hoặc xoa dịu đôi bàn tay 👣' }
      ],
      congrats: 'Cảm ơn vì đã kiên cường vượt qua ngày dài. Đêm nay, chúc chiếc tổ nhỏ vỗ về giấc ngủ ngon của bạn.'
    }
  }[activeTheme];

  // Calculate percentage of checklist completed
  const totalChecklist = themeData.checklist.length;
  const completedCount = themeData.checklist.filter(item => completedItems[item.id]).length;
  const isAllDone = completedCount === totalChecklist;

  return (
    <section
      id="greeting-intro"
      className={`py-28 md:py-40 px-6 md:px-12 border-y relative overflow-hidden transition-all duration-[1200ms] bg-grain ${
        activeTheme === 'evening'
          ? 'bg-[#221A16]/50 border-[#5A483B]/20 text-[#EBE4DC]'
          : 'bg-cozy-cream/15 border-cozy-wood/5 text-cozy-dark'
      }`}
    >
      {/* Delicate floating background lights */}
      <AnimatePresence mode="wait">
        {activeTheme === 'morning' && (
          <motion.div
            key="morning-glow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute top-1/4 left-1/10 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"
          />
        )}
        {activeTheme === 'afternoon' && (
          <motion.div
            key="afternoon-glow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute bottom-1/4 right-1/10 w-80 h-80 bg-orange-400/5 rounded-full blur-3xl pointer-events-none"
          />
        )}
        {activeTheme === 'evening' && (
          <motion.div
            key="evening-glow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute top-1/3 right-1/4 w-80 h-80 bg-yellow-600/10 rounded-full blur-3xl pointer-events-none"
          />
        )}
      </AnimatePresence>

      <div className="max-w-4xl mx-auto space-y-12 relative z-10 text-center">
        
        {/* Dynamic Badge with spring transition */}
        <motion.div 
          layout
          className={`inline-flex items-center gap-2.5 tracking-[0.2em] text-[10px] font-bold uppercase py-1.5 px-4 rounded-full border transition-all duration-500 ${
            activeTheme === 'evening'
              ? 'bg-[#2D231D]/50 border-[#5A483B]/40 text-cozy-warm-yellow'
              : 'bg-cozy-ivory/80 border-cozy-wood/10 text-cozy-moss'
          }`}
        >
          {themeData.badgeIcon}
          <span>{themeData.badge}</span>
        </motion.div>

        {/* Cinematic typography quote */}
        <div className="space-y-6">
          <motion.h2
            key={activeTheme + '-title'}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className={`font-serif text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-[1.3] text-balance`}
          >
            {themeData.title}
          </motion.h2>
        </div>

        {/* Narrative text with high-end typesetting */}
        <motion.p
          key={activeTheme + '-desc'}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className={`max-w-2xl mx-auto text-sm sm:text-base leading-relaxed font-serif italic border-l-2 sm:border-l-0 pl-4 sm:pl-0 text-center transition-colors duration-500 ${
            activeTheme === 'evening' ? 'text-[#EBE4DC]/80 border-[#5A483B]/30' : 'text-cozy-dark/80 border-cozy-wood/10'
          }`}
        >
          {themeData.description}
        </motion.p>

        {/* INTERACTIVE COMPONENT: Vibe Checklist Activity Planner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`max-w-lg mx-auto border rounded-3xl p-6 text-left transition-all duration-500 shadow-md ${
            activeTheme === 'evening'
              ? 'bg-[#241D19]/60 border-[#5A483B]/40 text-[#EBE4DC]'
              : 'bg-cozy-ivory border-cozy-wood/10 text-cozy-dark'
          }`}
        >
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-cozy-wood/5">
            <div className="flex items-center gap-2">
              <Sparkles size={16} className={activeTheme === 'evening' ? 'text-cozy-warm-yellow' : 'text-cozy-moss'} />
              <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider font-sans">
                Hoạt động sạc năng lượng ({completedCount}/{totalChecklist})
              </h3>
            </div>
            
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full font-mono ${
              isAllDone 
                ? 'bg-emerald-500/20 text-emerald-400' 
                : activeTheme === 'evening' ? 'bg-[#1C1713] text-[#EBE4DC]/60' : 'bg-cozy-cream text-cozy-wood/80'
            }`}>
              {isAllDone ? 'HOÀN THÀNH CHILL!' : 'ĐANG THỰC HIỆN'}
            </span>
          </div>

          <p className={`text-xs italic mb-4 leading-relaxed font-serif transition-colors ${
            activeTheme === 'evening' ? 'text-[#EBE4DC]/60' : 'text-cozy-dark/60'
          }`}>
            Hãy dành một phút chậm lại, click chọn hoạt động bạn vừa thực hiện dưới đây để tự vỗ về bản thân:
          </p>

          <div className="space-y-3">
            {themeData.checklist.map((item) => {
              const checked = !!completedItems[item.id];
              return (
                <button
                  key={item.id}
                  onClick={() => toggleCheck(item.id)}
                  className={`w-full flex items-start gap-3 p-3 rounded-2xl text-left text-xs transition-all cursor-pointer ${
                    checked
                      ? activeTheme === 'evening'
                        ? 'bg-emerald-950/20 border border-emerald-500/30 text-emerald-300'
                        : 'bg-emerald-50 border border-emerald-300/30 text-emerald-800'
                      : activeTheme === 'evening'
                        ? 'bg-[#1C1713] border border-[#5A483B]/20 hover:bg-[#2D231D]'
                        : 'bg-cozy-cream/30 border border-cozy-wood/5 hover:bg-cozy-cream/60'
                  }`}
                >
                  <div className={`mt-0.5 shrink-0 w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                    checked
                      ? 'bg-emerald-500 border-emerald-500 text-white'
                      : activeTheme === 'evening' ? 'border-[#5A483B]/60' : 'border-cozy-wood/30'
                  }`}>
                    {checked && <Check size={11} className="stroke-[3]" />}
                  </div>
                  <span className={`leading-relaxed font-medium ${checked ? 'line-through opacity-75' : ''}`}>
                    {item.text}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Success Banner when checklist is complete */}
          <AnimatePresence>
            {isAllDone && (
              <motion.div
                initial={{ opacity: 0, y: 10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: 10, height: 0 }}
                className="mt-4 pt-4 border-t border-emerald-500/20"
              >
                <div className={`p-3 rounded-xl flex items-center gap-2 text-xs leading-relaxed font-sans font-medium ${
                  activeTheme === 'evening' ? 'bg-emerald-950/20 text-emerald-400' : 'bg-emerald-50 text-emerald-700'
                }`}>
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                  <span>{themeData.congrats}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Minimalist assurance badge */}
        <div className={`pt-4 flex items-center justify-center gap-2 text-[10px] sm:text-xs uppercase tracking-widest font-bold border rounded-full py-2.5 px-6 max-w-sm mx-auto transition-all duration-500 ${
          activeTheme === 'evening'
            ? 'bg-[#241D19]/80 border-[#5A483B]/40 text-cozy-warm-yellow/90'
            : 'bg-cozy-ivory/50 backdrop-blur-sm border-cozy-wood/10 text-cozy-moss'
        }`}>
          <Compass size={14} />
          <span>Cam kết: Nội dung thấu cảm • Không quảng cáo phiền nhiễu</span>
        </div>
      </div>
    </section>
  );
};
