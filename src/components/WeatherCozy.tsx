import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CloudRain, 
  CloudLightning, 
  Wind, 
  CloudFog, 
  Sunset, 
  Thermometer, 
  MapPin, 
  Sparkles, 
  Sun, 
  Coffee, 
  BookOpen, 
  Music, 
  Compass, 
  Flame,
  Lightbulb
} from 'lucide-react';

interface WeatherCozyProps {
  onToast: (msg: string, type: 'info' | 'success' | 'heart' | 'error') => void;
}

interface CityWeather {
  id: string;
  name: string;
  temp: number;
  condition: 'rainy' | 'windy' | 'misty' | 'sunset' | 'drizzle';
  conditionName: string;
  description: string;
  advice: string;
  activity: string;
  musicType: string;
  backgroundClass: string;
}

const citiesData: CityWeather[] = [
  {
    id: 'saigon',
    name: 'Sài Gòn',
    temp: 29,
    condition: 'rainy',
    conditionName: 'Chiều mưa rào mùa hạ',
    description: 'Cơn mưa rào bất chợt xua tan cái nắng hanh hao của ngày dài, dội mát những con hẻm nhỏ loang lổ ánh đèn đường.',
    advice: 'Rất thích hợp để bạn khép hờ ô cửa kính, thắp một ngọn nến thơm mùi thảo mộc ấm, bật bản Lofi mưa rơi và cảm nhận sự thảnh thơi lan tỏa.',
    activity: 'Pha ấm trà lài nóng & ngắm mưa bên cửa sổ',
    musicType: 'Lofi Chill mưa rào',
    backgroundClass: 'from-slate-800/90 via-indigo-950/90 to-slate-900/95 text-slate-100'
  },
  {
    id: 'hanoi',
    name: 'Hà Nội',
    temp: 24,
    condition: 'windy',
    conditionName: 'Gió heo may se lạnh',
    description: 'Cơn gió mùa se sắt thoảng hương hoa sữa nhẹ dịu, len lỏi qua từng kẽ lá dệt nên một bầu không khí lãng mạn rất thơ.',
    advice: 'Phù hợp để quấn mình trong chiếc áo khoác len mỏng, uống một ngụm trà gừng sả ấm áp và mở một cuốn sách cũ để thả hồn trôi lững lờ.',
    activity: 'Nhâm nhi cà phê trứng & đọc trang sách dở',
    musicType: 'Acoustic Guitar mộc mạc',
    backgroundClass: 'from-amber-900/80 via-[#3a2f28]/90 to-stone-900/95 text-amber-100'
  },
  {
    id: 'dalat',
    name: 'Đà Lạt',
    temp: 16,
    condition: 'misty',
    conditionName: 'Sương mù bảng lảng',
    description: 'Thung lũng đẫm mình trong làn sương khói mờ ảo mát lạnh, ngưng đọng những giọt nước long lanh trên nhành thông mướt.',
    advice: 'Hãy trốn vào một góc giường êm ấm nhất, thắp nến thơm hương tinh dầu gỗ thông và lắng nghe âm thanh núi rừng tĩnh mịch cuối ngày.',
    activity: 'Cuộn chăn ấm & nghe tiếng thông reo rì rào',
    musicType: 'Giai điệu Jazz nhẹ nhàng',
    backgroundClass: 'from-teal-950/90 via-slate-900/90 to-emerald-950/95 text-teal-100'
  },
  {
    id: 'danang',
    name: 'Đà Nẵng',
    temp: 28,
    condition: 'sunset',
    conditionName: 'Hoàng hôn lộng gió',
    description: 'Vạt nắng vàng cam quyến rũ nhuộm hồng bờ cát dài thơ mộng, từng con sóng xô nhẹ mang theo hơi gió biển mặn mòi khoáng đạt.',
    advice: 'Hãy mở toang cửa phòng đón gió mát rượi, hít căng lồng ngực hương vị tự do và thả trôi mọi băn khoăn lo nghĩ sau những giờ tan ca.',
    activity: 'Hé cửa đón gió biển & ngồi thiền tĩnh tâm',
    musicType: 'Nhạc không lời sóng biển rì rào',
    backgroundClass: 'from-orange-950/80 via-rose-950/90 to-stone-900/95 text-orange-100'
  },
  {
    id: 'sapa',
    name: 'Sa Pa',
    temp: 14,
    condition: 'drizzle',
    conditionName: 'Mưa phùn sương đêm',
    description: 'Hơi lạnh biên thùy núi cao rỉ rả dội xuống từng mái nhà ngói đỏ, kéo làn sương muối phủ dày đặc từng nẻo bậc thang đá cổ kính.',
    advice: 'Còn gì tuyệt vời hơn khi sưởi ấm bàn tay cạnh một bếp than hồng bập bùng, ôm cốc ca cao sô cô la ngọt ngào bốc khói nghi ngút.',
    activity: 'Pha ca cao nóng sủi bọt & xem phim tài liệu cổ',
    musicType: 'Giai điệu sáo sậy núi rừng êm ái',
    backgroundClass: 'from-blue-950/90 via-slate-900/90 to-indigo-950/95 text-blue-100'
  }
];

