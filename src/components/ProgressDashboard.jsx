import React from 'react';
import { 
  CheckCircle2, 
  Clock, 
  Flame, 
  BookOpen, 
  Check, 
  RotateCcw, 
  ArrowLeft, 
  ArrowRight,
  BarChart3
} from 'lucide-react';
import { calculateProgress } from '../utils/progressTracker';

export default function ProgressDashboard({
  lang,
  readPages,
  readingStats,
  lastReadPage,
  onOpenPage,
  onMarkChapterComplete,
  onResetProgress
}) {
  const stats = calculateProgress(readPages, lang);

  const circumference = 2 * Math.PI * 45; // radius = 45
  const strokeDashoffset = circumference - (stats.percentage / 100) * circumference;

  const getChapterTitle = (c) => {
    if (lang === 'urdu') return c.titleUrdu;
    if (lang === 'hindi') return c.titleHindi;
    return c.titleEnglish;
  };

  const getChapterNumber = (c) => {
    if (lang === 'urdu') return c.numberUrdu;
    if (lang === 'hindi') return c.numberHindi;
    return c.numberEnglish;
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl pb-24">
      {/* Header Banner */}
      <div 
        className="rounded-3xl p-6 sm:p-8 mb-6 text-white shadow-xl relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #064e3b, #047857)' }}
      >
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-right flex-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-3 bg-white/20">
              <BarChart3 size={14} />
              <span>
                {lang === 'english'
                  ? 'Reading Completion Record'
                  : lang === 'hindi'
                  ? 'अध्ययन पूर्णता रिकॉर्ड'
                  : 'مطالعہ کی تکمیل کا ریکارڈ'}
              </span>
            </div>
            <h2 className={`text-2xl sm:text-3xl font-bold mb-2 ${lang === 'urdu' ? 'font-urdu' : lang === 'hindi' ? 'font-hindi' : ''}`}>
              {lang === 'english'
                ? 'Your Seerat Reading Journey'
                : lang === 'hindi'
                ? 'आपकी सीरत अध्ययन प्रगति'
                : 'آپ کے مطالعۂ سیرت کی پیش رفت'}
            </h2>
            <p className="text-emerald-100 text-sm max-w-md leading-relaxed">
              {lang === 'english'
                ? 'Track your reading milestones, pages completed, daily streaks, and chapter progress.'
                : lang === 'hindi'
                ? 'कुल पृष्ठ, पढ़े गए अध्याय और दैनिक अध्ययन का मुकम्मल रिकॉर्ड।'
                : 'مکمل پڑھے گئے صفحات، ابواب کی تکمیل اور روزانہ کے مطالعے کا جامع ریکارڈ۔'}
            </p>

            {/* Quick Resume Button */}
            <div className="mt-4 flex flex-wrap items-center justify-center md:justify-start gap-3">
              <button
                onClick={() => onOpenPage(lastReadPage || 1)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm bg-white text-emerald-900 shadow-md hover:scale-105 active:scale-95 transition-all"
              >
                <BookOpen size={16} />
                <span>
                  {lang === 'english'
                    ? `Continue Reading (Page ${lastReadPage || 1})`
                    : `مطالعہ جاری رکھیں (صفحہ ${lastReadPage || 1})`}
                </span>
                {lang === 'urdu' ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
              </button>
            </div>
          </div>

          {/* Big Circular Progress Indicator */}
          <div className="relative flex-shrink-0 flex flex-col items-center">
            <svg className="w-36 h-36 sm:w-40 sm:h-40 -rotate-90 transform" viewBox="0 0 100 100">
              {/* Background Ring */}
              <circle
                cx="50"
                cy="50"
                r="45"
                className="text-white/20"
                strokeWidth="8"
                stroke="currentColor"
                fill="transparent"
              />
              {/* Progress Ring */}
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="var(--gold)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                fill="transparent"
                style={{ transition: 'stroke-dashoffset 0.6s ease' }}
              />
            </svg>

            {/* Percentage Inside Circle */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-3xl sm:text-4xl font-bold font-mono">
                {stats.percentage}%
              </span>
              <span className="text-[11px] text-emerald-100 font-medium">
                {lang === 'english' ? 'Completed' : 'مکمل شدہ'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {/* Pages Read */}
        <div 
          className="p-4 rounded-2xl border shadow-xs text-center"
          style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}
        >
          <div className="w-8 h-8 mx-auto rounded-xl flex items-center justify-center mb-2 bg-emerald-500/10 text-emerald-600">
            <BookOpen size={18} />
          </div>
          <span className="text-2xl font-bold font-mono" style={{ color: 'var(--text-main)' }}>
            {stats.pagesReadCount}
          </span>
          <span className="text-xs block" style={{ color: 'var(--text-muted)' }}>
            / {stats.totalPages} {lang === 'english' ? 'Pages' : 'صفحات'}
          </span>
        </div>

        {/* Chapters Done */}
        <div 
          className="p-4 rounded-2xl border shadow-xs text-center"
          style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}
        >
          <div className="w-8 h-8 mx-auto rounded-xl flex items-center justify-center mb-2 bg-amber-500/10 text-amber-600">
            <CheckCircle2 size={18} />
          </div>
          <span className="text-2xl font-bold font-mono" style={{ color: 'var(--text-main)' }}>
            {stats.completedChaptersCount}
          </span>
          <span className="text-xs block" style={{ color: 'var(--text-muted)' }}>
            / {stats.totalChapters} {lang === 'english' ? 'Chapters' : 'ابواب'}
          </span>
        </div>

        {/* Reading Streak */}
        <div 
          className="p-4 rounded-2xl border shadow-xs text-center"
          style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}
        >
          <div className="w-8 h-8 mx-auto rounded-xl flex items-center justify-center mb-2 bg-orange-500/10 text-orange-600">
            <Flame size={18} />
          </div>
          <span className="text-2xl font-bold font-mono text-orange-600">
            {readingStats.streakDays}
          </span>
          <span className="text-xs block" style={{ color: 'var(--text-muted)' }}>
            {lang === 'english' ? 'Day Streak' : 'روزانہ تسلسل'}
          </span>
        </div>

        {/* Time Spent */}
        <div 
          className="p-4 rounded-2xl border shadow-xs text-center"
          style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}
        >
          <div className="w-8 h-8 mx-auto rounded-xl flex items-center justify-center mb-2 bg-blue-500/10 text-blue-600">
            <Clock size={18} />
          </div>
          <span className="text-2xl font-bold font-mono" style={{ color: 'var(--text-main)' }}>
            {readingStats.totalMinutesRead}
          </span>
          <span className="text-xs block" style={{ color: 'var(--text-muted)' }}>
            {lang === 'english' ? 'Minutes Read' : 'منٹ مطالعہ'}
          </span>
        </div>
      </div>

      {/* Chapters Completion Breakdown */}
      <div 
        className="rounded-3xl border p-5 sm:p-7 shadow-sm space-y-4"
        style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}
      >
        <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: 'var(--border-subtle)' }}>
          <div>
            <h3 className={`text-lg font-bold ${lang === 'urdu' ? 'font-urdu' : lang === 'hindi' ? 'font-hindi' : ''}`} style={{ color: 'var(--text-main)' }}>
              {lang === 'english' ? 'Chapter Completion Status' : 'ابواب کی تکمیل کا جائزہ'}
            </h3>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              {lang === 'english'
                ? 'Check off chapters as you finish reading them.'
                : 'تمام 13 ابواب کا مرحلہ وار ریکارڈ۔'}
            </p>
          </div>

          <button
            onClick={onResetProgress}
            className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700 px-2.5 py-1.5 rounded-lg border hover:bg-red-50 dark:hover:bg-red-950/20"
            style={{ borderColor: 'var(--border-color)' }}
          >
            <RotateCcw size={13} />
            <span>{lang === 'english' ? 'Reset' : 'ری سیٹ'}</span>
          </button>
        </div>

        {/* Chapters List */}
        <div className="space-y-3">
          {stats.chaptersProgress.map((chap) => (
            <div
              key={chap.id}
              className="p-3.5 rounded-2xl border transition-all hover:border-emerald-500/50"
              style={{ backgroundColor: 'var(--bg-surface-elevated)', borderColor: 'var(--border-color)' }}
            >
              <div className="flex items-center justify-between gap-3 mb-2">
                <div className="flex items-center gap-2.5 flex-1">
                  <div 
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold font-mono text-white flex-shrink-0"
                    style={{ backgroundColor: chap.status === 'completed' ? '#10b981' : 'var(--primary)' }}
                  >
                    {chap.status === 'completed' ? <Check size={14} /> : chap.id}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
                        {getChapterNumber(chap)}
                      </span>
                      <span className="text-[10px] font-mono" style={{ color: 'var(--text-muted)' }}>
                        (ص {chap.startPage} - {chap.endPage})
                      </span>
                    </div>
                    <h4 className={`text-sm font-bold ${lang === 'urdu' ? 'font-urdu' : lang === 'hindi' ? 'font-hindi' : ''}`} style={{ color: 'var(--text-main)' }}>
                      {getChapterTitle(chap)}
                    </h4>
                  </div>
                </div>

                {/* Status Badge & Actions */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onMarkChapterComplete(chap.id, chap.startPage, chap.endPage)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold border flex items-center gap-1 transition-all ${
                      chap.status === 'completed'
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : 'hover:bg-black/5 dark:hover:bg-white/5'
                    }`}
                    style={chap.status === 'completed' ? {} : { borderColor: 'var(--border-color)', color: 'var(--text-muted)' }}
                    title="Mark entire chapter complete"
                  >
                    <Check size={12} />
                    <span className="hidden sm:inline">
                      {chap.status === 'completed' ? (lang === 'english' ? 'Done' : 'مکمل') : (lang === 'english' ? 'Mark Done' : 'مکمل کریں')}
                    </span>
                  </button>

                  <button
                    onClick={() => onOpenPage(chap.startPage)}
                    className="p-1.5 rounded-lg border hover:bg-black/5 dark:hover:bg-white/5"
                    style={{ borderColor: 'var(--border-color)', color: 'var(--primary)' }}
                    title="Read Chapter"
                  >
                    <BookOpen size={15} />
                  </button>
                </div>
              </div>

              {/* Chapter Mini Progress Bar */}
              <div className="flex items-center gap-2 pt-1">
                <div className="flex-1 h-1.5 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                  <div 
                    className="h-full rounded-full transition-all duration-300"
                    style={{ 
                      width: `${chap.percentage}%`,
                      backgroundColor: chap.status === 'completed' ? '#10b981' : 'var(--gold)'
                    }}
                  />
                </div>
                <span className="text-[10px] font-mono font-semibold" style={{ color: 'var(--text-muted)' }}>
                  {chap.pagesRead}/{chap.totalPages} ({chap.percentage}%)
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
