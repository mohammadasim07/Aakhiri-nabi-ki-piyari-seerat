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
  bookmarkCount,
  completionPercentage,
  isOffline,
  canInstall,
  onInstallApp
}) {
  const toggleTheme = () => {
    if (theme === 'light') setTheme('sepia');
    else if (theme === 'sepia') setTheme('dark');
    else setTheme('light');
  };

  const navItems = [
    { 
      id: 'reader', 
      labelUrdu: 'کتاب کا مطالعہ', 
      labelHindi: 'किताब का अध्ययन', 
      labelEnglish: 'Book Reader',
      icon: BookOpen 
    },
    { 
      id: 'progress', 
      labelUrdu: `مطالعہ ریکارڈ (${completionPercentage}%)`, 
      labelHindi: `अध्ययन रिकॉर्ड (${completionPercentage}%)`, 
      labelEnglish: `Progress (${completionPercentage}%)`, 
      icon: BarChart3 
    },
    { 
      id: 'chapters', 
      labelUrdu: 'تمام ابواب', 
      labelHindi: 'अध्याय सूची', 
      labelEnglish: '13 Chapters',
      icon: Layers 
    },
    { 
      id: 'timeline', 
      labelUrdu: 'سیرت ٹائم لائن', 
      labelHindi: 'सीरत टाइमलाइन', 
      labelEnglish: 'Timeline',
      icon: Clock 
    },
    { 
      id: 'shamail', 
      labelUrdu: 'شمائلِ مصطفےٰ', 
      labelHindi: 'शमाइले मुस्तफ़ा', 
      labelEnglish: 'Shamail',
      icon: Sparkles 
    },
    { 
      id: 'quiz', 
      labelUrdu: 'سیرت کوئز', 
      labelHindi: 'सीरत क्विज़', 
      labelEnglish: 'Quiz',
      icon: HelpCircle 
    },
    { 
      id: 'durood', 
      labelUrdu: 'درود شریف', 
      labelHindi: 'दुरूद शरीफ', 
      labelEnglish: 'Salawat',
      icon: HeartIcon 
    }
  ];

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
      {/* Top Utility Bar */}
      <div className="border-b" style={{ borderColor: 'var(--border-subtle)', backgroundColor: 'var(--bg-surface-elevated)' }}>
        <div className="container mx-auto px-3 sm:px-4 py-1 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: 'var(--gold-light)', color: 'var(--gold)' }}>
              بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
            </span>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full font-medium border text-[11px] whitespace-nowrap" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-color)', color: 'var(--primary)' }}>
              Developed by Mohammad Asim
            </span>
            <span className="hidden md:inline" style={{ color: 'var(--text-muted)' }}>
              {getAuthor()}
            </span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-3">
            {/* Offline Status Badge */}
            {isOffline && (
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-medium bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30">
                <WifiOff size={11} /> <span className="hidden xs:inline">{lang === 'english' ? 'Offline' : 'آف لائن'}</span>
              </span>
            )}

            {/* Install PWA App Button */}
            {canInstall && (
              <button
                onClick={onInstallApp}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold text-white shadow-xs transition-opacity hover:opacity-90"
                style={{ backgroundColor: 'var(--primary)' }}
                title="Install App on Device / موبائل یا کمپیوٹر پر ایپ انسٹال کریں"
              >
                <Smartphone size={11} /> <span className="hidden xs:inline">{lang === 'english' ? 'Install' : 'انسٹال'}</span>
              </button>
            )}

            {/* Bookmarks Counter */}
            <button
              onClick={onOpenBookmarks}
              className="flex items-center gap-1 px-1.5 sm:px-2 py-1 rounded hover:bg-black/5 dark:hover:bg-white/5 transition-colors relative text-xs"
              title="Bookmarks / محفوظ صفحات"
            >
              <Bookmark size={14} style={{ color: 'var(--gold)' }} />
              <span className="font-mono text-xs">{bookmarkCount > 0 ? bookmarkCount : ''}</span>
            </button>

            {/* Offline Storage & PDF Downloads */}
            <button
              onClick={onOpenDownload}
              className="flex items-center gap-1 px-1.5 sm:px-2 py-1 rounded hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-xs"
              title="Offline App Storage & Original PDFs (Urdu, Hindi, English)"
            >
              <Download size={14} />
              <span className="hidden xs:inline">{lang === 'english' ? 'Offline / PDFs' : 'آف لائن'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="container mx-auto px-3 sm:px-4 py-2 sm:py-3">
        {/* Mobile View: Two Rows */}
        <div className="flex sm:hidden flex-col gap-2">
          {/* Row 1: Brand Title + Search + Theme */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0" onClick={() => setActiveTab('reader')}>
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white shadow-sm font-bold text-sm flex-shrink-0 cursor-pointer"
                style={{ background: 'linear-gradient(135deg, var(--primary), var(--primary-hover))' }}
              >
                ﷺ
              </div>
              <div className="min-w-0">
                <h1 
                  className={`text-sm font-bold leading-tight truncate cursor-pointer ${
                    lang === 'urdu' ? 'font-urdu' : lang === 'hindi' ? 'font-hindi' : ''
                  }`}
                  style={{ color: 'var(--primary)' }}
                >
                  {getTitle()}
                </h1>
                <p className="text-[10px] truncate" style={{ color: 'var(--text-muted)' }}>
                  {getSubTitle()}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 flex-shrink-0">
              <button
                onClick={onOpenSearch}
                className="p-1.5 rounded-lg border transition-all"
                style={{ backgroundColor: 'var(--bg-surface-elevated)', borderColor: 'var(--border-color)' }}
                title="Search / تلاش کریں"
              >
                <Search size={16} />
              </button>

              <button
                onClick={toggleTheme}
                className="p-1.5 rounded-lg border transition-all"
                style={{ backgroundColor: 'var(--bg-surface-elevated)', borderColor: 'var(--border-color)' }}
                title={`Switch Theme (${theme})`}
              >
                {theme === 'light' && <Coffee size={16} style={{ color: '#854d0e' }} />}
                {theme === 'sepia' && <Moon size={16} style={{ color: 'var(--primary)' }} />}
                {theme === 'dark' && <Sun size={16} style={{ color: 'var(--gold)' }} />}
              </button>
            </div>
          </div>

          {/* Row 2: Full Width Segmented Language Switcher */}
          <div 
            className="flex items-center p-1 rounded-xl border text-xs font-semibold w-full"
            style={{ backgroundColor: 'var(--bg-surface-elevated)', borderColor: 'var(--border-color)' }}
          >
            <button
              onClick={() => { setLang('urdu'); setIsDualMode(false); }}
              className={`flex-1 py-1 rounded-lg text-center transition-all ${lang === 'urdu' && !isDualMode ? 'shadow-sm font-bold' : ''}`}
              style={{
                backgroundColor: lang === 'urdu' && !isDualMode ? 'var(--primary)' : 'transparent',
                color: lang === 'urdu' && !isDualMode ? '#ffffff' : 'var(--text-muted)',
              }}
            >
              اردو
            </button>

            <button
              onClick={() => { setLang('hindi'); setIsDualMode(false); }}
              className={`flex-1 py-1 rounded-lg text-center transition-all ${lang === 'hindi' && !isDualMode ? 'shadow-sm font-bold' : ''}`}
              style={{
                backgroundColor: lang === 'hindi' && !isDualMode ? 'var(--primary)' : 'transparent',
                color: lang === 'hindi' && !isDualMode ? '#ffffff' : 'var(--text-muted)',
              }}
            >
              हिन्दी
            </button>

            <button
              onClick={() => { setLang('english'); setIsDualMode(false); }}
              className={`flex-1 py-1 rounded-lg text-center transition-all ${lang === 'english' && !isDualMode ? 'shadow-sm font-bold' : ''}`}
              style={{
                backgroundColor: lang === 'english' && !isDualMode ? 'var(--primary)' : 'transparent',
                color: lang === 'english' && !isDualMode ? '#ffffff' : 'var(--text-muted)',
              }}
            >
              English
            </button>

            <button
              onClick={() => setIsDualMode(!isDualMode)}
              className={`px-2 py-1 rounded-lg flex items-center justify-center gap-1 transition-all ${isDualMode ? 'shadow-sm font-bold' : ''}`}
              style={{
                backgroundColor: isDualMode ? 'var(--gold)' : 'transparent',
                color: isDualMode ? '#ffffff' : 'var(--text-muted)',
              }}
              title="Compare side-by-side"
            >
              <SplitSquareVertical size={13} />
              <span className="text-[11px]">Dual</span>
            </button>
          </div>
        </div>

        {/* Desktop View: Single Row */}
        <div className="hidden sm:flex items-center justify-between gap-3">
          {/* Title & Brand */}
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-md font-bold text-lg cursor-pointer"
              style={{ background: 'linear-gradient(135deg, var(--primary), var(--primary-hover))' }}
              onClick={() => setActiveTab('reader')}
            >
              ﷺ
            </div>
            <div>
              <h1 
                className={`text-lg sm:text-xl font-bold leading-tight cursor-pointer ${
                  lang === 'urdu' ? 'font-urdu' : lang === 'hindi' ? 'font-hindi' : ''
                }`}
                style={{ color: 'var(--primary)' }}
                onClick={() => setActiveTab('reader')}
              >
                {getTitle()}
              </h1>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                {getSubTitle()}
              </p>
            </div>
          </div>

          {/* Center / Right Tools */}
          <div className="flex items-center gap-2">
            {/* Trilingual Switcher (Urdu, Hindi, English) */}
            <div 
              className="flex items-center p-1 rounded-xl border text-xs font-semibold"
              style={{ backgroundColor: 'var(--bg-surface-elevated)', borderColor: 'var(--border-color)' }}
            >
              <button
                onClick={() => { setLang('urdu'); setIsDualMode(false); }}
                className={`px-2.5 py-1.5 rounded-lg transition-all ${lang === 'urdu' && !isDualMode ? 'shadow-sm font-bold' : ''}`}
                style={{
                  backgroundColor: lang === 'urdu' && !isDualMode ? 'var(--primary)' : 'transparent',
                  color: lang === 'urdu' && !isDualMode ? '#ffffff' : 'var(--text-muted)',
                }}
              >
                اردو
              </button>

              <button
                onClick={() => { setLang('hindi'); setIsDualMode(false); }}
                className={`px-2.5 py-1.5 rounded-lg transition-all ${lang === 'hindi' && !isDualMode ? 'shadow-sm font-bold' : ''}`}
                style={{
                  backgroundColor: lang === 'hindi' && !isDualMode ? 'var(--primary)' : 'transparent',
                  color: lang === 'hindi' && !isDualMode ? '#ffffff' : 'var(--text-muted)',
                }}
              >
                हिन्दी
              </button>

              <button
                onClick={() => { setLang('english'); setIsDualMode(false); }}
                className={`px-2.5 py-1.5 rounded-lg transition-all ${lang === 'english' && !isDualMode ? 'shadow-sm font-bold' : ''}`}
                style={{
                  backgroundColor: lang === 'english' && !isDualMode ? 'var(--primary)' : 'transparent',
                  color: lang === 'english' && !isDualMode ? '#ffffff' : 'var(--text-muted)',
                }}
              >
                English
              </button>

              {/* Dual Mode Toggle */}
              <button
                onClick={() => setIsDualMode(!isDualMode)}
                className={`px-2 py-1.5 rounded-lg flex items-center gap-1 transition-all ${isDualMode ? 'shadow-sm font-bold' : ''}`}
                style={{
                  backgroundColor: isDualMode ? 'var(--gold)' : 'transparent',
                  color: isDualMode ? '#ffffff' : 'var(--text-muted)',
                }}
                title="Compare side-by-side"
              >
                <SplitSquareVertical size={14} />
                <span>Dual</span>
              </button>
            </div>

            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="p-2.5 rounded-xl border transition-all hover:border-emerald-500"
              style={{ backgroundColor: 'var(--bg-surface-elevated)', borderColor: 'var(--border-color)' }}
              title="Search / تلاش کریں"
            >
              <Search size={18} />
            </button>

            {/* Theme Selector */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl border transition-all hover:scale-105"
              style={{ backgroundColor: 'var(--bg-surface-elevated)', borderColor: 'var(--border-color)' }}
              title={`Switch Theme (${theme})`}
            >
              {theme === 'light' && <Coffee size={18} style={{ color: '#854d0e' }} />}
              {theme === 'sepia' && <Moon size={18} style={{ color: 'var(--primary)' }} />}
              {theme === 'dark' && <Sun size={18} style={{ color: 'var(--gold)' }} />}
            </button>
          </div>
        </div>
      </div>

      {/* Tabs Navigation (Desktop only: on mobile the fixed bottom dock is used) */}
      <div className="border-t hidden sm:block" style={{ borderColor: 'var(--border-color)' }}>
        <div className="container mx-auto px-4 flex items-center gap-1 sm:gap-2 overflow-x-auto py-1 scrollbar-none">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            const label = lang === 'urdu' ? item.labelUrdu : lang === 'hindi' ? item.labelHindi : item.labelEnglish;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                  isActive ? 'shadow-sm font-bold' : 'hover:bg-black/5 dark:hover:bg-white/5'
                }`}
                style={{
                  backgroundColor: isActive ? 'var(--primary)' : 'transparent',
                  color: isActive ? '#ffffff' : 'var(--text-main)',
                }}
              >
                <Icon size={16} style={{ color: isActive ? '#ffffff' : 'var(--gold)' }} />
                <span>{label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}

function HeartIcon({ size = 16, style }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
    </svg>
  );
}
