import React from 'react';
import { Product } from '../types';
import { Heart, Star, Compass, ArrowUpRight } from 'lucide-react';
import { trackAffiliateClick } from '../lib/affiliateTracking';

interface ProductCardProps {
  product: Product;
  isFavorited: boolean;
  onToggleFavorite: (id: string) => void;
  onToast: (msg: string, type: 'info' | 'success' | 'heart' | 'error') => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isFavorited,
  onToggleFavorite,
  onToast,
}) => {
  const handleBuyClick = () => {
    trackAffiliateClick(product.id, product.name, 'product_grid', product.affiliateUrl);
  };

  const handleHeartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    onToggleFavorite(product.id);
    if (!isFavorited) {
      onToast(`Đã thêm "${product.name}" vào góc yêu thích.`, 'heart');
    } else {
      onToast(`Đã xóa "${product.name}" khỏi góc yêu thích.`, 'info');
    }
  };

  const discountPercent = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <article 
      className="bg-[#FFFDF8] border border-cozy-wood/5 rounded-[24px] overflow-hidden hover:shadow-2xl hover:shadow-cozy-wood/5 transition-cozy group flex flex-col h-full relative"
      id={`product-card-${product.id}`}
    >
      {/* Delicate Favorite Button */}
      <button
        onClick={handleHeartClick}
        className={`absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/80 backdrop-blur-md hover:bg-white shadow-sm flex items-center justify-center transition-all duration-300 hover:scale-105 cursor-pointer border border-cozy-wood/5 ${
          isFavorited ? 'text-red-500' : 'text-cozy-dark/30 hover:text-red-500'
        }`}
        aria-label={isFavorited ? 'Xóa khỏi yêu thích' : 'Lưu vào góc yêu thích'}
      >
        <Heart size={14} className={isFavorited ? 'fill-red-500' : ''} />
      </button>

      {/* Editorial Vertical Image Block */}
      <div className="relative aspect-[4/3] sm:aspect-[16/11] overflow-hidden bg-cozy-cream/10 shrink-0">
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-103 filter brightness-[0.98] group-hover:brightness-100"
        />
        
        {/* Soft elegant gradient shadow on image */}
        <div className="absolute inset-0 bg-gradient-to-t from-cozy-dark/15 via-transparent to-transparent opacity-80 pointer-events-none" />

        {/* Minimal Category Tag */}
        <span className="absolute bottom-3 left-3 inline-flex items-center px-2.5 py-1 rounded-full bg-cozy-ivory/95 backdrop-blur-sm text-cozy-dark text-[10px] font-bold tracking-widest uppercase border border-cozy-wood/10">
          {product.category}
        </span>

        {/* Cinematic discount brackets */}
        {discountPercent > 0 && (
          <span className="absolute top-3 left-3 inline-flex items-center px-2 py-0.5 rounded bg-cozy-wood/95 text-cozy-ivory text-[10px] font-mono tracking-tight font-bold shadow-sm">
            -[{discountPercent}%]
          </span>
        )}
      </div>

      {/* Narrative & Editorial Info */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-2">
          {/* Tagline / Curators note */}
          <div className="flex items-center justify-between text-xs text-cozy-dark/50 font-mono tracking-wider font-bold">
            <span>Tan Ca Rồi tuyển lựa</span>
            <div className="flex items-center gap-0.5 text-cozy-warm-yellow">
              <Star size={11} className="fill-cozy-warm-yellow text-cozy-warm-yellow" />
              <span className="font-bold text-xs">{product.rating.toFixed(1)}</span>
            </div>
          </div>

          {/* Poetical Name */}
          <h4 className="font-serif text-base sm:text-lg font-bold italic text-cozy-dark leading-snug group-hover:text-cozy-wood transition-colors line-clamp-1">
            {product.name}
          </h4>

          {/* Handpicked note */}
          <p className="text-xs sm:text-sm font-serif text-cozy-wood/90 italic leading-relaxed line-clamp-1 border-l-2 border-cozy-wood/30 pl-2">
            “ {product.tagline} ”
          </p>

          {/* Human description */}
          <p className="text-xs text-cozy-dark/75 leading-relaxed line-clamp-2">
            {product.description}
          </p>
        </div>

        {/* Pricing and Soft Action button */}
        <div className="pt-3 border-t border-cozy-wood/10 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            {/* Price tag */}
            <div className="flex items-baseline gap-1.5">
              <span className="text-sm sm:text-base font-bold text-cozy-dark font-mono">
                {product.price.toLocaleString('vi-VN')}đ
              </span>
              {product.originalPrice > product.price && (
                <span className="text-xs line-through text-cozy-dark/40 font-mono">
                  {product.originalPrice.toLocaleString('vi-VN')}đ
                </span>
              )}
            </div>

            {/* Micro badge */}
            <span className="text-[10px] font-bold text-cozy-moss tracking-wider uppercase bg-cozy-moss/10 px-2.5 py-0.5 rounded-full">
              {product.badge}
            </span>
          </div>

          {/* Clean organic CTA */}
          <a
            href={product.affiliateUrl}
            target="_blank"
            rel="noopener noreferrer sponsored"
            onClick={handleBuyClick}
            className="w-full inline-flex items-center justify-between px-4 py-2.5 rounded-full bg-cozy-cream/35 hover:bg-cozy-wood text-cozy-dark hover:text-cozy-ivory text-xs font-bold transition-all duration-500 cursor-pointer group/btn border border-cozy-wood/10"
          >
            <span className="flex items-center gap-1.5">
              <Compass size={13} className="opacity-70 group-hover/btn:rotate-45 transition-transform duration-500" />
              <span>Tìm hiểu chiếc góc này</span>
            </span>
            <ArrowUpRight size={13} className="opacity-60 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-300" />
          </a>

          <p className="text-[10px] text-cozy-dark/40 text-center italic tracking-tight font-sans">
            Sản phẩm có mặt tại gian hàng TikTok Shop chính hãng
          </p>
        </div>
      </div>
    </article>
  );
};
