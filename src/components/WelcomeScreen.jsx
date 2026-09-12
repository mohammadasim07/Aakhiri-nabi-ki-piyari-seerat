import React from 'react';
import { 
  BookOpen, 
  Layers, 
  HelpCircle, 
  Clock, 
  Sparkles, 
  BarChart3, 
  ArrowRight, 
  ArrowLeft,
  Download,
  Smartphone
} from 'lucide-react';
import { BOOK_METADATA } from '../data/bookData';

export default function WelcomeScreen({
  onStartReading,
  currentPage,
  lang,
  setLang,
  onNavigateTab,
  completionPercentage,
  canInstall,
  onInstallApp,
  onOpenDownload
}) {
  const isRTL = lang === 'urdu';
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  const quickFeatures = [
    {
      id: 'chapters',
      titleUrdu: '13 ابواب کی فہرست',
      titleHindi: '13 अध्याय सूची',
      titleEnglish: '13 Chapters Guide',
      subtitleUrdu: 'تفصیلی فہارس و مطالعہ رہنمائی',
      subtitleHindi: 'विस्तृत अध्याय और अध्ययन मार्गदर्शिका',
      subtitleEnglish: 'Detailed chapters and overview',
      icon: Layers,
      color: 'var(--primary)'
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
      color: 'var(--gold)'
    },
    {
      id: 'durood',
      titleUrdu: 'درود شریف کاؤنٹر',
      titleHindi: 'दुरूद शरीफ काउंटर',
      titleEnglish: 'Salawat Tasbih Counter',
      subtitleUrdu: 'حضور ﷺ پر درود و سلام کا ریکارڈ',
      subtitleHindi: 'हुज़ूर ﷺ पर दुरूद व सलाम का रिकॉर्ड',
      subtitleEnglish: 'Gentle bead click & mobile haptics',
      icon: HeartIcon,
      color: '#e11d48'
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
      color: '#0891b2'
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
      color: '#d97706'
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
      color: '#059669'
    }
  ];

  return (
    <div className="w-full flex flex-col items-center justify-center px-4 py-4 sm:py-8 select-none">
      <div className="w-full max-w-xl flex flex-col items-center text-center">
        
        {/* Opening Poster Card */}
        <div 
          className="relative w-full max-w-[340px] sm:max-w-[400px] rounded-3xl overflow-hidden shadow-2xl border-4 transition-transform duration-300 hover:scale-[1.01]"
          style={{ borderColor: 'var(--gold)', backgroundColor: 'var(--bg-surface)' }}
        >
          <img 
            src="/opening-cover.jpg" 
            alt="Aakhri Nabi Ki Pyari Seerat - Opening Page"
            className="w-full h-auto object-cover block"
            loading="eager"
          />
        </div>

        {/* Trilingual Language Selector Pills */}
        <div 
          className="mt-6 flex items-center p-1.5 rounded-2xl border shadow-sm w-full max-w-md text-xs font-semibold"
          style={{ backgroundColor: 'var(--bg-surface-elevated)', borderColor: 'var(--border-color)' }}
        >
          <button
            onClick={() => setLang('urdu')}
            className={`flex-1 py-2 rounded-xl transition-all ${lang === 'urdu' ? 'shadow-md font-bold text-white' : ''}`}
            style={{
              backgroundColor: lang === 'urdu' ? 'var(--primary)' : 'transparent',
              color: lang === 'urdu' ? '#ffffff' : 'var(--text-muted)'
            }}
          >
            اردو ایڈیشن
          </button>
          <button
            onClick={() => setLang('hindi')}
            className={`flex-1 py-2 rounded-xl transition-all ${lang === 'hindi' ? 'shadow-md font-bold text-white' : ''}`}
            style={{
              backgroundColor: lang === 'hindi' ? 'var(--primary)' : 'transparent',
              color: lang === 'hindi' ? '#ffffff' : 'var(--text-muted)'
            }}
          >
            हिन्दी एडिशन
          </button>
          <button
            onClick={() => setLang('english')}
            className={`flex-1 py-2 rounded-xl transition-all ${lang === 'english' ? 'shadow-md font-bold text-white' : ''}`}
            style={{
              backgroundColor: lang === 'english' ? 'var(--primary)' : 'transparent',
              color: lang === 'english' ? '#ffffff' : 'var(--text-muted)'
            }}
          >
            English Edition
          </button>
        </div>

        {/* Primary Action Button: Continue / Start Reading */}
        <div className="mt-5 w-full max-w-md">
          <button
            onClick={onStartReading}
            className="w-full py-3.5 px-6 rounded-2xl font-bold text-base sm:text-lg text-white shadow-lg flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-95 group"
            style={{ 
              background: 'linear-gradient(135deg, var(--primary), var(--primary-hover))',
              boxShadow: '0 8px 24px var(--primary-glow)'
            }}
          >
            <BookOpen size={22} className="group-hover:scale-110 transition-transform" />
            <span>
              {currentPage > 1
                ? (lang === 'urdu' ? `مطالعہ جاری رکھیں (صفحہ ${currentPage})` : lang === 'hindi' ? `अध्ययन जारी रखें (पृष्ठ ${currentPage})` : `Continue Reading (Page ${currentPage})`)
                : (lang === 'urdu' ? 'کتاب کا مطالعہ شروع کریں' : lang === 'hindi' ? 'किताब का अध्ययन शुरू करें' : 'Start Reading Book')}
            </span>
            <ArrowIcon size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* App Utility Buttons: Install & Offline Downloads */}
        <div className="mt-4 flex items-center justify-center gap-2.5 w-full max-w-md text-xs">
          {canInstall && (
            <button
              onClick={onInstallApp}
              className="flex-1 py-2 px-3 rounded-xl border font-semibold flex items-center justify-center gap-1.5 transition-all shadow-xs"
              style={{ 
                backgroundColor: 'var(--gold-light)', 
                borderColor: 'var(--gold)',
                color: 'var(--gold-hover)'
              }}
            >
              <Smartphone size={15} />
              <span>{lang === 'english' ? 'Install to Phone' : 'فون پر انسٹال کریں'}</span>
            </button>
          )}

          <button
            onClick={onOpenDownload}
            className="flex-1 py-2 px-3 rounded-xl border font-semibold flex items-center justify-center gap-1.5 transition-all shadow-xs hover:border-emerald-500"
            style={{ 
              backgroundColor: 'var(--bg-surface-elevated)', 
              borderColor: 'var(--border-color)',
              color: 'var(--text-main)'
            }}
          >
            <Download size={15} style={{ color: 'var(--primary)' }} />
            <span>{lang === 'english' ? 'Offline App & PDFs' : 'آف لائن ڈیٹا اور PDFs'}</span>
          </button>
        </div>

        {/* Quick Features Section */}
        <div className="mt-8 w-full">
          <div className="flex items-center justify-between mb-3 px-1">
            <h2 className="text-sm font-bold text-left" style={{ color: 'var(--primary)' }}>
              {lang === 'urdu' ? 'ایپ کے اہم فیچرز' : lang === 'hindi' ? 'ऐप की मुख्य विशेषताएं' : 'Key Features & Interactive Tools'}
            </h2>
            <span className="text-[11px] font-medium" style={{ color: 'var(--text-muted)' }}>
              {BOOK_METADATA.totalPagesUrdu} {lang === 'english' ? 'Pages' : 'صفحات'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full">
            {quickFeatures.map((feat) => {
              const Icon = feat.icon;
              const title = lang === 'urdu' ? feat.titleUrdu : lang === 'hindi' ? feat.titleHindi : feat.titleEnglish;
              const subtitle = lang === 'urdu' ? feat.subtitleUrdu : lang === 'hindi' ? feat.subtitleHindi : feat.subtitleEnglish;
              return (
                <button
                  key={feat.id}
                  onClick={() => onNavigateTab(feat.id)}
                  className="flex items-center gap-3 p-3 rounded-2xl border text-left transition-all hover:scale-[1.02] active:scale-95 shadow-xs group"
                  style={{ 
                    backgroundColor: 'var(--bg-surface)', 
                    borderColor: 'var(--border-color)' 
                  }}
                >
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white flex-shrink-0 shadow-xs group-hover:scale-105 transition-transform"
                    style={{ backgroundColor: feat.color }}
                  >
                    <Icon size={20} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-xs font-bold truncate" style={{ color: 'var(--text-main)' }}>
                      {title}
                    </h3>
                    <p className="text-[10px] truncate mt-0.5" style={{ color: 'var(--text-muted)' }}>
                      {subtitle}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom Credits Banner */}
        <div 
          className="mt-8 mb-6 p-4 rounded-2xl border w-full text-center text-xs shadow-xs"
          style={{ 
            backgroundColor: 'var(--bg-surface-elevated)', 
            borderColor: 'var(--border-subtle)' 
          }}
        >
          <p className="font-semibold text-emerald-800 dark:text-emerald-300">
            Developed by Mohammad Asim
          </p>
          <p className="text-[11px] mt-1" style={{ color: 'var(--text-muted)' }}>
            Original Biographical Publication: Maktaba-tul-Madinah (Dawat-e-Islami)
          </p>
        </div>

      </div>
    </div>
  );
}

function HeartIcon({ size = 20, style }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
    </svg>
  );
}
