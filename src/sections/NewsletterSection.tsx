import React, { useState } from "react";
import { Mail, Sparkles, Send } from "lucide-react";
import { saveSubscription } from "../lib/localStorage";
import { motion, AnimatePresence } from "motion/react";
import { TimeTheme } from "../types";

interface NewsletterSectionProps {
    onToast: (
        msg: string,
        type: "info" | "success" | "heart" | "error",
    ) => void;
    activeTheme?: TimeTheme;
}

export const NewsletterSection: React.FC<NewsletterSectionProps> = ({
    onToast,
    activeTheme = "morning",
}) => {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // 1. Basic validation
        if (!email) {
            onToast("Vui lòng nhập địa chỉ email của bạn nhé.", "error");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            onToast(
                "Email không đúng định dạng rồi, hãy kiểm tra lại nhé.",
                "error",
            );
            return;
        }

        // 2. Mock loading transition
        setIsLoading(true);
        onToast("Đang đóng dấu sáp niêm phong thư...", "info");

        setTimeout(() => {
            saveSubscription(email);
            setIsLoading(false);
            setIsSubscribed(true);
            setEmail("");
            onToast(
                "Đã ghi tên bạn vào danh sách nhận thư tay đầu tuần. Hẹn gặp bạn nhé!",
                "success",
            );
        }, 1500);
    };

    return (
        <section
            id="newsletter-section"
            className={`py-32 md:py-48 px-6 md:px-12 border-b relative overflow-hidden bg-grain transition-all duration-[1200ms] ${
                activeTheme === "evening"
                    ? "bg-[#181310] border-[#5A483B]/20 text-[#EBE4DC]"
                    : "bg-cozy-cream/30 border-cozy-wood/5 text-cozy-dark"
            }`}
        >
            {/* Decorative ambient blobs */}
            <div className="absolute top-1/2 left-1/4 w-96 h-96 rounded-full bg-cozy-warm-yellow/5 blur-[130px] -translate-y-1/2 pointer-events-none" />
            <div className="absolute bottom-4 right-1/4 w-96 h-96 rounded-full bg-cozy-moss/5 blur-[130px] pointer-events-none" />

            <div className="max-w-3xl mx-auto text-center relative z-10 space-y-10">
                {/* Floating post symbol */}
                <div
                    className={`flex items-center justify-center gap-2 tracking-[0.25em] text-[10px] font-bold uppercase transition-colors ${
                        activeTheme === "evening"
                            ? "text-cozy-warm-yellow"
                            : "text-cozy-wood/60"
                    }`}
                >
                    <span
                        className={`w-1.5 h-1.5 rounded-full ${activeTheme === "evening" ? "bg-cozy-warm-yellow/30" : "bg-cozy-wood/30"}`}
                    />
                    <span>Hòm thư gõ cửa</span>
                    <span
                        className={`w-1.5 h-1.5 rounded-full ${activeTheme === "evening" ? "bg-cozy-warm-yellow/30" : "bg-cozy-wood/30"}`}
                    />
                </div>

                {/* Poetic Title Block */}
                <div className="space-y-4">
                    <h2
                        className={`font-serif text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight text-balance transition-colors ${
                            activeTheme === "evening"
                                ? "text-[#EBE4DC]"
                                : "text-cozy-dark"
                        }`}
                    >
                        Thỉnh thoảng, mình viết cho nhau <br />
                        <span
                            className={`font-serif italic font-light transition-colors ${
                                activeTheme === "evening"
                                    ? "text-cozy-warm-yellow"
                                    : "text-cozy-wood"
                            }`}
                        >
                            vài dòng thư tay mộc mạc.
                        </span>
                    </h2>
                    <p
                        className={`text-sm sm:text-base max-w-lg mx-auto leading-relaxed transition-colors ${
                            activeTheme === "evening"
                                ? "text-[#EBE4DC]/80"
                                : "text-cozy-dark/80"
                        }`}
                    >
                        Không có thư rác hay những dòng thông báo khuyến mãi ồn
                        ào. Chỉ có những lời kể chuyện mộc mạc bên ánh lửa, vài
                        playlist lofi tuyển lựa cho đêm mưa, hay gợi ý những món
                        đồ gỗ mộc khiến căn phòng của bạn ấm cúng hơn.
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
                                <div
                                    className={`flex-1 flex items-center gap-3 border-b pb-2 px-1 focus-within:border-cozy-wood transition-colors ${
                                        activeTheme === "evening"
                                            ? "border-[#5A483B]/40 focus-within:border-cozy-warm-yellow"
                                            : "border-cozy-wood/30 focus-within:border-cozy-wood"
                                    }`}
                                >
                                    <Mail
                                        size={16}
                                        className={
                                            activeTheme === "evening"
                                                ? "text-[#EBE4DC]/40"
                                                : "text-cozy-dark/50"
                                        }
                                    />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        placeholder="Địa chỉ hòm thư của bạn..."
                                        className={`w-full bg-transparent text-sm font-semibold focus:outline-none font-sans py-2 ${
                                            activeTheme === "evening"
                                                ? "text-[#EBE4DC] placeholder-[#EBE4DC]/30"
                                                : "text-cozy-dark placeholder-cozy-dark/35"
                                        }`}
                                        disabled={isLoading}
                                        aria-label="Địa chỉ email đăng ký nhận thư tay"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className={`px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-500 flex items-center justify-center gap-1.5 shadow-xl active:scale-97 disabled:opacity-50 cursor-pointer shrink-0 ${
                                        activeTheme === "evening"
                                            ? "bg-cozy-warm-yellow hover:bg-[#F2D7A5] text-[#181310] shadow-cozy-warm-yellow/5"
                                            : "bg-cozy-wood hover:bg-cozy-moss text-[#FFFDF8] shadow-cozy-wood/10"
                                    }`}
                                >
                                    {isLoading ? (
                                        <>
                                            <span className="w-3 h-3 rounded-full border-2 border-white border-t-transparent animate-spin" />
                                            Đang đóng dấu sáp...
                                        </>
                                    ) : (
                                        <>
                                            <a
                                                href="mailto:nvhan2k3@gmail.com"
                                                className="flex items-center gap-1.5"
                                            >
                                                Gửi gắm bình yên{" "}
                                                <Send size={13} />
                                            </a>
                                        </>
                                    )}
                                </button>
                            </motion.form>
                        ) : (
                            <motion.div
                                key="subscription-success"
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className={`p-8 border rounded-[24px] shadow-2xl transition-colors ${
                                    activeTheme === "evening"
                                        ? "bg-[#1C1713] border-[#5A483B]/40 text-[#EBE4DC]"
                                        : "bg-[#FFFDF8] border-cozy-wood/10 text-cozy-dark shadow-cozy-dark/5"
                                }`}
                            >
                                <h3
                                    className={`font-serif text-lg font-bold italic mb-2 ${
                                        activeTheme === "evening"
                                            ? "text-cozy-warm-yellow"
                                            : "text-cozy-wood"
                                    }`}
                                >
                                    Đã niêm phong hòm thư của bạn!
                                </h3>
                                <p
                                    className={`text-sm leading-relaxed font-sans ${
                                        activeTheme === "evening"
                                            ? "text-[#EBE4DC]/80"
                                            : "text-cozy-dark/80"
                                    }`}
                                >
                                    Một sợi dây tơ đã nối liền hòm thư của chúng
                                    ta. Tụi mình sẽ gửi đi lá thư tay đầu tiên
                                    cùng playlist xoa dịu đôi mắt mỏi mệt sớm
                                    thôi. Đôi khi thư có thể lơ đãng lạc vào thư
                                    mục quảng cáo (Promotions) hoặc Spam, hãy
                                    kiểm tra giúp tụi mình nhé.
                                </p>
                                <button
                                    onClick={() => setIsSubscribed(false)}
                                    className={`mt-5 text-xs font-bold uppercase tracking-wider cursor-pointer transition-colors ${
                                        activeTheme === "evening"
                                            ? "text-cozy-warm-yellow hover:underline"
                                            : "text-cozy-moss hover:underline"
                                    }`}
                                >
                                    Gửi lá thư khác &rarr;
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};
