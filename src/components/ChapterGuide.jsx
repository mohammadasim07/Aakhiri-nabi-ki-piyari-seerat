import React, { useState } from 'react';
import { 
  BookOpen, 
  ChevronDown, 
  ChevronUp, 
  ArrowLeft, 
  ArrowRight,
  Bookmark
} from 'lucide-react';
import { CHAPTERS } from '../data/bookData';

export default function ChapterGuide({
  lang,
  onOpenPage,
  bookmarks
}) {
  const [expandedChapter, setExpandedChapter] = useState(1);

  const getPageRange = (chap) => {
    if (lang === 'english') {
      return `Page ${chap.pageStartEnglish} - ${chap.pageEndEnglish}`;
    }
    return `صفحہ ${chap.pageStartUrdu} - ${chap.pageEndUrdu}`;
  };

  const getChapterNumber = (chap) => {
    if (lang === 'urdu') return chap.numberUrdu;
    if (lang === 'hindi') return chap.numberHindi;
    return chap.numberEnglish;
  };

  const getChapterTitle = (chap) => {
    if (lang === 'urdu') return chap.titleUrdu;
    if (lang === 'hindi') return chap.titleHindi;
    return chap.titleEnglish;
  };

  const getChapterSummary = (chap) => {
    if (lang === 'urdu') return chap.summaryUrdu;
    if (lang === 'hindi') return chap.summaryHindi;
    return chap.summaryEnglish;
  };

  const getTopicTitle = (t) => {
    if (lang === 'urdu') return t.titleUrdu;
    if (lang === 'hindi') return t.titleHindi;
    return t.titleEnglish;
  };

  const getTopicPage = (t) => {
    return lang === 'english' ? t.pageEnglish : t.pageUrdu;
  };

  const getStartPage = (chap) => {
    return lang === 'english' ? chap.pageStartEnglish : chap.pageStartUrdu;
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      {/* Header Banner */}
      <div 
        className="rounded-2xl p-6 sm:p-8 mb-8 text-white shadow-xl relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, var(--primary-dark), var(--primary))' }}
      >
        <div className="relative z-10">
          <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
            {lang === 'english' ? 'Table of Contents & 13 Chapters' : 'فہرستِ مضامین و ابواب (13 ابواب)'}
          </div>
          <h2 className={`text-2xl sm:text-3xl font-bold mb-2 ${lang === 'urdu' ? 'font-urdu' : lang === 'hindi' ? 'font-hindi' : ''}`}>
            {lang === 'urdu' 
              ? 'کتاب کے تمام 13 ابواب کی تفصیل' 
              : lang === 'hindi' 
              ? 'किताब के सभी 13 अध्यायों का विवरण' 
              : 'Detailed Overview of All 13 Chapters'}
          </h2>
          <p className="text-emerald-100 text-sm sm:text-base max-w-2xl leading-relaxed">
            {lang === 'urdu' 
              ? 'سرکارِ دو عالم ﷺ کی سیرتِ طیبہ کے تمام پہلوؤں کا احاطہ کرنے والے ابواب، ذیلی عنوانات اور براہِ راست صفحات کا انتخاب کریں۔'
              : lang === 'hindi'
              ? 'हुज़ूर अकरम صَلَّى اللّٰهُ عَلَيْهِ وَاٰلِہٖ وَसَلَّم की मुबारक सीरत के तमाम अद्वारों और वाक़िआत का मुकम्मल जायज़ा।'
              : 'Comprehensive study guide encompassing all major milestones, sub-topics, and direct page shortcuts across the blessed biography of the Final Messenger ﷺ.'}
          </p>
        </div>
      </div>

      {/* Chapters Accordion / Card List */}
      <div className="space-y-4">
        {CHAPTERS.map((chap) => {
          const isExpanded = expandedChapter === chap.id;
          const startP = getStartPage(chap);
          const endP = lang === 'english' ? chap.pageEndEnglish : chap.pageEndUrdu;
          const hasBookmark = bookmarks.some((p) => p >= startP && p <= endP);

          return (
            <div 
              key={chap.id}
              className="rounded-xl border transition-all duration-200 overflow-hidden"
              style={{ 
                backgroundColor: 'var(--bg-surface)', 
                borderColor: isExpanded ? 'var(--primary)' : 'var(--border-color)',
                boxShadow: isExpanded ? 'var(--shadow-md)' : 'var(--shadow-sm)'
              }}
            >
              {/* Chapter Card Header */}
              <div 
                onClick={() => setExpandedChapter(isExpanded ? null : chap.id)}
                className="p-5 flex items-center justify-between cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors gap-4"
              >
                <div className="flex items-center gap-4 flex-1">
                  {/* Chapter Number Badge */}
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-base flex-shrink-0 text-white shadow-sm"
                    style={{ 
                      background: isExpanded 
                        ? 'linear-gradient(135deg, var(--gold), var(--gold-hover))' 
                        : 'linear-gradient(135deg, var(--primary), var(--primary-hover))' 
                    }}
                  >
                    {chap.id}
                  </div>

                  {/* Title & Page range */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold px-2 py-0.5 rounded" style={{ backgroundColor: 'var(--bg-surface-elevated)', color: 'var(--text-muted)' }}>
                        {getChapterNumber(chap)}
                      </span>
                      <span className="text-xs font-mono font-medium" style={{ color: 'var(--gold)' }}>
                        {getPageRange(chap)}
                      </span>
                      {hasBookmark && (
                        <span className="inline-flex items-center gap-0.5 text-xs text-amber-600">
                          <Bookmark size={12} fill="currentColor" />
                          <span className="text-[10px]">{lang === 'english' ? 'Bookmarked' : 'محفوظ'}</span>
                        </span>
                      )}
                    </div>
                    <h3 className={`text-lg sm:text-xl font-bold ${lang === 'urdu' ? 'font-urdu' : lang === 'hindi' ? 'font-hindi' : ''}`} style={{ color: 'var(--text-main)' }}>
                      {getChapterTitle(chap)}
                    </h3>
                  </div>
                </div>

                {/* Toggle icon */}
                <div className="p-2 rounded-lg" style={{ color: 'var(--text-muted)' }}>
                  {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
              </div>

              {/* Expanded Chapter Details */}
              {isExpanded && (
                <div 
                  className="px-5 pb-6 pt-2 border-t space-y-4"
                  style={{ borderColor: 'var(--border-subtle)', backgroundColor: 'var(--bg-surface-elevated)' }}
                >
                  {/* Summary paragraph */}
                  <p className={`text-sm sm:text-base leading-relaxed ${lang === 'urdu' ? 'font-urdu' : lang === 'hindi' ? 'font-hindi' : ''}`} style={{ color: 'var(--text-main)' }}>
                    {getChapterSummary(chap)}
                  </p>

                  {/* Topics List Grid */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider mb-2.5" style={{ color: 'var(--text-muted)' }}>
                      {lang === 'english' ? 'Subtopics in this Chapter:' : lang === 'hindi' ? 'इस अध्याय के उप-विषय:' : 'اس باب کے ذیلی عناوین:'}
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {chap.topics.map((t, idx) => {
                        const page = getTopicPage(t);
                        return (
                          <button
                            key={idx}
                            onClick={() => onOpenPage(page)}
                            className="flex items-center justify-between p-3 rounded-xl border text-inherit group hover:scale-[1.01] transition-all"
                            style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}
                          >
                            <div className="flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-emerald-500 group-hover:scale-125 transition-transform flex-shrink-0" />
                              <span className={`text-sm font-semibold ${lang === 'urdu' ? 'font-urdu' : lang === 'hindi' ? 'font-hindi' : ''}`} style={{ color: 'var(--text-main)' }}>
                                {getTopicTitle(t)}
                              </span>
                            </div>
                            <span className="text-xs font-mono px-2 py-1 rounded bg-black/5 dark:bg-white/5 font-semibold flex-shrink-0" style={{ color: 'var(--gold)' }}>
                              {lang === 'english' ? `p. ${page}` : `ص ${page}`}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Read Entire Chapter CTA Button */}
                  <div className="pt-2 flex items-center justify-end">
                    <button
                      onClick={() => onOpenPage(startP)}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-white shadow-md hover:opacity-95 transition-all"
                      style={{ background: 'linear-gradient(135deg, var(--primary), var(--primary-hover))' }}
                    >
                      <BookOpen size={16} />
                      <span>
                        {lang === 'english'
                          ? `Read Chapter ${chap.id} (Page ${startP})`
                          : lang === 'hindi'
                          ? `अध्याय ${chap.id} का अध्ययन शुरू करें`
                          : `باب نمبر ${chap.id} کا مطالعہ شروع کریں`}
                      </span>
                      {lang === 'urdu' ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
