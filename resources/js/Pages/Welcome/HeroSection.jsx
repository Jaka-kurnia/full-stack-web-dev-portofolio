export default function HeroSection({ hero, typedGreeting }) {
    return (
        <section
            className="flex items-center min-h-[85vh] mb-20 pt-10"
            id="home"
        >
            <h1 className="sr-only">
                Jasa Pembuatan Website Profesional & Web Developer - Jaka Kurnia
            </h1>
            <div className="w-full flex flex-col-reverse md:flex-row items-end justify-between gap-12">
                {/* Left: Text */}
                <header className="md:w-1/2 flex flex-col items-start z-10 pb-2 md:pb-6">
                    <div
                        className="flex items-center gap-4 mb-6"
                        data-aos="fade-up"
                        data-aos-delay="100"
                    >
                        <span className="w-12 h-[1px] hover:scale-105 bg-gradient-to-r from-[#2563EB] to-[#3B82F6] hover:from-[#1D4ED8] hover:to-[#1D4ED8] text-white shadow-[0_4px_14px_rgba(37,99,235,0.3)] dark:from-[#3B82F6] dark:to-[#38BDF8] dark:hover:from-[#60A5FA] dark:hover:to-[#60A5FA] dark:text-white dark:shadow-[0_4px_14px_rgba(56,189,248,0.25)]"></span>
                        <span className=" dark:text-white font-bold tracking-widest uppercase text-sm">
                            {hero?.full_name || "JAKA KURNIA"}
                        </span>
                    </div>
                    <h2
                        className="text-5xl md:text-7xl lg:text-[5rem] font-extrabold leading-[1.1] mb-6 tracking-tight min-h-[140px] md:min-h-[160px]"
                        data-aos="fade-up"
                        data-aos-delay="200"
                    >
                        {typedGreeting}
                        <span className="text-indigo-500 cursor-blink">|</span>
                    </h2>
                    <p
                        className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg mb-10 max-w-xl"
                        data-aos="fade-up"
                        data-aos-delay="300"
                    >
                        {hero?.short_bio ||
                            "Full-Stack Web Developer yang mengolaborasikan analisis sistem terstruktur dan prinsip Manajemen Informatika untuk menciptakan solusi web end-to-end."}
                    </p>
                    <div
                        className="flex flex-row flex-wrap items-center gap-6"
                        data-aos="fade-up"
                        data-aos-delay="400"
                    >
                        <a
                            href="#projects"
                            className="px-8 py-3.5 rounded-full font-bold transition-all transform hover:scale-105 bg-gradient-to-r from-[#2563EB] to-[#3B82F6] hover:from-[#1D4ED8] hover:to-[#1D4ED8] text-white shadow-[0_8px_20px_rgba(37,99,235,0.3)] dark:from-[#3B82F6] dark:to-[#38BDF8] dark:hover:from-[#60A5FA] dark:hover:to-[#60A5FA] dark:text-white dark:shadow-[0_8px_20px_rgba(56,189,248,0.25)]"
                        >
                            {hero?.cta_text || "View My Projects"}
                        </a>

                        <nav aria-label="Social Media" className="flex items-center gap-4">
                            <a
                                href={
                                    hero?.social_links?.linkedin ||
                                    "https://www.linkedin.com/in/jaka-kurnia"
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-500 transition-colors duration-300 transform hover:scale-110"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                </svg>
                            </a>
                            <a
                                href="https://www.instagram.com/im.jakaa/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-500 transition-colors duration-300 transform hover:scale-110"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <rect
                                        x="2"
                                        y="2"
                                        width="20"
                                        height="20"
                                        rx="5"
                                        ry="5"
                                    ></rect>
                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                    <line
                                        x1="17.5"
                                        y1="6.5"
                                        x2="17.51"
                                        y2="6.5"
                                    ></line>
                                </svg>
                            </a>
                            <a
                                href="https://www.tiktok.com/@kurniaa.jsx"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-500 dark:text-gray-400 hover:text-[#2563EB] dark:hover:text-[#3B82F6] transition-colors duration-300 transform hover:scale-110"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 2.25-.71 4.54-2.14 6.22-1.76 2.05-4.48 3.12-7.1 2.75-2.81-.39-5.32-2.31-6.26-4.99-.95-2.7.07-5.83 2.37-7.61 2.06-1.58 4.88-1.92 7.28-1.11v4.19c-1.39-.36-2.91-.3-4.14.43-1.07.63-1.81 1.78-1.89 3.02-.09 1.48.51 2.99 1.67 3.91 1.14.9 2.72 1.18 4.14.82 1.4-.36 2.51-1.39 3.04-2.73.34-.84.45-1.77.44-2.69-.03-5.28-.02-10.56-.02-15.84z" />
                                </svg>
                            </a>
                            <a
                                href="https://github.com/Jaka-kurnia"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-500 transition-colors duration-300 transform hover:scale-110"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                </svg>
                            </a>
                        </nav>
                    </div>
                </header>
                {/* Right: Photo */}
                <div
                    className="md:w-1/2 flex justify-center md:justify-end w-full"
                    data-aos="fade-left"
                    data-aos-delay="300"
                >
                    {hero?.profile_image_path ? (
                        <figure className="relative w-full max-w-md lg:max-w-xl xl:max-w-2xl flex justify-center items-end h-[450px] sm:h-[500px] md:h-[550px] lg:h-[650px]">
                            {/* Decorative Blob / Glow Effect */}
                            <div className="absolute inset-0 z-0 flex items-center justify-center mb-10">
                                {/* Glow */}
                                <div className="absolute w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-gradient-to-tr from-indigo-500/40 to-purple-500/40 dark:from-indigo-500/30 dark:to-purple-500/30 rounded-full blur-3xl animate-pulse"></div>

                                {/* SVG Blob 1 */}
                                <svg
                                    className="absolute w-72 h-72 md:w-96 md:h-96 lg:w-[32rem] lg:h-[32rem] text-indigo-500/20 dark:text-indigo-400/20 animate-[spin_40s_linear_infinite]"
                                    viewBox="0 0 200 200"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fill="currentColor"
                                        d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,81.6,-46.3C91.4,-33.5,98,-18,97.7,-2.5C97.4,13,90.2,28.5,80.3,41.5C70.4,54.5,57.8,65,43.6,73.2C29.4,81.4,13.6,87.3,-1.7,90.3C-17,93.3,-32.8,93.4,-46.6,87.2C-60.4,81,-72.2,68.5,-81.1,54.2C-90,39.9,-96,23.8,-95.8,7.9C-95.6,-8,-89.2,-23.7,-80.1,-37.2C-71,-50.7,-59.2,-62,-45.5,-69.2C-31.8,-76.4,-16.2,-79.5,-0.1,-79.3C16,-79.1,30.6,-83.6,44.7,-76.4Z"
                                        transform="translate(100 100)"
                                    />
                                </svg>

                                {/* SVG Blob 2 (Offset and different shape) */}
                                <svg
                                    className="absolute w-64 h-64 md:w-80 md:h-80 lg:w-[28rem] lg:h-[28rem] text-purple-500/10 dark:text-purple-400/10 animate-[spin_50s_linear_infinite_reverse]"
                                    viewBox="0 0 200 200"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fill="currentColor"
                                        d="M47.5,-69.1C59.9,-59.5,67.4,-42.3,71.4,-25.1C75.3,-8,75.7,9.1,70.5,23.8C65.3,38.5,54.5,50.8,41.2,60.1C28,69.4,12.3,75.7,-3.3,80C-18.9,84.3,-34.5,86.6,-47.5,79.5C-60.5,72.4,-70.9,56,-76.3,39C-81.7,22,-82,4.4,-77.3,-11.1C-72.6,-26.6,-62.9,-40,-50.2,-49.8C-37.5,-59.6,-21.8,-65.8,-4.6,-59.8C12.6,-53.8,25.2,-35.5,35.1,-78.7Z"
                                        transform="translate(100 100)"
                                    />
                                </svg>
                            </div>

                            <img
                                src={`/storage/${hero.profile_image_path}`}
                                alt="Profile"
                                className="relative z-10 w-full h-full object-contain object-bottom drop-shadow-[0_20px_30px_rgba(0,0,0,0.4)] dark:drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)]"
                            />
                            <figcaption className="sr-only">Foto Profil Jaka Kurnia</figcaption>
                            
                            {/* Gradient Overlay for thick blending shadow */}
                            <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-gray-50 via-gray-50/80 dark:from-[#0B0F19] dark:via-[#0B0F19]/70 to-transparent z-20 pointer-events-none"></div>
                        </figure>
                    ) : (
                        <div className="w-full max-w-md aspect-[3/4] bg-gray-200 dark:bg-[#131726] rounded-2xl flex items-center justify-center text-gray-500 dark:text-gray-700 border border-gray-300 dark:border-gray-800 shadow-2xl">
                            (Foto Profil Belum Diunggah)
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
