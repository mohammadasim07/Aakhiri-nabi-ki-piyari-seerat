import React, { useState } from 'react';
import { 
  Sparkles, 
  Utensils, 
  Shirt, 
  HeartHandshake, 
  Sun, 
  BookOpen,
} from 'lucide-react';
import { SHAMAIL_TOPICS } from '../data/bookData';

export default function ShamailExplorer({ lang, onOpenPage }) {
  const [activeTopicId, setActiveTopicId] = useState(SHAMAIL_TOPICS[0].id);

  const activeTopic = SHAMAIL_TOPICS.find((t) => t.id === activeTopicId) || SHAMAIL_TOPICS[0];

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Sparkles': return <Sparkles size={20} />;
      case 'Utensils': return <Utensils size={20} />;
      case 'Shirt': return <Shirt size={20} />;
      case 'HeartHandshake': return <HeartHandshake size={20} />;
      case 'Sun': return <Sun size={20} />;
      default: return <Sparkles size={20} />;
    }
  };

  const getTopicTitle = (topic) => {
    if (lang === 'urdu') return topic.titleUrdu;
    if (lang === 'hindi') return topic.titleHindi;
    return topic.titleEnglish;
  };

  const getTopicContent = (topic) => {
    if (lang === 'urdu') return topic.contentUrdu;
    if (lang === 'hindi') return topic.contentHindi;
    return topic.contentEnglish;
  };

  const getTopicPage = (topic) => {
    return lang === 'english' ? topic.pageEnglish : topic.pageUrdu;
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      {/* Banner */}
      <div 
        className="rounded-2xl p-6 sm:p-8 mb-8 text-white shadow-xl relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0f4c3a, #b45309)' }}
      >
        <div className="relative z-10">
          <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
            {lang === 'english' ? 'Chapter 11: Blessed Attributes & Virtues' : 'گیارہواں باب: شمائل اور فضائلِ مصطفےٰ ﷺ'}
          </div>
          <h2 className={`text-2xl sm:text-3xl font-bold mb-2 ${lang === 'urdu' ? 'font-urdu' : lang === 'hindi' ? 'font-hindi' : ''}`}>
            {lang === 'urdu' 
              ? 'شمائل و اخلاقِ نبوی ﷺ کا دلکش بیان' 
              : lang === 'hindi' 
              ? 'शमाइल व अख्लाक़े नबवी صَلَّى اللّٰهُ عَلَيْهِ وَاٰلِہٖ وَसَلَّم' 
              : 'The Blessed Attributes & Manners of the Holy Prophet ﷺ'}
          </h2>
          <p className="text-amber-100 text-sm sm:text-base max-w-2xl leading-relaxed">
            {lang === 'urdu'
              ? 'سرکارِ دوعالم ﷺ کا حلیہ شریف، پسندیدہ لباس، پسندیدہ غذائیں، عاداتِ مبارکہ، اور اخلاقِ حسنہ کا ایمان افروز مطالعہ۔'
              : lang === 'hindi'
              ? 'सरकारे दो आलम صَلَّى اللّٰهُ عَلَيْهِ وَاٰلِہٖ وَसَلَّम का हिल्या-ए-मुबारक, पसंदीदा लिबास, ग़ज़ाएं, और अख्लाक़े हसना।'
              : 'Inspiring study of the physical appearance, favourite food, blessed clothing, noble character, and miracles of the Prophet ﷺ.'}
          </p>
        </div>
      </div>

      {/* Navigation Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        {SHAMAIL_TOPICS.map((topic) => {
          const isActive = topic.id === activeTopicId;
          return (
            <button
              key={topic.id}
              onClick={() => setActiveTopicId(topic.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all ${
                isActive ? 'shadow-md scale-105 font-bold' : 'hover:bg-black/5 dark:hover:bg-white/5'
              }`}
              style={{
                backgroundColor: isActive ? 'var(--primary)' : 'var(--bg-surface)',
                color: isActive ? '#ffffff' : 'var(--text-main)',
                borderColor: isActive ? 'var(--primary)' : 'var(--border-color)',
              }}
            >
              <span style={{ color: isActive ? '#ffffff' : 'var(--gold)' }}>
                {getIcon(topic.icon)}
              </span>
              <span className={lang === 'urdu' ? 'font-urdu' : lang === 'hindi' ? 'font-hindi' : ''}>
                {getTopicTitle(topic)}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Topic Showcase Card */}
      <div 
        className="rounded-3xl border p-6 sm:p-10 shadow-lg animate-fade transition-all"
        style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}
      >
        <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-4 mb-6" style={{ borderColor: 'var(--border-subtle)' }}>
          <div className="flex items-center gap-3">
            <div 
              className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-md"
              style={{ background: 'linear-gradient(135deg, var(--gold), var(--gold-hover))' }}
            >
              {getIcon(activeTopic.icon)}
            </div>
            <div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded" style={{ backgroundColor: 'var(--bg-surface-elevated)', color: 'var(--text-muted)' }}>
                {lang === 'english' ? 'Chapter 11 (Shamail)' : 'باب 11 (شمائل و فضائل)'}
              </span>
              <h3 className={`text-xl sm:text-2xl font-bold ${lang === 'urdu' ? 'font-urdu' : lang === 'hindi' ? 'font-hindi' : ''}`} style={{ color: 'var(--text-main)' }}>
                {getTopicTitle(activeTopic)}
              </h3>
            </div>
          </div>

          <button
            onClick={() => onOpenPage(getTopicPage(activeTopic))}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white shadow-sm hover:opacity-90 transition-opacity"
            style={{ backgroundColor: 'var(--primary)' }}
          >
            <BookOpen size={16} />
            <span>{lang === 'english' ? `View Page ${getTopicPage(activeTopic)} in Book` : `اصل کتاب میں صفحہ ${getTopicPage(activeTopic)} دیکھیں`}</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="relative py-4">
          <p 
            className={`text-lg sm:text-xl leading-loose sm:leading-relaxed ${lang === 'urdu' ? 'font-urdu' : lang === 'hindi' ? 'font-hindi' : ''}`}
            style={{ color: 'var(--text-main)' }}
          >
            {getTopicContent(activeTopic)}
          </p>
        </div>

        {/* Durood Footnote */}
        <div 
          className="mt-8 p-4 rounded-2xl border flex items-center justify-between gap-4"
          style={{ backgroundColor: 'var(--bg-surface-elevated)', borderColor: 'var(--border-color)' }}
        >
          <div className="flex items-center gap-2">
            <Sparkles size={18} style={{ color: 'var(--gold)' }} />
            <span className="text-xs sm:text-sm font-medium" style={{ color: 'var(--text-muted)' }}>
              صَلَّى اللّٰهُ عَلَيْهِ وَآلِهِ وَسَلَّمَ - May peace and blessings be upon him and his noble family.
            </span>
          </div>
          <button
            onClick={() => onOpenPage(lang === 'english' ? 132 : 120)}
            className="text-xs font-semibold underline"
            style={{ color: 'var(--primary)' }}
          >
            {lang === 'english' ? 'Read entire chapter →' : 'پورے باب کا مطالعہ کریں →'}
          </button>
        </div>
      </div>
    </div>
  );
}
