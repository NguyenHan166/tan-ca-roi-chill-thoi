import React, { useState, useMemo, useEffect } from 'react';
import { Product, TimeTheme } from '../types';
import { products } from '../data/products';
import { moods } from '../data/moods';
import { ProductCard } from '../components/ProductCard';
import { Sparkles, SlidersHorizontal, EyeOff, LayoutGrid, ChevronDown, ChevronUp, Search, Filter, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ProductSectionProps {
  selectedMoodId: string;
  onClearMoodFilter: () => void;
  favoritedIds: string[];
  onToggleFavorite: (id: string) => void;
  onToast: (msg: string, type: 'info' | 'success' | 'heart' | 'error') => void;
  activeTheme?: TimeTheme;
}

export const ProductSection: React.FC<ProductSectionProps> = ({
  selectedMoodId,
  onClearMoodFilter,
  favoritedIds,
  onToggleFavorite,
  onToast,
  activeTheme = 'morning',
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Tất cả');
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['Tất cả', 'Ánh sáng', 'Âm thanh', 'Tiện ích', 'Trang trí'];
  const activeMood = moods.find((m) => m.id === selectedMoodId);

  // Filter products based on selected category, selected mood, and search query
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category filter check
      const matchesCategory = selectedCategory === 'Tất cả' || product.category === selectedCategory;
      // Mood filter check
      const matchesMood = !selectedMoodId || product.moodIds.includes(selectedMoodId);
      // Search query check
      const matchesSearch = 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesCategory && matchesMood && matchesSearch;
    });
  }, [selectedCategory, selectedMoodId, searchQuery]);

  // Double the products array to ensure a seamless infinite marquee effect
  const marqueeProducts = useMemo(() => {
    return [...products, ...products, ...products];
  }, []);

  // Prevent scroll on body when modal is open
  useEffect(() => {
    if (isExpanded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isExpanded]);

  // Handle escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsExpanded(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <section
      id="products-showcase"
      className={`py-24 md:py-32 px-6 md:px-12 border-b relative bg-grain transition-all duration-[1200ms] ${
        activeTheme === 'evening'
          ? 'bg-[#181310] border-[#5A483B]/20 text-[#EBE4DC]'
          : 'bg-cozy-cream/10 border-cozy-wood/5 text-cozy-dark'
      }`}
    >
      {/* Inject custom marquee keyframe style */}
      <style>{`
        @keyframes marquee-horizontal {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.3333%);
          }
        }
        .animate-marquee-chain {
          animation: marquee-horizontal 45s linear infinite;
        }
        .animate-marquee-chain:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Poetic Title Block */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className={`text-xs sm:text-sm font-bold uppercase tracking-[0.25em] flex items-center justify-center gap-1.5 transition-colors ${
            activeTheme === 'evening' ? 'text-cozy-warm-yellow' : 'text-cozy-moss'
          }`}>
            <LayoutGrid size={13} />
            Mảnh ghép không gian
          </span>
          <h2 className={`font-serif text-2xl sm:text-3xl md:text-4xl font-semibold transition-colors ${
            activeTheme === 'evening' ? 'text-[#EBE4DC]' : 'text-cozy-dark'
          }`}>
            Gợi ý tủ đồ chữa lành
          </h2>
          <p className={`text-sm sm:text-base leading-relaxed font-serif italic transition-colors ${
            activeTheme === 'evening' ? 'text-[#EBE4DC]/80' : 'text-cozy-dark/85'
          }`}>
            “Những đồ vật thầm lặng được tuyển lựa để vỗ về giác quan, thắp sáng không gian riêng tư của bạn mỗi khi tan ca.”
          </p>
        </div>

        {/* 1. AUTO-SCROLLING ROW / MARQUEE (Hiệu ứng dây chuyền tự động) */}
        <div className="relative w-full overflow-hidden py-4 -mx-6 px-6 md:-mx-12 md:px-12">
          {/* Subtle gradient overlays to blend edges beautifully */}
          <div className={`absolute inset-y-0 left-0 w-16 sm:w-28 z-10 pointer-events-none transition-all duration-1000 ${
            activeTheme === 'evening' ? 'from-[#181310] via-[#181310]/80 to-transparent' : 'from-[#FFFDF8] via-[#FFFDF8]/80 to-transparent'
          }`} />
          <div className={`absolute inset-y-0 right-0 w-16 sm:w-28 z-10 pointer-events-none transition-all duration-1000 ${
            activeTheme === 'evening' ? 'from-[#181310] via-[#181310]/80 to-transparent' : 'from-[#FFFDF8] via-[#FFFDF8]/80 to-transparent'
          }`} />

          {/* Scrolling chain container */}
          <div className="flex w-max animate-marquee-chain gap-6 md:gap-8 hover:cursor-grab active:cursor-grabbing">
            {marqueeProducts.map((product, idx) => (
              <div 
                key={`${product.id}-marquee-${idx}`}
                className="w-[260px] sm:w-[290px] shrink-0 transition-transform duration-500 hover:scale-[1.02] hover:-translate-y-1"
              >
                <ProductCard
                  product={product}
                  isFavorited={favoritedIds.includes(product.id)}
                  onToggleFavorite={onToggleFavorite}
                  onToast={onToast}
                  activeTheme={activeTheme}
                />
              </div>
            ))}
          </div>
        </div>

        {/* 2. EXPLORE MORE INTERACTIVE BUTTON */}
        <div className="flex flex-col items-center justify-center pt-2 pb-6">
          <button
            onClick={() => {
              setIsExpanded(true);
              onToast('Mở tủ đồ chữa lành đầy đủ bộ lọc 🌿', 'info');
            }}
            className={`group inline-flex items-center gap-2 px-7 py-4 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-500 cursor-pointer shadow-lg ${
              activeTheme === 'evening'
                ? 'bg-cozy-warm-yellow hover:bg-[#F2D7A5] text-[#181310] shadow-cozy-warm-yellow/10'
                : 'bg-cozy-wood hover:bg-cozy-moss text-cozy-ivory shadow-cozy-wood/20 hover:shadow-cozy-moss/20'
            } animate-bounce-slow`}
          >
            <span>Khám phá thêm tủ đồ & Tìm kiếm</span>
            <motion.div
              animate={{ y: 2 }}
              transition={{ repeat: Infinity, repeatType: 'reverse', duration: 0.6 }}
            >
              <ChevronDown size={16} />
            </motion.div>
          </button>
          <p className={`text-xs font-mono mt-3 tracking-tight uppercase transition-colors ${
            activeTheme === 'evening' ? 'text-[#EBE4DC]/50' : 'text-cozy-dark/50'
          }`}>
            Mở cửa sổ lọc danh mục, tìm kiếm vật phẩm chính hãng
          </p>
        </div>

        {/* 3. POPUP MODAL DIALOG OVERLAY */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-cozy-dark/70 backdrop-blur-md z-50 flex items-center justify-center p-4 sm:p-6"
              onClick={() => setIsExpanded(false)} // Close when clicking outside modal
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className={`relative w-full max-w-6xl rounded-3xl shadow-2xl flex flex-col max-h-[90vh] md:max-h-[85vh] overflow-hidden bg-grain transition-colors duration-500 ${
                  activeTheme === 'evening'
                    ? 'bg-[#1C1713] border border-[#5A483B]/40 text-[#EBE4DC]'
                    : 'bg-[#FFFDF8] border border-cozy-wood/10 text-cozy-dark'
                }`}
                onClick={(e) => e.stopPropagation()} // Prevent close on modal content click
              >
                
                {/* Modal Header */}
                <div className={`px-6 py-5 md:px-8 md:py-6 border-b flex flex-col gap-4 relative transition-colors ${
                  activeTheme === 'evening' ? 'border-[#5A483B]/20' : 'border-cozy-wood/5'
                }`}>
                  
                  {/* Close button inside modal */}
                  <button
                    onClick={() => setIsExpanded(false)}
                    className={`absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-full transition-all duration-300 cursor-pointer ${
                      activeTheme === 'evening' ? 'hover:bg-[#2D231D] text-[#EBE4DC]/65 hover:text-[#EBE4DC]' : 'hover:bg-cozy-cream/40 text-cozy-dark/60 hover:text-cozy-dark'
                    }`}
                    title="Đóng cửa sổ"
                  >
                    <X size={18} />
                  </button>

                  <div className="pr-12">
                    <span className={`text-[9px] font-bold uppercase tracking-[0.2em] flex items-center gap-1 transition-colors ${
                      activeTheme === 'evening' ? 'text-cozy-warm-yellow' : 'text-cozy-moss'
                    }`}>
                      <Sparkles size={10} className="text-cozy-warm-yellow fill-cozy-warm-yellow animate-spin-slow" />
                      KHÁM PHÁ TOÀN BỘ TỦ ĐỒ CHỮA LÀNH
                    </span>
                    <h3 className={`font-serif text-lg sm:text-xl font-semibold leading-tight mt-1 transition-colors ${
                      activeTheme === 'evening' ? 'text-[#EBE4DC]' : 'text-cozy-dark'
                    }`}>
                      Mảnh ghép không gian yên lành
                    </h3>
                  </div>

                  {/* Filtering controls inside sticky header */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pt-1 items-end">
                    
                    {/* Category tabs */}
                    <div className="md:col-span-6 space-y-1.5">
                      <span className={`text-[9px] font-mono uppercase tracking-wider block pl-1 transition-colors ${
                        activeTheme === 'evening' ? 'text-[#EBE4DC]/50' : 'text-cozy-dark/45'
                      }`}>Phân loại sản phẩm</span>
                      <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                        {categories.map((cat) => (
                          <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer shrink-0 ${
                              selectedCategory === cat
                                ? activeTheme === 'evening'
                                  ? 'bg-cozy-warm-yellow text-[#181310] shadow-md'
                                  : 'bg-cozy-wood text-cozy-ivory shadow-md'
                                : activeTheme === 'evening'
                                  ? 'bg-[#241D19] border border-[#5A483B]/40 text-[#EBE4DC]/70 hover:bg-[#2D231D]'
                                  : 'bg-[#FFFDF8] border border-cozy-wood/10 text-cozy-dark/70 hover:bg-cozy-cream/50'
                            }`}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Search box */}
                    <div className="md:col-span-3 space-y-1.5">
                      <span className={`text-[9px] font-mono uppercase tracking-wider block pl-1 transition-colors ${
                        activeTheme === 'evening' ? 'text-[#EBE4DC]/50' : 'text-cozy-dark/45'
                      }`}>Tìm kiếm vật phẩm</span>
                      <div className="relative">
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Tìm đèn, loa, nến thơm..."
                          className={`w-full rounded-full px-3.5 py-1.5 pl-8 text-[11px] focus:outline-none font-sans transition-colors ${
                            activeTheme === 'evening'
                              ? 'bg-[#241D19] border border-[#5A483B]/40 text-[#EBE4DC] placeholder:text-[#EBE4DC]/30 focus:border-cozy-warm-yellow/60'
                              : 'bg-[#FFFDF8] border border-cozy-wood/15 text-cozy-dark placeholder:text-cozy-dark/35 focus:border-cozy-wood'
                          }`}
                        />
                        <Search size={11} className={`absolute left-3 top-1/2 -translate-y-1/2 ${
                          activeTheme === 'evening' ? 'text-[#EBE4DC]/40' : 'text-cozy-dark/40'
                        }`} />
                        {searchQuery && (
                          <button
                            onClick={() => setSearchQuery('')}
                            className={`absolute right-3 top-1/2 -translate-y-1/2 text-xs cursor-pointer font-bold ${
                              activeTheme === 'evening' ? 'text-[#EBE4DC]/50 hover:text-[#EBE4DC]' : 'text-cozy-dark/40 hover:text-cozy-dark'
                            }`}
                          >
                            &times;
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Active mood filters */}
                    <div className="md:col-span-3 space-y-1.5">
                      <span className={`text-[9px] font-mono uppercase tracking-wider block pl-1 transition-colors ${
                        activeTheme === 'evening' ? 'text-[#EBE4DC]/50' : 'text-cozy-dark/45'
                      }`}>Trạng thái tâm lý</span>
                      <div className="min-h-[30px] flex items-center justify-end">
                        {selectedMoodId ? (
                          <div className={`flex items-center justify-between w-full border rounded-full px-3 py-1.5 text-[10px] ${
                            activeTheme === 'evening'
                              ? 'bg-[#241D19] border-[#5A483B]/40 text-[#EBE4DC]/80'
                              : 'bg-cozy-wood/5 border border-cozy-wood/10 text-cozy-dark/75'
                          }`}>
                            <span className="truncate">
                              Gợi ý: <strong className={`font-serif italic ${
                                activeTheme === 'evening' ? 'text-cozy-warm-yellow' : 'text-cozy-wood'
                              }`}>{activeMood?.name}</strong>
                            </span>
                            <button
                              onClick={onClearMoodFilter}
                              className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[8px] cursor-pointer transition-all duration-200 ml-1.5 shrink-0 ${
                                activeTheme === 'evening'
                                  ? 'bg-[#1C1713] hover:bg-cozy-warm-yellow text-cozy-warm-yellow hover:text-[#181310]'
                                  : 'bg-cozy-wood/10 hover:bg-cozy-wood hover:text-cozy-ivory text-cozy-dark'
                              }`}
                              title="Xóa bộ lọc tâm trạng"
                            >
                              &times;
                            </button>
                          </div>
                        ) : (
                          <span className={`text-[9px] italic leading-tight font-sans pl-1 w-full text-left md:text-right ${
                            activeTheme === 'evening' ? 'text-[#EBE4DC]/40' : 'text-cozy-dark/40'
                          }`}>
                            Đồng bộ với Mood góc trên
                          </span>
                        )}
                      </div>
                    </div>

                  </div>

                </div>

                {/* Modal Body / Scrollable Content Area */}
                <div className="flex-1 overflow-y-auto p-6 md:p-8 min-h-[250px]">
                  {filteredProducts.length === 0 ? (
                    /* Empty filtered state inside modal */
                    <div className="py-16 text-center">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 ${
                        activeTheme === 'evening' ? 'bg-[#241D19] text-[#EBE4DC]/30' : 'bg-cozy-wood/5 text-cozy-wood/30'
                      }`}>
                        <EyeOff size={20} />
                      </div>
                      <h4 className={`font-serif text-sm font-semibold transition-colors ${
                        activeTheme === 'evening' ? 'text-[#EBE4DC]' : 'text-cozy-dark'
                      }`}>Không tìm thấy món đồ phù hợp</h4>
                      <p className={`text-[11px] max-w-xs mx-auto leading-relaxed mt-1 font-sans transition-colors ${
                        activeTheme === 'evening' ? 'text-[#EBE4DC]/60' : 'text-cozy-dark/60'
                      }`}>
                        Không tìm thấy mảnh ghép nào khớp với bộ lọc hoặc từ khóa "{searchQuery}". Bạn hãy thử reset lại nhé.
                      </p>
                      <button
                        onClick={() => {
                          setSelectedCategory('Tất cả');
                          setSearchQuery('');
                          onClearMoodFilter();
                        }}
                        className={`mt-4 px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-sm ${
                          activeTheme === 'evening'
                            ? 'bg-cozy-warm-yellow text-[#181310] hover:bg-cozy-warm-yellow/90'
                            : 'bg-cozy-wood text-cozy-ivory hover:bg-cozy-moss'
                        }`}
                      >
                        Đặt lại toàn bộ lọc
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <p className={`text-[10px] font-mono uppercase tracking-wider pl-1 transition-colors ${
                        activeTheme === 'evening' ? 'text-[#EBE4DC]/40' : 'text-cozy-dark/40'
                      }`}>
                        Hiện có {filteredProducts.length} mảnh ghép được tuyển chọn tỉ mẩn:
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
                        {filteredProducts.map((product) => (
                          <div key={`${product.id}-modal-grid`} className="transition-transform duration-300 hover:scale-[1.01]">
                            <ProductCard
                              product={product}
                              isFavorited={favoritedIds.includes(product.id)}
                              onToggleFavorite={onToggleFavorite}
                              onToast={onToast}
                              activeTheme={activeTheme}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Modal Footer */}
                <div className={`px-6 py-4 border-t text-center flex items-center justify-between transition-colors ${
                  activeTheme === 'evening'
                    ? 'border-[#5A483B]/20 bg-[#241D19]/40'
                    : 'border-cozy-wood/5 bg-cozy-cream/20'
                }`}>
                  <p className={`text-[9px] font-mono tracking-tight uppercase text-left transition-colors ${
                    activeTheme === 'evening' ? 'text-[#EBE4DC]/30' : 'text-cozy-dark/30'
                  }`}>
                    * Nhấn phím ESC hoặc click bên ngoài để đóng lại bất kỳ lúc nào
                  </p>
                  <button
                    onClick={() => setIsExpanded(false)}
                    className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                      activeTheme === 'evening'
                        ? 'bg-[#241D19] hover:bg-cozy-warm-yellow text-[#EBE4DC] hover:text-[#181310] border border-[#5A483B]/40'
                        : 'bg-cozy-wood/10 hover:bg-cozy-wood text-cozy-dark hover:text-cozy-ivory'
                    }`}
                  >
                    Đóng cửa sổ
                  </button>
                </div>

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom transparent disclosure tag styled like an editorial footnote */}
        <div className={`text-center pt-8 border-t transition-colors ${
          activeTheme === 'evening' ? 'border-[#5A483B]/20' : 'border-cozy-wood/10'
        }`}>
          <p className={`text-xs font-mono tracking-tight max-w-xl mx-auto leading-relaxed uppercase transition-colors ${
            activeTheme === 'evening' ? 'text-[#EBE4DC]/50' : 'text-cozy-dark/60'
          }`}>
            * Mỗi vật phẩm đều đã được giám định thực tế và liên kết đến các nhà cung cấp uy tín trên TikTok Shop. Tan Ca Rồi hỗ trợ chuyển giao phi lợi nhuận.
          </p>
        </div>

      </div>
    </section>
  );
};
