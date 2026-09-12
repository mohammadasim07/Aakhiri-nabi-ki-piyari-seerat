import React, { useState } from 'react';
import { BookOpen } from 'lucide-react';
import { TIMELINE_EVENTS } from '../data/bookData';

export default function TimelineView({ lang, onOpenPage }) {
  const [filterEra, setFilterEra] = useState('all'); // all, makki, madani

  const filteredEvents = TIMELINE_EVENTS.filter((e) => {
    if (filterEra === 'makki') return parseInt(e.year) < 622;
    if (filterEra === 'madani') return parseInt(e.year) >= 622;
    return true;
  });

  const getTitle = (evt) => {
    if (lang === 'urdu') return evt.titleUrdu;
    if (lang === 'hindi') return evt.titleHindi;
    return evt.titleEnglish;
  };

  const getDesc = (evt) => {
    if (lang === 'urdu') return evt.descUrdu;
    if (lang === 'hindi') return evt.descHindi;
    return evt.descEnglish;
  };

  const getPage = (evt) => {
    return lang === 'english' ? evt.pageEnglish : evt.pageUrdu;
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div 
        className="rounded-2xl p-6 sm:p-8 mb-8 text-white shadow-xl relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #064e3b, #0f766e)' }}
      >
        <div className="relative z-10">
          <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
            {lang === 'english' ? 'Historical Timeline (571 - 632 CE)' : 'تاریخی تسلسل (571ء تا 632ء)'}
          </div>
          <h2 className={`text-2xl sm:text-3xl font-bold mb-2 ${lang === 'urdu' ? 'font-urdu' : lang === 'hindi' ? 'font-hindi' : ''}`}>
            {lang === 'urdu' 
              ? 'حیاتِ مصطفےٰ ﷺ ایک نظر میں (ٹائم لائن)' 
              : lang === 'hindi' 
              ? 'हयाते मुस्तफ़ा صَلَّى اللّٰهُ عَلَيْهِ وَاٰلِہٖ وَसَلَّم एक नज़र में (टाइमलाइन)' 
              : 'The Blessed Prophetic Biography at a Glance (Timeline)'}
          </h2>
          <p className="text-teal-100 text-sm sm:text-base max-w-2xl leading-relaxed">
            {lang === 'urdu'
              ? 'ولادتِ باسعادت سے لے کر وصالِ مبارک تک کے تمام اہم انقلابی اور تاریخ ساز واقعات کا مکمل تسلسل۔'
              : lang === 'hindi'
              ? 'मुबारक विलादत से लेकर विसाले मुबारक तक के तमाम अहम तारीखी वाक़िआत का मुकम्मल सिलसिला।'
              : 'Chronological timeline spanning from the blessed birth in 571 CE to the noble passing in 632 CE.'}
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-center gap-2 mb-8">
        <button
          onClick={() => setFilterEra('all')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold border transition-all ${
            filterEra === 'all' ? 'shadow-md font-bold' : ''
          }`}
          style={{
            backgroundColor: filterEra === 'all' ? 'var(--primary)' : 'var(--bg-surface)',
            color: filterEra === 'all' ? '#fff' : 'var(--text-main)',
            borderColor: 'var(--border-color)'
          }}
        >
          {lang === 'english' ? 'All Eras (571 - 632 CE)' : lang === 'hindi' ? 'तमाम अदवार (571 - 632 ई.)' : 'تمام ادوار (571ء - 632ء)'}
        </button>

        <button
          onClick={() => setFilterEra('makki')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold border transition-all ${
            filterEra === 'makki' ? 'shadow-md font-bold' : ''
          }`}
          style={{
            backgroundColor: filterEra === 'makki' ? 'var(--primary)' : 'var(--bg-surface)',
            color: filterEra === 'makki' ? '#fff' : 'var(--text-main)',
            borderColor: 'var(--border-color)'
          }}
        >
          {lang === 'english' ? 'Makkan Era (571 - 622 CE)' : lang === 'hindi' ? 'मक्की दौर (571 - 622 ई.)' : 'مکی دور (571ء - 622ء)'}
        </button>

        <button
          onClick={() => setFilterEra('madani')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold border transition-all ${
            filterEra === 'madani' ? 'shadow-md font-bold' : ''
          }`}
          style={{
            backgroundColor: filterEra === 'madani' ? 'var(--primary)' : 'var(--bg-surface)',
            color: filterEra === 'madani' ? '#fff' : 'var(--text-main)',
            borderColor: 'var(--border-color)'
          }}
        >
          {lang === 'english' ? 'Madinan Era (622 - 632 CE)' : lang === 'hindi' ? 'मदनी दौर (622 - 632 ई.)' : 'مدنی دور (622ء - 632ء)'}
        </button>
      </div>

      {/* Timeline Node Flow */}
      <div className={`relative ${lang === 'urdu' ? 'border-r-2 pr-6 sm:pr-8' : 'border-l-2 pl-6 sm:pl-8'} space-y-8`} style={{ borderColor: 'var(--primary-glow)' }}>
        {filteredEvents.map((evt, idx) => {
          const page = getPage(evt);
          return (
            <div 
              key={idx} 
              className="relative group transition-all duration-200"
            >
              {/* Timeline Dot */}
              <div 
                className={`absolute ${lang === 'urdu' ? '-right-[31px] sm:-right-[39px]' : '-left-[31px] sm:-left-[39px]'} top-4 w-6 h-6 rounded-full border-4 flex items-center justify-center transition-transform group-hover:scale-125`}
                style={{ 
                  backgroundColor: 'var(--bg-surface)', 
                  borderColor: 'var(--gold)',
                  boxShadow: '0 0 10px var(--gold-glow)'
                }}
              >
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--primary)' }} />
              </div>

              {/* Timeline Card */}
              <div 
                className="rounded-2xl p-5 sm:p-6 border transition-all hover:shadow-lg"
                style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                  <div className="flex items-center gap-2">
                    <span 
                      className="px-3 py-1 rounded-lg text-xs font-mono font-bold text-white shadow-sm"
                      style={{ backgroundColor: 'var(--primary)' }}
                    >
                      {evt.year}
                    </span>
                    <span 
                      className="px-2.5 py-0.5 rounded-lg text-xs font-semibold"
                      style={{ backgroundColor: 'var(--gold-light)', color: 'var(--gold-hover)' }}
                    >
                      {evt.age}
                    </span>
                  </div>

                  <button
                    onClick={() => onOpenPage(page)}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-lg border text-xs font-semibold hover:border-emerald-500 transition-colors"
                    style={{ backgroundColor: 'var(--bg-surface-elevated)', borderColor: 'var(--border-color)', color: 'var(--primary)' }}
                  >
                    <BookOpen size={13} />
                    <span>{lang === 'english' ? `Read on Page ${page}` : `صفحہ ${page} پر پڑھیں`}</span>
                  </button>
                </div>

                <h3 className={`text-lg sm:text-xl font-bold mb-2 ${lang === 'urdu' ? 'font-urdu' : lang === 'hindi' ? 'font-hindi' : ''}`} style={{ color: 'var(--text-main)' }}>
                  {getTitle(evt)}
                </h3>

                <p className={`text-sm sm:text-base leading-relaxed ${lang === 'urdu' ? 'font-urdu' : lang === 'hindi' ? 'font-hindi' : ''}`} style={{ color: 'var(--text-muted)' }}>
                  {getDesc(evt)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
