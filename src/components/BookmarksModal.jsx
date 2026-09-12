import React from 'react';
import { Bookmark, X, Trash2, BookOpen } from 'lucide-react';
import { getPageImagePath, CHAPTERS } from '../data/bookData';

export default function BookmarksModal({
  isOpen,
  onClose,
  lang,
  bookmarks,
  onRemoveBookmark,
  onClearBookmarks,
  onSelectPage
}) {
  if (!isOpen) return null;

  const getChapterNameForPage = (p) => {
    const c = CHAPTERS.find((ch) => p >= ch.pageStart && p <= ch.pageEnd);
    return c ? (lang === 'urdu' ? c.titleUrdu : c.titleHindi) : 'کتاب / पुस्तक';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade">
      <div 
        className="w-full max-w-xl rounded-3xl border shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
        style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}
      >
        {/* Header */}
        <div className="p-4 border-b flex items-center justify-between" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-surface-elevated)' }}>
          <div className="flex items-center gap-2">
            <Bookmark size={20} style={{ color: 'var(--gold)' }} />
            <h3 className={`text-lg font-bold ${lang === 'urdu' ? 'font-urdu' : 'font-hindi'}`} style={{ color: 'var(--text-main)' }}>
              {lang === 'urdu' ? 'محفوظ کردہ صفحات (Bookmarks)' : 'सुरक्षित किए गए पृष्ठ (Bookmarks)'}
            </h3>
            <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 font-bold">
              {bookmarks.length}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {bookmarks.length > 0 && (
              <button
                onClick={onClearBookmarks}
                className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1 px-2 py-1 rounded"
                title="تمام محفوظ صفحات ختم کریں"
              >
                <Trash2 size={13} />
                <span>سب ختم کریں</span>
              </button>
            )}
            <button 
              onClick={onClose}
              className="p-1.5 rounded-xl border hover:bg-black/5 dark:hover:bg-white/5"
              style={{ borderColor: 'var(--border-color)' }}
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Bookmarks List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {bookmarks.length === 0 ? (
            <div className="py-12 text-center" style={{ color: 'var(--text-muted)' }}>
              <Bookmark size={36} className="mx-auto mb-2 opacity-30" />
              <p>ابھی تک کوئی صفحہ محفوظ نہیں کیا گیا۔</p>
              <p className="text-xs mt-1">مطالعہ کے دوران Bookmark کے بٹن پر کلک کر کے صفحہ محفوظ کریں۔</p>
            </div>
          ) : (
            bookmarks.sort((a, b) => a - b).map((p) => (
              <div 
                key={p}
                className="flex items-center justify-between p-3 rounded-2xl border transition-all hover:border-emerald-500 group"
                style={{ backgroundColor: 'var(--bg-surface-elevated)', borderColor: 'var(--border-color)' }}
              >
                <button
                  onClick={() => {
                    onSelectPage(p);
                    onClose();
                  }}
                  className="flex items-center gap-3 flex-1 text-right"
                >
                  <div className="w-12 h-16 bg-gray-200 rounded-lg overflow-hidden border shadow-xs flex-shrink-0">
                    <img 
                      src={getPageImagePath(p, lang)} 
                      alt={`صفحہ ${p}`} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <span className="text-sm font-bold font-mono" style={{ color: 'var(--primary)' }}>
                      صفحہ {p}
                    </span>
                    <p className={`text-xs ${lang === 'urdu' ? 'font-urdu' : 'font-hindi'}`} style={{ color: 'var(--text-muted)' }}>
                      {getChapterNameForPage(p)}
                    </p>
                  </div>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      onSelectPage(p);
                      onClose();
                    }}
                    className="p-2 rounded-xl text-xs font-semibold flex items-center gap-1 text-white shadow-xs"
                    style={{ backgroundColor: 'var(--primary)' }}
                  >
                    <BookOpen size={14} />
                    <span>مطالعہ</span>
                  </button>

                  <button
                    onClick={() => onRemoveBookmark(p)}
                    className="p-2 rounded-xl border text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30"
                    style={{ borderColor: 'var(--border-color)' }}
                    title="محفوظ فہرست سے نکالیں"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
