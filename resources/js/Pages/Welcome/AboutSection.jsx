import { useState } from 'react';
import SkillsGrid from './SkillsGrid';
import ExperienceGrid from './ExperienceGrid';
import QuotesCarousel from './QuotesCarousel';

const TABS = ['Skill Pemrograman', 'Software Yang Digunakan', 'Latar Pendidikan', 'Pengalaman Organisasi'];

export default function AboutSection({ hero, programmingSkills, softwareSkills, educationExperiences, organizationExperiences, quotes }) {
    const [activeTab, setActiveTab] = useState(TABS[0]);

    return (
        <section id="about" className="flex flex-col lg:flex-row gap-12 lg:gap-20 mb-32 pt-10 scroll-mt-28">
            {/* Left: Photo Card */}
            <aside className="lg:w-1/3" data-aos="fade-up" data-aos-delay="100">
                <figure className="bg-white dark:bg-[#131726] border border-gray-200 dark:border-gray-800/60 rounded-[2rem] p-4 h-full flex flex-col justify-end min-h-[450px] relative overflow-hidden group shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-50 dark:from-[#0B0F19] via-transparent to-transparent opacity-60 z-10 pointer-events-none"></div>
                    {hero?.profile_image_path ? (
                        <>
                            <img src={`/storage/${hero.profile_image_path}`} alt={hero.full_name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                            <figcaption className="sr-only">Foto Profil Tentang Saya</figcaption>
                        </>
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-gray-600 bg-gray-900">Foto Profil</div>
                    )}
                </figure>
            </aside>

            {/* Right: Content */}
            <article className="lg:w-2/3 flex flex-col justify-center" data-aos="fade-left" data-aos-delay="200">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                    Tentang Saya
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg mb-10 text-justify">
                    {hero?.about_text || 'Mahasiswa Aktif yang berfokus pada pengembangan aplikasi berbasis web.'}
                </p>

                {/* Tabs Navigation */}
                <nav aria-label="About Sections" className="flex gap-6 border-b border-gray-300 dark:border-gray-800/80 mb-8 overflow-x-auto pb-1 tabs-scroll">
                    {TABS.map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`pb-3 text-sm font-semibold whitespace-nowrap transition-all duration-300 relative ${activeTab === tab ? 'text-black dark:text-white' : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-300'}`}
                        >
                            {tab}
                            {activeTab === tab && (
                                <div className="absolute bottom-0 left-0 w-full h-0.5 hover:scale-105 bg-gradient-to-r from-[#2563EB] to-[#3B82F6] hover:from-[#1D4ED8] hover:to-[#1D4ED8] text-white shadow-[0_4px_14px_rgba(37,99,235,0.3)] dark:from-[#3B82F6] dark:to-[#38BDF8] dark:hover:from-[#60A5FA] dark:hover:to-[#60A5FA] dark:text-white dark:shadow-[0_4px_14px_rgba(56,189,248,0.25)]"></div>
                            )}
                        </button>
                    ))}
                </nav>

                {/* Dynamic Tab Content (with slide animation) */}
                <div className="min-h-[280px] overflow-hidden relative">
                    {/* Tab 1: Skill Pemrograman */}
                    {activeTab === 'Skill Pemrograman' && (
                        <div key="tab-1" className="animate-slide-in-right absolute w-full">
                            <p className="text-sm text-gray-500 mb-6">Berikut adalah skill pemrograman yang saya pahami atau kuasai.</p>
                            <SkillsGrid items={programmingSkills} emptyMessage="Belum ada skill yang ditambahkan." />
                        </div>
                    )}

                    {/* Tab 2: Software Yang Digunakan */}
                    {activeTab === 'Software Yang Digunakan' && (
                        <div key="tab-2" className="animate-slide-in-right absolute w-full">
                            <p className="text-sm text-gray-500 mb-6">Software dan tools yang biasa saya gunakan dalam bekerja.</p>
                            <SkillsGrid items={softwareSkills} emptyMessage="Belum ada software yang ditambahkan." />
                        </div>
                    )}

                    {/* Tab 3: Latar Pendidikan */}
                    {activeTab === 'Latar Pendidikan' && (
                        <div key="tab-3" className="animate-slide-in-right absolute w-full">
                            <p className="text-sm text-gray-500 mb-6">Riwayat pendidikan saya.</p>
                            <ExperienceGrid items={educationExperiences} emptyMessage="Belum ada riwayat pendidikan yang ditambahkan." />
                        </div>
                    )}

                    {/* Tab 4: Pengalaman Organisasi */}
                    {activeTab === 'Pengalaman Organisasi' && (
                        <div key="tab-4" className="animate-slide-in-right absolute w-full">
                            <p className="text-sm text-gray-500 mb-6">Pengalaman organisasi dan aktivitas ekstrakurikuler saya.</p>
                            <ExperienceGrid items={organizationExperiences} emptyMessage="Belum ada pengalaman organisasi yang ditambahkan." />
                        </div>
                    )}

                </div>

                <QuotesCarousel quotes={quotes} />

            </article>
        </section>
    );
}
