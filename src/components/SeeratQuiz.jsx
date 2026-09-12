import React, { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Award, 
  Sparkles,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Layers,
  ChevronRight,
  Star,
  Trophy
} from 'lucide-react';
import { CHAPTER_QUIZZES } from '../data/quizData';
import confetti from 'canvas-confetti';

export default function SeeratQuiz({ lang, onOpenPage }) {
  const [selectedChapterId, setSelectedChapterId] = useState(null); // null = selection screen, 'all' = all questions, 1-13 = specific chapter
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  // Stored high scores per chapter { "1": { score: 3, total: 3 }, ... }
  const [highScores, setHighScores] = useState(() => {
    try {
      const saved = localStorage.getItem('seerat_quiz_chapter_scores');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Determine active questions list
  const activeQuestions = React.useMemo(() => {
    if (selectedChapterId === 'all') {
      return CHAPTER_QUIZZES.flatMap((c) => c.questions);
    }
    if (selectedChapterId !== null) {
      const c = CHAPTER_QUIZZES.find((ch) => ch.chapterId === selectedChapterId);
      return c ? c.questions : [];
    }
    return [];
  }, [selectedChapterId]);

  const activeChapterData = React.useMemo(() => {
    if (selectedChapterId === 'all') {
      return {
        numberUrdu: "جامع امتحان",
        numberHindi: "सम्पूर्ण परीक्षा",
        numberEnglish: "Comprehensive Exam",
        titleUrdu: "تمام 13 ابواب کا جامع امتحان",
        titleHindi: "सभी 13 अध्यायों की सम्पूर्ण परीक्षा",
        titleEnglish: "All 13 Chapters Comprehensive Exam"
      };
    }
    return CHAPTER_QUIZZES.find((ch) => ch.chapterId === selectedChapterId) || null;
  }, [selectedChapterId]);

  const currentQ = activeQuestions[currentIndex];

  const handleSelectOption = (index) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);

    if (index === currentQ.correctIndex) {
      setScore((s) => s + 1);
      confetti({
        particleCount: 35,
        spread: 50,
        origin: { y: 0.6 }
      });
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex + 1 < activeQuestions.length) {
      setCurrentIndex((i) => i + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setQuizFinished(true);
      
      // Save high score
      const finalScore = score + (selectedOption === currentQ.correctIndex ? 1 : 0);
      const prevBest = highScores[selectedChapterId]?.score || 0;
      if (finalScore >= prevBest) {
        const updated = {
          ...highScores,
          [selectedChapterId]: { score: finalScore, total: activeQuestions.length }
        };
        setHighScores(updated);
        localStorage.setItem('seerat_quiz_chapter_scores', JSON.stringify(updated));
      }

      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.5 }
      });
    }
  };

  const handleStartChapterQuiz = (chapterId) => {
    setSelectedChapterId(chapterId);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setQuizFinished(false);
  };

  const handleBackToChapters = () => {
    setSelectedChapterId(null);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setQuizFinished(false);
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setQuizFinished(false);
  };

  const handleNextChapterQuiz = () => {
    if (typeof selectedChapterId === 'number' && selectedChapterId < 13) {
      handleStartChapterQuiz(selectedChapterId + 1);
    } else {
      handleBackToChapters();
    }
  };

  const getQuestion = (q) => {
    if (lang === 'urdu') return q.questionUrdu;
    if (lang === 'hindi') return q.questionHindi;
    return q.questionEnglish;
  };

  const getOptions = (q) => {
    if (lang === 'urdu') return q.optionsUrdu;
    if (lang === 'hindi') return q.optionsHindi;
    return q.optionsEnglish;
  };

  const getExplanation = (q) => {
    if (lang === 'urdu') return q.explanationUrdu;
    if (lang === 'hindi') return q.explanationHindi;
    return q.explanationEnglish;
  };

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

  // ================= VIEW 1: CHAPTER SELECTION SCREEN =================
  if (selectedChapterId === null) {
    return (
      <div className="container mx-auto px-4 py-6 max-w-4xl pb-24">
        {/* Banner */}
        <div 
          className="rounded-3xl p-6 sm:p-8 mb-6 text-white shadow-xl relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #1e3a8a, #065f46)' }}
        >
          <div className="relative z-10">
            <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold mb-3 bg-white/20">
              <Trophy size={14} />
              <span>
                {lang === 'english'
                  ? 'Chapter-Wise Seerat Quiz'
                  : lang === 'hindi'
                  ? 'अध्याय-वार सीरत क्विज़'
                  : 'باب وار سیرت کوئز'}
              </span>
            </div>
            <h2 className={`text-2xl sm:text-3xl font-bold mb-2 ${lang === 'urdu' ? 'font-urdu' : lang === 'hindi' ? 'font-hindi' : ''}`}>
              {lang === 'english'
                ? 'Select a Chapter to Test Your Knowledge'
                : lang === 'hindi'
                ? 'अपने ज्ञान का परीक्षण करने के लिए अध्याय चुनें'
                : 'جس باب کا کوئز کھیلنا ہو منتخب کیجیے'}
            </h2>
            <p className="text-blue-100 text-sm max-w-xl leading-relaxed">
              {lang === 'english'
                ? 'Practice questions chapter-by-chapter across all 13 chapters of the book.'
                : 'تمام 13 ابواب کے الگ الگ سوالات حل کر کے اپنی فہم و علم میں اضافہ کریں۔'}
            </p>

            {/* Quick Challenge All Chapters */}
            <div className="mt-4">
              <button
                onClick={() => handleStartChapterQuiz('all')}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm bg-amber-500 text-white shadow-md hover:bg-amber-600 active:scale-95 transition-all"
              >
                <Sparkles size={16} />
                <span>
                  {lang === 'english'
                    ? 'Challenge: All Chapters Exam (30+ Questions)'
                    : 'مکمل چیلنج: تمام 13 ابواب کا جامع امتحان'}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* 13 Chapters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {CHAPTER_QUIZZES.map((ch) => {
            const best = highScores[ch.chapterId];
            const isMastered = best && best.score === best.total;

            return (
              <div
                key={ch.chapterId}
                onClick={() => handleStartChapterQuiz(ch.chapterId)}
                className="p-4 rounded-2xl border transition-all hover:border-emerald-500 hover:scale-[1.01] cursor-pointer group flex flex-col justify-between"
                style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs text-white shadow-xs"
                        style={{ backgroundColor: isMastered ? '#10b981' : 'var(--primary)' }}
                      >
                        {isMastered ? '✓' : ch.chapterId}
                      </div>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded" style={{ backgroundColor: 'var(--bg-surface-elevated)', color: 'var(--text-muted)' }}>
                        {getChapterNumber(ch)}
                      </span>
                    </div>

                    {/* Best score badge if attempted */}
                    {best && (
                      <span 
                        className="inline-flex items-center gap-1 text-[11px] font-mono font-bold px-2 py-0.5 rounded-full"
                        style={{ 
                          backgroundColor: isMastered ? 'rgba(16, 185, 129, 0.15)' : 'var(--gold-light)', 
                          color: isMastered ? '#059669' : 'var(--gold-hover)' 
                        }}
                      >
                        <Star size={11} fill="currentColor" />
                        <span>{best.score}/{best.total}</span>
                      </span>
                    )}
                  </div>

                  <h3 className={`text-base font-bold mb-1.5 ${lang === 'urdu' ? 'font-urdu' : lang === 'hindi' ? 'font-hindi' : ''}`} style={{ color: 'var(--text-main)' }}>
                    {getChapterTitle(ch)}
                  </h3>
                </div>

                <div className="flex items-center justify-between pt-3 border-t mt-2" style={{ borderColor: 'var(--border-subtle)' }}>
                  <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
                    {ch.questions.length} {lang === 'english' ? 'Questions' : 'سوالات'}
                  </span>

                  <span className="text-xs font-bold text-emerald-600 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    <span>{lang === 'english' ? 'Start Quiz' : 'کوئز شروع کریں'}</span>
                    <ChevronRight size={14} />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // ================= VIEW 2: ACTIVE QUIZ SCREEN =================
  return (
    <div className="container mx-auto px-4 py-6 max-w-3xl pb-24">
      {/* Back to Chapters Navigator */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={handleBackToChapters}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          style={{ borderColor: 'var(--border-color)', color: 'var(--text-main)' }}
        >
          {lang === 'urdu' ? <ArrowRight size={14} /> : <ArrowLeft size={14} />}
          <span>{lang === 'english' ? '← Back to Chapters' : '← تمام ابواب کی فہرست'}</span>
        </button>

        <span className="text-xs font-semibold px-2.5 py-1 rounded-lg" style={{ backgroundColor: 'var(--bg-surface-elevated)', color: 'var(--primary)' }}>
          {getChapterNumber(activeChapterData)}
        </span>
      </div>

      {!quizFinished ? (
        <div 
          className="rounded-3xl border p-6 sm:p-8 shadow-lg space-y-5"
          style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}
        >
          {/* Progress Header */}
          <div className="flex items-center justify-between text-xs font-bold" style={{ color: 'var(--text-muted)' }}>
            <span>
              {lang === 'english'
                ? `Question ${currentIndex + 1} of ${activeQuestions.length}`
                : `سوال ${currentIndex + 1} از ${activeQuestions.length}`}
            </span>
            <span className="font-mono text-emerald-600">
              {lang === 'english' ? `Score: ${score}` : `اسکور: ${score}`}
            </span>
          </div>

          <div className="w-full h-2 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
            <div 
              className="h-full rounded-full transition-all duration-300"
              style={{ 
                width: `${((currentIndex + 1) / activeQuestions.length) * 100}%`,
                backgroundColor: 'var(--primary)'
              }}
            />
          </div>

          {/* Question Text */}
          <div>
            <h3 className={`text-xl sm:text-2xl font-bold leading-relaxed ${lang === 'urdu' ? 'font-urdu' : lang === 'hindi' ? 'font-hindi' : ''}`} style={{ color: 'var(--text-main)' }}>
              {getQuestion(currentQ)}
            </h3>
          </div>

          {/* Options List */}
          <div className="space-y-3">
            {getOptions(currentQ).map((opt, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === currentQ.correctIndex;
              let btnStyle = {
                backgroundColor: 'var(--bg-surface-elevated)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-main)'
              };

              if (isAnswered) {
                if (isCorrect) {
                  btnStyle = {
                    backgroundColor: 'rgba(16, 185, 129, 0.15)',
                    borderColor: '#10b981',
                    color: '#065f46'
                  };
                } else if (isSelected) {
                  btnStyle = {
                    backgroundColor: 'rgba(239, 68, 68, 0.15)',
                    borderColor: '#ef4444',
                    color: '#b91c1c'
                  };
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswered}
                  className={`w-full text-inherit p-3.5 sm:p-4 rounded-2xl border transition-all flex items-center justify-between group ${
                    !isAnswered ? 'hover:border-emerald-600 hover:scale-[1.01]' : ''
                  }`}
                  style={btnStyle}
                >
                  <div className="flex items-center gap-3">
                    <span 
                      className="w-7 h-7 rounded-full border flex items-center justify-center font-bold text-xs flex-shrink-0"
                      style={{ borderColor: 'currentColor' }}
                    >
                      {idx + 1}
                    </span>
                    <span className={`text-sm sm:text-base font-semibold ${lang === 'urdu' ? 'font-urdu' : lang === 'hindi' ? 'font-hindi' : ''}`}>
                      {opt}
                    </span>
                  </div>

                  {isAnswered && isCorrect && <CheckCircle2 size={20} className="text-emerald-600 flex-shrink-0" />}
                  {isAnswered && isSelected && !isCorrect && <XCircle size={20} className="text-red-500 flex-shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Explanation Box */}
          {isAnswered && (
            <div 
              className="p-4 rounded-2xl border animate-fade space-y-2"
              style={{ 
                backgroundColor: selectedOption === currentQ.correctIndex ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                borderColor: selectedOption === currentQ.correctIndex ? '#10b981' : '#ef4444'
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-sm" style={{ color: selectedOption === currentQ.correctIndex ? '#065f46' : '#991b1b' }}>
                  <Sparkles size={16} />
                  <span>
                    {selectedOption === currentQ.correctIndex
                      ? (lang === 'english' ? 'Correct Answer! MashaAllah' : 'ماشاءاللہ! درست جواب')
                      : (lang === 'english' ? 'Explanation & Reference:' : 'وضاحت و حوالہ:')}
                  </span>
                </div>

                {currentQ.pageUrdu && (
                  <button
                    onClick={() => onOpenPage(lang === 'english' ? currentQ.pageEnglish : currentQ.pageUrdu)}
                    className="text-xs font-semibold underline flex items-center gap-1 text-emerald-700"
                  >
                    <BookOpen size={12} />
                    <span>{lang === 'english' ? `Page ${currentQ.pageEnglish}` : `صفحہ ${currentQ.pageUrdu}`}</span>
                  </button>
                )}
              </div>

              <p className={`text-sm leading-relaxed ${lang === 'urdu' ? 'font-urdu' : lang === 'hindi' ? 'font-hindi' : ''}`} style={{ color: 'var(--text-main)' }}>
                {getExplanation(currentQ)}
              </p>
            </div>
          )}

          {/* Next Button */}
          {isAnswered && (
            <div className="pt-2 flex justify-end">
              <button
                onClick={handleNextQuestion}
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white shadow-md hover:opacity-95 transition-all"
                style={{ backgroundColor: 'var(--primary)' }}
              >
                <span>
                  {currentIndex + 1 === activeQuestions.length
                    ? (lang === 'english' ? 'See Chapter Results' : 'نتیجہ دیکھیں')
                    : (lang === 'english' ? 'Next Question' : 'اگلا سوال')}
                </span>
                {lang === 'urdu' ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
              </button>
            </div>
          )}
        </div>
      ) : (
        /* ================= VIEW 3: CHAPTER QUIZ FINISHED SCREEN ================= */
        <div 
          className="rounded-3xl border p-6 sm:p-10 text-center shadow-xl space-y-6"
          style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}
        >
          <div 
            className="w-20 h-20 mx-auto rounded-full flex items-center justify-center text-white shadow-lg animate-float"
            style={{ background: 'linear-gradient(135deg, var(--gold), var(--gold-hover))' }}
          >
            <Award size={40} />
          </div>

          <div>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full" style={{ backgroundColor: 'var(--bg-surface-elevated)', color: 'var(--text-muted)' }}>
              {getChapterNumber(activeChapterData)}
            </span>
            <h3 className={`text-2xl sm:text-3xl font-bold my-2 ${lang === 'urdu' ? 'font-urdu' : lang === 'hindi' ? 'font-hindi' : ''}`} style={{ color: 'var(--text-main)' }}>
              {score >= activeQuestions.length * 0.7 
                ? (lang === 'english' ? 'MashaAllah! Chapter Mastered' : 'سبحان اللہ! باب کا مطالعہ مکمل ہوا') 
                : (lang === 'english' ? 'Good Effort! Keep Reviewing' : 'الحمد للہ! کوئز مکمل ہوا')}
            </h3>
            <p className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>
              {lang === 'english' 
                ? `You scored ${score} out of ${activeQuestions.length} questions correctly.`
                : `آپ نے ${activeQuestions.length} میں سے ${score} سوالات کے درست جواب دیے۔`}
            </p>
          </div>

          {/* Score Badge */}
          <div className="inline-block px-8 py-4 rounded-2xl border" style={{ backgroundColor: 'var(--bg-surface-elevated)', borderColor: 'var(--border-color)' }}>
            <span className="text-4xl font-bold font-mono" style={{ color: 'var(--primary)' }}>
              {Math.round((score / activeQuestions.length) * 100)}%
            </span>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={handleRestart}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm border hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              style={{ borderColor: 'var(--border-color)', color: 'var(--text-main)' }}
            >
              <RotateCcw size={15} />
              <span>{lang === 'english' ? 'Retake This Chapter' : 'یہ باب دوبارہ کھیلیں'}</span>
            </button>

            {typeof selectedChapterId === 'number' && selectedChapterId < 13 && (
              <button
                onClick={handleNextChapterQuiz}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white shadow-md hover:opacity-90"
                style={{ backgroundColor: 'var(--primary)' }}
              >
                <span>{lang === 'english' ? `Next: Chapter ${selectedChapterId + 1} Quiz` : `اگلا باب کھیلیں`}</span>
                {lang === 'urdu' ? <ArrowLeft size={15} /> : <ArrowRight size={15} />}
              </button>
            )}

            <button
              onClick={handleBackToChapters}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm border hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              style={{ borderColor: 'var(--border-color)', color: 'var(--text-muted)' }}
            >
              <Layers size={15} />
              <span>{lang === 'english' ? 'All Chapters List' : 'تمام ابواب کی فہرست'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
