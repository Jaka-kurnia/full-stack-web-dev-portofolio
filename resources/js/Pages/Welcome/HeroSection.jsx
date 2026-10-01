export default function HeroSection({ hero, typedGreeting }) {
    return (
        <section className="flex flex-col-reverse md:flex-row items-center justify-between gap-12 min-h-[85vh] mb-20" id="home">
            {/* Left: Text */}
            <div className="md:w-1/2 flex flex-col items-start z-10">
                <div className="flex items-center gap-4 mb-6" data-aos="fade-up" data-aos-delay="100">
                    <span className="w-12 h-[1px] bg-indigo-500"></span>
                    <span className="text-indigo-500 dark:text-white font-bold tracking-widest uppercase text-sm">
                        {hero?.full_name || 'JAKA KURNIA'}
                    </span>
                </div>
                <h1 className="text-5xl md:text-7xl lg:text-[5rem] font-extrabold leading-[1.1] mb-6 tracking-tight min-h-[140px] md:min-h-[160px]" data-aos="fade-up" data-aos-delay="200">
                    {typedGreeting}
                    <span className="text-indigo-500 cursor-blink">|</span>
                </h1>
                <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-10 max-w-xl" data-aos="fade-up" data-aos-delay="300">
                    {hero?.short_bio || 'Full-Stack Web Developer yang mengolaborasikan analisis sistem terstruktur dan prinsip Manajemen Informatika untuk menciptakan solusi web end-to-end.'}
                </p>
                <div className="flex flex-row flex-wrap items-center gap-6" data-aos="fade-up" data-aos-delay="400">
                    <a href="#projects" className="bg-indigo-600 text-white dark:bg-white dark:text-black px-8 py-3.5 rounded-full font-bold hover:bg-indigo-700 dark:hover:bg-gray-200 transition-transform transform hover:scale-105 shadow-lg">
                        {hero?.cta_text || 'View My Projects'}
                    </a>
                    
                    <div className="flex items-center gap-4">
                        <a href={hero?.social_links?.linkedin || "https://www.linkedin.com/in/jaka-kurnia"} target="_blank" rel="noopener noreferrer" className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-500 transition-colors duration-300 transform hover:scale-110">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                            </svg>
                        </a>
                        <a href="https://www.instagram.com/im.jakaa/" target="_blank" rel="noopener noreferrer" className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-500 transition-colors duration-300 transform hover:scale-110">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                            </svg>
                        </a>
                        <a href="https://www.tiktok.com/@kurniaa.jsx" target="_blank" rel="noopener noreferrer" className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-500 transition-colors duration-300 transform hover:scale-110">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 2.25-.71 4.54-2.14 6.22-1.76 2.05-4.48 3.12-7.1 2.75-2.81-.39-5.32-2.31-6.26-4.99-.95-2.7.07-5.83 2.37-7.61 2.06-1.58 4.88-1.92 7.28-1.11v4.19c-1.39-.36-2.91-.3-4.14.43-1.07.63-1.81 1.78-1.89 3.02-.09 1.48.51 2.99 1.67 3.91 1.14.9 2.72 1.18 4.14.82 1.4-.36 2.51-1.39 3.04-2.73.34-.84.45-1.77.44-2.69-.03-5.28-.02-10.56-.02-15.84z"/>
                            </svg>
                        </a>
                        <a href="https://github.com/Jaka-kurnia" target="_blank" rel="noopener noreferrer" className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-500 transition-colors duration-300 transform hover:scale-110">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
            {/* Right: Photo */}
            <div className="md:w-1/2 flex justify-center md:justify-end" data-aos="fade-left" data-aos-delay="300">
                {hero?.profile_image_path ? (
                    <img src={`/storage/${hero.profile_image_path}`} alt="Profile" className="w-full max-w-lg object-contain drop-shadow-2xl" />
                ) : (
                    <div className="w-full max-w-md aspect-[3/4] bg-gray-200 dark:bg-[#131726] rounded-2xl flex items-center justify-center text-gray-500 dark:text-gray-700 border border-gray-300 dark:border-gray-800 shadow-2xl">
                        (Foto Profil Belum Diunggah)
                    </div>
                )}
            </div>
        </section>
    );
}
