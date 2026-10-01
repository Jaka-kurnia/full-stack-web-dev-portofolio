export default function DialogShell({ onClose, panelClassName, closeClassName = '', children }) {
    const panelClasses = ['relative bg-[#131726] border border-gray-800 rounded-3xl shadow-2xl w-full', panelClassName].filter(Boolean).join(' ');
    const closeClasses = ['absolute top-6 right-6 bg-gray-800/80 hover:bg-indigo-600 text-white rounded-full p-2 transition-colors z-20', closeClassName].filter(Boolean).join(' ');

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-fade-in-up" style={{ animationDuration: '0.3s' }}>
            <div className="absolute inset-0 bg-[#0B0F19]/90 backdrop-blur-sm" onClick={onClose}></div>
            <div className={panelClasses}>
                <button onClick={onClose} className={closeClasses}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                {children}
            </div>
        </div>
    );
}
