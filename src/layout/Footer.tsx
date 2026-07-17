import React from "react";
import { Mail, Facebook, Instagram, Heart } from "lucide-react";
import { CozyLogo } from "../components/CozyLogo";

export const Footer: React.FC = () => {
    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer
            id="about-us"
            className="bg-cozy-cream/40 border-t border-cozy-wood/10 pt-16 pb-8 px-4 md:px-8 text-cozy-dark relative overflow-hidden"
        >
            {/* Decorative leaf shapes */}
            <div className="absolute top-24 left-10 w-24 h-24 rounded-full bg-cozy-moss/5 blur-3xl pointer-events-none" />
            <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-cozy-warm-yellow/5 blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto flex flex-col gap-12 relative z-10">
                {/* Upper Layout */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand block */}
                    <div className="md:col-span-2 space-y-4">
                        <button
                            onClick={handleScrollToTop}
                            className="flex items-center gap-2 group text-left cursor-pointer focus:outline-none"
                        >
                            <CozyLogo size={36} />
                            <span className="font-serif text-lg font-bold tracking-tight text-cozy-dark">
                                Tan Ca Rồi
                            </span>
                        </button>
                        <p className="text-xs md:text-sm text-cozy-dark/70 max-w-sm leading-relaxed font-sans">
                            “Một góc nhỏ dành cho những người đã có một ngày hơi
                            dài. Bật chút âm thanh rì rào, tựa lưng nghỉ ngơi và
                            cảm nhận những điều nhỏ nhặt bên chiếc đèn vàng.”
                        </p>

                        {/* Social channels */}
                        <div className="flex items-center gap-3 pt-2">
                            <a
                                href="https://tiktok.com/@hanng300"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-8 h-8 rounded-full border border-cozy-wood/15 hover:bg-cozy-wood hover:text-cozy-ivory flex items-center justify-center transition-all duration-300"
                                aria-label="Kênh TikTok Tan Ca Rồi"
                            >
                                <svg
                                    className="w-4 h-4"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.01 1.62 4.2 1.01.85 2.29 1.35 3.63 1.41.02 1.44-.01 2.89 0 4.33-1.3-.08-2.58-.58-3.62-1.37V14c.05 1.58-.29 3.19-1.07 4.58-1.05 1.77-2.83 3.03-4.85 3.38-1.89.37-3.92.05-5.59-1.01C4.46 19.64 3.32 17.5 3.38 15.2c.04-2.5 1.7-4.8 4.1-5.53.4-.11.83-.21 1.25-.26.02 1.4-.01 2.81 0 4.22-.59.13-1.18.39-1.63.81-.88.75-1.14 2.06-.6 3.09.52 1.05 1.75 1.69 2.91 1.48 1.15-.15 2.12-1.14 2.27-2.29.13-1.54.04-3.08.06-4.63C11.75 8.13 11.74 4.07 11.73 0c.26.01.53.02.8.02z" />
                                </svg>
                            </a>
                            <a
                                href="https://www.facebook.com/han16062003"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-8 h-8 rounded-full border border-cozy-wood/15 hover:bg-cozy-wood hover:text-cozy-ivory flex items-center justify-center transition-all duration-300"
                                aria-label="Facebook Tan Ca Rồi"
                            >
                                <Facebook size={15} />
                            </a>
                            <a
                                href="https://www.instagram.com/nvhan166v3/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-8 h-8 rounded-full border border-cozy-wood/15 hover:bg-cozy-wood hover:text-cozy-ivory flex items-center justify-center transition-all duration-300"
                                aria-label="Instagram Tan Ca Rồi"
                            >
                                <Instagram size={15} />
                            </a>
                            <a
                                href="mailto:nvhan2k3@gmail.com"
                                className="w-8 h-8 rounded-full border border-cozy-wood/15 hover:bg-cozy-wood hover:text-cozy-ivory flex items-center justify-center transition-all duration-300"
                                aria-label="Email liên hệ"
                            >
                                <Mail size={15} />
                            </a>
                        </div>
                    </div>

                    {/* Quick links */}
                    <div className="space-y-4">
                        <h5 className="font-serif text-sm font-semibold text-cozy-dark tracking-wider uppercase">
                            Chủ đề
                        </h5>
                        <ul className="space-y-2 text-xs text-cozy-dark/75">
                            <li>
                                <a
                                    href="#mood-selector"
                                    className="hover:text-cozy-wood transition-colors"
                                >
                                    Chọn mood cảm xúc
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#desk-interactive"
                                    className="hover:text-cozy-wood transition-colors"
                                >
                                    Góc setup tương tác
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#products-showcase"
                                    className="hover:text-cozy-wood transition-colors"
                                >
                                    Đồ nhỏ, mood lớn
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#journal-section"
                                    className="hover:text-cozy-wood transition-colors"
                                >
                                    Nhật ký văn phòng
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#collections-showcase"
                                    className="hover:text-cozy-wood transition-colors"
                                >
                                    Bộ sưu tập mộc mạc
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Policy Links */}
                    <div className="space-y-4">
                        <h5 className="font-serif text-sm font-semibold text-cozy-dark tracking-wider uppercase">
                            Chính sách
                        </h5>
                        <ul className="space-y-2 text-xs text-cozy-dark/75">
                            <li>
                                <a
                                    href="#affiliate-policy"
                                    className="hover:text-cozy-wood transition-colors"
                                >
                                    Chính sách Affiliate
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#privacy"
                                    className="hover:text-cozy-wood transition-colors"
                                >
                                    Quyền riêng tư của bạn
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#terms"
                                    className="hover:text-cozy-wood transition-colors"
                                >
                                    Điều khoản trải nghiệm
                                </a>
                            </li>
                            <li>
                                <a
                                    href="mailto:gocnho@tancaroi.vn"
                                    className="hover:text-cozy-wood transition-colors"
                                >
                                    Hợp tác tiếp thị
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Affiliate Transparency Disclosure Section */}
                <div
                    id="affiliate-policy"
                    className="p-5 md:p-6 bg-cozy-cream/60 border border-cozy-wood/10 rounded-2xl"
                >
                    <h6 className="text-[11px] font-bold text-cozy-moss uppercase tracking-wider mb-2">
                        Tuyên bố minh bạch liên kết tiếp thị
                    </h6>
                    <p className="text-xs text-cozy-dark/70 leading-relaxed font-sans">
                        Góc nhỏ <strong>“Tan Ca Rồi”</strong> hoạt động dựa trên
                        mô hình tiếp thị liên kết (Affiliate Marketing). Một số
                        liên kết trên trang web này (đặc biệt là các nút hướng
                        đến TikTok Shop) là liên kết tiếp thị. Khi bạn mua hàng
                        qua các đường link này, tụi mình có thể sẽ nhận được một
                        khoản hoa hồng nho nhỏ từ đối tác bán hàng. Khoản phí
                        này hoàn toàn không làm thay đổi giá bán gốc của sản
                        phẩm đối với bạn, nhưng nó sẽ là một nguồn lực tinh thần
                        quý báu giúp tụi mình duy trì, cải tiến trang web và
                        tiếp tục viết nên những câu chuyện nhẹ nhàng cho mọi
                        người. Cảm ơn bạn rất nhiều vì đã ủng hộ!
                    </p>
                </div>

                {/* Bottom copyright & warm signature */}
                <div className="pt-8 border-t border-cozy-wood/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-cozy-dark/50">
                    <div>
                        &copy; {new Date().getFullYear()} Tan Ca Rồi. Đã đăng ký
                        bản quyền.
                    </div>
                    <div className="flex items-center gap-1">
                        <span>Làm với một chút cà phê</span>
                        <span className="text-cozy-warm-yellow">&#9733;</span>
                        <span>
                            ánh đèn bàn vàng ấm và những ngày không vội vã.
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
};
