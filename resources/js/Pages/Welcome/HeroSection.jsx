export default function HeroSection({ hero, typedGreeting }) {
    return (
        <section className="flex flex-col-reverse md:flex-row items-center justify-between gap-12 min-h-[85vh] mb-20" id="home">
            {/* Left: Text */}
            <div className="md:w-1/2 flex flex-col items-start z-10">
                <div className="flex items-center gap-4 mb-6 animate-fade-in-up delay-100">
                    <span className="w-12 h-[1px] bg-indigo-500"></span>
                    <span className="text-indigo-500 font-bold tracking-widest uppercase text-sm">
                        {hero?.full_name || 'JAKA KURNIA'}
                    </span>
                </div>
                <h1 className="text-5xl md:text-7xl lg:text-[5rem] font-extrabold leading-[1.1] mb-6 tracking-tight animate-fade-in-up delay-200 min-h-[140px] md:min-h-[160px]">
                    {typedGreeting}
                    <span className="text-indigo-500 cursor-blink">|</span>
                </h1>
                <p className="text-gray-400 text-lg leading-relaxed mb-10 max-w-xl animate-fade-in-up delay-300">
                    {hero?.short_bio || 'Full-Stack Web Developer yang mengolaborasikan analisis sistem terstruktur dan prinsip Manajemen Informatika untuk menciptakan solusi web end-to-end.'}
                </p>
                <a href="#projects" className="animate-fade-in-up delay-400 bg-white text-black px-8 py-3.5 rounded-full font-bold hover:bg-gray-200 transition-transform transform hover:scale-105 shadow-lg">
                    {hero?.cta_text || 'View My Projects'}
                </a>
            </div>
            {/* Right: Photo */}
            <div className="md:w-1/2 flex justify-center md:justify-end animate-fade-in-left delay-300">
                {hero?.profile_image_path ? (
                    <img src={`/storage/${hero.profile_image_path}`} alt="Profile" className="w-full max-w-lg object-contain drop-shadow-2xl" />
                ) : (
                    <div className="w-full max-w-md aspect-[3/4] bg-[#131726] rounded-2xl flex items-center justify-center text-gray-700 border border-gray-800 shadow-2xl">
                        (Foto Profil Belum Diunggah)
                    </div>
                )}
            </div>
        </section>
    );
}
