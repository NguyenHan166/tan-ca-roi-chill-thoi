import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Compass, Heart, Camera, Coffee, Moon, Sun, ChevronRight } from 'lucide-react';
import { TimeTheme } from '../types';

interface MyDeskShowcaseProps {
  onToast: (msg: string, type: 'info' | 'success' | 'heart' | 'error') => void;
  activeTheme: TimeTheme;
}

interface DeskAngle {
  id: string;
  name: string;
  timeOfDay: string;
  image: string;
  icon: React.ReactNode;
  mainQuote: string;
  tagline: string;
  bullets: string[];
  ambientSoundName: string;
}

const deskAngles: DeskAngle[] = [
  {
    id: 'sunset',
    name: 'Góc Hoàng Hôn Ấm Áp',
    timeOfDay: 'Chiều muộn buông nắng',
    image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=800&auto=format&fit=crop',
    icon: <Sun size={16} className="text-orange-400" />,
    mainQuote: '“ Đây là chốn bình yên của mình. Nơi deadline khép lại, ngọn đèn sồi bật lên và những ước mơ mộc mạc bắt đầu bay bổng. ”',
    tagline: 'Khi nắng vàng cam lịm dần sau những tòa cao ốc, góc nhỏ này luôn đợi mình về gác lại mọi băn khoăn.',
    bullets: [
      'Ánh sáng vàng dịu từ chiếc đèn bàn phản chiếu thớ gỗ sồi mộc mạc',
      'Tách trà hoa cúc tỏa hơi ấm sương mờ sưởi ấm đôi bàn tay gõ phím',
      'Một bản nhạc Lofi lững lờ cuốn trôi đi tiếng còi xe vội vã dưới phố thị'
    ],
    ambientSoundName: 'Bản nhạc Lofi hoàng hôn'
  },
  {
    id: 'rainy',
    name: 'Góc Đêm Mưa Tĩnh Lặng',
    timeOfDay: 'Tối muộn hiên nhà rơi mưa',
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=800&auto=format&fit=crop',
    icon: <Moon size={16} className="text-indigo-300" />,
    mainQuote: '“ Chiếc tổ nhỏ ẩn náu khỏi giông bão cuộc đời. Tiếng mưa dội lên mái hiên cũng là lúc tâm hồn mình được vỗ về dịu dàng nhất. ”',
    tagline: 'Bất kể ngoài kia mưa rào trắng lối, căn phòng nhỏ này vẫn thắp lên ngọn nến thơm thảo mộc ấm áp.',
    bullets: [
      'Ngọn nến thơm hương gỗ thông bập bùng khơi dậy từng góc ký ức êm đềm',
      'Mưa rỉ rả gõ nhịp ngoài cửa kính tạo thành bản nhạc nền thiên nhiên du dương',
      'Cuốn sổ tay mở sẵn, nơi mình tự do viết nên những dòng tâm tư chân thật nhất'
    ],
    ambientSoundName: 'Mưa rơi hiên nhà cũ'
  },
  {
    id: 'morning',
    name: 'Góc Sáng Mai Tối Giản',
    timeOfDay: 'Bình minh trong trẻo',
    image: 'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?q=80&w=800&auto=format&fit=crop',
    icon: <Coffee size={16} className="text-emerald-400" />,
    mainQuote: '“ Tối giản không gian để dọn dẹp tâm trí. Chỉ một nhành cây xanh mướt và tách đen nóng là đủ thắp sáng cả một ngày dài tích cực. ”',
    tagline: 'Bớt đi những chi tiết dư thừa, nhường chỗ cho sự tập trung và những ý tưởng mượt mà tuôn trào.',
    bullets: [
      'Chậu cây nhỏ đón lấy giọt nắng sớm trong trẻo, mang sức sống ngập tràn',
      'Tách cà phê phin nguyên chất đắng nhẹ đánh thức từng tế bào sáng tạo',
      'Sự ngăn nắp, tinh tươm giúp tháo gỡ những rối rắm trong suy nghĩ'
    ],
    ambientSoundName: 'Cà phê sáng dịu lành'
  }
];

