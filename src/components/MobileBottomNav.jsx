import React from 'react';
import { BookOpen, Layers, BarChart3, HelpCircle } from 'lucide-react';

export default function MobileBottomNav({
  activeTab,
  setActiveTab,
  lang,
  completionPercentage
}) {
  const items = [
    {
      id: 'reader',
      labelUrdu: 'مطالعہ',
      labelHindi: 'अध्ययन',
      labelEnglish: 'Reader',
      icon: BookOpen
    },
    {
      id: 'chapters',
      labelUrdu: 'ابواب',
      labelHindi: 'अध्याय',
      labelEnglish: 'Chapters',
      icon: Layers
    },
    {
      id: 'progress',
      labelUrdu: 'ریکارڈ',
      labelHindi: 'प्रगति',
      labelEnglish: 'Progress',
      icon: BarChart3,
      badge: `${completionPercentage}%`
    },
    {
      id: 'durood',
      labelUrdu: 'درود',
      labelHindi: 'दुरूद',
      labelEnglish: 'Salawat',
      icon: HeartIcon
    },
    {
      id: 'quiz',
      labelUrdu: 'کوئز',
      labelHindi: 'क्विज़',
      labelEnglish: 'Quiz',
      icon: HelpCircle
    }
  ];

  return (
    <nav 
      className="mobile-bottom-dock sm:hidden"
      style={{ 
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        width: '100%',
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        borderColor: 'var(--border-color)', 
        backgroundColor: 'var(--bg-surface)',
        paddingTop: '6px',
        paddingBottom: 'max(8px, env(safe-area-inset-bottom))',
        boxShadow: '0 -4px 16px rgba(0, 0, 0, 0.08)'
      }}
    >
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        const label = lang === 'urdu' ? item.labelUrdu : lang === 'hindi' ? item.labelHindi : item.labelEnglish;
        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className="flex-1 flex flex-col items-center justify-center py-1 relative active:scale-95 transition-all"
            style={{ 
              color: isActive ? 'var(--primary)' : 'var(--text-muted)',
              minWidth: 0
            }}
          >
            <div className="relative">
              <div 
                className="p-1 rounded-xl transition-all"
                style={{ 
                  backgroundColor: isActive ? 'rgba(6, 95, 70, 0.12)' : 'transparent',
                }}
              >
                <Icon 
                  size={20} 
                  strokeWidth={isActive ? 2.5 : 1.9} 
                  style={{ color: isActive ? 'var(--primary)' : 'currentColor' }} 
                />
              </div>
              {item.badge && (
                <span 
                  className="absolute text-[9px] font-mono font-bold px-1 rounded-full text-white shadow-xs"
                  style={{ 
                    backgroundColor: 'var(--gold)',
                    top: '-3px',
                    right: '-7px',
                    lineHeight: '13px'
                  }}
                >
                  {item.badge}
                </span>
              )}
            </div>
            <span 
              className={`text-[10px] mt-0.5 truncate max-w-full ${isActive ? 'font-bold' : 'font-medium'} ${lang === 'urdu' ? 'font-urdu' : lang === 'hindi' ? 'font-hindi' : ''}`}
              style={{ color: isActive ? 'var(--primary)' : 'var(--text-muted)' }}
            >
              {label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}

function HeartIcon({ size = 20, style, strokeWidth = 2 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" style={style}>
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
    </svg>
  );
}
