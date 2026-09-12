import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  ZoomOut, 
  Maximize, 
  Minimize, 
  Bookmark, 
  BookmarkCheck, 
  Grid, 
  Layers, 
  CheckCircle,
  CheckCircle2
} from 'lucide-react';
import { BOOK_METADATA, CHAPTERS, getPageImagePath } from '../data/bookData';

export default function BookReader({
  currentPage,
  setCurrentPage,
  lang,
  isDualMode,
  dualLangPair,
  bookmarks,
  onToggleBookmark,
  readPages,
  onTogglePageRead,
  onSelectChapter
}) {
  const [zoom, setZoom] = useState(1.0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showThumbnails, setShowThumbnails] = useState(false);
  const [pageInput, setPageInput] = useState(currentPage.toString());
  const containerRef = useRef(null);

  // Touch swipe state
  const touchStartXRef = useRef(0);
  const touchStartYRef = useRef(0);

  const totalPages = lang === 'english' ? BOOK_METADATA.totalPagesEnglish : BOOK_METADATA.totalPagesUrdu;

  const goToNextPage = useCallback(() => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  }, [currentPage, totalPages, setCurrentPage]);

  const goToPreviousPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  }, [currentPage, setCurrentPage]);

  // Sync page input with currentPage
  useEffect(() => {
    setPageInput(currentPage.toString());
  }, [currentPage]);

  // Adjust page number if it exceeds total pages when switching to urdu/hindi
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage, setCurrentPage]);

  // Auto-record page view as read after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!readPages.has(currentPage)) {
        onTogglePageRead(currentPage, true);
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [currentPage, readPages, onTogglePageRead]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT') return;
      if (lang === 'urdu') {
        if (e.key === 'ArrowRight') goToPreviousPage();
        else if (e.key === 'ArrowLeft') goToNextPage();
      } else {
        if (e.key === 'ArrowLeft') goToPreviousPage();
        else if (e.key === 'ArrowRight') goToNextPage();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lang, goToNextPage, goToPreviousPage]);

  // Touch Swipe handlers for mobile devices
  const handleTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const diffX = touchEndX - touchStartXRef.current;
    const diffY = touchEndY - touchStartYRef.current;

    // Must be predominantly horizontal swipe > 45px
    if (Math.abs(diffX) > 45 && Math.abs(diffX) > Math.abs(diffY) * 1.5) {
      if (lang === 'urdu') {
        if (diffX < 0) goToNextPage(); // Swiping left advances in RTL
        else goToPreviousPage();
      } else {
        if (diffX < 0) goToNextPage(); // Swiping left advances in LTR
        else goToPreviousPage();
      }
    }
  };

  // Preload adjacent images
  useEffect(() => {
    const preload = (p) => {
      if (p >= 1 && p <= totalPages) {
        const img = new Image();
        img.src = getPageImagePath(p, lang);
      }
    };
    preload(currentPage + 1);
    preload(currentPage - 1);
  }, [currentPage, lang, totalPages]);

  const handlePageSubmit = (e) => {
    e.preventDefault();
    const p = parseInt(pageInput, 10);
    if (!isNaN(p) && p >= 1 && p <= totalPages) {
      setCurrentPage(p);
    } else {
      setPageInput(currentPage.toString());
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  // Find active chapter for this page
  const currentChapter = CHAPTERS.find((c) => {
    if (lang === 'english') {
      return currentPage >= c.pageStartEnglish && currentPage <= c.pageEndEnglish;
    } else {
      return currentPage >= c.pageStartUrdu && currentPage <= c.pageEndUrdu;
    }
  });

  const getChapterTitle = () => {
    if (!currentChapter) return lang === 'english' ? 'The Book' : 'کتاب / पुस्तक';
    if (lang === 'urdu') return currentChapter.titleUrdu;
    if (lang === 'hindi') return currentChapter.titleHindi;
    return currentChapter.titleEnglish;
  };

  const getChapterNumber = () => {
    if (!currentChapter) return '';
    if (lang === 'urdu') return currentChapter.numberUrdu;
    if (lang === 'hindi') return currentChapter.numberHindi;
    return currentChapter.numberEnglish;
  };

  const isCurrentBookmarked = bookmarks.includes(currentPage);
  const isCurrentRead = readPages.has(currentPage);

  // Compute corresponding page for the second language in dual mode
  const getDualPage = (targetLang) => {
    if (targetLang === lang) return currentPage;
    if (!currentChapter) return currentPage;
    
    if (lang === 'english' && (targetLang === 'urdu' || targetLang === 'hindi')) {
      const progress = (currentPage - currentChapter.pageStartEnglish) / Math.max(1, currentChapter.pageEndEnglish - currentChapter.pageStartEnglish);
      const mapped = Math.round(currentChapter.pageStartUrdu + progress * (currentChapter.pageEndUrdu - currentChapter.pageStartUrdu));
      return Math.max(1, Math.min(147, mapped));
    } else if ((lang === 'urdu' || lang === 'hindi') && targetLang === 'english') {
      const progress = (currentPage - currentChapter.pageStartUrdu) / Math.max(1, currentChapter.pageEndUrdu - currentChapter.pageStartUrdu);
      const mapped = Math.round(currentChapter.pageStartEnglish + progress * (currentChapter.pageEndEnglish - currentChapter.pageStartEnglish));
      return Math.max(1, Math.min(166, mapped));
    }
    return currentPage;
  };

  const lang1 = dualLangPair[0];
  const lang2 = dualLangPair[1];

  const completionPercent = Math.min(100, Math.round((readPages.size / totalPages) * 100));

  return (
    <div 
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="reader-container flex flex-col items-center justify-between min-h-[calc(100vh-140px)] w-full select-none pb-20 sm:pb-0"
    >
      {/* Top Chapter Status Bar */}
      <div 
        className="w-full border-b px-2.5 sm:px-4 py-1.5 sm:py-2 flex items-center justify-between gap-1.5 sm:gap-2 text-sm z-10 glass"
        style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-surface)' }}
      >
        <div className="flex items-center gap-1.5 min-w-0 flex-1">
          <button 
            onClick={() => onSelectChapter?.(currentChapter?.id || 1)}
            className="flex items-center gap-1 px-2 sm:px-3 py-1 rounded-lg border text-xs font-semibold hover:border-emerald-500 transition-colors flex-shrink-0"
            style={{ backgroundColor: 'var(--bg-surface-elevated)', borderColor: 'var(--border-color)' }}
          >
            <Layers size={14} style={{ color: 'var(--primary)' }} />
            <span className="truncate max-w-[120px] sm:max-w-none">{getChapterNumber() || 'Contents'}</span>
          </button>

          {currentChapter && (
            <span className={`text-xs font-medium truncate max-w-[100px] xs:max-w-[150px] sm:max-w-md ${lang === 'urdu' ? 'font-urdu' : lang === 'hindi' ? 'font-hindi' : ''}`} style={{ color: 'var(--text-main)' }}>
              {getChapterTitle()}
            </span>
          )}
        </div>

        {/* Action controls */}
        <div className="flex items-center gap-1 sm:gap-1.5 flex-shrink-0">
          {/* Mark As Read Button */}
          <button
            onClick={() => onTogglePageRead(currentPage)}
            className={`flex items-center gap-1 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-lg border text-xs font-medium transition-all ${
              isCurrentRead ? 'shadow-xs font-bold' : ''
            }`}
            style={{
              backgroundColor: isCurrentRead ? 'rgba(16, 185, 129, 0.15)' : 'var(--bg-surface-elevated)',
              borderColor: isCurrentRead ? '#10b981' : 'var(--border-color)',
              color: isCurrentRead ? '#065f46' : 'var(--text-muted)'
            }}
            title="Mark page as completed"
          >
            <CheckCircle2 size={14} className={isCurrentRead ? 'text-emerald-600' : ''} />
            <span className="hidden xs:inline">{isCurrentRead ? (lang === 'english' ? 'Read' : 'پڑھ لیا') : (lang === 'english' ? 'Mark Read' : 'پڑھیں')}</span>
          </button>

          {/* Bookmark Toggle */}
          <button
            onClick={() => onToggleBookmark(currentPage)}
            className={`flex items-center gap-1 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-lg border text-xs font-medium transition-all ${
              isCurrentBookmarked ? 'shadow-xs font-bold' : ''
            }`}
            style={{
              backgroundColor: isCurrentBookmarked ? 'var(--gold-light)' : 'var(--bg-surface-elevated)',
              borderColor: isCurrentBookmarked ? 'var(--gold)' : 'var(--border-color)',
              color: isCurrentBookmarked ? 'var(--gold-hover)' : 'var(--text-muted)'
            }}
          >
            {isCurrentBookmarked ? <BookmarkCheck size={14} /> : <Bookmark size={14} />}
            <span className="hidden sm:inline">{isCurrentBookmarked ? 'محفوظ' : 'بک مارک'}</span>
          </button>

          {/* Zoom controls */}
          <div className="hidden sm:flex items-center border rounded-lg overflow-hidden" style={{ borderColor: 'var(--border-color)' }}>
            <button 
              onClick={() => setZoom((z) => Math.max(0.6, +(z - 0.15).toFixed(2)))}
              className="p-1.5 hover:bg-black/5 dark:hover:bg-white/5"
            >
              <ZoomOut size={16} />
            </button>
            <span className="px-2 text-xs font-mono font-semibold" style={{ color: 'var(--text-muted)' }}>
              {Math.round(zoom * 100)}%
            </span>
            <button 
              onClick={() => setZoom((z) => Math.min(2.2, +(z + 0.15).toFixed(2)))}
              className="p-1.5 hover:bg-black/5 dark:hover:bg-white/5"
            >
              <ZoomIn size={16} />
            </button>
          </div>

          {/* Thumbnails Drawer Toggle */}
          <button
            onClick={() => setShowThumbnails(!showThumbnails)}
            className={`p-1.5 rounded-lg border transition-colors ${showThumbnails ? 'bg-black/10 dark:bg-white/10' : ''}`}
            style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-surface-elevated)' }}
            title="Thumbnails"
          >
            <Grid size={16} />
          </button>

          {/* Fullscreen */}
          <button
            onClick={toggleFullscreen}
            className="p-1.5 rounded-lg border hover:bg-black/5 dark:hover:bg-white/5"
            style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-surface-elevated)' }}
            title="Fullscreen"
          >
            {isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
          </button>
        </div>
      </div>

      {/* Main Reading Stage */}
      <div className="relative flex-1 w-full flex items-center justify-center p-2 sm:p-6 overflow-auto">
        {/* Navigation Floating Buttons */}
        <button
          onClick={lang === 'urdu' ? goToNextPage : goToPreviousPage}
          disabled={lang === 'urdu' ? currentPage >= totalPages : currentPage <= 1}
          className="absolute left-1.5 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center glass border shadow-lg hover:scale-110 active:scale-95 disabled:opacity-30 disabled:pointer-events-none transition-all"
          style={{ borderColor: 'var(--border-color)', color: 'var(--primary)' }}
          title="Previous Page"
        >
          <ChevronLeft size={24} />
        </button>

        <button
          onClick={lang === 'urdu' ? goToPreviousPage : goToNextPage}
          disabled={lang === 'urdu' ? currentPage <= 1 : currentPage >= totalPages}
          className="absolute right-1.5 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center glass border shadow-lg hover:scale-110 active:scale-95 disabled:opacity-30 disabled:pointer-events-none transition-all"
          style={{ borderColor: 'var(--border-color)', color: 'var(--primary)' }}
          title="Next Page"
        >
          <ChevronRight size={24} />
        </button>

        {/* Floating Mobile Completion Pill (Single Mode only to avoid Dual Badge overlap) */}
        {!isDualMode && (
          <div 
            className="absolute top-3 z-20 flex items-center gap-2 px-3 py-1 rounded-full glass border shadow-sm text-[11px] font-mono font-medium pointer-events-none"
            style={{ borderColor: 'var(--border-color)', color: 'var(--text-main)' }}
          >
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: isCurrentRead ? '#10b981' : 'var(--gold)' }} />
            <span>{completionPercent}% {lang === 'english' ? 'read' : lang === 'hindi' ? 'पूर्ण' : 'مکمل'}</span>
            <span style={{ color: 'var(--text-muted)' }}>•</span>
            <span dir="ltr">{currentPage}/{totalPages}</span>
          </div>
        )}

        {/* Book Display - Single Mode or Dual Mode */}
        <div 
          className="flex flex-col md:flex-row items-center justify-center gap-6 transition-transform duration-150 origin-center mt-6 sm:mt-0"
          style={{ transform: `scale(${zoom})` }}
        >
          {/* Dual Mode: First Page */}
          {isDualMode && (
            <div className="flex flex-col items-center w-full md:w-auto">
              <div 
                className="text-[11px] sm:text-xs font-bold mb-2 px-3 py-1 rounded-full shadow-xs flex items-center gap-1.5" 
                style={{ backgroundColor: 'var(--primary)', color: '#fff' }}
              >
                <span className={lang1 === 'urdu' ? 'font-urdu' : lang1 === 'hindi' ? 'font-hindi' : ''}>
                  {lang1 === 'urdu' ? 'اردو ایڈیشن' : lang1 === 'hindi' ? 'हिन्दी एडिशन' : 'English Edition'}
                </span>
                <span className="opacity-70">•</span>
                <span dir="ltr">Page {getDualPage(lang1)}</span>
              </div>
              <div 
                className="bg-white rounded-xl overflow-hidden book-page-shadow border max-w-[92vw] sm:max-w-[420px] md:max-w-[380px] lg:max-w-[460px] transition-all"
                style={{ borderColor: 'var(--border-color)' }}
              >
                <img
                  src={getPageImagePath(getDualPage(lang1), lang1)}
                  alt={`${lang1} page`}
                  className="w-full h-auto block select-none pointer-events-none"
                  loading="eager"
                />
              </div>
            </div>
          )}

          {/* Dual Mode: Second Page */}
          {isDualMode && (
            <div className="flex flex-col items-center w-full md:w-auto">
              <div 
                className="text-[11px] sm:text-xs font-bold mb-2 px-3 py-1 rounded-full shadow-xs flex items-center gap-1.5" 
                style={{ backgroundColor: 'var(--gold)', color: '#fff' }}
              >
                <span className={lang2 === 'urdu' ? 'font-urdu' : lang2 === 'hindi' ? 'font-hindi' : ''}>
                  {lang2 === 'urdu' ? 'اردو ایڈیشن' : lang2 === 'hindi' ? 'हिन्दी एडिशन' : 'English Edition'}
                </span>
                <span className="opacity-70">•</span>
                <span dir="ltr">Page {getDualPage(lang2)}</span>
              </div>
              <div 
                className="bg-white rounded-xl overflow-hidden book-page-shadow border max-w-[92vw] sm:max-w-[420px] md:max-w-[380px] lg:max-w-[460px] transition-all"
                style={{ borderColor: 'var(--border-color)' }}
              >
                <img
                  src={getPageImagePath(getDualPage(lang2), lang2)}
                  alt={`${lang2} page`}
                  className="w-full h-auto block select-none pointer-events-none"
                  loading="eager"
                />
              </div>
            </div>
          )}

          {/* Single Mode Display */}
          {!isDualMode && (
            <div 
              className="bg-white rounded-xl overflow-hidden book-page-shadow border w-[94vw] sm:w-[560px] md:w-[620px] lg:w-[680px] max-w-[94vw] sm:max-w-[560px] md:max-w-[620px] lg:max-w-[680px] transition-all"
              style={{ borderColor: 'var(--border-color)' }}
            >
              <img
                src={getPageImagePath(currentPage, lang)}
                alt={`${lang} page ${currentPage}`}
                className="w-full h-auto block select-none transition-opacity duration-200"
                loading="eager"
              />
            </div>
          )}
        </div>
      </div>

      {/* Thumbnails Drawer (Collapsible) */}
      {showThumbnails && (
        <div 
          className="w-full border-t glass p-3 overflow-x-auto scrollbar-thin z-20"
          style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-surface)' }}
        >
          <div className="flex items-center gap-3 w-max px-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
              const isSelected = p === currentPage;
              const isBkm = bookmarks.includes(p);
              const isRead = readPages.has(p);
              return (
                <button
                  key={p}
                  onClick={() => setCurrentPage(p)}
                  className={`flex flex-col items-center group relative rounded-lg p-1 transition-all ${
                    isSelected ? 'ring-2 ring-emerald-500 scale-105' : 'hover:scale-102 opacity-75 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: isSelected ? 'var(--bg-surface-elevated)' : 'transparent' }}
                >
                  <div className="w-14 h-20 bg-gray-200 rounded overflow-hidden border shadow-sm relative">
                    <img
                      src={getPageImagePath(p, lang)}
                      alt={`Thumbnail ${p}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    {isBkm && (
                      <span className="absolute top-0.5 right-0.5 bg-amber-500 text-white p-0.5 rounded-full shadow">
                        <Bookmark size={10} fill="white" />
                      </span>
                    )}
                    {isRead && (
                      <span className="absolute bottom-0.5 right-0.5 bg-emerald-600 text-white p-0.5 rounded-full shadow">
                        <CheckCircle size={10} />
                      </span>
                    )}
                  </div>
                  <span className={`text-[11px] mt-1 font-mono ${isSelected ? 'font-bold' : ''}`} style={{ color: isSelected ? 'var(--primary)' : 'var(--text-muted)' }}>
                    {p}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Bottom Page Navigation & Scrub Slider */}
      <div 
        className="w-full border-t px-3 sm:px-4 py-2 sm:py-2.5 glass flex flex-wrap items-center justify-between gap-2.5 sm:gap-3 z-10 mb-14 sm:mb-0"
        style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-surface)' }}
      >
        {/* Scrub Slider */}
        <div className="flex-1 min-w-[200px] flex items-center gap-2.5">
          <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>1</span>
          <input
            type="range"
            min="1"
            max={totalPages}
            value={currentPage}
            onChange={(e) => setCurrentPage(Number(e.target.value))}
            className="w-full accent-emerald-700 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg cursor-pointer"
          />
          <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>{totalPages}</span>
        </div>

        {/* Jump-to-Page Input Form */}
        <form onSubmit={handlePageSubmit} className="flex items-center gap-1.5">
          <input
            type="number"
            min="1"
            max={totalPages}
            value={pageInput}
            onChange={(e) => setPageInput(e.target.value)}
            className="w-12 px-1.5 py-1 text-xs font-mono text-center rounded border focus:outline-none focus:border-emerald-600"
            style={{ 
              borderColor: 'var(--border-color)', 
              backgroundColor: 'var(--bg-surface-elevated)',
              color: 'var(--text-main)'
            }}
          />
          <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
            / {totalPages}
          </span>
          <button
            type="submit"
            className="px-2.5 py-1 text-xs font-semibold rounded text-white shadow-xs"
            style={{ backgroundColor: 'var(--primary)' }}
          >
            {lang === 'english' ? 'Go' : 'جائیں'}
          </button>
        </form>
      </div>
    </div>
  );
}
