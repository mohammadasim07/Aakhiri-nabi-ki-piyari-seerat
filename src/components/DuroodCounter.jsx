import React, { useState, useEffect, useRef } from 'react';
import { RotateCcw, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { DUROOD_COLLECTION } from '../data/bookData';
import confetti from 'canvas-confetti';

export default function DuroodCounter({ lang }) {
  const [selectedDuroodId, setSelectedDuroodId] = useState(1);
  const [count, setCount] = useState(() => {
    const saved = localStorage.getItem('seerat_durood_count');
    return saved ? parseInt(saved, 10) : 0;
  });
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [target, setTarget] = useState(100);
  const audioCtxRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('seerat_durood_count', count.toString());
  }, [count]);

  // Clean up audio context on unmount
  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  const activeDurood = DUROOD_COLLECTION.find((d) => d.id === selectedDuroodId) || DUROOD_COLLECTION[0];

  const playClickSound = () => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Realistic Tasbih bead click sound (gentle wooden bead tap)
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(820, now);
      osc.frequency.exponentialRampToValueAtTime(160, now + 0.035);

      gain.gain.setValueAtTime(0.22, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.045);

      // Gentle haptic feedback on mobile tap
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate(15);
      }
    } catch {
      // Audio not supported or blocked by user policy
    }
  };

  const handleIncrement = () => {
    playClickSound();
    const next = count + 1;
    setCount(next);

    if (next % target === 0) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    }
  };

  const handleReset = () => {
    const msg = lang === 'english'
      ? 'Are you sure you want to reset the Durood counter to 0?'
      : 'کیا آپ درود کاؤنٹر کو صفر (0) پر ری سیٹ کرنا چاہتے ہیں؟';
    if (window.confirm(msg)) {
      setCount(0);
    }
  };

  const getTranslation = () => {
    if (lang === 'urdu') return activeDurood.translationUrdu;
    if (lang === 'hindi') return activeDurood.translationHindi;
    return activeDurood.translationEnglish;
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      {/* Banner */}
      <div 
        className="rounded-2xl p-6 sm:p-8 mb-8 text-white shadow-xl text-center relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #065f46, #047857)' }}
      >
        <div className="relative z-10">
          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold mb-3 bg-white/20">
            <Sparkles size={14} />
            <span>{lang === 'english' ? 'Excellence of Salat upon the Prophet ﷺ' : 'درودِ پاک کی فضیلت و برکات'}</span>
          </div>
          <h2 className={`text-2xl sm:text-3xl font-bold mb-2 ${lang === 'urdu' ? 'font-urdu' : lang === 'hindi' ? 'font-hindi' : ''}`}>
            {lang === 'urdu' 
              ? 'ڈیجیٹل درود شریف تسبیح کاؤنٹر' 
              : lang === 'hindi' 
              ? 'डिजिटल दुरूद शरीफ तस्बीह काउंटर' 
              : 'Digital Salawat (Durood) Counter'}
          </h2>
          <p className="text-emerald-100 text-sm max-w-xl mx-auto">
            {lang === 'urdu' 
              ? 'فرمانِ مصطفےٰ ﷺ: جس نے مجھ پر ایک بار درود بھیجا، اللہ تعالیٰ اس پر دس رحمتیں نازل فرماتا ہے۔'
              : lang === 'hindi'
              ? 'हुज़ूर अकरम صَلَّى اللّٰهُ عَلَيْهِ وَاٰلِہٖ وَसَلَّम का फरमान: जो मुझ पर एक बार दुरूदे पाक पढ़ता है, अल्लाह उस पर दस रहमतें नाज़िल फरमाता है।'
              : 'The Prophet ﷺ said: "Whoever recites Salat upon me once, Allah sends ten blessings upon him."'}
          </p>
        </div>
      </div>

      {/* Durood Selection Selector */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
        {DUROOD_COLLECTION.map((d) => (
          <button
            key={d.id}
            onClick={() => setSelectedDuroodId(d.id)}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold border transition-all ${
              d.id === selectedDuroodId ? 'shadow-md font-bold' : 'hover:bg-black/5 dark:hover:bg-white/5'
            }`}
            style={{
              backgroundColor: d.id === selectedDuroodId ? 'var(--primary)' : 'var(--bg-surface)',
              color: d.id === selectedDuroodId ? '#fff' : 'var(--text-main)',
              borderColor: d.id === selectedDuroodId ? 'var(--primary)' : 'var(--border-color)',
            }}
          >
            {d.id === 1 ? 'صَلَّى اللّٰهُ عَلَيْهِ وَآلِهِ وَسَلَّمَ' : d.id === 2 ? 'Salawat Ibrahimiyyah' : 'Jaza Allahu Anna'}
          </button>
        ))}
      </div>

      {/* Main Counter Card */}
      <div 
        className="rounded-3xl border p-6 sm:p-10 shadow-lg flex flex-col items-center justify-center gap-6"
        style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}
      >
        {/* Arabic Display */}
        <div className="text-center max-w-xl">
          <p className="text-2xl sm:text-3xl font-arabic font-bold mb-3 leading-relaxed" style={{ color: 'var(--primary)' }}>
            {activeDurood.arabic}
          </p>
          <p className="text-xs sm:text-sm font-medium italic" style={{ color: 'var(--text-muted)' }}>
            {activeDurood.transliteration}
          </p>
          <p className={`text-sm mt-2 font-medium ${lang === 'urdu' ? 'font-urdu' : lang === 'hindi' ? 'font-hindi' : ''}`} style={{ color: 'var(--text-main)' }}>
            {getTranslation()}
          </p>
        </div>

        {/* Big Tap Target Counter */}
        <div className="relative my-4">
          <button
            onClick={handleIncrement}
            className="w-48 h-48 sm:w-56 sm:h-56 rounded-full flex flex-col items-center justify-center shadow-2xl transition-transform active:scale-95 group focus:outline-none border-4"
            style={{ 
              background: 'radial-gradient(circle at 35% 35%, var(--primary-hover), var(--primary-dark))',
              borderColor: 'var(--gold)',
              boxShadow: '0 0 35px var(--gold-glow)'
            }}
          >
            <span className="text-xs tracking-widest text-emerald-200 font-bold uppercase mb-1">
              {lang === 'english' ? 'Total Count' : 'کل تعداد / कुल संख्या'}
            </span>
            <span className="text-5xl sm:text-6xl font-mono font-bold text-white group-hover:scale-105 transition-transform">
              {count}
            </span>
            <span className="text-xs text-amber-300 mt-2 font-semibold flex items-center gap-1">
              <Sparkles size={13} /> {lang === 'english' ? 'Tap to Recite' : 'ٹیپ کریں / टैप करें'}
            </span>
          </button>
        </div>

        {/* Target Progress Bar */}
        <div className="w-full max-w-md">
          <div className="flex items-center justify-between text-xs mb-1.5 font-semibold" style={{ color: 'var(--text-muted)' }}>
            <span>{lang === 'english' ? `Target: ${target}` : `ہدف: ${target}`}</span>
            <span>{Math.min(100, Math.round((count % target) / target * 100))}% {lang === 'english' ? 'Completed' : 'مکمل'}</span>
          </div>
          <div className="w-full h-2.5 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
            <div 
              className="h-full rounded-full transition-all duration-300"
              style={{ 
                width: `${Math.min(100, ((count % target) / target) * 100)}%`,
                backgroundColor: 'var(--gold)'
              }}
            />
          </div>
        </div>

        {/* Counter Tools */}
        <div className="flex items-center gap-3 pt-2">
          {/* Target Goal Selector */}
          <div className="flex items-center gap-1 text-xs border rounded-xl p-1" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-surface-elevated)' }}>
            {[33, 100, 313, 1000].map((t) => (
              <button
                key={t}
                onClick={() => setTarget(t)}
                className={`px-2.5 py-1 rounded-lg font-mono font-semibold transition-colors ${
                  target === t ? 'bg-emerald-600 text-white shadow-xs' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Sound Toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2.5 rounded-xl border hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-surface-elevated)' }}
            title={soundEnabled ? 'Mute' : 'Unmute'}
          >
            {soundEnabled ? <Volume2 size={18} style={{ color: 'var(--primary)' }} /> : <VolumeX size={18} />}
          </button>

          {/* Reset Button */}
          <button
            onClick={handleReset}
            className="p-2.5 rounded-xl border hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-surface-elevated)' }}
            title="Reset"
          >
            <RotateCcw size={18} style={{ color: 'var(--gold)' }} />
          </button>
        </div>
      </div>
    </div>
  );
}
