import React from 'react';
import { 
  BookOpen, 
  Layers, 
  Clock, 
  Target, 
  ArrowRight, 
  ArrowLeft,
  HelpCircle,
  Sparkles,
  BarChart3
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

  const features = [
    {
      id: 'chapters',
      titleUrdu: '13 ابواب کی فہرست',
      titleHindi: '13 अध्याय सूची',
      titleEnglish: '13 Chapters Guide',
      subtitleUrdu: 'تفصیلی فہارس و مطالعہ رہنمائی',
      subtitleHindi: 'विस्तृत अध्याय और अध्ययन मार्गदर्शिका',
      subtitleEnglish: 'Detailed chapters and overview',
      icon: Layers,
      color: '#065f46' // dark green
    },
    {
      id: 'quiz',
      titleUrdu: 'سیرت کوئز',
      titleHindi: 'सीरत क्विज़',
      titleEnglish: 'Seerat Quiz',
      subtitleUrdu: 'ہر باب کے جامع امتحانات',
      subtitleHindi: 'अध्याय-वार व्यापक परीक्षा',
      subtitleEnglish: 'Test your knowledge by chapter',
      icon: HelpCircle,
      color: '#d97706' // amber/orange
    },
    {
      id: 'durood',
      titleUrdu: 'درود شریف کاؤنٹر',
      titleHindi: 'दुरूद शरीफ काउंटर',
      titleEnglish: 'Salawat Tasbih Counter',
      subtitleUrdu: 'حضور ﷺ پر درود و سلام کا ریکارڈ',
      subtitleHindi: 'हुज़ूर ﷺ पर दुरूद व सलाम का ریکارڈ',
      subtitleEnglish: 'Gentle bead click & mobile haptics',
      icon: HeartIcon,
      color: '#e11d48' // crimson / pink
    },
    {
      id: 'timeline',
      titleUrdu: 'سیرت ٹائم لائن',
      titleHindi: 'सीरत टाइमलाइन',
      titleEnglish: 'Seerat Timeline',
      subtitleUrdu: '571ء تا 632ء اہم تاریخی واقعات',
      subtitleHindi: '571 से 632 ई. तक के ऐतिहासिक वाक़ियात',
      subtitleEnglish: '571 CE to 632 CE Chronology',
      icon: Clock,
      color: '#0891b2' // cyan / ocean blue
    },
    {
      id: 'shamail',
      titleUrdu: 'شمائلِ مصطفےٰ',
      titleHindi: 'शमाइले मुस्तफ़ा',
      titleEnglish: 'Shamail Explorer',
      subtitleUrdu: 'حلیہ مبارکہ اور اوصافِ جمیلہ',
      subtitleHindi: 'हुलिया मुबारका और औसाफ़े जमीला',
      subtitleEnglish: 'Blessed traits & noble character',
      icon: Sparkles,
      color: '#ea580c' // deep gold/orange
    },
    {
      id: 'progress',
      titleUrdu: `مطالعہ ریکارڈ (${completionPercentage}%)`,
      titleHindi: `अध्ययन प्रगति (${completionPercentage}%)`,
      titleEnglish: `Progress (${completionPercentage}%)`,
      subtitleUrdu: 'صفحات و ابواب کی تکمیل کا جائزہ',
      subtitleHindi: 'पृष्ठों और अध्यायों की पूर्णता का विश्लेषण',
      subtitleEnglish: 'Streaks, read pages & chapter checklist',
      icon: BarChart3,
      color: '#059669' // emerald
    }
  ];

  return (
    <div className="w-full flex flex-col items-center justify-center px-4 pt-3 pb-24 sm:py-6 select-none welcome-dots-bg">
      <div className="w-full max-w-md flex flex-col items-center text-center">
        
        {/* Opening Poster Card */}
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

        {/* Key Features & Interactive Tools Section (from user screenshot) */}
        <div className="mt-7 w-full max-w-[340px] sm:max-w-[380px]">
          <div className="flex items-center justify-between mb-3 px-1">
            <h2 className="text-sm font-bold text-left rtl:text-right" style={{ color: 'var(--primary)' }}>
              {lang === 'urdu' ? 'ایپ کے اہم فیچرز' : lang === 'hindi' ? 'ऐप की मुख्य विशेषताएं' : 'Key Features & Interactive Tools'}
            </h2>
            <span className="text-[11px] font-medium" style={{ color: 'var(--text-muted)' }}>
              {totalPages} {lang === 'english' ? 'Pages' : 'صفحات'}
            </span>
          </div>

          <div className="flex flex-col gap-2.5 w-full">
            {features.map((feat) => {
              const Icon = feat.icon;
              const title = lang === 'urdu' ? feat.titleUrdu : lang === 'hindi' ? feat.titleHindi : feat.titleEnglish;
              const subtitle = lang === 'urdu' ? feat.subtitleUrdu : lang === 'hindi' ? feat.subtitleHindi : feat.subtitleEnglish;
              return (
                <button
                  key={feat.id}
                  onClick={() => onNavigateTab && onNavigateTab(feat.id)}
                  className="flex items-center gap-3.5 p-3 rounded-2xl border text-left rtl:text-right transition-all hover:scale-[1.01] active:scale-[0.98] shadow-xs group w-full"
                  style={{ 
                    backgroundColor: 'var(--bg-surface)', 
                    borderColor: 'var(--border-subtle)' 
                  }}
                >
                  <div 
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-white flex-shrink-0 shadow-xs transition-transform group-hover:scale-105"
                    style={{ backgroundColor: feat.color }}
                  >
                    <Icon size={22} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-bold truncate" style={{ color: 'var(--text-main)' }}>
                      {title}
                    </h3>
                    <p className="text-[11px] sm:text-xs truncate mt-0.5" style={{ color: 'var(--text-muted)' }}>
                      {subtitle}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Bottom Credits Banner */}
          <div 
            className="mt-6 mb-2 p-4 rounded-2xl border w-full text-center text-xs shadow-xs"
            style={{ 
              backgroundColor: 'var(--bg-surface-elevated)', 
              borderColor: 'var(--border-subtle)' 
            }}
          >
            <p className="font-bold text-emerald-800 dark:text-emerald-300">
              Developed by Mohammad Asim
            </p>
            <p className="text-[11px] mt-1" style={{ color: 'var(--text-muted)' }}>
              Original Biographical Publication: Maktaba-tul-Madinah (Dawat-e-Islami)
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

function HeartIcon({ size = 22, style }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
    </svg>
  );
}
