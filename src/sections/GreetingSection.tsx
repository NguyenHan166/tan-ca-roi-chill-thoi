import React from 'react';
import { motion } from 'motion/react';
import { Coffee, Compass } from 'lucide-react';

export const GreetingSection: React.FC = () => {
  return (
    <section
      id="greeting-intro"
      className="py-32 md:py-48 px-6 md:px-12 bg-cozy-cream/20 border-y border-cozy-wood/5 relative overflow-hidden bg-grain"
    >
      {/* Delicate floating background lights */}
      <div className="absolute top-1/4 left-1/10 w-48 h-48 bg-cozy-moss/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 w-64 h-64 bg-cozy-warm-yellow/5 rounded-full blur-3xl pointer-events-none" style={{ animationDelay: '2s' }} />

      <div className="max-w-3xl mx-auto space-y-12 relative z-10 text-center">
        
        {/* Small floating badge */}
        <div className="flex items-center justify-center gap-3 text-cozy-wood/60 tracking-[0.25em] text-[10px] font-bold uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-cozy-moss animate-pulse" />
          <span>Lời ngỏ thầm lặng</span>
          <span className="w-1.5 h-1.5 rounded-full bg-cozy-moss animate-pulse" />
        </div>

        {/* Cinematic typography quote */}
        <div className="space-y-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1 }}
            className="font-serif text-3xl sm:text-4xl md:text-6xl font-semibold text-cozy-dark tracking-tight leading-[1.25] text-balance"
          >
            Ngoài kia ồn ào quá,<br />
            <span className="font-serif italic font-light text-cozy-wood">ở đây mình bình yên thôi.</span>
          </motion.h2>
        </div>

        {/* Narrative text with high-end typesetting */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, delay: 0.3 }}
          className="max-w-2xl mx-auto space-y-6 text-sm sm:text-base text-cozy-dark/75 leading-relaxed font-serif italic text-left sm:text-center pl-4 border-l-2 border-cozy-wood/10 sm:border-l-0 sm:pl-0"
        >
          <p>
            Chúng mình xây dựng <strong>“Tan Ca Rồi”</strong> không nhằm mục đích thương mại hối hả. Nơi này đơn giản là một chiếc tổ trốn nho nhỏ nằm nép mình bên hiên phố, giúp bạn trút bỏ những dòng deadline hay chồng tài liệu sau một ngày làm việc dài mỏi mệt.
          </p>
          <p className="text-sm sm:text-base text-cozy-dark/80 font-sans not-italic leading-relaxed">
            Nhấp môi một tách trà thơm, bật bản nhạc không lời dìu dặt, ngắm nhìn chiếc đèn bàn tỏa ra thứ ánh sáng ấm áp bao phủ lên những góc gỗ mộc mạc. Mọi thứ xuất hiện ở đây đều đã được tụi mình tự tay trải nghiệm, yêu mến và muốn san sẻ lại cho bạn.
          </p>
        </motion.div>

        {/* Minimalist assurance badge */}
        <div className="pt-6 flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-cozy-moss font-bold bg-cozy-ivory/50 backdrop-blur-sm border border-cozy-wood/10 rounded-full py-2.5 px-6 max-w-sm mx-auto">
          <Compass size={14} className="text-cozy-moss" />
          <span>Cam kết: Nội dung thấu cảm • Không quảng cáo phiền nhiễu</span>
        </div>
      </div>
    </section>
  );
};
