import React, { useState, useEffect, useRef } from "react";
import {
    Play,
    Pause,
    Volume2,
    VolumeX,
    Music,
    CloudRain,
    Coffee,
    Trees,
    ChevronUp,
    ChevronDown,
    Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { AudioTrack } from "../types";
import nguyenVanMuoiTrack from "../music-data/Nguyễn Văn Mười - MCK.mp3";
import sonTungTrack from "../music-data/SON TUNG M-TP - COME MY WAY (softer version) - OFFICIAL MUSIC VIDEO.mp3";
import babyTrack from "../music-data/Baby - MCK (ft. marzuz).mp3";
import truMuaTrack from "../music-data/Trú Mưa - Nhóm HKT - Official MV.mp3";
import nghiemTongTrack from "../music-data/-NGHIÊM TỔNG & TRẦN TIỂU MUỘI- NGONGIODEMQUATRANGSANGDEMNAY prod. NGÔ HẠO & MAI CẢNH DỊ.mp3";
import thaiBinhTrack from "../music-data/Thái Bình Mồ Hôi Rơi - Sơn Tùng M-TP.mp3";

interface AudioPlayerMiniProps {
    isPlaying: boolean;
    onPlayPauseToggle: (playing: boolean) => void;
    activeTrackId: string;
    onChangeTrack: (trackId: string) => void;
    onToast: (
        msg: string,
        type: "info" | "success" | "heart" | "error",
    ) => void;
}

export const tracks: AudioTrack[] = [
    {
        id: "lofi",
        name: "Bản nhạc Lofi hoàng hôn",
        url: nguyenVanMuoiTrack, // Fallback URL
        iconName: "Music",
    },
    {
        id: "focus-piano",
        name: "Dương cầm tập trung sâu",
        url: sonTungTrack, // Concentration track
        iconName: "Sparkles",
    },
    {
        id: "alpha-waves",
        name: "Tần số sóng não Alpha",
        url: babyTrack, // Concentration track
        iconName: "Sparkles",
    },
    {
        id: "rain",
        name: "Mưa rơi hiên nhà cũ",
        url: truMuaTrack, // Fallback URL
        iconName: "CloudRain",
    },
    {
        id: "cafe",
        name: "Quán nước quen xôn xao",
        url: nghiemTongTrack, // Fallback URL
        iconName: "Coffee",
    },
    {
        id: "nature",
        name: "Tiếng đêm thôn quê yên bình",
        url: thaiBinhTrack, // Fallback URL
        iconName: "Trees",
    },
];

export const AudioPlayerMini: React.FC<AudioPlayerMiniProps> = ({
    isPlaying,
    onPlayPauseToggle,
    activeTrackId,
    onChangeTrack,
    onToast,
}) => {
    const [volume, setVolume] = useState<number>(0.5);
    const [isMuted, setIsMuted] = useState<boolean>(false);
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const currentTrack =
        tracks.find((t) => t.id === activeTrackId) || tracks[0];

    const createAudio = () => {
        const audio = new Audio(currentTrack.url);
        audio.loop = true;
        audio.preload = "metadata";
        audio.volume = isMuted ? 0 : volume;

        audio.addEventListener("timeupdate", () => {
            // The native event fires several times per second. Updating the UI at a
            // lower cadence keeps the floating player responsive while music plays.
            setCurrentTime((previous) =>
                Math.abs(audio.currentTime - previous) >= 0.25
                    ? audio.currentTime
                    : previous,
            );
        });
        const updateDuration = () => setDuration(audio.duration || 0);
        audio.addEventListener("durationchange", updateDuration);
        audio.addEventListener("loadedmetadata", updateDuration);

        audioRef.current = audio;
        return audio;
    };

    useEffect(() => {
        return () => {
            const audio = audioRef.current;
            if (!audio) return;
            audio.pause();
            audio.removeAttribute("src");
            audio.load();
            audioRef.current = null;
        };
    }, []);

    // Sync track changes
    useEffect(() => {
        if (audioRef.current) {
            const wasPlaying = isPlaying;
            audioRef.current.pause();

            audioRef.current.src = currentTrack.url;
            audioRef.current.load();
            audioRef.current.volume = isMuted ? 0 : volume;
            setCurrentTime(0);

            if (wasPlaying) {
                audioRef.current.play().catch((err) => {
                    console.warn(
                        "Audio play was interrupted or requires interaction: ",
                        err,
                    );
                    onPlayPauseToggle(false);
                });
            }
        }
    }, [activeTrackId]);

    // Sync playing state
    useEffect(() => {
        if (isPlaying) {
            const audio = audioRef.current || createAudio();
            audio.play().catch((err) => {
                    console.warn("Audio play blocked: ", err);
                    onPlayPauseToggle(false);
            });
        } else {
            audioRef.current?.pause();
        }
    }, [isPlaying]);

    // Sync volume state
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = isMuted ? 0 : volume;
        }
    }, [volume, isMuted]);

    const handleTogglePlay = () => {
        const nextState = !isPlaying;
        onPlayPauseToggle(nextState);
    };

    const handleMuteToggle = () => {
        setIsMuted(!isMuted);
    };

    const handleTrackSelect = (id: string) => {
        onChangeTrack(id);
    };

    const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTime = parseFloat(e.target.value);
        setCurrentTime(newTime);
        if (audioRef.current) {
            audioRef.current.currentTime = newTime;
        }
    };

    const formatTime = (secs: number) => {
        if (isNaN(secs) || !isFinite(secs)) return "00:00";
        const m = Math.floor(secs / 60);
        const s = Math.floor(secs % 60);
        return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
    };

    const renderIcon = (name: string, size = 18) => {
        switch (name) {
            case "CloudRain":
                return <CloudRain size={size} />;
            case "Coffee":
                return <Coffee size={size} />;
            case "Trees":
                return <Trees size={size} />;
            case "Sparkles":
                return <Sparkles size={size} />;
            default:
                return <Music size={size} />;
        }
    };

    return (
        <div
            className="fixed inset-x-4 bottom-4 z-[99999] box-border flex max-w-[calc(100vw-2rem)] flex-col items-stretch gap-2 md:bottom-6 md:left-6 md:right-auto md:max-w-none md:items-start"
            id="cozy-ambient-audio-player"
        >
            <div className="w-full min-w-0 max-w-full box-border overflow-hidden rounded-2xl border-2 border-cozy-wood/20 bg-cozy-ivory p-3 shadow-2xl backdrop-blur-md transition-all duration-300 md:w-88">
                <div className="flex min-w-0 items-center justify-between gap-3">
                    {/* Track Info */}
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="group flex min-w-0 flex-1 items-center gap-3 text-left cursor-pointer"
                    >
                        <div className="w-10 h-10 rounded-full bg-cozy-wood/5 flex items-center justify-center text-cozy-wood shrink-0 relative overflow-hidden">
                            {isPlaying && (
                                <span className="absolute inset-0 bg-cozy-warm-yellow/20 animate-ping rounded-full" />
                            )}
                            {renderIcon(currentTrack.iconName, 18)}
                        </div>

                        <div className="flex-1 min-w-0">
                            <span className="text-[11px] uppercase tracking-wider text-cozy-moss font-bold block">
                                Âm thanh môi trường
                            </span>
                            <span className="text-sm font-sans font-semibold text-cozy-dark block truncate group-hover:text-cozy-wood transition-colors">
                                {currentTrack.name}
                            </span>
                        </div>

                        <div className="text-cozy-dark/40 group-hover:text-cozy-dark transition-colors shrink-0">
                            {isExpanded ? (
                                <ChevronDown size={16} />
                            ) : (
                                <ChevronUp size={16} />
                            )}
                        </div>
                    </button>

                    {/* Controls */}
                    <div className="flex shrink-0 items-center gap-2">
                        <button
                            onClick={handleMuteToggle}
                            className="w-8 h-8 rounded-full hover:bg-cozy-wood/5 flex items-center justify-center text-cozy-dark/70 hover:text-cozy-dark transition-colors cursor-pointer"
                            aria-label={
                                isMuted ? "Mở âm thanh" : "Tắt âm thanh"
                            }
                        >
                            {isMuted ? (
                                <VolumeX size={16} />
                            ) : (
                                <Volume2 size={16} />
                            )}
                        </button>

                        <button
                            onClick={handleTogglePlay}
                            className="h-10 w-10 shrink-0 rounded-full bg-cozy-wood text-cozy-ivory flex items-center justify-center hover:bg-cozy-moss hover:scale-105 active:scale-95 transition-all duration-300 shadow-md cursor-pointer"
                            aria-label={
                                isPlaying ? "Tạm dừng" : "Bật âm thanh chill"
                            }
                        >
                            {isPlaying ? (
                                <Pause size={16} fill="currentColor" />
                            ) : (
                                <Play
                                    size={16}
                                    className="ml-0.5"
                                    fill="currentColor"
                                />
                            )}
                        </button>
                    </div>
                </div>

                {/* Music Progress Bar (Thanh tiến trình nhạc) */}
                <div className="mt-3 px-1 space-y-1.5">
                    <input
                        type="range"
                        min="0"
                        max={duration || 100}
                        step="0.1"
                        value={currentTime}
                        onChange={handleProgressChange}
                        className="cozy-slider cursor-pointer focus:outline-none"
                        aria-label="Tiến trình nhạc"
                        style={{
                            background: `linear-gradient(to right, #775B45 0%, #775B45 ${((currentTime / (duration || 100)) * 100).toFixed(1)}%, rgba(119, 91, 69, 0.15) ${((currentTime / (duration || 100)) * 100).toFixed(1)}%, rgba(119, 91, 69, 0.15) 100%)`,
                        }}
                    />
                    <div className="flex justify-between text-[10px] font-mono text-cozy-dark/50">
                        <span>{formatTime(currentTime)}</span>
                        <span>{formatTime(duration)}</span>
                    </div>
                </div>

                {/* Expandable Tracks and Volume */}
                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                        >
                            <div className="h-px bg-cozy-wood/10 my-3" />

                            {/* Volume Slider */}
                            <div className="flex items-center gap-3 px-1 mb-3">
                                <Volume2
                                    size={14}
                                    className="text-cozy-dark/60"
                                />
                                <input
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.05"
                                    value={volume}
                                    onChange={(e) => {
                                        setVolume(parseFloat(e.target.value));
                                        setIsMuted(false);
                                    }}
                                    className="w-full h-1 bg-cozy-wood/10 rounded-lg appearance-none cursor-pointer accent-cozy-wood focus:outline-none"
                                    aria-label="Điều chỉnh âm lượng"
                                />
                                <span className="text-xs font-mono text-cozy-dark/60 w-6 text-right">
                                    {Math.round(volume * 100)}%
                                </span>
                            </div>

                            {/* Tracks List */}
                            <div className="grid grid-cols-2 gap-2 mt-2">
                                {tracks.map((track) => (
                                    <button
                                        key={track.id}
                                        onClick={() =>
                                            handleTrackSelect(track.id)
                                        }
                                        className={`flex items-center gap-2 p-2 rounded-xl text-left text-xs transition-all duration-200 cursor-pointer ${
                                            activeTrackId === track.id
                                                ? "bg-cozy-wood text-cozy-ivory font-medium"
                                                : "bg-cozy-wood/5 hover:bg-cozy-wood/10 text-cozy-dark/80"
                                        }`}
                                    >
                                        <span
                                            className={
                                                activeTrackId === track.id
                                                    ? "text-cozy-warm-yellow"
                                                    : "text-cozy-wood"
                                            }
                                        >
                                            {renderIcon(track.iconName, 14)}
                                        </span>
                                        <span className="truncate">
                                            {track.name
                                                .split(" ")
                                                .slice(2)
                                                .join(" ") || track.name}
                                        </span>
                                    </button>
                                ))}
                            </div>

                            {/* Live Playing Waveform Indicator */}
                            {isPlaying && (
                                <div className="flex items-center justify-center gap-0.5 mt-3 h-3">
                                    <span
                                        className="w-0.5 h-full bg-cozy-moss/60 animate-bounce"
                                        style={{
                                            animationDelay: "0.1s",
                                            animationDuration: "0.8s",
                                        }}
                                    />
                                    <span
                                        className="w-0.5 h-1/2 bg-cozy-moss/60 animate-bounce"
                                        style={{
                                            animationDelay: "0.3s",
                                            animationDuration: "1.2s",
                                        }}
                                    />
                                    <span
                                        className="w-0.5 h-5/6 bg-cozy-moss/60 animate-bounce"
                                        style={{
                                            animationDelay: "0.5s",
                                            animationDuration: "0.9s",
                                        }}
                                    />
                                    <span
                                        className="w-0.5 h-2/3 bg-cozy-moss/60 animate-bounce"
                                        style={{
                                            animationDelay: "0.2s",
                                            animationDuration: "1.1s",
                                        }}
                                    />
                                    <span
                                        className="w-0.5 h-full bg-cozy-moss/60 animate-bounce"
                                        style={{
                                            animationDelay: "0.4s",
                                            animationDuration: "0.7s",
                                        }}
                                    />
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
