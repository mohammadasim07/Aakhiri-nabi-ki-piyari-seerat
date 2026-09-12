import React, { useState, useMemo } from 'react';
import { Search, X, BookOpen, Layers } from 'lucide-react';
import { CHAPTERS } from '../data/bookData';

export default function SearchModal({ isOpen, onClose, lang, onSelectPage }) {
  const [query, setQuery] = useState('');

  // Collect all searchable items
  const allItems = useMemo(() => {
    const list = [];
    CHAPTERS.forEach((c) => {
      // Chapter itself
      list.push({
        type: 'chapter',
        titleUrdu: `${c.numberUrdu}: ${c.titleUrdu}`,
        titleHindi: `${c.numberHindi}: ${c.titleHindi}`,
        titleEnglish: `${c.numberEnglish}: ${c.titleEnglish}`,
        chapterNameUrdu: c.numberUrdu,
        chapterNameHindi: c.numberHindi,
        chapterNameEnglish: c.numberEnglish,
        pageUrdu: c.pageStartUrdu,
        pageEnglish: c.pageStartEnglish,
        summaryUrdu: c.summaryUrdu,
        summaryHindi: c.summaryHindi,
        summaryEnglish: c.summaryEnglish,
      });

      // Topics in chapter
      c.topics.forEach((t) => {
        list.push({
          type: 'topic',
          titleUrdu: t.titleUrdu,
          titleHindi: t.titleHindi,
          titleEnglish: t.titleEnglish,
          chapterNameUrdu: c.numberUrdu,
          chapterNameHindi: c.numberHindi,
          chapterNameEnglish: c.numberEnglish,
          pageUrdu: t.pageUrdu,
          pageEnglish: t.pageEnglish,
          summaryUrdu: c.titleUrdu,
          summaryHindi: c.titleHindi,
          summaryEnglish: c.titleEnglish,
        });
      });
    });
    return list;
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allItems.slice(0, 10);
    return allItems.filter(
      (item) =>
        item.titleUrdu.toLowerCase().includes(q) ||
        item.titleHindi.toLowerCase().includes(q) ||
        (item.titleEnglish && item.titleEnglish.toLowerCase().includes(q)) ||
        item.pageUrdu.toString().includes(q) ||
        item.pageEnglish.toString().includes(q) ||
        (item.summaryUrdu && item.summaryUrdu.toLowerCase().includes(q)) ||
        (item.summaryHindi && item.summaryHindi.toLowerCase().includes(q)) ||
        (item.summaryEnglish && item.summaryEnglish.toLowerCase().includes(q))
    );
  }, [query, allItems]);

  if (!isOpen) return null;

  const getItemTitle = (item) => {
    if (lang === 'urdu') return item.titleUrdu;
    if (lang === 'hindi') return item.titleHindi;
    return item.titleEnglish;
  };

  const getChapterName = (item) => {
    if (lang === 'urdu') return item.chapterNameUrdu;
    if (lang === 'hindi') return item.chapterNameHindi;
    return item.chapterNameEnglish;
  };

  const getItemPage = (item) => {
    return lang === 'english' ? item.pageEnglish : item.pageUrdu;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade">
      <div 
        className="w-full max-w-2xl rounded-3xl border shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
        style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b flex items-center gap-3" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-surface-elevated)' }}>
          <Search size={20} style={{ color: 'var(--primary)' }} />
          <input
            type="text"
            placeholder={
              lang === 'english'
                ? 'Search topic, event, or page number...'
                : lang === 'hindi'
                ? 'शीर्षक, घटना या पृष्ठ संख्या खोजें...'
                : 'عنوان، واقعہ یا صفحہ نمبر تلاش کریں...'
            }
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className={`flex-1 bg-transparent border-none outline-none text-base ${lang === 'urdu' ? 'font-urdu' : lang === 'hindi' ? 'font-hindi' : ''}`}
            style={{ color: 'var(--text-main)' }}
          />
          {query && (
            <button onClick={() => setQuery('')} className="p-1 rounded-full hover:bg-black/10 dark:hover:bg-white/10">
              <X size={16} />
            </button>
          )}
          <button 
            onClick={onClose}
            className="p-2 rounded-xl border hover:bg-black/5 dark:hover:bg-white/5 text-xs font-semibold"
            style={{ borderColor: 'var(--border-color)' }}
          >
            {lang === 'english' ? 'Close (ESC)' : 'بند کریں (ESC)'}
          </button>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
          {filtered.length === 0 ? (
            <div className="py-12 text-center" style={{ color: 'var(--text-muted)' }}>
              {lang === 'english' ? 'No results found. Please try another term.' : 'کوئی نتیجہ نہیں ملا۔ برائے مہربانی دوسرا لفظ تلاش کیجیے۔'}
            </div>
          ) : (
            filtered.map((item, idx) => {
              const page = getItemPage(item);
              return (
                <button
                  key={idx}
                  onClick={() => {
                    onSelectPage(page);
                    onClose();
                  }}
                  className="w-full text-inherit p-3.5 rounded-2xl border transition-all hover:border-emerald-600 hover:scale-[1.01] flex items-center justify-between group"
                  style={{ backgroundColor: 'var(--bg-surface-elevated)', borderColor: 'var(--border-color)' }}
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold text-white shadow-xs flex-shrink-0"
                      style={{ backgroundColor: item.type === 'chapter' ? 'var(--gold)' : 'var(--primary)' }}
                    >
                      {item.type === 'chapter' ? <Layers size={16} /> : <BookOpen size={16} />}
                    </div>
                    <div>
                      <span className="text-[11px] font-medium" style={{ color: 'var(--text-muted)' }}>
                        {getChapterName(item)}
                      </span>
                      <h4 className={`text-base font-semibold ${lang === 'urdu' ? 'font-urdu' : lang === 'hindi' ? 'font-hindi' : ''}`} style={{ color: 'var(--text-main)' }}>
                        {getItemTitle(item)}
                      </h4>
                    </div>
                  </div>

                  <span 
                    className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold flex-shrink-0"
                    style={{ backgroundColor: 'var(--bg-surface)', color: 'var(--primary)', borderColor: 'var(--border-color)' }}
                  >
                    {lang === 'english' ? `Page ${page}` : `صفحہ ${page}`}
                  </span>
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
