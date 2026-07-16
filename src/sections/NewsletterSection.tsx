import React, { useState } from 'react';
import { Mail, Sparkles, Send } from 'lucide-react';
import { saveSubscription } from '../lib/localStorage';
import { motion, AnimatePresence } from 'motion/react';

interface NewsletterSectionProps {
  onToast: (msg: string, type: 'info' | 'success' | 'heart' | 'error') => void;
}

export const NewsletterSection: React.FC<NewsletterSectionProps> = ({ onToast }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Basic validation
    if (!email) {
      onToast('Vui lòng nhập địa chỉ email của bạn nhé.', 'error');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      onToast('Email không đúng định dạng rồi, hãy kiểm tra lại nhé.', 'error');
      return;
    }

    // 2. Mock loading transition
    setIsLoading(true);
    onToast('Đang đóng dấu sáp niêm phong thư...', 'info');

    setTimeout(() => {
      saveSubscription(email);
      setIsLoading(false);
      setIsSubscribed(true);
      setEmail('');
      onToast('Đã ghi tên bạn vào danh sách nhận thư tay đầu tuần. Hẹn gặp bạn nhé!', 'success');
    }, 1500);
  };

  return (
    <section
      id="newsletter-section"
      className="py-32 md:py-48 px-6 md:px-12 bg-cozy-cream/30 border-b border-cozy-wood/5 relative overflow-hidden bg-grain"
    >
      {/* Decorative ambient blobs */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 rounded-full bg-cozy-warm-yellow/5 blur-[130px] -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-4 right-1/4 w-96 h-96 rounded-full bg-cozy-moss/5 blur-[130px] pointer-events-none" />

      <div className="max-w-3xl mx-auto text-center relative z-10 space-y-10">
        
        {/* Floating post symbol */}
        <div className="flex items-center justify-center gap-2 text-cozy-wood/60 tracking-[0.25em] text-[10px] font-bold uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-cozy-wood/30" />
          <span>Hòm thư gõ cửa</span>
          <span className="w-1.5 h-1.5 rounded-full bg-cozy-wood/30" />
        </div>

        {/* Poetic Title Block */}
        <div className="space-y-4">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-cozy-dark leading-tight text-balance">
            Thỉnh thoảng, mình viết cho nhau <br />
            <span className="font-serif italic font-light text-cozy-wood">vài dòng thư tay mộc mạc.</span>
          </h2>
          <p className="text-sm sm:text-base text-cozy-dark/80 max-w-lg mx-auto leading-relaxed">
            Không có thư rác hay những dòng thông báo khuyến mãi ồn ào. Chỉ có những lời kể chuyện mộc mạc bên ánh lửa, vài playlist lofi tuyển lựa cho đêm mưa, hay gợi ý những món đồ gỗ mộc khiến căn phòng của bạn ấm cúng hơn.
          </p>
        </div>

        {/* Elegant Minimalist Input Block */}
        <div className="max-w-md mx-auto pt-4">
          <AnimatePresence mode="wait">
            {!isSubscribed ? (
              <motion.form
                key="subscribe-form"
                initial={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row items-stretch gap-4 bg-transparent p-0"
              >
                <div className="flex-1 flex items-center gap-3 border-b border-cozy-wood/30 pb-2 px-1 focus-within:border-cozy-wood transition-colors">
                  <Mail size={16} className="text-cozy-dark/50" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Địa chỉ hòm thư của bạn..."
                    className="w-full bg-transparent text-sm text-cozy-dark font-semibold focus:outline-none placeholder-cozy-dark/35 font-sans py-2"
                    disabled={isLoading}
                    aria-label="Địa chỉ email đăng ký nhận thư tay"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-6 py-3.5 rounded-full bg-cozy-wood hover:bg-cozy-moss text-[#FFFDF8] text-xs font-bold uppercase tracking-wider transition-all duration-500 flex items-center justify-center gap-1.5 shadow-xl shadow-cozy-wood/10 active:scale-97 disabled:opacity-50 cursor-pointer shrink-0"
                >
                  {isLoading ? (
                    <>
                      <span className="w-3 h-3 rounded-full border-2 border-cozy-ivory border-t-transparent animate-spin" />
                      Đang đóng dấu sáp...
                    </>
                  ) : (
                    <>
                      Gửi gắm bình yên <Send size={13} />
                    </>
                  )}
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="subscription-success"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 bg-[#FFFDF8] border border-cozy-wood/10 rounded-[24px] shadow-2xl shadow-cozy-dark/5"
              >
                <h3 className="font-serif text-lg font-bold text-cozy-wood italic mb-2">
                  Đã niêm phong hòm thư của bạn!
                </h3>
                <p className="text-sm text-cozy-dark/80 leading-relaxed font-sans">
                  Một sợi dây tơ đã nối liền hòm thư của chúng ta. Tụi mình sẽ gửi đi lá thư tay đầu tiên cùng playlist xoa dịu đôi mắt mỏi mệt sớm thôi. Đôi khi thư có thể lơ đãng lạc vào thư mục quảng cáo (Promotions) hoặc Spam, hãy kiểm tra giúp tụi mình nhé.
                </p>
                <button
                  onClick={() => setIsSubscribed(false)}
                  className="mt-5 text-xs font-bold uppercase tracking-wider text-cozy-moss hover:underline cursor-pointer"
                >
                  Gửi lá thư khác &rarr;
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Minimalist note */}
        <p className="text-xs text-cozy-dark/50 uppercase tracking-wider font-mono">
          * Hoàn toàn phi lợi nhuận • Huỷ đăng ký bất cứ lúc nào
        </p>
      </div>
    </section>
  );
};
