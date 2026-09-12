import React from 'react';
import { 
  BookOpen, 
  Layers, 
  Clock, 
  Target, 
  ArrowRight, 
  ArrowLeft 
} from 'lucide-react';
import { BOOK_METADATA } from '../data/bookData';

export default function WelcomeScreen({
  onStartReading,
  currentPage = 1,
  lang = 'urdu',
  onNavigateTab,
  completionPercentage = 0,
  progressStats,
  readingStats
}) {
  const isRTL = lang === 'urdu';
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  const totalPages = progressStats?.totalPages 
    || (lang === 'english' ? BOOK_METADATA.totalPagesEnglish : BOOK_METADATA.totalPagesUrdu);
  const pagesReadCount = progressStats?.pagesReadCount || 1;
  const completedChaptersCount = progressStats?.completedChaptersCount || 0;
  const totalChapters = progressStats?.totalChapters || 13;

  // Format total reading time
  const totalMinutes = readingStats?.totalMinutesRead || 15;
  const hours = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;
  const readingTimeText = hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;

  return (
    <div className="w-full flex flex-col items-center justify-center px-4 pt-3 pb-24 sm:py-6 select-none welcome-dots-bg">
      <div className="w-full max-w-md flex flex-col items-center text-center">
        
        {/* Iconic Opening Portrait Artwork Card */}
        <div 
          className="relative w-full max-w-[340px] sm:max-w-[380px] rounded-[28px] overflow-hidden shadow-2xl border-[3px] transition-transform duration-300 hover:scale-[1.01]"
          style={{ borderColor: 'var(--gold)', backgroundColor: 'var(--bg-surface)' }}
        >
          <img 
            src="/opening-cover.jpg" 
            alt="Aakhri Nabi Ki Pyari Seerat - Opening Page"
            className="w-full h-auto object-cover block"
            loading="eager"
          />
        </div>

        {/* Continue Reading Pill Button */}
        <div className="mt-4 w-full max-w-[340px] sm:max-w-[380px]">
          <button
            onClick={onStartReading}
            className="w-full py-3.5 px-5 rounded-full text-white flex items-center justify-between shadow-lg transition-transform hover:scale-[1.01] active:scale-[0.98] group"
            style={{ 
              backgroundColor: '#064e3b',
              boxShadow: '0 8px 24px rgba(6, 78, 59, 0.28)'
            }}
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <BookOpen size={24} className="text-white flex-shrink-0" />
              <div className="text-left rtl:text-right min-w-0">
                <div className="font-bold text-sm sm:text-base leading-tight text-white truncate">
                  {lang === 'urdu' ? 'مطالعہ جاری رکھیں' : lang === 'hindi' ? 'अध्ययन जारी रखें' : 'Continue Reading'}
                </div>
                <div className="text-[11px] sm:text-xs text-emerald-200/90 font-medium truncate mt-0.5" dir="ltr">
                  {lang === 'urdu' 
                    ? `صفحہ ${currentPage} از ${totalPages}` 
                    : lang === 'hindi' 
                    ? `पृष्ठ ${currentPage} में से ${totalPages}` 
                    : `Page ${currentPage} of ${totalPages}`}
                </div>
              </div>
            </div>
            
            <div 
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center flex-shrink-0 transition-transform group-hover:translate-x-0.5"
              style={{ backgroundColor: '#043629' }}
            >
              <ArrowIcon size={18} className="text-white" />
            </div>
          </button>
        </div>

        {/* Your Progress Section Card */}
        <div className="mt-3.5 w-full max-w-[340px] sm:max-w-[380px]">
          <div 
            onClick={() => onNavigateTab && onNavigateTab('progress')}
            className="w-full rounded-2xl p-4 border shadow-xs transition-all hover:border-emerald-500/40 cursor-pointer text-left rtl:text-right"
            style={{ 
              backgroundColor: 'var(--bg-surface)', 
              borderColor: 'var(--border-subtle)' 
            }}
          >
            {/* Top row: Title + Completion % */}
            <div className="flex items-center justify-between mb-2 text-xs sm:text-sm">
              <span className="font-bold" style={{ color: 'var(--text-main)' }}>
                {lang === 'urdu' ? 'آپ کا مطالعہ ریکارڈ' : lang === 'hindi' ? 'आपकी अध्ययन प्रगति' : 'Your Progress'}
              </span>
              <span className="font-bold text-emerald-700 dark:text-emerald-400" dir="ltr" style={{ color: 'var(--primary)' }}>
                {completionPercentage}% {lang === 'urdu' ? 'مکمل' : lang === 'hindi' ? 'पूर्ण' : 'Completed'}
              </span>
            </div>

            {/* Horizontal Progress Bar */}
            <div 
              className="w-full h-2 rounded-full overflow-hidden mb-3.5"
              style={{ backgroundColor: 'rgba(0, 0, 0, 0.07)' }}
            >
              <div 
                className="h-full rounded-full transition-all duration-700"
                style={{ 
                  width: `${Math.max(completionPercentage, 2)}%`,
                  backgroundColor: 'var(--primary)' 
                }}
              />
            </div>

            {/* 4 Stats Columns */}
            <div 
              className="grid grid-cols-4 divide-x rtl:divide-x-reverse"
              style={{ borderColor: 'var(--border-subtle)' }}
            >
              {/* 1. Pages Read */}
              <div className="flex flex-col items-center justify-center text-center px-1">
                <BookOpen size={18} strokeWidth={1.8} style={{ color: 'var(--text-muted)' }} />
                <span className="font-bold text-xs sm:text-sm mt-1.5 truncate max-w-full" dir="ltr" style={{ color: 'var(--text-main)' }}>
                  {pagesReadCount} / {totalPages}
                </span>
                <span className="text-[10px] mt-0.5 truncate max-w-full" style={{ color: 'var(--text-muted)' }}>
                  {lang === 'urdu' ? 'صفحات' : lang === 'hindi' ? 'पृष्ठ' : 'Pages Read'}
                </span>
              </div>

              {/* 2. Chapters */}
              <div className="flex flex-col items-center justify-center text-center px-1">
                <Layers size={18} strokeWidth={1.8} style={{ color: 'var(--text-muted)' }} />
                <span className="font-bold text-xs sm:text-sm mt-1.5 truncate max-w-full" dir="ltr" style={{ color: 'var(--text-main)' }}>
                  {completedChaptersCount} / {totalChapters}
                </span>
                <span className="text-[10px] mt-0.5 truncate max-w-full" style={{ color: 'var(--text-muted)' }}>
                  {lang === 'urdu' ? 'ابواب' : lang === 'hindi' ? 'अध्याय' : 'Chapters'}
                </span>
              </div>

              {/* 3. Reading Time */}
              <div className="flex flex-col items-center justify-center text-center px-1">
                <Clock size={18} strokeWidth={1.8} style={{ color: 'var(--text-muted)' }} />
                <span className="font-bold text-xs sm:text-sm mt-1.5 truncate max-w-full" dir="ltr" style={{ color: 'var(--text-main)' }}>
                  {readingTimeText}
                </span>
                <span className="text-[10px] mt-0.5 truncate max-w-full" style={{ color: 'var(--text-muted)' }}>
                  {lang === 'urdu' ? 'مطالعہ وقت' : lang === 'hindi' ? 'समय' : 'Reading Time'}
                </span>
              </div>

              {/* 4. Completed */}
              <div className="flex flex-col items-center justify-center text-center px-1">
                <Target size={18} strokeWidth={1.8} style={{ color: 'var(--text-muted)' }} />
                <span className="font-bold text-xs sm:text-sm mt-1.5 truncate max-w-full" dir="ltr" style={{ color: 'var(--text-main)' }}>
                  {completionPercentage}%
                </span>
                <span className="text-[10px] mt-0.5 truncate max-w-full" style={{ color: 'var(--text-muted)' }}>
                  {lang === 'urdu' ? 'مکمل' : lang === 'hindi' ? 'पूर्ण' : 'Completed'}
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
