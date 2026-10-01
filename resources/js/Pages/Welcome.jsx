import { Head, Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';

// Custom hook for typing animation
const useTypewriter = (text, speed = 100, pause = 2000) => {
    const [displayedText, setDisplayedText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    
    useEffect(() => {
        let timer;
        const currentLength = displayedText.length;
        const fullLength = text.length;

        if (!isDeleting && currentLength < fullLength) {
            timer = setTimeout(() => {
                setDisplayedText(text.slice(0, currentLength + 1));
            }, speed);
        } else if (!isDeleting && currentLength === fullLength) {
            timer = setTimeout(() => {
                setIsDeleting(true);
            }, pause);
        } else if (isDeleting && currentLength > 0) {
            timer = setTimeout(() => {
                setDisplayedText(text.slice(0, currentLength - 1));
            }, speed / 2);
        } else if (isDeleting && currentLength === 0) {
            setIsDeleting(false);
        }

        return () => clearTimeout(timer);
    }, [displayedText, isDeleting, text, speed, pause]);

    return displayedText;
};

export default function Welcome({ auth, canLogin, hero, skills, projects, experiences, certifications, quotes }) {
    const tabs = ['Skill Pemrograman', 'Software Yang Digunakan', 'Latar Pendidikan', 'Pengalaman Organisasi'];
    const [activeTab, setActiveTab] = useState(tabs[0]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [selectedCertification, setSelectedCertification] = useState(null);
    const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

    // Filter skills based on tab
    const programmingSkills = (skills || []).filter(s => s.category !== 'Tools');
    const softwareSkills = (skills || []).filter(s => s.category === 'Tools');

    // Filter experiences
    const educationExperiences = (experiences || []).filter(e => e.type === 'Full-time');
    const organizationExperiences = (experiences || []).filter(e => e.type === 'Freelance');
    
    // Typing Animation for Hero Greeting
    const rawGreeting = hero?.greeting || 'Full-Stack Web Developer.';
    const typedGreeting = useTypewriter(rawGreeting, 100, 3000);

    // Auto slide quotes
    useEffect(() => {
        if (quotes && quotes.length > 0) {
            const interval = setInterval(() => {
                setCurrentQuoteIndex((prev) => (prev + 1) % quotes.length);
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [quotes]);

    // Helper to get devicon class
    const getIconClass = (name) => {
        const iconMap = {
            'html': 'devicon-html5-plain colored',
            'css': 'devicon-css3-plain colored',
            'tailwind': 'devicon-tailwindcss-original colored',
            'bootstrap': 'devicon-bootstrap-plain colored',
            'javascript': 'devicon-javascript-plain colored',
            'react': 'devicon-react-original colored',
            'php': 'devicon-php-plain colored',
            'laravel': 'devicon-laravel-original colored',
            'mysql': 'devicon-mysql-plain colored',
            'dart': 'devicon-dart-plain colored',
            'flutter': 'devicon-flutter-plain colored',
            'vs code': 'devicon-vscode-plain colored',
            'figma': 'devicon-figma-plain colored',
            'ms word': 'devicon-windows8-original colored', 
            'ms excel': 'devicon-windows8-original colored', 
            'github': 'devicon-github-original',
            'next.js': 'devicon-nextjs-original-wordmark',
        };
        const key = name.toLowerCase();
        return iconMap[key] || 'devicon-devicon-plain';
    };

    return (
        <div className="min-h-screen bg-[#0B0F19] text-white font-sans selection:bg-indigo-500 selection:text-white overflow-x-hidden">
            <Head>
                <title>{hero?.full_name || 'Portfolio'}</title>
                <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" />
                <style>{`
                    @keyframes fadeInUp {
                        from { opacity: 0; transform: translateY(30px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                    @keyframes fadeInLeft {
                        from { opacity: 0; transform: translateX(30px); }
                        to { opacity: 1; transform: translateX(0); }
                    }
                    @keyframes slideInRight {
                        from { opacity: 0; transform: translateX(50px); }
                        to { opacity: 1; transform: translateX(0); }
                    }
                    @keyframes float {
                        0% { transform: translateY(0px); }
                        50% { transform: translateY(-8px); }
                        100% { transform: translateY(0px); }
                    }
                    .animate-fade-in-up { opacity: 0; animation: fadeInUp 0.8s ease-out forwards; }
                    .animate-fade-in-left { opacity: 0; animation: fadeInLeft 0.8s ease-out forwards; }
                    .animate-slide-in-right { animation: slideInRight 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
                    .animate-float { animation: float 3s ease-in-out infinite; }
                    .delay-100 { animation-delay: 100ms; }
                    .delay-200 { animation-delay: 200ms; }
                    .delay-300 { animation-delay: 300ms; }
                    .delay-400 { animation-delay: 400ms; }
                    
                    /* Custom Scrollbar for Tabs */
                    .tabs-scroll::-webkit-scrollbar { height: 4px; }
                    .tabs-scroll::-webkit-scrollbar-track { background: transparent; }
                    .tabs-scroll::-webkit-scrollbar-thumb { background: #374151; border-radius: 4px; }
                    .tabs-scroll::-webkit-scrollbar-thumb:hover { background: #4B5563; }
                    
                    /* Blinking Cursor for Typewriter */
                    .cursor-blink { animation: blink 1s step-end infinite; }
                    @keyframes blink { 50% { opacity: 0; } }
                `}</style>
            </Head>

            {/* Navigation */}
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

            <main className="max-w-7xl mx-auto px-6 md:px-16 pb-24 overflow-hidden">
                
                {/* Hero Section */}
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

                {/* About Section (Tentang Saya) */}
                <section id="about" className="flex flex-col lg:flex-row gap-12 lg:gap-20 mb-32 pt-10">
                    {/* Left: Photo Card */}
                    <div className="lg:w-1/3 animate-fade-in-up delay-100">
                        <div className="bg-[#131726] border border-gray-800/60 rounded-[2rem] p-4 h-full flex flex-col justify-end min-h-[450px] relative overflow-hidden group shadow-2xl">
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-transparent to-transparent opacity-60 z-10 pointer-events-none"></div>
                            {hero?.profile_image_path ? (
                                <img src={`/storage/${hero.profile_image_path}`} alt={hero.full_name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center text-gray-600 bg-gray-900">Foto Profil</div>
                            )}
                        </div>
                    </div>

                    {/* Right: Content */}
                    <div className="lg:w-2/3 flex flex-col justify-center animate-fade-in-left delay-200">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-indigo-500 tracking-tight">
                            Tentang Saya
                        </h2>
                        <p className="text-gray-300 leading-relaxed text-lg mb-10 text-justify">
                            {hero?.about_text || 'Mahasiswa Aktif yang berfokus pada pengembangan aplikasi berbasis web.'}
                        </p>

                        {/* Tabs Navigation */}
                        <div className="flex gap-6 border-b border-gray-800/80 mb-8 overflow-x-auto pb-1 tabs-scroll">
                            {tabs.map(tab => (
                                <button 
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`pb-3 text-sm font-semibold whitespace-nowrap transition-all duration-300 relative ${activeTab === tab ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
                                >
                                    {tab}
                                    {activeTab === tab && (
                                        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-500 rounded-t-full shadow-[0_0_8px_rgba(79,70,229,0.8)]"></div>
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Dynamic Tab Content (with slide animation) */}
                        <div className="min-h-[280px] overflow-hidden relative">
                            {/* Tab 1: Skill Pemrograman */}
                            {activeTab === 'Skill Pemrograman' && (
                                <div key="tab-1" className="animate-slide-in-right absolute w-full">
                                    <p className="text-sm text-gray-500 mb-6">Berikut adalah skill pemrograman yang saya pahami atau kuasai.</p>
                                    <div className="flex flex-wrap gap-8 items-center">
                                        {programmingSkills.map((skill, index) => (
                                            <div key={skill.id} className="flex flex-col items-center gap-2 group cursor-help" style={{ animationDelay: `${index * 50}ms` }}>
                                                <div className="animate-float" style={{ animationDelay: `${(index % 3) * 0.5}s` }}>
                                                    <i className={`${getIconClass(skill.name)} text-5xl md:text-6xl group-hover:scale-110 transition-all duration-300 group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]`}></i>
                                                </div>
                                                <span className="text-xs font-semibold text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity absolute mt-20 bg-gray-900 px-2 py-1 rounded shadow-lg z-10">{skill.name}</span>
                                            </div>
                                        ))}
                                        {programmingSkills.length === 0 && <p className="text-gray-600 text-sm italic">Belum ada skill yang ditambahkan.</p>}
                                    </div>
                                </div>
                            )}

                            {/* Tab 2: Software Yang Digunakan */}
                            {activeTab === 'Software Yang Digunakan' && (
                                <div key="tab-2" className="animate-slide-in-right absolute w-full">
                                    <p className="text-sm text-gray-500 mb-6">Software dan tools yang biasa saya gunakan dalam bekerja.</p>
                                    <div className="flex flex-wrap gap-8 items-center">
                                        {softwareSkills.map((skill, index) => (
                                            <div key={skill.id} className="flex flex-col items-center gap-2 group cursor-help" style={{ animationDelay: `${index * 50}ms` }}>
                                                <div className="animate-float" style={{ animationDelay: `${(index % 3) * 0.5}s` }}>
                                                    <i className={`${getIconClass(skill.name)} text-5xl md:text-6xl group-hover:scale-110 transition-all duration-300 group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]`}></i>
                                                </div>
                                                <span className="text-xs font-semibold text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity absolute mt-20 bg-gray-900 px-2 py-1 rounded shadow-lg z-10">{skill.name}</span>
                                            </div>
                                        ))}
                                        {softwareSkills.length === 0 && <p className="text-gray-600 text-sm italic">Belum ada software yang ditambahkan.</p>}
                                    </div>
                                </div>
                            )}

                            {/* Tab 3: Latar Pendidikan */}
                            {activeTab === 'Latar Pendidikan' && (
                                <div key="tab-3" className="animate-slide-in-right absolute w-full">
                                    <p className="text-sm text-gray-500 mb-6">Riwayat pendidikan saya.</p>
                                    <div className="flex flex-wrap gap-8 items-center">
                                        {educationExperiences && educationExperiences.length > 0 ? educationExperiences.map((exp, index) => (
                                            <div key={exp.id} className="flex flex-col items-center gap-3 group cursor-help" style={{ animationDelay: `${index * 100}ms` }}>
                                                <div className="animate-float" style={{ animationDelay: `${(index % 3) * 0.5}s` }}>
                                                    {exp.image_path ? (
                                                        <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-white p-2 shadow-lg group-hover:scale-110 transition-transform duration-300 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                                                            <img src={`/storage/${exp.image_path}`} alt={exp.company_name} className="w-full h-full object-contain" />
                                                        </div>
                                                    ) : (
                                                        <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-[#131726] border border-gray-700 flex items-center justify-center p-2 shadow-lg group-hover:scale-110 transition-transform duration-300">
                                                            <span className="text-gray-500 font-bold text-center text-xs">{exp.company_name}</span>
                                                        </div>
                                                    )}
                                                </div>
                                                <span className="text-xs md:text-sm font-bold text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full">{new Date(exp.start_date).getFullYear()} - {exp.end_date ? new Date(exp.end_date).getFullYear() : 'Sekarang'}</span>
                                            </div>
                                        )) : (
                                            <p className="text-gray-600 text-sm italic">Belum ada riwayat pendidikan yang ditambahkan.</p>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Tab 4: Pengalaman Organisasi */}
                            {activeTab === 'Pengalaman Organisasi' && (
                                <div key="tab-4" className="animate-slide-in-right absolute w-full">
                                    <p className="text-sm text-gray-500 mb-6">Pengalaman organisasi dan aktivitas ekstrakurikuler saya.</p>
                                    <div className="flex flex-wrap gap-8 items-center">
                                        {organizationExperiences && organizationExperiences.length > 0 ? organizationExperiences.map((exp, index) => (
                                            <div key={exp.id} className="flex flex-col items-center gap-3 group cursor-help" style={{ animationDelay: `${index * 100}ms` }}>
                                                <div className="animate-float" style={{ animationDelay: `${(index % 3) * 0.5}s` }}>
                                                    {exp.image_path ? (
                                                        <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-white p-2 shadow-lg group-hover:scale-110 transition-transform duration-300 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                                                            <img src={`/storage/${exp.image_path}`} alt={exp.company_name} className="w-full h-full object-contain" />
                                                        </div>
                                                    ) : (
                                                        <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-[#131726] border border-gray-700 flex items-center justify-center p-2 shadow-lg group-hover:scale-110 transition-transform duration-300">
                                                            <span className="text-gray-500 font-bold text-center text-xs">{exp.company_name}</span>
                                                        </div>
                                                    )}
                                                </div>
                                                <span className="text-xs md:text-sm font-bold text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full">{new Date(exp.start_date).getFullYear()} - {exp.end_date ? new Date(exp.end_date).getFullYear() : 'Sekarang'}</span>
                                            </div>
                                        )) : (
                                            <p className="text-gray-600 text-sm italic">Belum ada pengalaman organisasi yang ditambahkan.</p>
                                        )}
                                    </div>
                                </div>
                            )}

                        </div>

                        {/* Quotes Section (Always Visible) */}
                        <div className="mt-12">
                            <h3 className="text-xl font-bold mb-4 text-white">Quotes Saya</h3>
                            {quotes && quotes.length > 0 ? (
                                <div className="bg-[#131726] border border-gray-800 rounded-2xl p-6 md:p-8 flex items-center justify-between shadow-xl mt-4">
                                    <button 
                                        onClick={() => setCurrentQuoteIndex((prev) => (prev === 0 ? quotes.length - 1 : prev - 1))}
                                        className="text-gray-600 hover:text-white transition-colors p-2"
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                                    </button>
                                    <div className="text-center px-4 w-full">
                                        <div className="min-h-[60px] flex items-center justify-center">
                                            <p key={currentQuoteIndex} className="font-semibold text-gray-200 text-sm md:text-lg italic animate-slide-in-right">"{quotes[currentQuoteIndex].content}"</p>
                                        </div>
                                        <div className="flex justify-center gap-2 mt-6">
                                            {quotes.map((q, idx) => (
                                                <span key={q.id} onClick={() => setCurrentQuoteIndex(idx)} className={`w-2 h-2 rounded-full cursor-pointer transition-all ${idx === currentQuoteIndex ? 'bg-indigo-500 shadow-[0_0_5px_rgba(79,70,229,0.8)] scale-125' : 'bg-gray-700 hover:bg-gray-500'}`}></span>
                                            ))}
                                        </div>
                                    </div>
                                    <button 
                                        onClick={() => setCurrentQuoteIndex((prev) => (prev === quotes.length - 1 ? 0 : prev + 1))}
                                        className="text-gray-600 hover:text-white transition-colors p-2"
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                                    </button>
                                </div>
                            ) : (
                                <p className="text-gray-600 text-sm italic">Belum ada quote yang ditambahkan.</p>
                            )}
                        </div>

                    </div>
                </section>

                {/* Projects Section */}
                <section id="projects" className="pt-10 animate-fade-in-up delay-200">
                    <div className="mb-14">
                        <p className="text-xs font-semibold text-indigo-500 uppercase tracking-[0.2em] mb-4 flex items-center gap-4">
                            <span className="w-10 h-[1px] bg-gray-700"></span> PROJECT YANG TELAH DIKERJAKAN
                        </p>
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                            <h2 className="text-5xl md:text-[4rem] font-bold tracking-tight">
                                Featured <span className="text-indigo-500">Projects.</span>
                            </h2>
                            <p className="text-gray-400 text-xs font-bold tracking-[0.2em] uppercase pb-2">
                                CASE STUDIES / {new Date().getFullYear()}-{new Date().getFullYear()+1}
                            </p>
                        </div>
                        <div className="w-full h-[1px] bg-gray-800/80 mt-10"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects && projects.length > 0 ? projects.map(project => (
                            <div 
                                key={project.id} 
                                onClick={() => setSelectedProject(project)}
                                className="bg-[#131726] border border-gray-800 rounded-[1.5rem] overflow-hidden cursor-pointer group hover:border-indigo-500/40 hover:shadow-[0_0_30px_rgba(79,70,229,0.1)] transition-all duration-300 flex flex-col h-full"
                            >
                                <div className="h-60 overflow-hidden bg-gray-900 relative">
                                    {project.thumbnail_path ? (
                                        <img src={`/storage/${project.thumbnail_path}`} alt={project.title} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-700 font-medium">No Thumbnail</div>
                                    )}
                                </div>
                                <div className="p-8 flex flex-col flex-grow">
                                    <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-indigo-400 transition-colors">{project.title}</h3>
                                    <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 mb-8 flex-grow">
                                        {project.content || 'Aplikasi berbasis web untuk memudahkan proses bisnis.'}
                                    </p>
                                    <div className="flex flex-wrap gap-2 pt-5 border-t border-gray-800/80">
                                        {project.skills && project.skills.map(skill => (
                                            <span key={skill.id} className="px-3 py-1.5 border border-gray-700/80 bg-gray-800/30 rounded text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                                                {skill.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )) : (
                            <div className="col-span-3 text-center py-24 text-gray-500 border border-dashed border-gray-800 rounded-[2rem]">
                                Belum ada proyek yang dipublikasikan.
                            </div>
                        )}
                    </div>
                </section>

                {/* Certifications Section */}
                <section id="certifications" className="pt-24 animate-fade-in-up delay-300">
                    <div className="mb-14">
                        <p className="text-xs font-semibold text-indigo-500 uppercase tracking-[0.2em] mb-4 flex items-center gap-4">
                            <span className="w-10 h-[1px] bg-gray-700"></span> SERTIFIKASI & PENGHARGAAN
                        </p>
                        <h2 className="text-5xl md:text-[4rem] font-bold tracking-tight mb-10">
                            My <span className="text-indigo-500">Certifications.</span>
                        </h2>
                        <div className="w-full h-[1px] bg-gray-800/80"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {certifications && certifications.length > 0 ? certifications.map((cert) => (
                            <div 
                                key={cert.id} 
                                onClick={() => setSelectedCertification(cert)}
                                className="bg-[#131726] border border-gray-800 p-6 rounded-2xl cursor-pointer hover:border-indigo-500/50 hover:shadow-[0_0_20px_rgba(79,70,229,0.15)] transition-all flex flex-col items-center text-center group"
                            >
                                <div className="w-16 h-16 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-500 mb-4 group-hover:scale-110 transition-transform">
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                </div>
                                <h3 className="font-bold text-white text-lg mb-2">{cert.name}</h3>
                                <p className="text-indigo-400 text-sm mb-1">{cert.issuer}</p>
                                <p className="text-gray-500 text-xs">{new Date(cert.issue_date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long' })}</p>
                            </div>
                        )) : (
                            <div className="col-span-4 text-center py-16 text-gray-500 border border-dashed border-gray-800 rounded-2xl">
                                Belum ada sertifikasi yang ditambahkan.
                            </div>
                        )}
                    </div>
                </section>
            </main>

            {/* Project Detail Modal */}
            {selectedProject && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-fade-in-up" style={{ animationDuration: '0.3s' }}>
                    <div className="absolute inset-0 bg-[#0B0F19]/90 backdrop-blur-sm" onClick={() => setSelectedProject(null)}></div>
                    <div className="relative bg-[#131726] border border-gray-800 rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col">
                        <button onClick={() => setSelectedProject(null)} className="absolute top-6 right-6 bg-gray-800/80 hover:bg-indigo-600 text-white rounded-full p-2 transition-colors z-20 backdrop-blur">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>

                        <div className="w-full h-72 sm:h-96 bg-gray-900 relative">
                            {selectedProject.thumbnail_path ? (
                                <img src={`/storage/${selectedProject.thumbnail_path}`} alt={selectedProject.title} className="w-full h-full object-cover object-top" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-700">No Image</div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#131726] via-transparent to-transparent"></div>
                        </div>

                        <div className="p-8 sm:p-12 -mt-20 relative z-10">
                            <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-white drop-shadow-md">{selectedProject.title}</h2>
                            <div className="flex flex-wrap gap-2 mb-10">
                                {selectedProject.skills && selectedProject.skills.map(skill => (
                                    <span key={skill.id} className="px-4 py-1.5 bg-indigo-500/10 border border-indigo-500/30 rounded-md text-xs font-bold text-indigo-400 uppercase tracking-wider">
                                        {skill.name}
                                    </span>
                                ))}
                            </div>
                            <div className="prose prose-invert prose-lg prose-indigo max-w-none mb-12">
                                {selectedProject.content ? (
                                    <div className="text-gray-300 whitespace-pre-wrap leading-relaxed text-justify">{selectedProject.content}</div>
                                ) : (
                                    <p className="text-gray-500 text-justify">Tidak ada deskripsi detail untuk proyek ini.</p>
                                )}
                            </div>
                            {selectedProject.galleries && selectedProject.galleries.length > 0 && (
                                <div className="mb-12">
                                    <h4 className="text-xl font-bold mb-6 text-white border-b border-gray-800 pb-2 inline-block">Galeri Proyek</h4>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                                        {selectedProject.galleries.map(gallery => (
                                            <a href={`/storage/${gallery.image_path}`} target="_blank" rel="noreferrer" key={gallery.id} className="rounded-xl overflow-hidden border border-gray-800 hover:border-indigo-500 transition-colors block">
                                                <img src={`/storage/${gallery.image_path}`} className="w-full h-40 object-cover hover:scale-105 transition-transform duration-500" alt="Gallery item" />
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}
                            <div className="flex flex-wrap gap-4 pt-8 border-t border-gray-800/80">
                                {selectedProject.demo_url && (
                                    <a href={selectedProject.demo_url} target="_blank" className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-full transition-all flex items-center gap-2 transform hover:-translate-y-1">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                        Kunjungi Website
                                    </a>
                                )}
                                {selectedProject.github_url && (
                                    <a href={selectedProject.github_url} target="_blank" className="px-8 py-3 bg-gray-800 hover:bg-gray-700 text-white font-bold rounded-full transition-all flex items-center gap-2 border border-gray-700 transform hover:-translate-y-1">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                                        Lihat Kode (GitHub)
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Certification Detail Modal */}
            {selectedCertification && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-fade-in-up" style={{ animationDuration: '0.3s' }}>
                    <div className="absolute inset-0 bg-[#0B0F19]/90 backdrop-blur-sm" onClick={() => setSelectedCertification(null)}></div>
                    <div className="relative bg-[#131726] border border-gray-800 rounded-3xl shadow-2xl w-full max-w-2xl p-8 sm:p-10 flex flex-col items-center text-center">
                        <button onClick={() => setSelectedCertification(null)} className="absolute top-6 right-6 bg-gray-800/80 hover:bg-indigo-600 text-white rounded-full p-2 transition-colors z-20">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                        
                        <div className="w-24 h-24 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-500 mb-6">
                            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </div>
                        
                        <h2 className="text-3xl font-bold mb-4 text-white">{selectedCertification.name}</h2>
                        <p className="text-indigo-400 text-lg mb-2 font-semibold">{selectedCertification.issuer}</p>
                        <p className="text-gray-400 mb-6 border-b border-gray-800 pb-6 w-full">Diterbitkan: {new Date(selectedCertification.issue_date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        
                        {selectedCertification.description && (
                            <div className="text-gray-300 text-left w-full mb-8 whitespace-pre-wrap leading-relaxed bg-gray-900/50 p-6 rounded-xl border border-gray-800">
                                {selectedCertification.description}
                            </div>
                        )}
                        
                        {selectedCertification.file_path && (
                            <a href={`/storage/${selectedCertification.file_path}`} target="_blank" className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-full transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(79,70,229,0.3)]">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                Lihat Sertifikat Asli
                            </a>
                        )}
                    </div>
                </div>
            )}
            
            {/* Footer */}
            <footer className="text-center py-10 mt-12 border-t border-gray-800/80 bg-[#080B14]">
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
        </div>
    );
}

