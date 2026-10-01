export default function Footer({ hero }) {
    return (
        <footer id="contact" className="text-center py-10 mt-12 border-t border-gray-800/80 bg-[#080B14]">
            <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-xl shadow-[0_0_15px_rgba(79,70,229,0.5)] mb-6">
                    {hero?.full_name ? hero.full_name.charAt(0) : 'J'}
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{hero?.full_name || 'Jaka Kurnia'}</h3>
                <p className="text-gray-400 max-w-md mx-auto mb-8">Memadukan analisis terstruktur dan kreativitas untuk membangun solusi digital terbaik.</p>
                <div className="flex gap-4 mb-8">
                    {hero?.social_links?.linkedin && (
                        <a href={hero.social_links.linkedin} target="_blank" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-indigo-600 transition-all"><i className="devicon-linkedin-plain"></i></a>
                    )}
                    {hero?.social_links?.email && (
                        <a href={`mailto:${hero.social_links.email}`} className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-indigo-600 transition-all"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg></a>
                    )}
                </div>
                <p className="text-sm text-gray-600">
                    &copy; {new Date().getFullYear()} {hero?.full_name || 'Portfolio'}. All rights reserved.<br/>
                    Built with Laravel & React.
                </p>
            </div>
        </footer>
    );
}
