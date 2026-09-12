import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import WelcomeScreen from './components/WelcomeScreen';
import BookReader from './components/BookReader';
import ChapterGuide from './components/ChapterGuide';
import TimelineView from './components/TimelineView';
import ShamailExplorer from './components/ShamailExplorer';
import DuroodCounter from './components/DuroodCounter';
import SeeratQuiz from './components/SeeratQuiz';
import ProgressDashboard from './components/ProgressDashboard';
import MobileBottomNav from './components/MobileBottomNav';
import SearchModal from './components/SearchModal';
import BookmarksModal from './components/BookmarksModal';
import DownloadModal from './components/DownloadModal';
import { BOOK_METADATA } from './data/bookData';
import { 
  loadReadPages, 
  saveReadPages, 
  loadReadingStats, 
  updateReadingStats, 
  calculateProgress 
} from './utils/progressTracker';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  
  // Stored states
  const [currentPage, setCurrentPage] = useState(() => {
    const saved = localStorage.getItem('seerat_last_page');
    return saved ? parseInt(saved, 10) : 1;
  });

  const [lang, setLang] = useState(() => {
    return localStorage.getItem('seerat_lang') || 'urdu';
  });

  const [isDualMode, setIsDualMode] = useState(() => {
    return localStorage.getItem('seerat_dual_mode') === 'true';
  });

  const [dualLangPair, setDualLangPair] = useState(() => {
    try {
      const saved = localStorage.getItem('seerat_dual_pair');
      return saved ? JSON.parse(saved) : ['urdu', 'english'];
    } catch {
      return ['urdu', 'english'];
    }
  });

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('seerat_theme') || 'light';
  });

  const [bookmarks, setBookmarks] = useState(() => {
    try {
      const saved = localStorage.getItem('seerat_bookmarks');
      return saved ? JSON.parse(saved) : [11, 39, 64, 102, 120];
    } catch {
      return [11, 64];
    }
  });

  // Reading Completion & Progress tracking state
  const [readPages, setReadPages] = useState(() => loadReadPages(lang));
  const [readingStats, setReadingStats] = useState(() => loadReadingStats());

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [deferredInstallPrompt, setDeferredInstallPrompt] = useState(null);

  // Monitor online / offline status & PWA install event
  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    const handleBeforeInstall = (e) => {
      e.preventDefault();
      setDeferredInstallPrompt(e);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, []);

  const handleInstallApp = async () => {
    if (!deferredInstallPrompt) return;
    deferredInstallPrompt.prompt();
    const { outcome } = await deferredInstallPrompt.userChoice;
    if (outcome === 'accepted') {
      setDeferredInstallPrompt(null);
    }
  };

  // Sync theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('seerat_theme', theme);
  }, [theme]);

  // Sync language and document direction
  useEffect(() => {
    localStorage.setItem('seerat_lang', lang);
    if (lang === 'urdu') {
      document.documentElement.setAttribute('dir', 'rtl');
      document.documentElement.setAttribute('lang', 'ur');
    } else if (lang === 'hindi') {
      document.documentElement.setAttribute('dir', 'ltr');
      document.documentElement.setAttribute('lang', 'hi');
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
      document.documentElement.setAttribute('lang', 'en');
    }
    // Reload read pages for this language
    setReadPages(loadReadPages(lang));
  }, [lang]);

  // Persist read pages whenever updated
  useEffect(() => {
    saveReadPages(lang, readPages);
  }, [readPages, lang]);

  // Sync dual mode
  useEffect(() => {
    localStorage.setItem('seerat_dual_mode', isDualMode.toString());
  }, [isDualMode]);

  // Sync dual pair
  useEffect(() => {
    localStorage.setItem('seerat_dual_pair', JSON.stringify(dualLangPair));
  }, [dualLangPair]);

  // Sync bookmarks
  useEffect(() => {
    localStorage.setItem('seerat_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  // Sync last read page
  useEffect(() => {
    localStorage.setItem('seerat_last_page', currentPage.toString());
  }, [currentPage]);

  // Reading time counter (increments every 60s when on reader tab)
  useEffect(() => {
    const timer = setInterval(() => {
      if (activeTab === 'reader' && !document.hidden) {
        const updated = updateReadingStats(1);
        setReadingStats({ ...updated });
      }
    }, 60000);
    return () => clearInterval(timer);
  }, [activeTab]);


  const handleToggleBookmark = (page) => {
    if (bookmarks.includes(page)) {
      setBookmarks(bookmarks.filter((p) => p !== page));
    } else {
      setBookmarks([...bookmarks, page]);
    }
  };

  const handleTogglePageRead = (page, forceAdd = false) => {
    const next = new Set(readPages);
    if (next.has(page) && !forceAdd) {
      next.delete(page);
    } else {
      next.add(page);
    }
    setReadPages(next);
  };

  const handleMarkChapterComplete = (chapterId, startPage, endPage) => {
    const next = new Set(readPages);
    let allRead = true;
    for (let p = startPage; p <= endPage; p++) {
      if (!next.has(p)) {
        allRead = false;
        break;
      }
    }

    // Toggle: if all are already read, unmark; otherwise mark all as read
    for (let p = startPage; p <= endPage; p++) {
      if (allRead) next.delete(p);
      else next.add(p);
    }
    setReadPages(next);
  };

  const handleResetProgress = () => {
    const msg = lang === 'english'
      ? 'Reset all reading progress for this edition?'
      : 'کیا آپ اس ایڈیشن کا تمام مطالعہ ریکارڈ ری سیٹ کرنا چاہتے ہیں؟';
    if (window.confirm(msg)) {
      setReadPages(new Set([1]));
    }
  };

  const handleOpenPage = (page) => {
    setCurrentPage(page);
    setActiveTab('reader');
  };

  const getFooterTitle = () => {
    if (lang === 'urdu') return BOOK_METADATA.titleUrdu;
    if (lang === 'hindi') return BOOK_METADATA.titleHindi;
    return BOOK_METADATA.titleEnglish;
  };

  const progressStats = calculateProgress(readPages, lang);

  return (
    <div className="min-h-screen flex flex-col islamic-bg text-inherit transition-colors duration-200">
      {/* Top Main Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        lang={lang}
        setLang={setLang}
        isDualMode={isDualMode}
        setIsDualMode={setIsDualMode}
        dualLangPair={dualLangPair}
        setDualLangPair={setDualLangPair}
        theme={theme}
        setTheme={setTheme}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenBookmarks={() => setIsBookmarksOpen(true)}
        onOpenDownload={() => setIsDownloadOpen(true)}
        bookmarkCount={bookmarks.length}
        completionPercentage={progressStats.percentage}
        isOffline={isOffline}
        canInstall={!!deferredInstallPrompt}
        onInstallApp={handleInstallApp}
      />

      {/* Offline Status Alert Banner */}
      {isOffline && (
        <div className="bg-amber-500/10 border-b border-amber-500/20 py-1.5 px-4 text-center text-xs text-amber-800 dark:text-amber-300 flex items-center justify-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          <span>
            {lang === 'english'
              ? 'Offline Mode Active — You can continue reading and learning from cached book pages without internet.'
              : 'آپ آف لائن موڈ میں ہیں۔ کیشے میں محفوظ صفحات اور تمام فیچرز معمول کے مطابق کام کر رہے ہیں۔'}
          </span>
        </div>
      )}

      {/* Main App Content Body */}
      <main className="flex-1 flex flex-col pb-16 sm:pb-0">
        {activeTab === 'home' && (
          <WelcomeScreen
            onStartReading={() => setActiveTab('reader')}
            currentPage={currentPage}
            lang={lang}
            setLang={setLang}
            onNavigateTab={(tab) => setActiveTab(tab)}
            completionPercentage={progressStats.percentage}
            canInstall={!!deferredInstallPrompt}
            onInstallApp={handleInstallApp}
            onOpenDownload={() => setIsDownloadOpen(true)}
          />
        )}

        {activeTab === 'reader' && (
          <BookReader
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            lang={lang}
            setLang={setLang}
            isDualMode={isDualMode}
            setIsDualMode={setIsDualMode}
            dualLangPair={dualLangPair}
            setDualLangPair={setDualLangPair}
            bookmarks={bookmarks}
            onToggleBookmark={handleToggleBookmark}
            readPages={readPages}
            onTogglePageRead={handleTogglePageRead}
            onSelectChapter={() => setActiveTab('chapters')}
          />
        )}

        {activeTab === 'progress' && (
          <ProgressDashboard
            lang={lang}
            readPages={readPages}
            readingStats={readingStats}
            lastReadPage={currentPage}
            onOpenPage={handleOpenPage}
            onMarkChapterComplete={handleMarkChapterComplete}
            onResetProgress={handleResetProgress}
          />
        )}

        {activeTab === 'chapters' && (
          <ChapterGuide
            lang={lang}
            onOpenPage={handleOpenPage}
            bookmarks={bookmarks}
          />
        )}

        {activeTab === 'timeline' && (
          <TimelineView
            lang={lang}
            onOpenPage={handleOpenPage}
          />
        )}

        {activeTab === 'shamail' && (
          <ShamailExplorer
            lang={lang}
            onOpenPage={handleOpenPage}
          />
        )}

        {activeTab === 'durood' && (
          <DuroodCounter
            lang={lang}
          />
        )}

        {activeTab === 'quiz' && (
          <SeeratQuiz
            lang={lang}
            onOpenPage={handleOpenPage}
          />
        )}
      </main>

      {/* Mobile Bottom Navigation Dock (Visible on phone screens) */}
      <MobileBottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        lang={lang}
        completionPercentage={progressStats.percentage}
      />

      {/* Footer (Hidden on small screens to let bottom nav shine) */}
      <footer 
        className="border-t py-6 text-center text-xs glass hidden sm:block"
        style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-surface)' }}
      >
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[11px] font-bold" style={{ backgroundColor: 'var(--primary)' }}>
              ﷺ
            </span>
            <span className="font-semibold" style={{ color: 'var(--text-main)' }}>
              {getFooterTitle()}
            </span>
          </div>

          <div className="font-arabic text-sm" style={{ color: 'var(--gold)' }}>
            صَلَّى اللّٰهُ عَلَيْهِ وَآلِهِ وَسَلَّمَ
          </div>

          <div className="flex flex-col items-center sm:items-end gap-0.5" style={{ color: 'var(--text-muted)' }}>
            <span className="font-medium text-emerald-800 dark:text-emerald-300">
              Developed by Mohammad Asim
            </span>
            <span>Dawat-e-Islami • Maktaba-tul-Madinah</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        lang={lang}
        onSelectPage={handleOpenPage}
      />

      <BookmarksModal
        isOpen={isBookmarksOpen}
        onClose={() => setIsBookmarksOpen(false)}
        lang={lang}
        bookmarks={bookmarks}
        onRemoveBookmark={handleToggleBookmark}
        onClearBookmarks={() => setBookmarks([])}
        onSelectPage={handleOpenPage}
      />

      <DownloadModal
        isOpen={isDownloadOpen}
        onClose={() => setIsDownloadOpen(false)}
        lang={lang}
        canInstall={!!deferredInstallPrompt}
        onInstallApp={handleInstallApp}
      />
    </div>
  );
}
