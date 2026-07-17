import React, { useState, useEffect, useRef } from 'react';
import { Timer, Play, Pause, RotateCcw, Volume2, Music, Check, Sparkles, Coffee, Calendar, Plus, Minus, Flame, ListChecks, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TimeTheme } from '../types';
import { tracks } from '../components/AudioPlayerMini';

interface PomodoroSectionProps {
  activeTheme?: TimeTheme;
  isAudioPlaying: boolean;
  onPlayPauseToggle: (playing: boolean) => void;
  activeTrackId: string;
  onChangeTrack: (trackId: string) => void;
  onToast: (msg: string, type: 'info' | 'success' | 'heart' | 'error') => void;
}

type TimerMode = 'focus' | 'shortBreak' | 'longBreak';

interface FocusLog {
  id: string;
  timestamp: string;
  taskName: string;
  durationMinutes: number;
  mode: TimerMode;
}

export const PomodoroSection: React.FC<PomodoroSectionProps> = ({
  activeTheme = 'morning',
  isAudioPlaying,
  onPlayPauseToggle,
  activeTrackId,
  onChangeTrack,
  onToast,
}) => {
  // 1. Durations (in minutes)
  const [baseTimes, setBaseTimes] = useState({
    focus: 25,
    shortBreak: 5,
    longBreak: 15,
  });

  // 2. State variables
  const [mode, setMode] = useState<TimerMode>('focus');
  const [timeLeft, setTimeLeft] = useState<number>(25 * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [taskName, setTaskName] = useState<string>('');
  const [isAutoPlayAudio, setIsAutoPlayAudio] = useState<boolean>(true);
  
  // Choose focus track & break track
  const [focusTrackId, setFocusTrackId] = useState<string>('focus-piano');
  const [breakTrackId, setBreakTrackId] = useState<string>('nature');

  // Stats
  const [logs, setLogs] = useState<FocusLog[]>([]);
  const [showHistory, setShowHistory] = useState<boolean>(false);

  // Interval reference
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Max duration (base time in seconds)
  const totalSeconds = baseTimes[mode] * 60;

  // Sound selection options
  const focusTrackOptions = tracks;

  // Load stats & logs on initial render
  useEffect(() => {
    try {
      const savedLogs = localStorage.getItem('tancaroi_focus_logs');
      if (savedLogs) {
        setLogs(JSON.parse(savedLogs));
      }
    } catch (e) {
      console.error('Error loading focus logs', e);
    }
  }, []);

  // Save logs on change
  const saveLogs = (newLogs: FocusLog[]) => {
    setLogs(newLogs);
    try {
      localStorage.setItem('tancaroi_focus_logs', JSON.stringify(newLogs));
    } catch (e) {
      console.error('Error saving focus logs', e);
    }
  };

  // Synchronize time left when mode or baseTimes changes
  useEffect(() => {
    if (!isRunning) {
      setTimeLeft(baseTimes[mode] * 60);
    }
  }, [mode, baseTimes]);

  // Synthesize a comforting Tibetan Singing Bowl sound using Web Audio API on completion
  const playCozyChime = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      const now = ctx.currentTime;

      // Base cozy fundamental tone (A3, resonant)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(220, now); // A3

      // Tibetan singing bowl harmonic 1 (Perfect fifth, E4)
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(330, now); // E4

      // Harmonic 2 (High shimmer octave, A4)
      const osc3 = ctx.createOscillator();
      const gain3 = ctx.createGain();
      osc3.type = 'sine';
      osc3.frequency.setValueAtTime(440, now); // A4

      // Soft vibration (LFO)
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.value = 6; // 6Hz gentle pulsing
      lfoGain.gain.value = 8; // pitch frequency shift
      
      lfo.connect(lfoGain);
      lfoGain.connect(osc1.frequency);
      lfoGain.connect(osc2.frequency);

      // Gain envelopes for smooth fadeout
      gain1.gain.setValueAtTime(0.4, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 4);

      gain2.gain.setValueAtTime(0.2, now);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 3);

      gain3.gain.setValueAtTime(0.1, now);
      gain3.gain.exponentialRampToValueAtTime(0.001, now + 2);

      // Connect nodes
      osc1.connect(gain1);
      osc2.connect(gain2);
      osc3.connect(gain3);

      gain1.connect(ctx.destination);
      gain2.connect(ctx.destination);
      gain3.connect(ctx.destination);

      lfo.start(now);
      osc1.start(now);
      osc2.start(now);
      osc3.start(now);

      lfo.stop(now + 4);
      osc1.stop(now + 4);
      osc2.stop(now + 4);
      osc3.stop(now + 4);
    } catch (err) {
      console.warn('Web Audio chime not supported or blocked by user interaction', err);
    }
  };

  // Timer tick effect
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleTimerComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, mode, baseTimes, isAutoPlayAudio, focusTrackId, breakTrackId]);

  // Handle countdown complete
  const handleTimerComplete = () => {
    setIsRunning(false);
    playCozyChime();

    const currentModeName = mode === 'focus' ? 'Phiên tập trung' : 'Thời gian nghỉ';
    onToast(`☕ ${currentModeName} đã hoàn thành! Bạn làm tốt lắm.`, 'success');

    // If it was a focus session, log it
    if (mode === 'focus') {
      const activeTask = taskName.trim() || 'Tập trung tĩnh lặng';
      const newLog: FocusLog = {
        id: Math.random().toString(36).substring(2, 9),
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
        taskName: activeTask,
        durationMinutes: baseTimes.focus,
        mode: 'focus',
      };
      saveLogs([newLog, ...logs]);

      // Switch to Short Break automatically
      setMode('shortBreak');
      setTimeLeft(baseTimes.shortBreak * 60);
      onToast('Chuyển sang chế độ nghỉ ngơi ngắn 🌿 Hãy vươn vai nhé.', 'info');
      
      // Auto recommend calming track for break
      if (isAutoPlayAudio) {
        onChangeTrack(breakTrackId);
        onPlayPauseToggle(true);
      }
    } else {
      // Break is complete, switch back to Focus
      setMode('focus');
      setTimeLeft(baseTimes.focus * 60);
      onToast('Đã hết giờ nghỉ ngơi. Cùng bắt đầu phiên tập trung mới nhé!', 'info');
      
      // Auto recommend focus track
      if (isAutoPlayAudio) {
        onChangeTrack(focusTrackId);
        onPlayPauseToggle(true);
      }
    }
  };

  // Sync play/pause click with timer
  const handleToggleTimer = () => {
    const nextRunning = !isRunning;
    setIsRunning(nextRunning);

    if (nextRunning) {
      onToast(`Bắt đầu đếm ngược ${mode === 'focus' ? 'tập trung' : 'nghỉ ngơi'}...`, 'success');
      // If auto-play music is checked, activate the target track
      if (isAutoPlayAudio) {
        const targetTrack = mode === 'focus' ? focusTrackId : breakTrackId;
        onChangeTrack(targetTrack);
        onPlayPauseToggle(true);
      }
    } else {
      onToast('Tạm dừng thời gian.', 'info');
      // Pause audio if option enabled
      if (isAutoPlayAudio) {
        onPlayPauseToggle(false);
      }
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(baseTimes[mode] * 60);
    onToast('Đặt lại thời gian.', 'info');
    if (isAutoPlayAudio) {
      onPlayPauseToggle(false);
    }
  };

  // Switch modes manually
  const handleModeChange = (newMode: TimerMode) => {
    setIsRunning(false);
    setMode(newMode);
    setTimeLeft(baseTimes[newMode] * 60);
    
    let label = 'Phiên tập trung';
    if (newMode === 'shortBreak') label = 'Nghỉ ngắn';
    if (newMode === 'longBreak') label = 'Nghỉ dài';
    onToast(`Chuyển sang ${label}.`, 'info');
  };

  // Modify base time manually
  const adjustBaseTime = (modeToAdjust: TimerMode, amount: number) => {
    setBaseTimes((prev) => {
      const current = prev[modeToAdjust];
      const next = Math.max(1, Math.min(120, current + amount));
      return {
        ...prev,
        [modeToAdjust]: next,
      };
    });
    onToast('Đã điều chỉnh độ dài thời gian.', 'info');
  };

  // Calculation for progress circle
  const progressRatio = totalSeconds > 0 ? timeLeft / totalSeconds : 0;
  const radius = 110;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progressRatio);

  // Helper to format remaining time
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Quick stats calculations
  const totalFocusMinutesCount = logs
    .filter((log) => log.mode === 'focus')
    .reduce((sum, log) => sum + log.durationMinutes, 0);

  const completedFocusSessions = logs.filter((log) => log.mode === 'focus').length;

  return (
    <section
      id="focus-timer-section"
      className={`py-24 px-6 md:py-32 md:px-12 border-b relative bg-grain transition-all duration-[1200ms] ${
        activeTheme === 'evening'
          ? 'bg-[#1E1713] border-[#5A483B]/20 text-[#EBE4DC]'
          : 'bg-[#FFFDF9] border-cozy-wood/5 text-cozy-dark'
      }`}
    >
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Poetic Section Header */}
        <div className="text-center space-y-3 max-w-xl mx-auto">
          <span className={`text-xs sm:text-sm font-bold uppercase tracking-[0.25em] flex items-center justify-center gap-1.5 transition-colors ${
            activeTheme === 'evening' ? 'text-cozy-warm-yellow' : 'text-cozy-moss'
          }`}>
            <Timer size={14} className="animate-pulse" />
            Hộp thời gian tĩnh lặng
          </span>
          <h2 className={`font-serif text-2xl sm:text-3xl md:text-4xl font-semibold transition-colors ${
            activeTheme === 'evening' ? 'text-[#EBE4DC]' : 'text-cozy-dark'
          }`}>
            Phương pháp Pomodoro & Chill
          </h2>
          <p className={`text-sm leading-relaxed font-serif italic transition-colors ${
            activeTheme === 'evening' ? 'text-[#EBE4DC]/80' : 'text-cozy-dark/80'
          }`}>
            “Từng nhịp thời gian chậm rãi trôi qua cùng âm thanh sóng âm dịu nhẹ, xoa dịu những hối hả, thắp sáng sự tập trung tối đa của bạn.”
          </p>
        </div>

        {/* Master Box layout */}
        <div className={`border-2 rounded-[32px] p-6 sm:p-10 shadow-xl transition-colors duration-500 relative overflow-hidden ${
          activeTheme === 'evening'
            ? 'bg-[#1C1713] border-[#5A483B]/30'
            : 'bg-[#FFFDF6] border-cozy-wood/10'
        }`}>
          {/* Subtle background glow depending on mode */}
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full blur-[100px] pointer-events-none opacity-20 transition-all duration-1000 ${
            mode === 'focus' 
              ? 'bg-cozy-warm-yellow' 
              : mode === 'shortBreak' 
                ? 'bg-cozy-moss' 
                : 'bg-indigo-400'
          }`} />

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
            
            {/* Left side: Animated Circular Clock */}
            <div className="md:col-span-6 flex flex-col items-center justify-center space-y-4">
              <div className="relative w-64 h-64 flex items-center justify-center">
                {/* SVG Progress Circle */}
                <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                  {/* Background light circle */}
                  <circle
                    cx="128"
                    cy="128"
                    r={radius}
                    className={`stroke-current ${
                      activeTheme === 'evening' ? 'text-[#3E342B]/30' : 'text-cozy-wood/5'
                    }`}
                    strokeWidth="8"
                    fill="transparent"
                  />
                  {/* Dynamic Foreground indicator */}
                  <motion.circle
                    cx="128"
                    cy="128"
                    r={radius}
                    strokeDasharray={circumference}
                    animate={{ strokeDashoffset }}
                    transition={{ duration: isRunning ? 1 : 0.4, ease: 'linear' }}
                    className={`stroke-current transition-colors duration-[1000ms] ${
                      mode === 'focus'
                        ? 'text-cozy-warm-yellow'
                        : mode === 'shortBreak'
                          ? 'text-cozy-moss'
                          : 'text-indigo-400'
                    }`}
                    strokeWidth="10"
                    strokeLinecap="round"
                    fill="transparent"
                  />
                </svg>

                {/* Central digital timer text */}
                <div className="text-center z-10 space-y-1">
                  <span className={`text-xs font-mono font-bold uppercase tracking-widest ${
                    mode === 'focus'
                      ? 'text-cozy-warm-yellow'
                      : mode === 'shortBreak'
                        ? 'text-cozy-moss'
                        : 'text-indigo-400'
                  }`}>
                    {mode === 'focus' ? 'TẬP TRUNG' : mode === 'shortBreak' ? 'NGHỈ NGẮN' : 'NGHỈ DÀI'}
                  </span>
                  <div className={`text-5xl sm:text-6xl font-mono font-bold tracking-tight ${
                    activeTheme === 'evening' ? 'text-[#FFFDF8]' : 'text-cozy-dark'
                  }`}>
                    {formatTime(timeLeft)}
                  </div>
                  <p className={`text-[10px] font-sans italic opacity-70 ${
                    activeTheme === 'evening' ? 'text-[#EBE4DC]/60' : 'text-cozy-dark/60'
                  }`}>
                    {isRunning ? 'Nhịp gõ êm đềm...' : 'Đã dừng'}
                  </p>
                </div>
              </div>

              {/* Central Clock Controls */}
              <div className="flex items-center gap-4 pt-2">
                {/* Reset button */}
                <button
                  onClick={handleReset}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all border cursor-pointer ${
                    activeTheme === 'evening'
                      ? 'bg-[#241D19] border-[#5A483B]/40 hover:bg-[#2D231D] text-[#EBE4DC]/80'
                      : 'bg-[#FFFDF6] border-cozy-wood/10 hover:bg-cozy-cream/30 text-cozy-dark/80'
                  }`}
                  title="Đặt lại phiên"
                >
                  <RotateCcw size={16} />
                </button>

                {/* Start / Pause trigger */}
                <button
                  onClick={handleToggleTimer}
                  className={`px-7 py-3 rounded-full flex items-center gap-2 font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-lg cursor-pointer hover:scale-103 active:scale-97 ${
                    isRunning
                      ? 'bg-[#C15C3D] hover:bg-[#A94F32] text-cozy-ivory shadow-[#C15C3D]/10'
                      : mode === 'focus'
                        ? 'bg-cozy-warm-yellow hover:bg-[#F2D7A5] text-[#181310] shadow-cozy-warm-yellow/10'
                        : mode === 'shortBreak'
                          ? 'bg-cozy-moss hover:bg-emerald-700 text-cozy-ivory shadow-cozy-moss/15'
                          : 'bg-indigo-500 hover:bg-indigo-600 text-cozy-ivory shadow-indigo-500/15'
                  }`}
                >
                  {isRunning ? (
                    <>
                      <Pause size={14} fill="currentColor" />
                      <span>Tạm dừng</span>
                    </>
                  ) : (
                    <>
                      <Play size={14} fill="currentColor" className="ml-0.5" />
                      <span>Bắt đầu</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Right side: Settings & Customizers */}
            <div className="md:col-span-6 space-y-6">
              
              {/* Mode switching tabs */}
              <div className="space-y-2">
                <label className={`text-[10px] font-mono uppercase tracking-wider block font-bold ${
                  activeTheme === 'evening' ? 'text-[#EBE4DC]/50' : 'text-cozy-dark/50'
                }`}>
                  Chế độ hiện tại
                </label>
                <div className={`grid grid-cols-3 gap-1.5 p-1 rounded-2xl border ${
                  activeTheme === 'evening' ? 'bg-[#241D19] border-[#5A483B]/30' : 'bg-cozy-cream/15 border-cozy-wood/10'
                }`}>
                  {(['focus', 'shortBreak', 'longBreak'] as TimerMode[]).map((m) => (
                    <button
                      key={m}
                      onClick={() => handleModeChange(m)}
                      className={`py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                        mode === m
                          ? m === 'focus'
                            ? 'bg-cozy-warm-yellow text-[#181310] shadow-sm'
                            : m === 'shortBreak'
                              ? 'bg-cozy-moss text-cozy-ivory shadow-sm'
                              : 'bg-indigo-500 text-cozy-ivory shadow-sm'
                          : 'text-cozy-dark/60 hover:text-cozy-dark transition-colors'
                      }`}
                    >
                      {m === 'focus' ? 'Tập trung' : m === 'shortBreak' ? 'Nghỉ ngắn' : 'Nghỉ dài'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Adjustable timer lengths (+ / -) */}
              <div className="space-y-2">
                <label className={`text-[10px] font-mono uppercase tracking-wider block font-bold ${
                  activeTheme === 'evening' ? 'text-[#EBE4DC]/50' : 'text-cozy-dark/50'
                }`}>
                  Điều chỉnh thời gian (phút)
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {(['focus', 'shortBreak', 'longBreak'] as TimerMode[]).map((m) => (
                    <div
                      key={`adjust-${m}`}
                      className={`flex flex-col items-center p-2 rounded-xl border ${
                        activeTheme === 'evening' ? 'bg-[#241D19]/40 border-[#5A483B]/20' : 'bg-[#FFFDF6] border-cozy-wood/5'
                      }`}
                    >
                      <span className="text-[10px] font-medium opacity-60 mb-1">
                        {m === 'focus' ? 'T.Trung' : m === 'shortBreak' ? 'N.Ngắn' : 'N.Dài'}
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => adjustBaseTime(m, -1)}
                          className={`w-5 h-5 rounded-full flex items-center justify-center cursor-pointer hover:bg-cozy-wood/5 ${
                            activeTheme === 'evening' ? 'text-cozy-warm-yellow' : 'text-cozy-wood'
                          }`}
                        >
                          <Minus size={10} strokeWidth={3} />
                        </button>
                        <span className="text-xs font-mono font-bold">{baseTimes[m]}m</span>
                        <button
                          onClick={() => adjustBaseTime(m, 1)}
                          className={`w-5 h-5 rounded-full flex items-center justify-center cursor-pointer hover:bg-cozy-wood/5 ${
                            activeTheme === 'evening' ? 'text-cozy-warm-yellow' : 'text-cozy-wood'
                          }`}
                        >
                          <Plus size={10} strokeWidth={3} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mindful Task Input */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className={`text-[10px] font-mono uppercase tracking-wider block font-bold ${
                    activeTheme === 'evening' ? 'text-[#EBE4DC]/50' : 'text-cozy-dark/50'
                  }`}>
                    Hôm nay bạn tập trung cho việc gì?
                  </label>
                  <span className={`text-[10px] font-mono uppercase ${
                    activeTheme === 'evening' ? 'text-cozy-warm-yellow/65' : 'text-cozy-moss/80'
                  }`}>
                    {taskName ? 'Ghi nhớ' : 'Tùy chọn'}
                  </span>
                </div>
                <input
                  type="text"
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                  placeholder="Lọc email, viết code, đọc sách..."
                  className={`w-full rounded-2xl px-4 py-2.5 text-xs focus:outline-none transition-colors border ${
                    activeTheme === 'evening'
                      ? 'bg-[#241D19] border-[#5A483B]/40 text-[#EBE4DC] placeholder:text-[#EBE4DC]/30 focus:border-cozy-warm-yellow/60'
                      : 'bg-white border-cozy-wood/15 text-cozy-dark placeholder:text-cozy-dark/35 focus:border-cozy-wood'
                  }`}
                />
              </div>

              {/* Audio integration selectors */}
              <div className="space-y-3 pt-2">
                
                {/* Auto-Play Toggle */}
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold block">Tự động phát nhạc cùng nhịp</span>
                    <span className={`text-[10px] block opacity-70 ${
                      activeTheme === 'evening' ? 'text-[#EBE4DC]/60' : 'text-cozy-dark/60'
                    }`}>
                      Kích hoạt nhạc nền của bạn khi đồng hồ chạy
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setIsAutoPlayAudio(!isAutoPlayAudio);
                      onToast(`Đã ${!isAutoPlayAudio ? 'bật' : 'tắt'} tự phát nhạc đồng bộ.`, 'info');
                    }}
                    className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                      isAutoPlayAudio
                        ? activeTheme === 'evening' ? 'bg-cozy-warm-yellow' : 'bg-cozy-moss'
                        : activeTheme === 'evening' ? 'bg-cozy-wood/20' : 'bg-cozy-cream/40'
                    }`}
                  >
                    <span className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 ${
                      isAutoPlayAudio ? 'translate-x-5' : ''
                    }`} />
                  </button>
                </div>

                {/* Sub-selectors for track options */}
                <AnimatePresence>
                  {isAutoPlayAudio && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="grid grid-cols-2 gap-3 pt-1.5 overflow-hidden"
                    >
                      {/* Focus Track */}
                      <div className="space-y-1">
                        <span className={`text-[9px] font-mono uppercase block ${
                          activeTheme === 'evening' ? 'text-[#EBE4DC]/40' : 'text-cozy-dark/40'
                        }`}>Nhạc khi tập trung</span>
                        <select
                          value={focusTrackId}
                          onChange={(e) => {
                            setFocusTrackId(e.target.value);
                            onToast('Đã lưu bản nhạc tập trung.', 'success');
                            if (isRunning && mode === 'focus') {
                              onChangeTrack(e.target.value);
                            }
                          }}
                          className={`w-full text-[11px] rounded-xl px-2.5 py-2 cursor-pointer focus:outline-none transition-colors border ${
                            activeTheme === 'evening'
                              ? 'bg-[#241D19] border-[#5A483B]/40 text-[#EBE4DC]'
                              : 'bg-white border-cozy-wood/15 text-cozy-dark'
                          }`}
                        >
                          {focusTrackOptions.map((tr) => (
                            <option key={`focus-opt-${tr.id}`} value={tr.id}>
                              {tr.name.replace('Bản nhạc ', '').replace('môi trường ', '')}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Break Track */}
                      <div className="space-y-1">
                        <span className={`text-[9px] font-mono uppercase block ${
                          activeTheme === 'evening' ? 'text-[#EBE4DC]/40' : 'text-cozy-dark/40'
                        }`}>Nhạc khi nghỉ ngơi</span>
                        <select
                          value={breakTrackId}
                          onChange={(e) => {
                            setBreakTrackId(e.target.value);
                            onToast('Đã lưu bản nhạc nghỉ ngơi.', 'success');
                            if (isRunning && mode !== 'focus') {
                              onChangeTrack(e.target.value);
                            }
                          }}
                          className={`w-full text-[11px] rounded-xl px-2.5 py-2 cursor-pointer focus:outline-none transition-colors border ${
                            activeTheme === 'evening'
                              ? 'bg-[#241D19] border-[#5A483B]/40 text-[#EBE4DC]'
                              : 'bg-white border-cozy-wood/15 text-cozy-dark'
                          }`}
                        >
                          {focusTrackOptions.map((tr) => (
                            <option key={`break-opt-${tr.id}`} value={tr.id}>
                              {tr.name.replace('Bản nhạc ', '').replace('môi trường ', '')}
                            </option>
                          ))}
                        </select>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>

            </div>

          </div>

          {/* Bottom stats summary panel with toggle button */}
          <div className={`mt-10 pt-6 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
            activeTheme === 'evening' ? 'border-[#5A483B]/20' : 'border-cozy-wood/10'
          }`}>
            <div className="flex items-center gap-6">
              <div className="space-y-0.5">
                <span className={`text-[10px] font-mono uppercase tracking-wider block ${
                  activeTheme === 'evening' ? 'text-[#EBE4DC]/40' : 'text-cozy-dark/40'
                }`}>Thống kê hôm nay</span>
                <div className="flex items-baseline gap-1">
                  <span className={`text-xl font-mono font-bold ${
                    activeTheme === 'evening' ? 'text-cozy-warm-yellow' : 'text-cozy-wood'
                  }`}>
                    {totalFocusMinutesCount}
                  </span>
                  <span className="text-xs opacity-75">phút tập trung</span>
                  <span className="text-xs opacity-30 px-1.5">•</span>
                  <span className={`text-xl font-mono font-bold ${
                    activeTheme === 'evening' ? 'text-cozy-warm-yellow' : 'text-cozy-wood'
                  }`}>
                    {completedFocusSessions}
                  </span>
                  <span className="text-xs opacity-75">chu kỳ</span>
                </div>
              </div>
            </div>

            {/* History logs disclosure button */}
            <button
              onClick={() => setShowHistory(!showHistory)}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider border cursor-pointer transition-all ${
                activeTheme === 'evening'
                  ? 'bg-[#241D19] border-[#5A483B]/40 text-[#EBE4DC] hover:bg-[#2D231D]'
                  : 'bg-[#FFFDF6] border-cozy-wood/15 text-cozy-dark hover:bg-cozy-cream/35'
              }`}
            >
              <ListChecks size={12} />
              <span>{showHistory ? 'Ẩn nhật ký phiên' : 'Xem nhật ký phiên'}</span>
            </button>
          </div>

          {/* Expandable History list */}
          <AnimatePresence>
            {showHistory && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className={`mt-5 pt-5 border-t border-dashed ${
                  activeTheme === 'evening' ? 'border-[#5A483B]/20' : 'border-cozy-wood/10'
                }`}>
                  <h4 className="text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <Calendar size={12} className={activeTheme === 'evening' ? 'text-cozy-warm-yellow' : 'text-cozy-wood'} />
                    <span>Lịch sử phiên tập trung hôm nay</span>
                  </h4>
                  
                  {logs.length === 0 ? (
                    <p className={`text-xs italic py-4 opacity-60 ${
                      activeTheme === 'evening' ? 'text-[#EBE4DC]/60' : 'text-cozy-dark/60'
                    }`}>
                      Chưa có phiên tập trung nào hoàn thành trong ngày hôm nay. Hãy thắp đèn, bật nhạc và bắt đầu chu kỳ đầu tiên nhé!
                    </p>
                  ) : (
                    <div className="max-h-40 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                      {logs.map((log) => (
                        <div
                          key={log.id}
                          className={`flex items-center justify-between p-2.5 rounded-xl border text-xs ${
                            activeTheme === 'evening'
                              ? 'bg-[#241D19]/40 border-[#5A483B]/15'
                              : 'bg-white border-cozy-wood/5'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                              <Check size={11} strokeWidth={3} />
                            </div>
                            <span className="font-semibold truncate text-cozy-dark/95 dark:text-cozy-ivory">{log.taskName}</span>
                          </div>
                          
                          <div className="flex items-center gap-2.5 text-[10px] font-mono opacity-70 shrink-0">
                            <span>{log.durationMinutes} phút</span>
                            <span>•</span>
                            <span>{log.timestamp}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex justify-end pt-3">
                    <button
                      onClick={() => {
                        if (confirm('Bạn có muốn xóa toàn bộ lịch sử tập trung hôm nay không?')) {
                          saveLogs([]);
                          onToast('Đã xóa sạch lịch sử.', 'info');
                        }
                      }}
                      className="text-[9px] font-mono text-red-500/80 hover:text-red-500 hover:underline cursor-pointer uppercase"
                    >
                      Xóa lịch sử hôm nay
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

        {/* Footnote tips statement */}
        <div className={`text-center space-y-1 p-4 border rounded-2xl transition-colors ${
          activeTheme === 'evening' ? 'border-[#5A483B]/20 bg-[#241D19]/20' : 'border-cozy-wood/10 bg-cozy-cream/10'
        }`}>
          <p className="text-xs font-serif italic flex items-center justify-center gap-1.5">
            <Sparkles size={11} className="text-cozy-warm-yellow fill-cozy-warm-yellow animate-spin-slow" />
            <span>Mách nhỏ từ tuyển lựa viên:</span>
          </p>
          <p className={`text-[11px] max-w-xl mx-auto leading-relaxed ${
            activeTheme === 'evening' ? 'text-[#EBE4DC]/70' : 'text-cozy-dark/80'
          }`}>
            Khi chuyển sang <strong>Thời gian nghỉ</strong>, hãy nhắm mắt lại hoặc nhìn xa 20 mét để đôi mắt mệt mỏi được điều tiết lại sau những giờ làm việc căng thẳng bạn nhé!
          </p>
        </div>

      </div>
    </section>
  );
};
