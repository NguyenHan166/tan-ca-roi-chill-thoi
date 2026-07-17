import { useState, useEffect } from 'react';
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

  // Show Toast helper
  const addToast = (message: string, type: ToastMessage['type'] = 'info') => {
    const id = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    
    // Automatically dismiss toast after 2.2 seconds
    setTimeout(() => {
      removeToast(id);
    }, 2200);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Sync ambient audio when mood selection changes
  const handleSelectMood = (moodId: string) => {
    setSelectedMoodId(moodId);
    
    // Auto-recommend a track
    const selectedMood = moods.find((m) => m.id === moodId);
    if (selectedMood && selectedMood.recommendedAudioId) {
      setActiveTrackId(selectedMood.recommendedAudioId);
      addToast(`Đã gợi ý bản âm thanh phù hợp với trạng thái của bạn.`, 'success');
    }
  };

  const handleClearMoodFilter = () => {
    setSelectedMoodId('');
    addToast('Đã xóa bộ lọc trạng thái cảm xúc.', 'info');
  };

  const handleToggleFavorite = (productId: string) => {
    const updated = toggleFavorite(productId);
    setFavoritedIds(updated);
  };

  const handleStartChillMode = () => {
    setIsAudioPlaying(true);
    addToast('Đã kích hoạt chế độ chill! Hãy lắng nghe âm thanh rì rào rì rầm nhé.', 'success');
    
    // Scroll smoothly to mood selector
    const el = document.getElementById('mood-selector');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToDesk = () => {
    const el = document.getElementById('cozy-desk');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Extract favorited products list
  const favoritedProductsList = products.filter((p) => favoritedIds.includes(p.id));

  // Determine top-level background class based on active time theme
  const getThemeWrapperClass = () => {
    switch (activeTheme) {
      case 'morning':
        return 'bg-[#FFFDF8] text-[#302922] transition-colors duration-1000';
      case 'afternoon':
        return 'bg-[#FAF5ED] text-[#302922] transition-colors duration-1000';
      case 'evening':
        return 'bg-[#F4EFE7] text-[#302922] transition-colors duration-1000';
      default:
        return 'bg-[#F4EFE7] text-[#302922]';
    }
  };

  return (
    <div className={`min-h-screen antialiased flex flex-col font-sans ${getThemeWrapperClass()}`}>
      
      {/* 1. Sticky Navigation Header */}
      <Header
        isAudioPlaying={isAudioPlaying}
        onToggleAudio={() => setIsAudioPlaying(!isAudioPlaying)}
        savedCount={favoritedIds.length}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
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
        <GreetingSection />

        {/* Interactive Mood Selector */}
        <MoodSection
          selectedMoodId={selectedMoodId}
          onSelectMood={handleSelectMood}
          onToast={addToast}
        />

        {/* Interactive Workspace Photo Showcase */}
        <section className="py-24 px-4 md:px-8 border-b border-cozy-wood/5 max-w-7xl mx-auto w-full" id="cozy-desk">
          <MyDeskShowcase onToast={addToast} />
        </section>

        {/* Curated Products Affiliate Showcase Grid */}
        <ProductSection
          selectedMoodId={selectedMoodId}
          onClearMoodFilter={handleClearMoodFilter}
          favoritedIds={favoritedIds}
          onToggleFavorite={handleToggleFavorite}
          onToast={addToast}
        />

        {/* Cinematic Parallax Quote Divider */}
        <ParallaxQuoteSection />

        {/* Editorial Stories & Video Diaries */}
        <JournalSection onToast={addToast} />

        {/* Atmospheric Weather Forecast Widget */}
        <section className="py-28 px-4 md:px-8 bg-cozy-cream/15 border-b border-cozy-wood/5 relative bg-grain" id="cozy-weather">
          <div className="max-w-7xl mx-auto w-full">
            <WeatherCozy onToast={addToast} />
          </div>
        </section>

        {/* Newsletter subscription box */}
        <NewsletterSection onToast={addToast} />
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
