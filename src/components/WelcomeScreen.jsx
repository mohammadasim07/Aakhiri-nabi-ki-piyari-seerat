import React from 'react';
import { 
  BookOpen, 
  Layers, 
  Clock, 
  Target, 
  ArrowRight, 
  ArrowLeft,
  Sparkles,
  HelpCircle,
  Compass,
  Award,
  Bookmark,
  Share2,
  Heart
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

  // Reading time text
  const totalMinutes = readingStats?.totalMinutesRead || 15;
  const hours = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;
  const readingTimeText = hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;

  const features = [
    {
      id: 'chapters',
      titleUrdu: 'فہرست ابواب',
      titleHindi: 'अध्याय सूची',
      titleEnglish: 'Chapters Guide',
      descUrdu: '۱۳ جامع ابواب اور عنوانات',
      descHindi: '13 संपूर्ण अध्याय और विषय',
      descEnglish: '13 comprehensive chapters',
      icon: Layers,
      color: '#065f46',
      bg: 'rgba(6, 95, 70, 0.08)'
    },
    {
      id: 'progress',
      titleUrdu: 'مطالعہ پیشرفت',
      titleHindi: 'अध्ययन प्रगति',
      titleEnglish: 'Reading Progress',
      descUrdu: 'تفصیلی شماریات اور ریکارڈ',
      descHindi: 'विस्तृत आंकड़े और रिकॉर्ड',
      descEnglish: 'Detailed stats and streak',
      icon: Target,
      color: '#0284c7',
      bg: 'rgba(2, 132, 199, 0.08)'
    },
    {
      id: 'durood',
      titleUrdu: 'درود پاک تسبیح',
      titleHindi: 'दुरूद शरीफ़ तस्बीह',
      titleEnglish: 'Salawat Tasbih',
      descUrdu: 'ڈیجیٹل کاؤنٹر اور فضائل',
      descHindi: 'डिजिटल काउंटर और फ़ज़ीलत',
      descEnglish: 'Digital counter with rewards',
      icon: Heart,
      color: '#e11d48',
      bg: 'rgba(225, 29, 72, 0.08)'
    },
    {
      id: 'quiz',
      titleUrdu: 'سیرت النبی ﷺ کوئز',
      titleHindi: 'सीरत-उन-नबी ﷺ क्विज़',
      titleEnglish: 'Seerat Quiz',
      descUrdu: '۵۰+ سوالات و جوابات',
      descHindi: '50+ प्रश्न और उत्तर',
      descEnglish: '50+ interactive questions',
      icon: HelpCircle,
      color: '#d97706',
      bg: 'rgba(217, 119, 6, 0.08)'
    },
    {
      id: 'timeline',
      titleUrdu: 'تاریخی ٹائم لائن',
      titleHindi: 'ऐतिहासिक टाइमलाइन',
      titleEnglish: 'Seerat Timeline',
      descUrdu: 'مکی اور مدنی اہم واقعات',
      descHindi: 'मक्की व मदनी मुख्य घटनाएं',
      descEnglish: 'Makki & Madani milestones',
      icon: Clock,
      color: '#7c3aed',
      bg: 'rgba(124, 58, 237, 0.08)'
    },
    {
      id: 'shamail',
      titleUrdu: 'شمائل و خصائل نبوی ﷺ',
      titleHindi: 'शमाइल व ख़साइल ﷺ',
      titleEnglish: 'Shamail Explorer',
      descUrdu: 'مقدس اوصاف اور اخلاقِ مبارکہ',
      descHindi: 'पवित्र गुण और मुबारक अख़्लाक़',
      descEnglish: 'Noble character and traits',
      icon: Sparkles,
      color: '#059669',
      bg: 'rgba(5, 150, 105, 0.08)'
    }
  ];

  return (
    <div className="w-full flex flex-col items-center justify-center px-4 pt-3 pb-24 sm:py-8 select-none">
      <div className="w-full max-w-md flex flex-col items-center text-center">
        

        {/* Iconic Opening Portrait Artwork Card */}
        <div 
          className="relative w-full max-w-[340px] sm:max-w-[380px] rounded-3xl overflow-hidden shadow-2xl border-[3px] transition-transform duration-300 hover:scale-[1.01]"
          style={{ borderColor: 'var(--gold)', backgroundColor: 'var(--bg-surface)' }}
        >
          <img 
            src="/opening-cover.jpg" 
            alt="Aakhri Nabi Ki Pyari Seerat - Opening Page"
            className="w-full h-auto object-cover block"
            loading="eager"
          />
        </div>

        {/* Primary CTA: Continue Reading Pill Button */}
        <div className="mt-4 w-full max-w-[340px] sm:max-w-[380px]">
          <button
            onClick={onStartReading}
            type="button"
            className="w-full py-3.5 px-5 rounded-2xl text-white flex items-center justify-between shadow-lg transition-all hover:scale-[1.01] active:scale-[0.98] group cursor-pointer"
            style={{ 
              background: 'linear-gradient(135deg, #064e3b 0%, #065f46 100%)',
              boxShadow: '0 8px 24px rgba(6, 78, 59, 0.32)'
            }}
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                <BookOpen size={22} className="text-white" />
              </div>
              <div className="text-left rtl:text-right min-w-0">
                <div className={`font-bold text-sm sm:text-base text-white ${lang === 'urdu' ? 'font-urdu leading-normal py-0.5' : 'leading-tight truncate'}`}>
                  {lang === 'urdu' ? 'مطالعہ جاری رکھیں' : lang === 'hindi' ? 'अध्ययन जारी रखें' : 'Continue Reading'}
                </div>
                <div className="text-[11px] sm:text-xs text-emerald-200 font-medium truncate mt-0.5" dir="ltr">
                  {lang === 'urdu' 
                    ? `صفحہ ${currentPage} از ${totalPages}` 
                    : lang === 'hindi' 
                    ? `पृष्ठ ${currentPage} में से ${totalPages}` 
                    : `Page ${currentPage} of ${totalPages}`}
                </div>
              </div>
            </div>
            
            <div 
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
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
              <span className={`font-bold ${lang === 'urdu' ? 'font-urdu py-0.5 leading-normal text-sm' : ''}`} style={{ color: 'var(--text-main)' }}>
                {lang === 'urdu' ? 'آپ کا مطالعہ پیشرفت' : lang === 'hindi' ? 'आपकी अध्ययन प्रगति' : 'Your Reading Progress'}
              </span>
              <span className={`font-bold font-mono text-emerald-700 dark:text-emerald-400 ${lang === 'urdu' ? 'font-urdu' : ''}`} dir="ltr" style={{ color: 'var(--primary)' }}>
                {completionPercentage}% {lang === 'urdu' ? 'مکمل' : lang === 'hindi' ? 'पूर्ण' : 'Completed'}
              </span>
            </div>

            {/* Horizontal Progress Bar */}
            <div 
              className="w-full h-2 rounded-full overflow-hidden mb-3.5"
              style={{ backgroundColor: 'rgba(0, 0, 0, 0.08)' }}
            >
              <div 
                className="h-full rounded-full transition-all duration-700"
                style={{ 
                  width: `${Math.max(completionPercentage, 2)}%`,
                  background: 'linear-gradient(90deg, var(--primary), var(--gold))' 
                }}
              />
            </div>

            {/* 4 Stats Columns */}
            <div 
              className="grid grid-cols-4 divide-x rtl:divide-x-reverse"
              style={{ borderColor: 'var(--border-subtle)' }}
            >
              {/* 1. Pages Read */}
              <div className="flex flex-col items-center justify-center text-center px-1 overflow-visible">
                <BookOpen size={16} strokeWidth={2} style={{ color: 'var(--text-muted)' }} />
                <span className="font-bold text-xs sm:text-sm mt-1.5 truncate max-w-full font-mono" dir="ltr" style={{ color: 'var(--text-main)' }}>
                  {pagesReadCount}/{totalPages}
                </span>
                <span className={`text-[10px] mt-0.5 max-w-full overflow-visible ${lang === 'urdu' ? 'font-urdu leading-normal text-[11px] py-0.5' : 'truncate'}`} style={{ color: 'var(--text-muted)' }}>
                  {lang === 'urdu' ? 'صفحات' : lang === 'hindi' ? 'पृष्ठ' : 'Pages'}
                </span>
              </div>

              {/* 2. Chapters */}
              <div className="flex flex-col items-center justify-center text-center px-1 overflow-visible">
                <Layers size={16} strokeWidth={2} style={{ color: 'var(--text-muted)' }} />
                <span className="font-bold text-xs sm:text-sm mt-1.5 truncate max-w-full font-mono" dir="ltr" style={{ color: 'var(--text-main)' }}>
                  {completedChaptersCount}/{totalChapters}
                </span>
                <span className={`text-[10px] mt-0.5 max-w-full overflow-visible ${lang === 'urdu' ? 'font-urdu leading-normal text-[11px] py-0.5' : 'truncate'}`} style={{ color: 'var(--text-muted)' }}>
                  {lang === 'urdu' ? 'ابواب' : lang === 'hindi' ? 'अध्याय' : 'Chapters'}
                </span>
              </div>

              {/* 3. Reading Time */}
              <div className="flex flex-col items-center justify-center text-center px-1 overflow-visible">
                <Clock size={16} strokeWidth={2} style={{ color: 'var(--text-muted)' }} />
                <span className="font-bold text-xs sm:text-sm mt-1.5 truncate max-w-full font-mono" dir="ltr" style={{ color: 'var(--text-main)' }}>
                  {readingTimeText}
                </span>
                <span className={`text-[10px] mt-0.5 max-w-full overflow-visible ${lang === 'urdu' ? 'font-urdu leading-normal text-[11px] py-0.5' : 'truncate'}`} style={{ color: 'var(--text-muted)' }}>
                  {lang === 'urdu' ? 'مطالعہ وقت' : lang === 'hindi' ? 'समय' : 'Time'}
                </span>
              </div>

              {/* 4. Completed */}
              <div className="flex flex-col items-center justify-center text-center px-1 overflow-visible">
                <Target size={16} strokeWidth={2} style={{ color: 'var(--text-muted)' }} />
                <span className="font-bold text-xs sm:text-sm mt-1.5 truncate max-w-full font-mono" dir="ltr" style={{ color: 'var(--text-main)' }}>
                  {completionPercentage}%
                </span>
                <span className={`text-[10px] mt-0.5 max-w-full overflow-visible ${lang === 'urdu' ? 'font-urdu leading-normal text-[11px] py-0.5' : 'truncate'}`} style={{ color: 'var(--text-muted)' }}>
                  {lang === 'urdu' ? 'مکمل' : lang === 'hindi' ? 'पूर्ण' : 'Progress'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 6 Key Interactive Tools Section */}
        <div className="mt-6 w-full max-w-[340px] sm:max-w-[380px]">
          <div className="flex items-center justify-between mb-3 px-1">
            <h2 className={`text-xs sm:text-sm font-bold ${lang === 'urdu' ? 'font-urdu py-1 leading-relaxed text-sm' : ''}`} style={{ color: 'var(--primary)' }}>
              {lang === 'urdu' ? 'ایپ کے اہم علمی و دینی فیچرز' : lang === 'hindi' ? 'ऐप की मुख्य विशेषताएं व टूल्स' : 'Key Features & Learning Tools'}
            </h2>
            <span className="text-[11px] font-medium" style={{ color: 'var(--text-muted)' }}>
              {features.length} {lang === 'urdu' ? 'فیچرز' : lang === 'hindi' ? 'टूल्स' : 'Tools'}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2.5 w-full">
            {features.map((feat) => {
              const Icon = feat.icon;
              const title = lang === 'urdu' ? feat.titleUrdu : lang === 'hindi' ? feat.titleHindi : feat.titleEnglish;
              const desc = lang === 'urdu' ? feat.descUrdu : lang === 'hindi' ? feat.descHindi : feat.descEnglish;
              return (
                <button
                  key={feat.id}
                  type="button"
                  onClick={() => onNavigateTab && onNavigateTab(feat.id)}
                  className="flex flex-col items-start p-3 rounded-2xl border text-left rtl:text-right transition-all hover:scale-[1.02] active:scale-95 shadow-xs group cursor-pointer min-h-[110px] justify-between"
                  style={{ 
                    backgroundColor: 'var(--bg-surface)', 
                    borderColor: 'var(--border-subtle)' 
                  }}
                >
                  <div 
                    className="w-9 h-9 rounded-xl flex items-center justify-center mb-1.5 transition-transform group-hover:scale-110 flex-shrink-0"
                    style={{ backgroundColor: feat.bg, color: feat.color }}
                  >
                    <Icon size={18} strokeWidth={2.2} />
                  </div>
                  <div className="w-full flex-1 flex flex-col justify-center overflow-visible">
                    <h3 className={`text-xs font-bold leading-normal w-full overflow-visible ${lang === 'urdu' ? 'font-urdu py-0.5 text-[13px]' : 'truncate'}`} style={{ color: 'var(--text-main)' }}>
                      {title}
                    </h3>
                    <p className={`text-[10px] w-full mt-0.5 overflow-visible ${lang === 'urdu' ? 'font-urdu leading-normal text-[11px] py-0.5' : 'truncate'}`} style={{ color: 'var(--text-muted)' }}>
                      {desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Daily Spiritual Reflection / Hadith Card */}
        <div className="mt-5 w-full max-w-[340px] sm:max-w-[380px]">
          <div 
            className="w-full p-4 rounded-2xl border text-center shadow-xs relative overflow-hidden"
            style={{ 
              backgroundColor: 'var(--bg-surface-elevated)', 
              borderColor: 'var(--gold)' 
            }}
          >
            <div className="font-arabic text-sm sm:text-base font-bold mb-1.5" style={{ color: 'var(--gold)' }}>
              صَلَّى اللّٰهُ عَلَيْهِ وَآلِهِ وَسَلَّمَ
            </div>
            <p className="text-xs sm:text-[13px] leading-relaxed italic text-gray-700 dark:text-gray-300">
              {lang === 'urdu'
                ? '”تم میں سے سب سے بہتر وہ شخص ہے جس کے اخلاق سب سے اچھے ہوں۔“ (صحیح بخاری)'
                : lang === 'hindi'
                ? '”तुम में से सबसे उत्तम व्यक्ति वह है जिसका चरित्र सबसे अच्छा हो।“ (सहीह बुख़ारी)'
                : '“The best among you are those who have the best manners and character.” (Sahih Bukhari)'}
            </p>
          </div>
        </div>

        {/* Dedicated Attribution Footer Card */}
        <div 
          className="mt-6 p-4 rounded-2xl border w-full max-w-[340px] sm:max-w-[380px] text-center shadow-xs"
          style={{ 
            backgroundColor: 'var(--bg-surface)', 
            borderColor: 'var(--border-subtle)' 
          }}
        >
          <div className="flex items-center justify-center text-xs font-bold tracking-wide" style={{ color: 'var(--primary)' }}>
            Developed by Mohammad Asim
          </div>
          <p className="text-[11px] mt-1" style={{ color: 'var(--text-muted)' }}>
            Content provided by Dawat-e-Islami
          </p>
        </div>

      </div>
    </div>
  );
}
