import React, { useEffect, useState } from 'react';

export const ParallaxQuoteSection: React.FC = () => {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffsetY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      className="relative h-[65vh] md:h-[80vh] flex items-center justify-center overflow-hidden bg-cozy-dusk bg-grain"
      id="parallax-quote-section"
    >
      {/* Background with parallax scroll effect */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          transform: `translateY(${(offsetY - 2000) * 0.1}px) scale(1.15)`,
          transition: 'transform 0.1s ease-out'
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop"
          alt="Đường đi làm ở quê lúc chiều tà"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover opacity-60"
        />
        {/* Soft vignette dusk shading */}
        <div className="absolute inset-0 bg-[#1F1B17]/65" />
      </div>

      {/* Floating leaves simulation */}
      <div className="absolute top-1/3 right-1/4 text-[#E8B86D]/15 pointer-events-none select-none z-10 animate-drift">
        <svg width="35" height="35" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17 8C12 8 8 12 8 17C8 12 12 8 17 8M21 2C11.5 2 4 9.5 4 19H20C20 9.5 21 2 21 2Z" />
        </svg>
      </div>

      {/* Text block */}
      <div className="max-w-3xl mx-auto px-6 text-center relative z-10 space-y-6 select-none">
        <span className="text-xs sm:text-sm uppercase tracking-widest text-[#E8B86D] font-bold block">
          Thời khắc trở về
        </span>

        <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-cozy-ivory leading-relaxed">
          “ Có những ngày mình không cần cố gắng thêm.<br />
          Chỉ cần trở về, bật đèn và thở chậm lại thôi. ”
        </h3>

        <div className="flex items-center justify-center gap-1.5 text-cozy-cream/80 text-sm font-semibold">
          <span className="w-8 h-px bg-cozy-cream/45" />
          <span>Lắng nghe âm thanh bình yên</span>
          <span className="w-8 h-px bg-cozy-cream/45" />
        </div>
      </div>
    </section>
  );
};
