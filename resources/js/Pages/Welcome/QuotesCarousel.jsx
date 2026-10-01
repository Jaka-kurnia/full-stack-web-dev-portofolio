import { useState, useEffect } from 'react';

export default function QuotesCarousel({ quotes }) {
    const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

    // Auto slide quotes
    useEffect(() => {
        if (quotes && quotes.length > 0) {
            const interval = setInterval(() => {
                setCurrentQuoteIndex((prev) => (prev + 1) % quotes.length);
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [quotes]);

    return (
        <div className="mt-12" data-aos="fade-up">
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Quotes Saya</h3>
            {quotes && quotes.length > 0 ? (
                <div className="bg-white dark:bg-[#131726] border border-gray-200 dark:border-gray-800 rounded-2xl p-6 md:p-8 flex items-center justify-between shadow-xl mt-4">
                    <button
                        onClick={() => setCurrentQuoteIndex((prev) => (prev === 0 ? quotes.length - 1 : prev - 1))}
                        className="text-gray-400 dark:text-gray-600 hover:text-gray-900 dark:hover:text-white transition-colors p-2"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    <div className="text-center px-4 w-full">
                        <div className="min-h-[60px] flex items-center justify-center">
                            <p key={currentQuoteIndex} className="font-semibold text-gray-800 dark:text-gray-200 text-sm md:text-lg italic animate-slide-in-right">"{quotes[currentQuoteIndex].content}"</p>
                        </div>
                        <div className="flex justify-center gap-2 mt-6">
                            {quotes.map((q, idx) => (
                                <span key={q.id} onClick={() => setCurrentQuoteIndex(idx)} className={`w-2 h-2 rounded-full cursor-pointer transition-all ${idx === currentQuoteIndex ? 'bg-indigo-500 shadow-[0_0_5px_rgba(79,70,229,0.8)] scale-125' : 'bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-500'}`}></span>
                            ))}
                        </div>
                    </div>
                    <button
                        onClick={() => setCurrentQuoteIndex((prev) => (prev === quotes.length - 1 ? 0 : prev + 1))}
                        className="text-gray-400 dark:text-gray-600 hover:text-gray-900 dark:hover:text-white transition-colors p-2"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </button>
                </div>
            ) : (
                <p className="text-gray-600 text-sm italic">Belum ada quote yang ditambahkan.</p>
            )}
        </div>
    );
}