export const MyDeskShowcase: React.FC<MyDeskShowcaseProps> = ({ activeTheme, onToast }) => {
  const [activeAngleIdx, setActiveAngleIdx] = useState(0);
  const [likesCount, setLikesCount] = useState<Record<string, number>>({
    sunset: 42,
    rainy: 56,
    morning: 31
  });
  const [hasLiked, setHasLiked] = useState<Record<string, boolean>>({});

  // Auto sync desk angle when header activeTheme changes!
  useEffect(() => {
    if (activeTheme === 'morning') {
      setActiveAngleIdx(2); // Morning desk
    } else if (activeTheme === 'afternoon') {
      setActiveAngleIdx(0); // Sunset desk
    } else if (activeTheme === 'evening') {
      setActiveAngleIdx(1); // Night rain desk
    }
  }, [activeTheme]);

  const activeAngle = deskAngles[activeAngleIdx];

  const handleAngleChange = (idx: number) => {
    setActiveAngleIdx(idx);
    onToast(`Chuyển góc nhìn: ${deskAngles[idx].name} 📸`, 'info');
  };

  const handleLikeAngle = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasLiked[id]) {
      setLikesCount(prev => ({ ...prev, [id]: prev[id] - 1 }));
      setHasLiked(prev => ({ ...prev, [id]: false }));
    } else {
      setLikesCount(prev => ({ ...prev, [id]: prev[id] + 1 }));
      setHasLiked(prev => ({ ...prev, [id]: true }));
      onToast(`Bạn đã thả tim góc này! Cảm ơn sự đồng điệu nhé ❤️`, 'heart');
    }
  };

  return (
    <div className={`w-full border rounded-3xl p-6 md:p-10 flex flex-col gap-10 shadow-md relative overflow-hidden bg-grain transition-all duration-[1200ms] ${
      activeTheme === 'evening'
        ? 'bg-[#241D19]/60 border-[#5A483B]/40 text-[#EBE4DC]'
        : 'bg-cozy-ivory border-cozy-wood/15 text-cozy-dark'
    }`}>
      
      {/* Decorative top title section */}
      <div className="text-center max-w-xl mx-auto space-y-3">
        <span className={`text-xs sm:text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-1.5 transition-colors ${
          activeTheme === 'evening' ? 'text-cozy-warm-yellow' : 'text-cozy-moss'
        }`}>
          <Sparkles size={14} className="text-cozy-warm-yellow fill-cozy-warm-yellow" />
          KHÔNG GIAN TRẢI NGHIỆM TƯƠNG TÁC
        </span>
        <h3 className={`font-serif text-3xl md:text-4xl font-semibold transition-colors ${
          activeTheme === 'evening' ? 'text-[#EBE4DC]' : 'text-cozy-dark'
        }`}>
          Góc Nhỏ Bình Yên Của Tụi Mình
        </h3>
        <p className={`text-sm md:text-base leading-relaxed font-sans max-w-lg mx-auto transition-colors ${
          activeTheme === 'evening' ? 'text-[#EBE4DC]/80' : 'text-cozy-dark/85'
        }`}>
          Mỗi bức ảnh dưới đây đại diện cho một góc bàn làm việc thực tế nơi tụi mình thả neo tâm hồn sau những giờ tan ca hối hả. Hãy chạm để thay đổi góc nhìn và lắng nghe những câu chuyện thầm lặng nhé.
        </p>
      </div>

      {/* Switcher Buttons */}
      <div className="flex flex-wrap justify-center items-center gap-3 max-w-3xl mx-auto">
        {deskAngles.map((angle, idx) => {
          const isActive = activeAngleIdx === idx;
          return (
            <button
              key={angle.id}
              onClick={() => handleAngleChange(idx)}
              className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-500 flex items-center gap-2 cursor-pointer border ${
                isActive
                  ? activeTheme === 'evening'
                    ? 'bg-cozy-warm-yellow border-cozy-warm-yellow text-[#181310] shadow-md -translate-y-0.5 font-bold'
                    : 'bg-cozy-wood border-cozy-wood text-[#FFFDF8] shadow-md -translate-y-0.5 font-bold'
                  : activeTheme === 'evening'
                    ? 'bg-[#1C1713] border-[#5A483B]/30 text-[#EBE4DC]/80 hover:bg-[#2D231D]'
                    : 'bg-cozy-cream/30 border-cozy-wood/15 text-cozy-dark hover:bg-cozy-cream/60'
              }`}
            >
              {angle.icon}
              <span>{angle.name}</span>
            </button>
          );
        })}
      </div>

      {/* 2-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Left Column: Image Container with rich tilt / lift hover animation */}
        <div className="lg:col-span-6 flex flex-col items-center">
          <div className="w-full max-w-md relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeAngle.id}
                initial={{ opacity: 0, scale: 0.96, rotate: -1 }}
                animate={{ opacity: 1, scale: 1, rotate: 1 }}
                exit={{ opacity: 0, scale: 0.96, rotate: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="w-full"
              >
                {/* Polaroid Frame Container */}
                <div className={`border rounded-3xl p-4 sm:p-5 shadow-xl hover:shadow-2xl transition-all duration-500 group cursor-pointer relative overflow-hidden ${
                  activeTheme === 'evening'
                    ? 'bg-[#1C1713] border-[#5A483B]/40 hover:border-cozy-warm-yellow/50'
                    : 'bg-[#FCFAF2] border-cozy-wood/20 hover:border-cozy-wood/35'
                }`}>
                  
                  {/* Hover visual overlay to simulate lens flare or warm dust particles */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-orange-400/0 via-white/0 to-orange-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10" />

                  {/* Image wrapper with zoom-on-hover effect */}
                  <div className={`aspect-[4/3] rounded-2xl overflow-hidden relative border ${
                    activeTheme === 'evening' ? 'bg-[#241D19] border-[#5A483B]/20' : 'bg-cozy-cream border-cozy-wood/10'
                  }`}>
                    <motion.img
                      src={activeAngle.image}
                      alt={activeAngle.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                    />
                    
                    {/* Tiny Camera badge on photo */}
                    <div className="absolute top-3 right-3 bg-cozy-dark/70 backdrop-blur-md border border-white/10 text-white rounded-full px-2.5 py-1 text-[9px] font-mono tracking-widest uppercase flex items-center gap-1">
                      <Camera size={10} className="text-cozy-warm-yellow" />
                      <span>{activeAngle.timeOfDay}</span>
                    </div>
                  </div>

                  {/* Bottom section of the Polaroid - handwritten title and heart trigger */}
                  <div className="pt-4 flex items-center justify-between">
                    <div>
                      <p className={`font-serif italic text-base font-bold transition-colors ${
                        activeTheme === 'evening' ? 'text-cozy-warm-yellow' : 'text-cozy-dark'
                      }`}>
                        — {activeAngle.name}
                      </p>
                      <p className={`text-[10px] sm:text-xs font-sans tracking-wide transition-colors ${
                        activeTheme === 'evening' ? 'text-[#EBE4DC]/50' : 'text-cozy-dark/50'
                      }`}>
                        Ảnh thực tế được chụp bằng máy phim cơ
                      </p>
                    </div>

                    {/* Interactive Heart Badge */}
                    <button
                      onClick={(e) => handleLikeAngle(activeAngle.id, e)}
                      className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full border transition-all duration-300 cursor-pointer ${
                        hasLiked[activeAngle.id]
                          ? 'bg-red-500 border-red-500 text-white font-bold'
                          : activeTheme === 'evening'
                            ? 'bg-[#241D19] border-[#5A483B]/40 text-[#EBE4DC]/60 hover:text-red-400 hover:border-red-400'
                            : 'bg-cozy-cream/30 border-cozy-wood/10 text-cozy-dark/60 hover:border-red-200 hover:text-red-500'
                      }`}
                    >
                      <Heart 
                        size={14} 
                        className={`transition-transform duration-300 ${
                          hasLiked[activeAngle.id] ? 'scale-110 text-white fill-white' : 'group-hover:scale-110'
                        }`} 
                      />
                      <span className="text-xs font-mono font-bold">
                        {likesCount[activeAngle.id]}
                      </span>
                    </button>
                  </div>

                </div>
              </motion.div>
            </AnimatePresence>

            {/* Aesthetic wooden photo easel stands beneath */}
            <div className="absolute -bottom-2 left-1/4 w-12 h-2.5 bg-cozy-wood/20 rounded-full blur-sm" />
            <div className="absolute -bottom-2 right-1/4 w-12 h-2.5 bg-cozy-wood/20 rounded-full blur-sm" />
          </div>
        </div>

        {/* Right Column: Poetic and comfortable quotes and bullet points */}
        <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeAngle.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              {/* Cozy Header Subtitle */}
              <div className="space-y-1">
                <span className={`text-xs font-mono uppercase tracking-widest font-bold transition-colors ${
                  activeTheme === 'evening' ? 'text-cozy-warm-yellow' : 'text-cozy-moss'
                }`}>
                  Lời nhắn từ chiếc góc nhỏ
                </span>
                <h4 className={`font-serif text-xl sm:text-2xl font-semibold italic transition-colors ${
                  activeTheme === 'evening' ? 'text-[#EBE4DC]' : 'text-cozy-dark'
                }`}>
                  {activeAngle.timeOfDay}
                </h4>
              </div>

              {/* Main quote callout - elegant serif displayed beautifully */}
              <p className={`font-serif text-xl sm:text-2xl leading-relaxed font-bold border-l-4 pl-5 text-justify italic transition-colors ${
                activeTheme === 'evening' ? 'text-[#EBE4DC] border-cozy-warm-yellow/40' : 'text-cozy-dark border-cozy-wood/30'
              }`}>
                {activeAngle.mainQuote}
              </p>

              {/* Tagline text block */}
              <p className={`text-sm sm:text-base leading-relaxed font-sans text-justify transition-colors ${
                activeTheme === 'evening' ? 'text-[#EBE4DC]/80' : 'text-cozy-dark/85'
              }`}>
                {activeAngle.tagline}
              </p>

              {/* Curated list points detailing what makes it peaceful */}
              <div className="space-y-3 pt-2">
                <p className={`text-xs uppercase tracking-widest font-mono font-bold transition-colors ${
                  activeTheme === 'evening' ? 'text-[#EBE4DC]/50' : 'text-cozy-dark/50'
                }`}>
                  Chi tiết nâng niu giác quan:
                </p>
                {activeAngle.bullets.map((bullet, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <span className="text-base leading-none select-none mt-1 shrink-0">
                      <ChevronRight size={14} className={activeTheme === 'evening' ? 'text-cozy-warm-yellow' : 'text-cozy-wood'} />
                    </span>
                    <p className={`text-sm sm:text-base font-sans transition-colors ${
                      activeTheme === 'evening' ? 'text-[#EBE4DC]/80' : 'text-cozy-dark/80'
                    }`}>
                      {bullet}
                    </p>
                  </div>
                ))}
              </div>

              {/* Quick music integration block */}
              <div className={`border rounded-2xl p-4 flex items-center gap-4.5 mt-4 transition-all duration-500 ${
                activeTheme === 'evening'
                  ? 'bg-cozy-warm-yellow/5 border-cozy-warm-yellow/20'
                  : 'bg-cozy-moss/5 border-cozy-moss/10'
              }`}>
                <span className="text-2xl">📻</span>
                <div className="space-y-0.5">
                  <p className={`text-[10px] font-mono uppercase leading-none ${
                    activeTheme === 'evening' ? 'text-[#EBE4DC]/50' : 'text-cozy-dark/50'
                  }`}>Tần số đề xuất phát kèm:</p>
                  <p className={`text-xs sm:text-sm font-bold mt-1 transition-colors ${
                    activeTheme === 'evening' ? 'text-[#EBE4DC]' : 'text-cozy-dark'
                  }`}>
                    Góc này phát cùng bản <span className={`font-bold underline ${
                      activeTheme === 'evening' ? 'text-cozy-warm-yellow' : 'text-cozy-moss'
                    }`}>{activeAngle.ambientSoundName}</span> là trọn vẹn nhất.
                  </p>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

      </div>

    </div>
  );
};
