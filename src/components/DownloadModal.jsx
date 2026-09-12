import React, { useState, useEffect, useCallback } from 'react';
import { Download, X, CheckCircle, HardDrive, Smartphone } from 'lucide-react';
import { getOfflinePagesStatus, downloadBookEditionForOffline } from '../utils/offlineManager';

export default function DownloadModal({ isOpen, onClose, lang }) {
  const [activeTab, setActiveTab] = useState('offline'); // 'offline' | 'pdf'
  const [urduStatus, setUrduStatus] = useState({ cachedCount: 0, total: 147, isFullyDownloaded: false });
  const [hindiStatus, setHindiStatus] = useState({ cachedCount: 0, total: 147, isFullyDownloaded: false });
  const [englishStatus, setEnglishStatus] = useState({ cachedCount: 0, total: 166, isFullyDownloaded: false });
  
  const [downloadingLang, setDownloadingLang] = useState(null);
  const [downloadProgress, setDownloadProgress] = useState(0);

  const refreshStatuses = useCallback(async () => {
    const urdu = await getOfflinePagesStatus('urdu');
    const hindi = await getOfflinePagesStatus('hindi');
    const english = await getOfflinePagesStatus('english');
    setUrduStatus(urdu);
    setHindiStatus(hindi);
    setEnglishStatus(english);
  }, []);

  useEffect(() => {
    if (isOpen) {
      refreshStatuses();
    }
  }, [isOpen, refreshStatuses]);

  const handleStartOfflineDownload = (targetLang) => {
    if (downloadingLang) return;
    setDownloadingLang(targetLang);
    setDownloadProgress(0);

    downloadBookEditionForOffline(
      targetLang,
      (percent) => {
        setDownloadProgress(percent);
      },
      () => {
        setDownloadingLang(null);
        setDownloadProgress(100);
        refreshStatuses();
      }
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade">
      <div 
        className="w-full max-w-lg rounded-3xl border shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}
      >
        {/* Header */}
        <div className="p-4 border-b flex items-center justify-between" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-surface-elevated)' }}>
          <div className="flex items-center gap-2">
            <HardDrive size={20} style={{ color: 'var(--primary)' }} />
            <h3 className={`text-lg font-bold ${lang === 'urdu' ? 'font-urdu' : lang === 'hindi' ? 'font-hindi' : ''}`} style={{ color: 'var(--text-main)' }}>
              {lang === 'english'
                ? 'Offline App & PDF Downloads'
                : lang === 'hindi'
                ? 'ऑफलाइन ऐप और PDF डाउनलोड'
                : 'آف لائن ایپ اور PDF ڈاؤن لوڈ'}
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-xl border hover:bg-black/5 dark:hover:bg-white/5"
            style={{ borderColor: 'var(--border-color)' }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-2 p-2 gap-2 border-b" style={{ borderColor: 'var(--border-subtle)', backgroundColor: 'var(--bg-surface-elevated)' }}>
          <button
            onClick={() => setActiveTab('offline')}
            className={`py-2 px-3 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'offline' ? 'shadow-sm font-bold' : 'opacity-70 hover:opacity-100'
            }`}
            style={{
              backgroundColor: activeTab === 'offline' ? 'var(--primary)' : 'transparent',
              color: activeTab === 'offline' ? '#ffffff' : 'var(--text-main)',
            }}
          >
            <Smartphone size={15} />
            <span>{lang === 'english' ? '100% Offline Storage' : lang === 'hindi' ? '100% ऑफलाइन स्टोरेज' : '100% آف لائن اسٹوریج'}</span>
          </button>

          <button
            onClick={() => setActiveTab('pdf')}
            className={`py-2 px-3 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'pdf' ? 'shadow-sm font-bold' : 'opacity-70 hover:opacity-100'
            }`}
            style={{
              backgroundColor: activeTab === 'pdf' ? 'var(--primary)' : 'transparent',
              color: activeTab === 'pdf' ? '#ffffff' : 'var(--text-main)',
            }}
          >
            <Download size={15} />
            <span>{lang === 'english' ? 'Original PDFs (3)' : lang === 'hindi' ? 'मूल PDF फाइलें (3)' : 'اصل PDF کتب (3)'}</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 space-y-4 overflow-y-auto flex-1">
          {activeTab === 'offline' ? (
            <>
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs leading-relaxed" style={{ color: 'var(--text-main)' }}>
                <p className="font-semibold text-emerald-800 dark:text-emerald-300 mb-1">
                  {lang === 'english' 
                    ? 'Read completely without internet or cellular data'
                    : 'انٹرنیٹ یا موبائل ڈیٹا کے بغیر مکمل آف لائن مطالعہ:'}
                </p>
                <p style={{ color: 'var(--text-muted)' }}>
                  {lang === 'english'
                    ? 'Save entire book pages directly to your phone or browser cache. You can read, swipe, bookmark, and track progress even in airplane mode.'
                    : 'کتاب کے تمام صفحات اپنے موبائل یا کمپیوٹر کے محفوظ کیشے میں محفوظ کریں۔ اس کے بعد آپ بغیر انٹرنیٹ (ہوائی جہاز موڈ میں بھی) مکمل پڑھ سکتے ہیں۔'}
                </p>
              </div>

              {/* Urdu Offline Card */}
              <div className="p-3.5 rounded-2xl border flex flex-col gap-2.5" style={{ backgroundColor: 'var(--bg-surface-elevated)', borderColor: 'var(--border-color)' }}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-lg bg-emerald-600 text-white font-bold text-xs flex items-center justify-center">اردو</span>
                    <div>
                      <h4 className="font-bold text-sm font-urdu">آخری نبی کی پیاری سیرت (اردو)</h4>
                      <span className="text-[11px] font-mono" style={{ color: 'var(--text-muted)' }}>
                        {urduStatus.cachedCount} / {urduStatus.total} صفحات محفوظ
                      </span>
                    </div>
                  </div>

                  {urduStatus.isFullyDownloaded ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300">
                      <CheckCircle size={13} /> آف لائن تیار
                    </span>
                  ) : (
                    <button
                      onClick={() => handleStartOfflineDownload('urdu')}
                      disabled={downloadingLang !== null}
                      className="px-3 py-1.5 rounded-xl text-xs font-bold text-white shadow-xs hover:opacity-90 transition-opacity disabled:opacity-50"
                      style={{ backgroundColor: 'var(--primary)' }}
                    >
                      {downloadingLang === 'urdu' ? `${downloadProgress}% محفوظ ہو رہا ہے` : 'مکمل محفوظ کریں'}
                    </button>
                  )}
                </div>

                {downloadingLang === 'urdu' && (
                  <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-600 h-full transition-all duration-200" style={{ width: `${downloadProgress}%` }} />
                  </div>
                )}
              </div>

              {/* English Offline Card */}
              <div className="p-3.5 rounded-2xl border flex flex-col gap-2.5" style={{ backgroundColor: 'var(--bg-surface-elevated)', borderColor: 'var(--border-color)' }}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center justify-center">EN</span>
                    <div>
                      <h4 className="font-bold text-sm">The Sublime Biography (English)</h4>
                      <span className="text-[11px] font-mono" style={{ color: 'var(--text-muted)' }}>
                        {englishStatus.cachedCount} / {englishStatus.total} Pages Saved
                      </span>
                    </div>
                  </div>

                  {englishStatus.isFullyDownloaded ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300">
                      <CheckCircle size={13} /> Ready Offline
                    </span>
                  ) : (
                    <button
                      onClick={() => handleStartOfflineDownload('english')}
                      disabled={downloadingLang !== null}
                      className="px-3 py-1.5 rounded-xl text-xs font-bold text-white shadow-xs hover:opacity-90 transition-opacity disabled:opacity-50"
                      style={{ backgroundColor: '#2563eb' }}
                    >
                      {downloadingLang === 'english' ? `${downloadProgress}% Saving...` : 'Save Offline'}
                    </button>
                  )}
                </div>

                {downloadingLang === 'english' && (
                  <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                    <div className="bg-blue-600 h-full transition-all duration-200" style={{ width: `${downloadProgress}%` }} />
                  </div>
                )}
              </div>

              {/* Hindi Offline Card */}
              <div className="p-3.5 rounded-2xl border flex flex-col gap-2.5" style={{ backgroundColor: 'var(--bg-surface-elevated)', borderColor: 'var(--border-color)' }}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-lg bg-amber-600 text-white font-bold text-xs flex items-center justify-center">हिन्दी</span>
                    <div>
                      <h4 className="font-bold text-sm font-hindi">आखि़री नबी की प्यारी सीरत (हिन्दी)</h4>
                      <span className="text-[11px] font-mono" style={{ color: 'var(--text-muted)' }}>
                        {hindiStatus.cachedCount} / {hindiStatus.total} पृष्ठ सुरक्षित
                      </span>
                    </div>
                  </div>

                  {hindiStatus.isFullyDownloaded ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300">
                      <CheckCircle size={13} /> ऑफलाइन तैयार
                    </span>
                  ) : (
                    <button
                      onClick={() => handleStartOfflineDownload('hindi')}
                      disabled={downloadingLang !== null}
                      className="px-3 py-1.5 rounded-xl text-xs font-bold text-white shadow-xs hover:opacity-90 transition-opacity disabled:opacity-50"
                      style={{ backgroundColor: 'var(--gold)' }}
                    >
                      {downloadingLang === 'hindi' ? `${downloadProgress}% सुरक्षित हो रहा है` : 'ऑफलाइन सुरक्षित करें'}
                    </button>
                  )}
                </div>

                {downloadingLang === 'hindi' && (
                  <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                    <div className="bg-amber-600 h-full transition-all duration-200" style={{ width: `${downloadProgress}%` }} />
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              {/* PDF Downloads */}
              <p className="text-xs sm:text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                {lang === 'english'
                  ? 'Published by Maktaba-tul-Madinah (Dawat-e-Islami). Download complete original PDF books:'
                  : 'مکتبۃ المدینہ (دعوتِ اسلامی) کی شائع کردہ اصل PDF فائلیں ڈاؤن لوڈ کریں:'}
              </p>

              {/* English PDF Download Card */}
              <div 
                className="p-3.5 rounded-2xl border flex items-center justify-between gap-4 transition-all hover:border-emerald-600"
                style={{ backgroundColor: 'var(--bg-surface-elevated)', borderColor: 'var(--border-color)' }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-blue-600 text-white font-bold text-xs shadow-xs">
                    EN
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">The Sublime Biography of the Final Messenger ﷺ</h4>
                    <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>166 Pages • 22.3 MB • PDF</span>
                  </div>
                </div>

                <a
                  href="/pdf/the-sublime-biography-of-last-prophet.pdf"
                  download="the-sublime-biography-of-last-prophet.pdf"
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white shadow-sm hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: '#2563eb' }}
                >
                  <Download size={14} />
                  <span>Download</span>
                </a>
              </div>

              {/* Urdu PDF Download Card */}
              <div 
                className="p-3.5 rounded-2xl border flex items-center justify-between gap-4 transition-all hover:border-emerald-600"
                style={{ backgroundColor: 'var(--bg-surface-elevated)', borderColor: 'var(--border-color)' }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-emerald-600 text-white font-bold text-xs shadow-xs">
                    اردو
                  </div>
                  <div>
                    <h4 className="font-bold text-sm font-urdu">آخری نبی کی پیاری سیرت (اردو ایڈیشن)</h4>
                    <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>147 صفحات • 11.6 MB • PDF</span>
                  </div>
                </div>

                <a
                  href="/pdf/aakhri-nabi-ki-piyari-seerat-urdu.pdf"
                  download="aakhri-nabi-ki-piyari-seerat-urdu.pdf"
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white shadow-sm hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: 'var(--primary)' }}
                >
                  <Download size={14} />
                  <span>ڈاؤن لوڈ</span>
                </a>
              </div>

              {/* Hindi PDF Download Card */}
              <div 
                className="p-3.5 rounded-2xl border flex items-center justify-between gap-4 transition-all hover:border-amber-600"
                style={{ backgroundColor: 'var(--bg-surface-elevated)', borderColor: 'var(--border-color)' }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-amber-600 text-white font-bold text-xs shadow-xs">
                    हिन्दी
                  </div>
                  <div>
                    <h4 className="font-bold text-sm font-hindi">आखि़री नबी की प्यारी सीरत (हिन्दी)</h4>
                    <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>147 पृष्ठ • 3.5 MB • PDF</span>
                  </div>
                </div>

                <a
                  href="/pdf/aakhri-nabi-ki-piyari-seerat-hindi.pdf"
                  download="aakhri-nabi-ki-piyari-seerat-hindi.pdf"
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white shadow-sm hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: 'var(--gold)' }}
                >
                  <Download size={14} />
                  <span>डाउनलोड</span>
                </a>
              </div>
            </>
          )}

          {/* Publisher Note */}
          <div className="pt-2 text-xs text-center border-t" style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-muted)' }}>
            Publisher: Maktaba-tul-Madinah (Faizan-e-Madinah, Karachi, Pakistan)
          </div>
        </div>
      </div>
    </div>
  );
}
