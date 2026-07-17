import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { trackAffiliateClick } from '../lib/affiliateTracking';

interface FavoriteDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  favoritedProducts: Product[];
  onToggleFavorite: (id: string) => void;
}

export const FavoriteDrawer: React.FC<FavoriteDrawerProps> = ({
  isOpen,
  onClose,
  favoritedProducts,
  onToggleFavorite,
}) => {
  const handleProductClick = (product: Product) => {
    trackAffiliateClick(product.id, product.name, 'drawer', product.affiliateUrl);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay background */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#302922] z-[9995] cursor-pointer"
            aria-hidden="true"
          />

          {/* Drawer container */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full max-w-md w-full bg-cozy-ivory border-l border-cozy-wood/10 shadow-2xl z-[9996] flex flex-col"
            id="favorites-drawer-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="fav-drawer-title"
          >
            {/* Drawer Header */}
            <div className="p-5 border-b border-cozy-wood/10 flex items-center justify-between bg-cozy-cream/40">
              <div className="flex items-center gap-2">
                <Heart size={18} className="text-red-500 fill-red-500" />
                <h2 id="fav-drawer-title" className="font-serif text-lg font-medium text-cozy-dark">
                  Góc yêu thích ({favoritedProducts.length})
                </h2>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full hover:bg-cozy-wood/5 flex items-center justify-center text-cozy-dark transition-colors cursor-pointer"
                aria-label="Đóng bảng yêu thích"
              >
                <X size={18} />
              </button>
            </div>

            {/* Drawer Content */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {favoritedProducts.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center px-4 py-20">
                  <div className="w-16 h-16 rounded-full bg-cozy-wood/5 flex items-center justify-center text-cozy-wood/30 mb-4">
                    <Heart size={28} />
                  </div>
                  <h3 className="font-serif text-base font-medium text-cozy-dark mb-1">
                    Góc yêu thích trống
                  </h3>
                  <p className="text-xs text-cozy-dark/60 max-w-xs leading-relaxed">
                    Hãy dạo quanh góc nhỏ và lưu lại những món đồ khiến bạn cảm thấy thoải mái và bình yên hơn nhé.
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-6 inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-cozy-wood text-cozy-ivory text-xs font-medium hover:bg-cozy-moss transition-colors cursor-pointer"
                  >
                    Xem sản phẩm <ArrowRight size={14} />
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-[11px] text-cozy-dark/50 italic mb-4">
                    * Danh sách này được lưu tự động trên trình duyệt của bạn.
                  </p>
                  {favoritedProducts.map((product) => (
                    <div
                      key={product.id}
                      className="flex gap-4 p-3 bg-cozy-cream/30 hover:bg-cozy-cream/60 rounded-2xl border border-cozy-wood/5 transition-cozy group"
                    >
                      {/* Product Image */}
                      <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-cozy-cream relative">
                        <img
                          src={product.image}
                          alt={product.name}
                          referrerPolicy="no-referrer"
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>

                      {/* Product details */}
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <span className="text-[10px] text-cozy-moss font-semibold uppercase tracking-wider block">
                              {product.category}
                            </span>
                            <button
                              onClick={() => onToggleFavorite(product.id)}
                              className="text-cozy-dark/40 hover:text-red-500 transition-colors cursor-pointer"
                              aria-label={`Xóa ${product.name} khỏi yêu thích`}
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                          <h4 className="font-sans text-xs font-medium text-cozy-dark line-clamp-1 mt-0.5 group-hover:text-cozy-wood transition-colors">
                            {product.name}
                          </h4>
                          <span className="text-[10px] text-cozy-dark/60 block line-clamp-1 mt-0.5 italic">
                            {product.tagline}
                          </span>
                        </div>

                        <div className="flex items-center justify-between gap-2 mt-2">
                          <span className="text-xs font-semibold text-cozy-dark">
                            {product.price.toLocaleString('vi-VN')}đ
                          </span>

                          <a
                            href={product.affiliateUrl}
                            target="_blank"
                            rel="noopener noreferrer sponsored"
                            onClick={() => handleProductClick(product)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-cozy-wood hover:bg-cozy-moss text-cozy-ivory text-[10px] font-medium transition-colors"
                          >
                            <ShoppingBag size={10} />
                            Mua ngay
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer summary */}
            {favoritedProducts.length > 0 && (
              <div className="p-5 border-t border-cozy-wood/10 bg-cozy-cream/30">
                <p className="text-[10px] text-cozy-dark/50 leading-relaxed mb-1">
                  Đã lưu {favoritedProducts.length} món đồ vào góc mộc mạc cá nhân.
                </p>
                <div className="text-[10px] text-cozy-dark/40">
                  Một số liên kết là tiếp thị liên kết (affiliate). Bạn mua hàng sẽ giúp tiếp thêm chút lửa cho góc nhỏ này nhé.
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
