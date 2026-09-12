import { BOOK_METADATA, CHAPTERS } from '../data/bookData';

export const getProgressStorageKey = (lang) => `seerat_read_pages_${lang}`;
export const getStatsStorageKey = () => `seerat_reading_stats`;

export const loadReadPages = (lang) => {
  try {
    const data = localStorage.getItem(getProgressStorageKey(lang));
    return data ? new Set(JSON.parse(data)) : new Set([1]);
  } catch {
    return new Set([1]);
  }
};

export const saveReadPages = (lang, pagesSet) => {
  try {
    localStorage.setItem(
      getProgressStorageKey(lang),
      JSON.stringify(Array.from(pagesSet))
    );
  } catch (e) {
    console.error('Failed to save read pages', e);
  }
};

export const loadReadingStats = () => {
  try {
    const data = localStorage.getItem(getStatsStorageKey());
    if (data) return JSON.parse(data);
  } catch {}
  
  return {
    lastReadDate: new Date().toISOString().split('T')[0],
    streakDays: 1,
    totalMinutesRead: 5
  };
};

export const updateReadingStats = (minutesAdded = 1) => {
  const stats = loadReadingStats();
  const today = new Date().toISOString().split('T')[0];
  
  if (stats.lastReadDate !== today) {
    const lastDate = new Date(stats.lastReadDate);
    const currentDate = new Date(today);
    const diffDays = Math.round((currentDate - lastDate) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
      stats.streakDays += 1;
    } else if (diffDays > 1) {
      stats.streakDays = 1;
    }
    stats.lastReadDate = today;
  }
  
  stats.totalMinutesRead += minutesAdded;
  localStorage.setItem(getStatsStorageKey(), JSON.stringify(stats));
  return stats;
};

export const calculateProgress = (readPagesSet, lang = 'urdu') => {
  const totalPages = lang === 'english' ? BOOK_METADATA.totalPagesEnglish : BOOK_METADATA.totalPagesUrdu;
  const pagesReadCount = readPagesSet.size;
  const percentage = Math.min(100, Math.round((pagesReadCount / totalPages) * 100));
  const pagesRemaining = Math.max(0, totalPages - pagesReadCount);

  // Chapter-by-chapter completion stats
  const chaptersProgress = CHAPTERS.map((chap) => {
    const start = lang === 'english' ? chap.pageStartEnglish : chap.pageStartUrdu;
    const end = lang === 'english' ? chap.pageEndEnglish : chap.pageEndUrdu;
    const chapTotalPages = Math.max(1, end - start + 1);

    let chapReadCount = 0;
    for (let p = start; p <= end; p++) {
      if (readPagesSet.has(p)) {
        chapReadCount++;
      }
    }

    const chapPercentage = Math.min(100, Math.round((chapReadCount / chapTotalPages) * 100));
    let status = 'unread'; // 'completed' | 'in-progress' | 'unread'
    if (chapPercentage === 100) status = 'completed';
    else if (chapPercentage > 0) status = 'in-progress';

    return {
      id: chap.id,
      numberUrdu: chap.numberUrdu,
      numberHindi: chap.numberHindi,
      numberEnglish: chap.numberEnglish,
      titleUrdu: chap.titleUrdu,
      titleHindi: chap.titleHindi,
      titleEnglish: chap.titleEnglish,
      startPage: start,
      endPage: end,
      totalPages: chapTotalPages,
      pagesRead: chapReadCount,
      percentage: chapPercentage,
      status
    };
  });

  const completedChaptersCount = chaptersProgress.filter((c) => c.status === 'completed').length;

  return {
    totalPages,
    pagesReadCount,
    pagesRemaining,
    percentage,
    chaptersProgress,
    completedChaptersCount,
    totalChapters: CHAPTERS.length
  };
};
