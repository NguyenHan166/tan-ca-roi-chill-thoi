import React from "react";
import { Product, TimeTheme } from "../types";
import { Heart, Star, Compass, ArrowUpRight } from "lucide-react";
import { trackAffiliateClick } from "../lib/affiliateTracking";

interface ProductCardProps {
    product: Product;
    isFavorited: boolean;
    onToggleFavorite: (id: string) => void;
    onToast: (
        msg: string,
        type: "info" | "success" | "heart" | "error",
    ) => void;
    activeTheme?: TimeTheme;
}

export const ProductCard: React.FC<ProductCardProps> = ({
    product,
    isFavorited,
    onToggleFavorite,
    onToast,
    activeTheme = "morning",
}) => {
    const handleBuyClick = () => {
        trackAffiliateClick(
            product.id,
            product.name,
            "product_grid",
            product.affiliateUrl,
        );
    };

    const handleHeartClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        onToggleFavorite(product.id);
        if (!isFavorited) {
            onToast(`Đã thêm "${product.name}" vào góc yêu thích.`, "heart");
        } else {
            onToast(`Đã xóa "${product.name}" khỏi góc yêu thích.`, "info");
        }
    };

    const discountPercent = Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100,
    );

    return (
        <article
            className={`border rounded-[24px] overflow-hidden hover:shadow-2xl transition-all duration-500 group flex flex-col h-full relative ${
                activeTheme === "evening"
                    ? "bg-[#1C1713] border-[#5A483B]/40 text-[#EBE4DC] hover:shadow-cozy-warm-yellow/5"
                    : "bg-[#FFFDF8] border-cozy-wood/5 hover:shadow-cozy-wood/5"
            }`}
            id={`product-card-${product.id}`}
        >
            {/* Delicate Favorite Button */}
            <button
                onClick={handleHeartClick}
                className={`absolute top-4 right-4 z-10 w-8 h-8 rounded-full shadow-sm flex items-center justify-center transition-all duration-300 hover:scale-105 cursor-pointer border ${
                    activeTheme === "evening"
                        ? "bg-[#1C1713]/80 backdrop-blur-md border-[#5A483B]/40"
                        : "bg-white/80 backdrop-blur-md border-cozy-wood/5"
                } ${
                    isFavorited
                        ? "text-red-500"
                        : activeTheme === "evening"
                          ? "text-[#EBE4DC]/40 hover:text-red-500"
                          : "text-cozy-dark/30 hover:text-red-500"
                }`}
                aria-label={
                    isFavorited ? "Xóa khỏi yêu thích" : "Lưu vào góc yêu thích"
                }
            >
                <Heart
                    size={14}
                    className={isFavorited ? "fill-red-500" : ""}
                />
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
                <span
                    className={`absolute bottom-3 left-3 inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase border ${
                        activeTheme === "evening"
                            ? "bg-[#1C1713]/95 backdrop-blur-sm text-cozy-warm-yellow border-[#5A483B]/40"
                            : "bg-cozy-ivory/95 backdrop-blur-sm text-cozy-dark border-cozy-wood/10"
                    }`}
                >
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
                    <div
                        className={`flex items-center justify-between text-xs font-mono tracking-wider font-bold ${
                            activeTheme === "evening"
                                ? "text-[#EBE4DC]/50"
                                : "text-cozy-dark/50"
                        }`}
                    >
                        <span>Tan Ca Rồi tuyển lựa</span>
                        <div className="flex items-center gap-0.5 text-cozy-warm-yellow">
                            <Star
                                size={11}
                                className="fill-cozy-warm-yellow text-cozy-warm-yellow"
                            />
                            <span className="font-bold text-xs">
                                {product.rating.toFixed(1)}
                            </span>
                        </div>
                    </div>

                    {/* Poetical Name */}
                    <h4
                        className={`font-serif text-base sm:text-lg font-bold italic leading-snug transition-colors line-clamp-1 ${
                            activeTheme === "evening"
                                ? "text-[#EBE4DC] group-hover:text-cozy-warm-yellow"
                                : "text-cozy-dark group-hover:text-cozy-wood"
                        }`}
                    >
                        {product.name}
                    </h4>

                    {/* Handpicked note */}
                    <p
                        className={`text-xs sm:text-sm font-serif italic leading-relaxed line-clamp-1 border-l-2 pl-2 ${
                            activeTheme === "evening"
                                ? "text-cozy-warm-yellow/90 border-cozy-warm-yellow/30"
                                : "text-cozy-wood/90 border-cozy-wood/30"
                        }`}
                    >
                        “ {product.tagline} ”
                    </p>

                    {/* Human description */}
                    <p
                        className={`text-xs leading-relaxed line-clamp-2 ${
                            activeTheme === "evening"
                                ? "text-[#EBE4DC]/70"
                                : "text-cozy-dark/75"
                        }`}
                    >
                        {product.description}
                    </p>
                </div>

                {/* Pricing and Soft Action button */}
                <div
                    className={`pt-3 border-t flex flex-col gap-2 ${
                        activeTheme === "evening"
                            ? "border-[#5A483B]/30"
                            : "border-cozy-wood/10"
                    }`}
                >
                    <div className="flex items-center justify-between">
                        {/* Price tag */}
                        <div className="flex items-baseline gap-1.5">
                            <span
                                className={`text-sm sm:text-base font-bold font-mono ${
                                    activeTheme === "evening"
                                        ? "text-cozy-warm-yellow"
                                        : "text-cozy-dark"
                                }`}
                            >
                                {product.price.toLocaleString("vi-VN")}đ
                            </span>
                            {product.originalPrice > product.price && (
                                <span
                                    className={`text-xs line-through font-mono ${
                                        activeTheme === "evening"
                                            ? "text-[#EBE4DC]/40"
                                            : "text-cozy-dark/40"
                                    }`}
                                >
                                    {product.originalPrice.toLocaleString(
                                        "vi-VN",
                                    )}
                                    đ
                                </span>
                            )}
                        </div>

                        {/* Micro badge */}
                        <span
                            className={`text-[10px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full ${
                                activeTheme === "evening"
                                    ? "bg-cozy-warm-yellow/10 text-cozy-warm-yellow"
                                    : "bg-cozy-moss/10 text-cozy-moss"
                            }`}
                        >
                            {product.badge}
                        </span>
                    </div>

                    {/* Clean organic CTA */}
                    <a
                        href={product.affiliateUrl}
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        onClick={handleBuyClick}
                        className={`w-full inline-flex items-center justify-between px-4 py-2.5 rounded-full text-xs font-bold transition-all duration-500 cursor-pointer group/btn border ${
                            activeTheme === "evening"
                                ? "bg-[#241D19] hover:bg-cozy-warm-yellow text-[#EBE4DC] hover:text-[#181310] border-[#5A483B]/30"
                                : "bg-cozy-cream/35 hover:bg-cozy-wood text-cozy-dark hover:text-cozy-ivory border-cozy-wood/10"
                        }`}
                    >
                        <span className="flex items-center gap-1.5">
                            <Compass
                                size={13}
                                className="opacity-70 group-hover/btn:rotate-45 transition-transform duration-500"
                            />
                            <span>Tìm hiểu chiếc góc này</span>
                        </span>
                        <ArrowUpRight
                            size={13}
                            className="opacity-60 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-300"
                        />
                    </a>

                    <p
                        className={`text-[10px] text-center italic tracking-tight font-sans ${
                            activeTheme === "evening"
                                ? "text-[#EBE4DC]/30"
                                : "text-cozy-dark/40"
                        }`}
                    >
                        Sản phẩm có mặt tại gian hàng TikTok Shop chính hãng
                    </p>
                </div>
            </div>
        </article>
    );
};
