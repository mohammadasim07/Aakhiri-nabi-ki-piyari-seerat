import React from 'react';
import { 
  BookOpen, 
  Layers, 
  Clock, 
  Sparkles, 
  Bookmark, 
  Search, 
  Sun, 
  Moon, 
  Coffee, 
  Download, 
  HelpCircle,
  SplitSquareVertical,
  BarChart3,
  Smartphone,
  WifiOff
} from 'lucide-react';
import { BOOK_METADATA } from '../data/bookData';

export default function Header({
  activeTab,
  setActiveTab,
  lang,
  setLang,
  isDualMode,
  setIsDualMode,
  dualLangPair,
  theme,
  setTheme,
  onOpenSearch,
  onOpenBookmarks,
  onOpenDownload,
  bookmarkCount = 0,
  completionPercentage = 0,
  isOffline,
  canInstall,
  onInstallApp
}) {
  const toggleTheme = () => {
    if (theme === 'light') setTheme('sepia');
    else if (theme === 'sepia') setTheme('dark');
    else setTheme('light');
  };

  const getTitle = () => {
    if (lang === 'urdu') return BOOK_METADATA.titleUrdu;
    if (lang === 'hindi') return BOOK_METADATA.titleHindi;
    return BOOK_METADATA.titleEnglish;
  };

  const getAuthor = () => {
    if (lang === 'urdu') return BOOK_METADATA.authorUrdu;
    if (lang === 'hindi') return BOOK_METADATA.authorHindi;
    return BOOK_METADATA.authorEnglish;
  };

  const getSubTitle = () => {
    if (isDualMode) {
      return `Dual View (${dualLangPair[0].toUpperCase()} + ${dualLangPair[1].toUpperCase()})`;
    }
    if (lang === 'urdu') return 'اردو ایڈیشن (مکمل 147 صفحات)';
    if (lang === 'hindi') return 'हिन्दी एडिशन (मुकम्मल 147 पृष्ठ)';
    return 'English Edition (Full 166 Pages)';
  };

  return (
    <header className="sticky top-0 z-40 glass border-b transition-colors duration-200" style={{ borderColor: 'var(--border-color)' }}>
      {/* 1. Subtle Professional Top Branding Micro-Bar */}
      <div 
        className="w-full border-b py-1 px-3 sm:px-4 text-xs transition-colors"
        style={{ 
          borderColor: 'var(--border-subtle)', 
          backgroundColor: 'var(--bg-surface-elevated)' 
        }}
      >
        <div className="container mx-auto flex items-center justify-between">
          {/* Subtle Pill Branding */}
          <div className="flex items-center gap-1.5">
            <span 
              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-medium tracking-wide border transition-all"
              style={{ 
                backgroundColor: 'rgba(6, 95, 70, 0.06)', 
                borderColor: 'rgba(6, 95, 70, 0.18)', 
                color: 'var(--primary)' 
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Developed by Mohammad Asim
            </span>
          </div>

          {/* Right Utility Micro-Badges: Offline, Bookmarks, Downloads */}
          <div className="flex items-center gap-1 sm:gap-2 text-xs">
            {isOffline && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/30">
                <WifiOff size={10} />
                <span className="hidden xs:inline">{lang === 'english' ? 'Offline' : 'آف لائن'}</span>
              </span>
            )}

            {/* Bookmarks Counter */}
            <button
              onClick={onOpenBookmarks}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-[11px]"
              title="Bookmarks / محفوظ صفحات"
              style={{ color: 'var(--text-muted)' }}
            >
              <Bookmark size={12} style={{ color: 'var(--gold)' }} />
              <span className="font-mono">{bookmarkCount > 0 ? bookmarkCount : 0}</span>
            </button>

            {/* Offline Storage & PDFs Modal */}
            <button
              onClick={onOpenDownload}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-[11px]"
              title="Offline App Storage & Original PDFs"
              style={{ color: 'var(--text-muted)' }}
            >
              <Download size={12} />
              <span className="hidden xs:inline">{lang === 'english' ? 'Downloads' : lang === 'hindi' ? 'डाउनलोड' : 'ڈاؤنلوڈ'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <div className="container mx-auto px-3 sm:px-4 py-2 sm:py-2.5">
        {/* Mobile View: Two Rows */}
        <div className="flex sm:hidden flex-col gap-2">
          {/* Row 1: Brand Title + Search + Theme */}
          <div className="flex items-center justify-between gap-2.5">
            <div 
              className="flex items-center gap-2.5 min-w-0 flex-1 cursor-pointer" 
              onClick={() => setActiveTab('home')}
            >
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center shadow-xs flex-shrink-0 overflow-hidden border transition-transform active:scale-95"
                style={{ borderColor: 'var(--gold)', backgroundColor: 'var(--bg-surface)' }}
                title="Opening Page / صفحہ اول"
              >
                <img src="/app-logo.png" alt="App Logo" className="w-full h-full object-cover" />
              </div>
              
              <div className="min-w-0 flex-1">
                <h1 
                  className={`text-sm xs:text-base font-bold leading-tight truncate cursor-pointer ${
                    lang === 'urdu' ? 'font-urdu' : lang === 'hindi' ? 'font-hindi' : ''
                  }`}
                  style={{ color: 'var(--primary)' }}
                >
                  {getTitle()}
                </h1>
                <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">
                  {getSubTitle()}
                </p>
              </div>
            </div>

            {/* Actions: Consistent 40x40 Touch Targets */}
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <button
                onClick={onOpenSearch}
                className="w-10 h-10 rounded-xl border flex items-center justify-center transition-all hover:border-emerald-500 active:scale-95"
                style={{ backgroundColor: 'var(--bg-surface-elevated)', borderColor: 'var(--border-color)', color: 'var(--text-main)' }}
                title="Search / تلاش کریں"
                aria-label="Search"
              >
                <Search size={18} />
              </button>

              <button
                onClick={toggleTheme}
                className="w-10 h-10 rounded-xl border flex items-center justify-center transition-all hover:scale-105 active:scale-95"
                style={{ backgroundColor: 'var(--bg-surface-elevated)', borderColor: 'var(--border-color)' }}
                title={`Switch Theme (${theme})`}
                aria-label="Toggle Theme"
              >
                {theme === 'light' && <Coffee size={18} style={{ color: '#854d0e' }} />}
                {theme === 'sepia' && <Moon size={18} style={{ color: 'var(--primary)' }} />}
                {theme === 'dark' && <Sun size={18} style={{ color: 'var(--gold)' }} />}
              </button>
            </div>
          </div>

          {/* Row 2: Segmented Language Switcher */}
          <div 
            dir="ltr"
            className="flex items-center p-1 rounded-xl border text-xs font-semibold w-full shadow-xs"
            style={{ backgroundColor: 'var(--bg-surface-elevated)', borderColor: 'var(--border-color)' }}
          >
            <button
              onClick={() => { setLang('urdu'); setIsDualMode(false); }}
              className={`flex-1 py-1.5 rounded-lg text-center transition-all font-urdu ${
                lang === 'urdu' && !isDualMode 
                  ? 'shadow-sm font-bold text-white' 
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }`}
              style={{
                backgroundColor: lang === 'urdu' && !isDualMode ? 'var(--primary)' : 'transparent',
                color: lang === 'urdu' && !isDualMode ? '#ffffff' : undefined,
                lineHeight: '1.4'
              }}
            >
              اردو
            </button>

            <button
              onClick={() => { setLang('hindi'); setIsDualMode(false); }}
              className={`flex-1 py-1.5 rounded-lg text-center transition-all font-hindi ${
                lang === 'hindi' && !isDualMode 
                  ? 'shadow-sm font-bold text-white' 
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }`}
              style={{
                backgroundColor: lang === 'hindi' && !isDualMode ? 'var(--primary)' : 'transparent',
                color: lang === 'hindi' && !isDualMode ? '#ffffff' : undefined,
                lineHeight: '1.4'
              }}
            >
              हिन्दी
            </button>

            <button
              onClick={() => { setLang('english'); setIsDualMode(false); }}
              className={`flex-1 py-1.5 rounded-lg text-center transition-all ${
                lang === 'english' && !isDualMode 
                  ? 'shadow-sm font-bold text-white' 
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }`}
              style={{
                backgroundColor: lang === 'english' && !isDualMode ? 'var(--primary)' : 'transparent',
                color: lang === 'english' && !isDualMode ? '#ffffff' : undefined,
                lineHeight: '1.4'
              }}
            >
              English
            </button>

            <button
              onClick={() => setIsDualMode(!isDualMode)}
              className={`px-3 py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                isDualMode 
                  ? 'shadow-sm font-bold text-white' 
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }`}
              style={{
                backgroundColor: isDualMode ? 'var(--gold)' : 'transparent',
                color: isDualMode ? '#ffffff' : undefined,
                lineHeight: '1.4'
              }}
              title="Compare Urdu + English side-by-side"
            >
              <SplitSquareVertical size={14} className={isDualMode ? 'text-white' : 'text-amber-600 dark:text-amber-400'} />
              <span className="text-[11px] font-bold">Dual <span className="opacity-80 text-[10px] hidden xs:inline">(UR+EN)</span></span>
            </button>
          </div>
        </div>

        {/* Desktop View: Single Row */}
        <div className="hidden sm:flex items-center justify-between gap-4">
          {/* Title & Brand */}
          <div className="flex items-center gap-3 min-w-0">
            <div 
              className="w-11 h-11 rounded-xl flex items-center justify-center shadow-md cursor-pointer overflow-hidden border-2 flex-shrink-0 transition-transform hover:scale-105"
              style={{ borderColor: 'var(--gold)', backgroundColor: 'var(--bg-surface)' }}
              onClick={() => setActiveTab('home')}
              title="Opening Page / صفحہ اول"
            >
              <img src="/app-logo.png" alt="App Logo" className="w-full h-full object-cover" />
            </div>
            <div className="min-w-0">
              <h1 
                className={`text-lg sm:text-xl font-bold leading-tight truncate cursor-pointer ${
                  lang === 'urdu' ? 'font-urdu' : lang === 'hindi' ? 'font-hindi' : ''
                }`}
                style={{ color: 'var(--primary)' }}
                onClick={() => setActiveTab('home')}
              >
                {getTitle()}
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">
                {getSubTitle()}
              </p>
            </div>
          </div>

          {/* Center / Right Tools: Language Selector + Actions */}
          <div className="flex items-center gap-2.5 flex-shrink-0">
            {/* Trilingual & Dual Switcher */}
            <div 
              dir="ltr"
              className="flex items-center p-1 rounded-xl border text-xs font-semibold shadow-xs"
              style={{ backgroundColor: 'var(--bg-surface-elevated)', borderColor: 'var(--border-color)' }}
            >
              <button
                onClick={() => { setLang('urdu'); setIsDualMode(false); }}
                className={`px-3 py-1.5 rounded-lg transition-all font-urdu ${
                  lang === 'urdu' && !isDualMode ? 'shadow-sm font-bold text-white' : 'text-gray-600 dark:text-gray-300'
                }`}
                style={{
                  backgroundColor: lang === 'urdu' && !isDualMode ? 'var(--primary)' : 'transparent',
                  color: lang === 'urdu' && !isDualMode ? '#ffffff' : undefined,
                }}
              >
                اردو
              </button>

              <button
                onClick={() => { setLang('hindi'); setIsDualMode(false); }}
                className={`px-3 py-1.5 rounded-lg transition-all font-hindi ${
                  lang === 'hindi' && !isDualMode ? 'shadow-sm font-bold text-white' : 'text-gray-600 dark:text-gray-300'
                }`}
                style={{
                  backgroundColor: lang === 'hindi' && !isDualMode ? 'var(--primary)' : 'transparent',
                  color: lang === 'hindi' && !isDualMode ? '#ffffff' : undefined,
                }}
              >
                हिन्दी
              </button>

              <button
                onClick={() => { setLang('english'); setIsDualMode(false); }}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  lang === 'english' && !isDualMode ? 'shadow-sm font-bold text-white' : 'text-gray-600 dark:text-gray-300'
                }`}
                style={{
                  backgroundColor: lang === 'english' && !isDualMode ? 'var(--primary)' : 'transparent',
                  color: lang === 'english' && !isDualMode ? '#ffffff' : undefined,
                }}
              >
                English
              </button>

              <button
                onClick={() => setIsDualMode(!isDualMode)}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                  isDualMode ? 'shadow-sm font-bold text-white' : 'text-gray-600 dark:text-gray-300'
                }`}
                style={{
                  backgroundColor: isDualMode ? 'var(--gold)' : 'transparent',
                  color: isDualMode ? '#ffffff' : undefined,
                }}
                title="Compare Urdu + English side-by-side"
              >
                <SplitSquareVertical size={14} className={isDualMode ? 'text-white' : 'text-amber-600 dark:text-amber-400'} />
                <span>Dual (UR+EN)</span>
              </button>
            </div>

            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="w-10 h-10 rounded-xl border flex items-center justify-center transition-all hover:border-emerald-500 active:scale-95"
              style={{ backgroundColor: 'var(--bg-surface-elevated)', borderColor: 'var(--border-color)', color: 'var(--text-main)' }}
              title="Search / تلاش کریں"
              aria-label="Search"
            >
              <Search size={18} />
            </button>

            {/* Theme Selector */}
            <button
              onClick={toggleTheme}
              className="w-10 h-10 rounded-xl border flex items-center justify-center transition-all hover:scale-105 active:scale-95"
              style={{ backgroundColor: 'var(--bg-surface-elevated)', borderColor: 'var(--border-color)' }}
              title={`Switch Theme (${theme})`}
              aria-label="Toggle Theme"
            >
              {theme === 'light' && <Coffee size={18} style={{ color: '#854d0e' }} />}
              {theme === 'sepia' && <Moon size={18} style={{ color: 'var(--primary)' }} />}
              {theme === 'dark' && <Sun size={18} style={{ color: 'var(--gold)' }} />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
