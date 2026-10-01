import { Link } from '@inertiajs/react';

export default function Navbar({ hero, auth, canLogin, isDarkMode, toggleTheme }) {
    return (
        <nav className="flex justify-between items-center py-6 px-6 md:px-16 max-w-7xl mx-auto" data-aos="fade-down">
            <div className="flex items-center">
                <img src="/img/logo.png" alt="Logo" className="h-10 w-auto" />
            </div>
            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600 dark:text-gray-300">
                <a href="#about" className="hover:text-black dark:hover:text-white transition-colors">Beranda</a>
                <a href="#about" className="hover:text-black dark:hover:text-white transition-colors">Tentang Saya</a>
                <a href="#projects" className="hover:text-black dark:hover:text-white transition-colors">Proyek Saya</a>
                <a href="#certifications" className="hover:text-black dark:hover:text-white transition-colors">Sertifikasi</a>
                {/* {auth?.user ? (
                    <Link href={route('dashboard')} className="hover:text-black dark:hover:text-white transition-colors">Dashboard</Link>
                ) : canLogin ? (
                    <Link href={route('login')} className="hover:text-black dark:hover:text-white transition-colors">Log in</Link>
                ) : null} */}
                <a href={hero?.cta_link || '#contact'} className="bg-indigo-600 text-white dark:bg-white dark:text-black px-6 py-2 rounded-full hover:bg-indigo-700 dark:hover:bg-gray-200 transition-colors font-semibold shadow">
                    Contact
                </a>
                <button onClick={toggleTheme} className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors flex items-center justify-center w-10 h-10 shadow" title="Toggle Theme">
                    {isDarkMode ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                    ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                    )}
                </button>
            </div>
        </nav>
    );
}
