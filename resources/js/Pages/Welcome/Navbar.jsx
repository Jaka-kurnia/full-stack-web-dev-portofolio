import { Link } from '@inertiajs/react';

export default function Navbar({ hero, auth, canLogin }) {
    return (
        <nav className="flex justify-between items-center py-6 px-6 md:px-16 max-w-7xl mx-auto animate-fade-in-up">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-lg shadow-[0_0_15px_rgba(79,70,229,0.5)]">
                    {hero?.full_name ? hero.full_name.charAt(0) : 'J'}
                </div>
                <span className="font-semibold text-lg">{hero?.full_name?.split(' ')[0] || 'Jaka'} Kurnia</span>
            </div>
            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
                <a href="#about" className="hover:text-white transition-colors">About</a>
                <a href="#projects" className="hover:text-white transition-colors">Projects</a>
                <a href="#certifications" className="hover:text-white transition-colors">Certifications</a>
                {auth?.user ? (
                    <Link href={route('dashboard')} className="hover:text-white transition-colors">Dashboard</Link>
                ) : canLogin ? (
                    <Link href={route('login')} className="hover:text-white transition-colors">Admin</Link>
                ) : null}
                <a href={hero?.cta_link || '#contact'} className="bg-white text-black px-6 py-2 rounded-full hover:bg-gray-200 transition-colors font-semibold">
                    Contact
                </a>
            </div>
        </nav>
    );
}
