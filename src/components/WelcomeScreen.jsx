import React from 'react';
import { 
  BookOpen, 
  Layers, 
  Clock, 
  Target, 
  ArrowRight, 
  ArrowLeft,
  HelpCircle,
  Heart,
  BarChart3,
  Star,
  ChevronRight
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
      titleUrdu: 'ابواب کی فہرست',
      titleHindi: 'अध्याय सूची',
      titleEnglish: 'Chapters Guide',
      subtitleUrdu: 'تفصیلی فہارس و جائزہ',
      subtitleHindi: 'विस्तृत अध्याय और विवरण',
      subtitleEnglish: 'Detailed chapters and overview',
      icon: Layers,
      color: '#065f46' // dark green
    },
    {
      id: 'quiz',
      titleUrdu: 'سیرت کوئز',
      titleHindi: 'सीरत क्विज़',
      titleEnglish: 'Seerat Quiz',
      subtitleUrdu: 'معلومات کا امتحان',
      subtitleHindi: 'ज्ञान की परीक्षा',
      subtitleEnglish: 'Test your knowledge',
      icon: HelpCircle,
      color: '#c25e00' // warm orange / amber
    },
    {
      id: 'durood',
      titleUrdu: 'روزانہ درود شریف',
      titleHindi: 'दैनिक दुरूद शरीफ',
      titleEnglish: 'Daily Salawat',
      subtitleUrdu: 'آسانی سے درود بھیجیں',
      subtitleHindi: 'आसानी से दुरूद भेजें',
      subtitleEnglish: 'Send blessings easily',
      icon: Heart,
      color: '#064e3b' // forest green
    },
    {
      id: 'progress',
      titleUrdu: 'مطالعہ پیشرفت',
      titleHindi: 'अध्ययन प्रगति',
      titleEnglish: 'Reading Progress',
      subtitleUrdu: 'اپنا سفر ٹریک کریں',
      subtitleHindi: 'अपनी यात्रा ट्रैक करें',
      subtitleEnglish: 'Track your journey',
      icon: BarChart3,
      color: '#064e3b' // forest green
    }
  ];

  return (
    <div className="w-full flex flex-col items-center justify-center px-3 sm:px-4 pt-3 pb-24 sm:py-6 select-none welcome-dots-bg">
      <div className="w-full max-w-[390px] sm:max-w-[440px] flex flex-col items-center text-center">
        
        {/* Horizontal Landscape Hero Card */}
        <div 
          className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-md border border-amber-500/30 transition-transform duration-300 hover:scale-[1.01]"
          style={{ aspectRatio: '16/9', backgroundColor: '#fcf8ee' }}
        >
          <img 
            src="/hero-banner.jpg" 
            alt="Aakhri Nabi Ki Pyari Seerat"
            className="w-full h-full object-cover block"
            loading="eager"
          />

          {/* Overlay Typography */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 py-2 bg-gradient-to-b from-white/10 via-transparent to-black/10">
            <h1 
              className="text-lg sm:text-2xl font-extrabold tracking-tight"
              style={{ 
                fontFamily: "'Playfair Display', Georgia, serif", 
                color: '#064e3b',
                textShadow: '0 1px 3px rgba(255,255,255,0.9)'
              }}
            >
              aakhri Nabi Ki
            </h1>
            <h2 
              className="text-lg sm:text-2xl font-serif font-bold -mt-1"
              style={{ 
                color: '#b45309',
                textShadow: '0 1px 3px rgba(255,255,255,0.9)'
              }}
            >
              pyari seerat
            </h2>

            {/* Ornamental Star */}
            <div className="text-[9px] text-[#065f46] my-1">
              ✦
            </div>

            <div className="text-[9px] sm:text-[10px] font-bold tracking-widest text-[#065f46] uppercase">
              ILM • ISHQ • AMAL
            </div>

            <p className="text-[10px] sm:text-[11px] italic font-serif text-gray-700 dark:text-gray-800 mt-1">
              “A life of mercy for all humanity”
            </p>

            <div className="mt-1.5 flex items-center gap-2 opacity-85">
              <span className="h-px w-5 bg-emerald-800/30" />
              <span className="text-[8px] sm:text-[9px] font-mono tracking-widest text-[#064e3b] font-bold uppercase">
                DEVELOPED BY MOHAMMAD ASIM
              </span>
              <span className="h-px w-5 bg-emerald-800/30" />
            </div>
          </div>
        </div>

        {/* Continue Reading Pill Button */}
        <div className="mt-3.5 w-full">
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
        <div className="mt-3.5 w-full">
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

        {/* Key Features & Interactive Tools (2x2 Grid matching screenshot) */}
        <div className="mt-5 w-full">
          <div className="flex items-center justify-between mb-2.5 px-1">
            <div className="flex items-center gap-1.5 font-bold text-xs sm:text-sm" style={{ color: 'var(--primary)' }}>
              <Star size={15} className="text-emerald-700 dark:text-emerald-400" />
              <span>{lang === 'urdu' ? 'ایپ کے اہم فیچرز' : lang === 'hindi' ? 'ऐप की मुख्य विशेषताएं' : 'Key Features & Interactive Tools'}</span>
            </div>
            <span className="text-[11px] font-medium" style={{ color: 'var(--text-muted)' }}>
              {totalPages} {lang === 'english' ? 'Pages' : lang === 'hindi' ? 'पृष्ठ' : 'صفحات'}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2.5 w-full">
            {features.map((feat) => {
              const Icon = feat.icon;
              const title = lang === 'urdu' ? feat.titleUrdu : lang === 'hindi' ? feat.titleHindi : feat.titleEnglish;
              const subtitle = lang === 'urdu' ? feat.subtitleUrdu : lang === 'hindi' ? feat.subtitleHindi : feat.subtitleEnglish;
              return (
                <button
                  key={feat.id}
                  onClick={() => onNavigateTab && onNavigateTab(feat.id)}
                  className="flex items-center gap-2 p-2.5 rounded-2xl border text-left rtl:text-right transition-all hover:scale-[1.01] active:scale-[0.98] shadow-xs group w-full"
                  style={{ 
                    backgroundColor: 'var(--bg-surface)', 
                    borderColor: 'var(--border-subtle)' 
                  }}
                >
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white flex-shrink-0 shadow-xs transition-transform group-hover:scale-105"
                    style={{ backgroundColor: feat.color }}
                  >
                    <Icon size={18} strokeWidth={2.2} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-xs font-bold truncate leading-tight" style={{ color: 'var(--text-main)' }}>
                      {title}
                    </h3>
                    <p className="text-[10px] truncate mt-0.5 leading-tight" style={{ color: 'var(--text-muted)' }}>
                      {subtitle}
                    </p>
                  </div>
                  <ChevronRight size={14} className="text-gray-300 dark:text-gray-600 flex-shrink-0 group-hover:translate-x-0.5 transition-transform" />
                </button>
              );
            })}
          </div>

          {/* Inspirational Hadith / Quote Card */}
          <div 
            className="mt-4 p-3.5 rounded-2xl border text-center shadow-xs"
            style={{ 
              backgroundColor: 'rgba(6, 95, 70, 0.05)', 
              borderColor: 'rgba(6, 95, 70, 0.15)' 
            }}
          >
            <p className="italic font-serif text-emerald-950 dark:text-emerald-200 text-xs sm:text-sm leading-relaxed">
              {lang === 'urdu'
                ? '”تم میں سے بہترین وہ ہے جو قرآن اور میری سیرت سیکھے اور دوسروں کو سکھائے۔“'
                : lang === 'hindi'
                ? '“तुम में से सबसे बेहतरीन वो है जो मेरे बारे में सीखे और दूसरों को सिखाए।”'
                : '“The best among you are those who learn about me and teach others.”'}
            </p>
            <p className="text-[11px] font-medium text-emerald-800/80 dark:text-emerald-400 mt-1">
              {lang === 'urdu' ? '— رسول اللہ ﷺ —' : lang === 'hindi' ? '— पैगंबर मुहम्मद ﷺ —' : '— Prophet Muhammad ﷺ —'}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
