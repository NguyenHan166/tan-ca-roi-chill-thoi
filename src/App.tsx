import { useState, useEffect, useCallback, useMemo } from 'react';
import { Header } from './layout/Header';
import { Footer } from './layout/Footer';
import { HeroSection } from './sections/HeroSection';
import { GreetingSection } from './sections/GreetingSection';
import { MoodSection } from './sections/MoodSection';
import { WeatherCozy } from './components/WeatherCozy';
import { MyDeskShowcase } from './components/MyDeskShowcase';
import { ProductSection } from './sections/ProductSection';
import { ParallaxQuoteSection } from './sections/ParallaxQuoteSection';
import { JournalSection } from './sections/JournalSection';
import { NewsletterSection } from './sections/NewsletterSection';
import { AudioPlayerMini, tracks } from './components/AudioPlayerMini';
import { FavoriteDrawer } from './components/FavoriteDrawer';
import { Toast } from './components/Toast';
import { PomodoroSection } from './sections/PomodoroSection';

import { Product, ToastMessage, TimeTheme } from './types';
import { getFavorites, toggleFavorite } from './lib/localStorage';
import { products } from './data/products';
import { moods } from './data/moods';

export default function App() {
  // 1. Time-based Theme Setup
  const [activeTheme, setActiveTheme] = useState<TimeTheme>('evening');
  const [selectedMoodId, setSelectedMoodId] = useState<string>('');
  
  // 2. Global Audio state
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const [activeTrackId, setActiveTrackId] = useState<string>('lofi');

  // 3. Favorites state
  const [favoritedIds, setFavoritedIds] = useState<string[]>([]);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState<boolean>(false);

  // 4. Toast system
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Auto-detect device time for initial theme load
  useEffect(() => {
    const hours = new Date().getHours();
    if (hours >= 5 && hours < 12) {
      setActiveTheme('morning');
    } else if (hours >= 12 && hours < 18) {
      setActiveTheme('afternoon');
    } else {
      setActiveTheme('evening');
    }

    // Populate initial favorites from localStorage
    setFavoritedIds(getFavorites());
  }, []);

  // Ambient sound auto-transition when theme changes
  useEffect(() => {
    if (activeTheme === 'morning') {
      setActiveTrackId('nature');
    } else if (activeTheme === 'afternoon') {
      setActiveTrackId('cafe');
    } else if (activeTheme === 'evening') {
      setActiveTrackId('rain');
    }
  }, [activeTheme]);

  // Show Toast helper
  const addToast = useCallback((message: string, type: ToastMessage['type'] = 'info') => {
    // No-op: Disable all notifications/toasts as requested
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Sync ambient audio when mood selection changes
  const handleSelectMood = useCallback((moodId: string) => {
    setSelectedMoodId(moodId);
    
    // Auto-recommend a track
    const selectedMood = moods.find((m) => m.id === moodId);
    if (selectedMood && selectedMood.recommendedAudioId) {
      setActiveTrackId(selectedMood.recommendedAudioId);
      addToast(`Đã gợi ý bản âm thanh phù hợp với trạng thái của bạn.`, 'success');
    }
  }, [addToast]);

  const handleClearMoodFilter = useCallback(() => {
    setSelectedMoodId('');
    addToast('Đã xóa bộ lọc trạng thái cảm xúc.', 'info');
  }, [addToast]);

  const handleToggleFavorite = useCallback((productId: string) => {
    const updated = toggleFavorite(productId);
    setFavoritedIds(updated);
  }, []);

  const handleStartChillMode = useCallback(() => {
    setIsAudioPlaying(true);
    addToast('Đã kích hoạt chế độ chill! Hãy lắng nghe âm thanh rì rào rì rầm nhé.', 'success');
    
    // Scroll smoothly to mood selector
    const el = document.getElementById('mood-selector');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, [addToast]);

  const handleScrollToDesk = useCallback(() => {
    const el = document.getElementById('cozy-desk');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleToggleAudio = useCallback(() => {
    setIsAudioPlaying((playing) => !playing);
  }, []);

  const handleOpenFavorites = useCallback(() => {
    setIsFavoritesOpen(true);
  }, []);

  // Extract favorited products list
  const favoritedProductsList = useMemo(
    () => products.filter((p) => favoritedIds.includes(p.id)),
    [favoritedIds],
  );

  // Determine top-level background class based on active time theme
  const getThemeWrapperClass = () => {
    switch (activeTheme) {
      case 'morning':
        return 'bg-[#FFFDF6] text-[#3A332B] transition-all duration-[1200ms]';
      case 'afternoon':
        return 'bg-[#FAF2E5] text-[#3E342B] transition-all duration-[1200ms]';
      case 'evening':
        return 'bg-[#181310] text-[#EBE4DC] transition-all duration-[1200ms]';
      default:
        return 'bg-[#181310] text-[#EBE4DC]';
    }
  };

  return (
    <div className={`min-h-screen antialiased flex flex-col font-sans transition-all duration-[1200ms] ${getThemeWrapperClass()}`}>
      
      {/* 1. Sticky Navigation Header */}
      <Header
        isAudioPlaying={isAudioPlaying}
        onToggleAudio={handleToggleAudio}
        savedCount={favoritedIds.length}
        onOpenFavorites={handleOpenFavorites}
        activeTheme={activeTheme}
        onChangeTheme={setActiveTheme}
        onToast={addToast}
        activeTrackId={activeTrackId}
        onChangeTrack={setActiveTrackId}
      />

      {/* 2. Primary Layout Sections */}
      <main className="flex-1">
        {/* Hero Banner */}
        <HeroSection
          onStartChill={handleStartChillMode}
          onExploreCorner={handleScrollToDesk}
          activeTheme={activeTheme}
          isAudioPlaying={isAudioPlaying}
        />

        {/* Emotional Greeting */}
        <GreetingSection activeTheme={activeTheme} />

        {/* Interactive Mood Selector */}
        <MoodSection
          selectedMoodId={selectedMoodId}
          onSelectMood={handleSelectMood}
          onToast={addToast}
        />

        {/* Interactive Workspace Photo Showcase */}
        <section className="py-24 px-4 md:px-8 border-b border-cozy-wood/5 max-w-7xl mx-auto w-full" id="cozy-desk">
          <MyDeskShowcase activeTheme={activeTheme} onToast={addToast} />
        </section>

        {/* Pomodoro Focus Timer */}
        <PomodoroSection
          activeTheme={activeTheme}
          isAudioPlaying={isAudioPlaying}
          onPlayPauseToggle={setIsAudioPlaying}
          activeTrackId={activeTrackId}
          onChangeTrack={setActiveTrackId}
          onToast={addToast}
        />

        {/* Curated Products Affiliate Showcase Grid */}
        <ProductSection
          selectedMoodId={selectedMoodId}
          onClearMoodFilter={handleClearMoodFilter}
          favoritedIds={favoritedIds}
          onToggleFavorite={handleToggleFavorite}
          onToast={addToast}
          activeTheme={activeTheme}
        />

        {/* Cinematic Parallax Quote Divider */}
        <ParallaxQuoteSection />

        {/* Editorial Stories & Video Diaries */}
        <JournalSection activeTheme={activeTheme} onToast={addToast} />

        {/* Atmospheric Weather Forecast Widget */}
        <section className={`py-28 px-4 md:px-8 border-b border-cozy-wood/5 relative bg-grain transition-colors duration-[1200ms] ${
          activeTheme === 'evening' ? 'bg-[#221A16]/40' : 'bg-cozy-cream/15'
        }`} id="cozy-weather">
          <div className="max-w-7xl mx-auto w-full">
            <WeatherCozy activeTheme={activeTheme} onToast={addToast} />
          </div>
        </section>

        {/* Newsletter subscription box */}
        <NewsletterSection onToast={addToast} activeTheme={activeTheme} />
      </main>

      {/* 3. Global Footer with Transparency Disclosures */}
      <Footer />

      {/* 4. Mini Floating Audio Ambient Controller */}
      <AudioPlayerMini
        isPlaying={isAudioPlaying}
        onPlayPauseToggle={setIsAudioPlaying}
        activeTrackId={activeTrackId}
        onChangeTrack={setActiveTrackId}
        onToast={addToast}
      />

      {/* 5. slide-out Favorites sidebar drawer panel */}
      <FavoriteDrawer
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        favoritedProducts={favoritedProductsList}
        onToggleFavorite={handleToggleFavorite}
      />

      {/* 6. Toast global trigger notifications */}
      <Toast toasts={toasts} removeToast={removeToast} />
    </div>
  );
}