export const WeatherCozy: React.FC<WeatherCozyProps> = ({ onToast }) => {
  const [activeCityIdx, setActiveCityIdx] = useState(0);
  const [isHeaterOn, setIsHeaterOn] = useState(false);
  const [localTemp, setLocalTemp] = useState(citiesData[0].temp);

  const activeCity = citiesData[activeCityIdx];

  // Sync temperature state when city changes
  useEffect(() => {
    setLocalTemp(activeCity.temp);
  }, [activeCityIdx, activeCity.temp]);

  // Handle heater state change
  const handleToggleHeater = () => {
    const nextState = !isHeaterOn;
    setIsHeaterOn(nextState);
    if (nextState) {
      setLocalTemp(prev => prev + 2); // Warm heater raises perceived temperature
      onToast('Đã bật lò sưởi/đèn vàng ấm áp cho căn phòng của bạn! 🔥💡', 'success');
    } else {
      setLocalTemp(activeCity.temp);
      onToast('Đã tắt lò sưởi tinh tế.', 'info');
    }
  };

  const handleCityChange = (idx: number) => {
    setActiveCityIdx(idx);
    setIsHeaterOn(false); // reset heater when changing location
    onToast(`Chuyển không gian thời tiết sang: ${citiesData[idx].name} 📍`, 'info');
  };

  // Icon chooser helper
  const getWeatherIcon = (condition: string, size = 32) => {
    switch (condition) {
      case 'rainy':
        return <CloudRain size={size} className="text-blue-400 animate-bounce" />;
      case 'windy':
        return <Wind size={size} className="text-teal-300 animate-pulse" />;
      case 'misty':
        return <CloudFog size={size} className="text-emerald-300 animate-pulse" />;
      case 'sunset':
        return <Sunset size={size} className="text-orange-400 animate-bounce" />;
      case 'drizzle':
        return <CloudLightning size={size} className="text-indigo-300 animate-pulse" />;
      default:
        return <Sun size={size} className="text-yellow-400 animate-spin-slow" />;
    }
  };

  return (
    <div className="w-full bg-[#FFFDF8] border border-cozy-wood/15 rounded-3xl p-6 md:p-10 flex flex-col gap-8 shadow-md relative overflow-hidden bg-grain">
      
      {/* Decorative top title */}
      <div className="text-center max-w-xl mx-auto space-y-3">
        <span className="text-xs sm:text-sm font-bold text-cozy-moss uppercase tracking-widest flex items-center justify-center gap-1.5">
          <Sparkles size={14} className="text-cozy-warm-yellow fill-cozy-warm-yellow" />
          DỰ BÁO HOÀNG HÔN BÌNH YÊN
        </span>
        <h3 className="font-serif text-3xl md:text-4xl font-semibold text-cozy-dark">
          Hôm nay thời tiết thế nào?
        </h3>
        <p className="text-sm md:text-base text-cozy-dark/85 leading-relaxed font-sans max-w-lg mx-auto">
          Nhìn ra ngoài khung cửa sổ gỗ sồi, thời tiết đang thì thầm nhắn nhủ điều gì? Chọn một nơi chốn để vỗ về nhịp thở và điều chỉnh độ ấm của căn phòng bạn nhé.
        </p>
      </div>

      {/* City Switcher Buttons - Styled like a premium wooden dock */}
      <div className="flex flex-wrap justify-center items-center gap-2.5 max-w-3xl mx-auto">
        {citiesData.map((city, idx) => {
          const isActive = activeCityIdx === idx;
          return (
            <button
              key={city.id}
              onClick={() => handleCityChange(idx)}
              className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-2 cursor-pointer border ${
                isActive
                  ? 'bg-cozy-wood border-cozy-wood text-[#FFFDF8] shadow-md'
                  : 'bg-cozy-cream/30 border-cozy-wood/15 text-cozy-dark hover:bg-cozy-cream/60'
              }`}
            >
              <MapPin size={13} className={isActive ? 'text-cozy-warm-yellow' : 'text-cozy-wood/60'} />
              <span>{city.name}</span>
              <span className={`text-xs font-mono opacity-90 ${isActive ? 'text-cozy-ivory/90' : 'text-cozy-wood/70'}`}>
                {city.temp}°C
              </span>
            </button>
          );
        })}
      </div>

      {/* Two Column Layout: Left Column Weather Showcase, Right Column Cozy Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-stretch">
        
        {/* Left Column: Glassmorphism Weather Monitor Box */}
        <div className="lg:col-span-6 flex flex-col justify-between">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4 }}
              className={`relative rounded-2xl p-6 md:p-8 flex flex-col justify-between h-full min-h-[360px] shadow-lg overflow-hidden bg-gradient-to-br transition-all duration-500 border border-white/15 ${
                isHeaterOn 
                  ? 'from-amber-950 via-[#3a2212] to-stone-900/95 text-amber-50 shadow-amber-950/25 shadow-2xl'
                  : activeCity.backgroundClass
              }`}
            >
              {/* Raindrop/Cloud Subtle Floating Overlay */}
              {activeCity.condition === 'rainy' && !isHeaterOn && (
                <div className="absolute inset-0 opacity-15 pointer-events-none select-none">
                  {/* Subtle rain lines overlay simulated with CSS background */}
                  <div className="w-full h-full" style={{
                    backgroundImage: 'radial-gradient(ellipse at top, #38bdf8 1px, transparent 1px)',
                    backgroundSize: '15px 40px',
                    animation: 'marquee-horizontal 8s linear infinite'
                  }} />
                </div>
              )}

              {/* Heater Soft Radiant Glow */}
              {isHeaterOn && (
                <div className="absolute -bottom-20 -right-20 w-60 h-60 rounded-full bg-orange-500/10 blur-[60px] pointer-events-none" />
              )}

              {/* Header Box inside Monitor */}
              <div className="space-y-4 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 font-mono text-xs tracking-widest text-white/70 uppercase">
                    <Compass size={13} className="animate-spin-slow" />
                    Không gian thư thái
                  </div>
                  {/* Glowing Pulse indicator */}
                  <div className="flex items-center gap-1.5">
                    <span className={`w-2.5 h-2.5 rounded-full animate-ping ${isHeaterOn ? 'bg-orange-400' : 'bg-emerald-400'}`} />
                    <span className="font-mono text-xs text-white/60 uppercase">LIVE ATMOSPHERE</span>
                  </div>
                </div>

                {/* Primary Temperature & City Indicator */}
                <div className="flex items-center gap-5 pt-3">
                  <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-inner">
                    {getWeatherIcon(isHeaterOn ? 'sunset' : activeCity.condition, 38)}
                  </div>
                  <div className="space-y-0.5">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl md:text-5xl font-light tracking-tighter font-serif">
                        {localTemp}
                      </span>
                      <span className="text-xl text-white/80">°C</span>
                    </div>
                    <p className="text-xs sm:text-sm font-bold tracking-wider text-white uppercase">
                      {isHeaterOn ? 'Đèn sưởi ấm rạng ngời' : activeCity.conditionName}
                    </p>
                  </div>
                </div>

                <p className="text-base text-white/90 leading-relaxed font-sans text-justify pt-2">
                  {activeCity.description}
                </p>
              </div>

              {/* Footer interactive buttons inside Monitor */}
              <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between relative z-10">
                {/* Heater On/Off Switcher */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleToggleHeater}
                    className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-300 cursor-pointer ${
                      isHeaterOn
                        ? 'bg-orange-500 border-orange-400 text-white shadow-md shadow-orange-500/20'
                        : 'bg-white/10 border-white/20 text-white/80 hover:bg-white/20 hover:text-white'
                    }`}
                    title={isHeaterOn ? "Tắt sưởi để mát dịu" : "Bật sưởi ấm vàng sồi"}
                  >
                    {isHeaterOn ? <Flame size={18} className="animate-pulse" /> : <Lightbulb size={18} />}
                  </button>
                  <div className="text-left">
                    <p className="text-xs font-mono text-white/60 uppercase leading-none">Chế độ lò sưởi</p>
                    <p className="text-xs sm:text-sm text-white font-bold mt-1">
                      {isHeaterOn ? 'Đang thắp lò sưởi vàng' : 'Đèn phòng dịu mát'}
                    </p>
                  </div>
                </div>

                {/* City name signature */}
                <div className="text-right">
                  <p className="text-xs font-mono text-white/60 uppercase leading-none">Vị trí địa lý</p>
                  <p className="text-sm font-serif italic text-white mt-1 font-bold">
                    — {activeCity.name} kì vĩ
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Column: Recommendations & Cozy Self-Care Actions */}
        <div className="lg:col-span-6 flex flex-col justify-between gap-5">
          
          <div className="space-y-4">
            <span className="text-xs sm:text-sm font-semibold text-cozy-dark/75 uppercase tracking-widest pl-1">
              Gợi ý hành trình chữa lành hôm nay:
            </span>

            {/* Curated Activity Item */}
            <div className="bg-[#FFFDF8] border border-cozy-wood/15 rounded-2xl p-5 flex items-start gap-4 shadow-sm hover:border-cozy-wood/30 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-cozy-cream/40 flex items-center justify-center text-cozy-moss shrink-0 border border-cozy-wood/10">
                <Coffee size={22} />
              </div>
              <div className="space-y-1">
                <h4 className="font-serif text-base font-bold text-cozy-dark">Hoạt động vỗ về tinh thần</h4>
                <p className="text-sm text-cozy-dark/85 leading-relaxed">
                  {activeCity.activity}
                </p>
              </div>
            </div>

            {/* Curated Music Item */}
            <div className="bg-[#FFFDF8] border border-cozy-wood/15 rounded-2xl p-5 flex items-start gap-4 shadow-sm hover:border-cozy-wood/30 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-cozy-cream/40 flex items-center justify-center text-cozy-moss shrink-0 border border-cozy-wood/10">
                <Music size={22} />
              </div>
              <div className="space-y-1">
                <h4 className="font-serif text-base font-bold text-cozy-dark">Tần số âm thanh đề xuất</h4>
                <p className="text-sm text-cozy-dark/85 leading-relaxed">
                  Phù hợp nhất để phối hợp cùng bản <strong className="text-cozy-moss font-semibold">{activeCity.musicType}</strong> ở đài phát lofi mini góc dưới màn hình.
                </p>
              </div>
            </div>

            {/* Cozy Advice Panel */}
            <div className="bg-[#FFFDF8] border border-cozy-wood/15 rounded-2xl p-5 flex items-start gap-4 shadow-sm hover:border-cozy-wood/30 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-cozy-cream/40 flex items-center justify-center text-cozy-moss shrink-0 border border-cozy-wood/10">
                <BookOpen size={22} />
              </div>
              <div className="space-y-1">
                <h4 className="font-serif text-base font-bold text-cozy-dark">Tách lòng thư thái</h4>
                <p className="text-sm text-cozy-dark/85 leading-relaxed text-justify font-sans">
                  {activeCity.advice}
                </p>
              </div>
            </div>
          </div>

          {/* Sincere message for mental check-in */}
          <div className="bg-cozy-moss/5 border border-cozy-moss/15 rounded-2xl p-5 flex items-start gap-3">
            <span className="text-cozy-moss text-lg mt-0.5">🌦️</span>
            <div className="space-y-1">
              <h5 className="font-serif text-sm font-bold text-cozy-dark">Lắng nghe tiếng thở:</h5>
              <p className="text-xs sm:text-sm text-cozy-dark/85 leading-relaxed font-sans">
                Thời tiết bên ngoài là khách, tâm trạng bên trong là chủ nhà. Bất kể ngoài trời mưa giăng trắng lối hay gió rét căm căm, chúc bạn luôn thắp sáng được ngọn lửa ấm áp, an lành bên hiên cửa sổ gỗ của riêng mình.
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
