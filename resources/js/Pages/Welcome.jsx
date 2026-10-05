import { Head } from '@inertiajs/react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useState, useEffect } from 'react';
import { useTypewriter } from './Welcome/hooks/useTypewriter';
import Navbar from './Welcome/Navbar';
import HeroSection from './Welcome/HeroSection';
import AboutSection from './Welcome/AboutSection';
import ProjectsSection from './Welcome/ProjectsSection';
import CertificationsSection from './Welcome/CertificationsSection';
import ProjectDetailModal from './Welcome/ProjectDetailModal';
import CertificationDetailModal from './Welcome/CertificationDetailModal';
import Footer from './Welcome/Footer';

export default function Welcome({ auth, canLogin, hero, skills, projects, experiences, certifications, quotes }) {
    const [selectedProject, setSelectedProject] = useState(null);
    const [selectedCertification, setSelectedCertification] = useState(null);
    const [isDarkMode, setIsDarkMode] = useState(true);

    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
            offset: 100,
        });
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            setIsDarkMode(false);
        }
    }, []);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
        localStorage.setItem('theme', !isDarkMode ? 'dark' : 'light');
    };

    // Filter skills based on tab
    const programmingSkills = (skills || []).filter(s => s.category !== 'Tools');
    const softwareSkills = (skills || []).filter(s => s.category === 'Tools');

    // Filter experiences
    const educationExperiences = (experiences || []).filter(e => e.type === 'Full-time');
    const organizationExperiences = (experiences || []).filter(e => e.type === 'Freelance');

    // Typing Animation for Hero Greeting
    const rawGreeting = hero?.greeting || 'Full-Stack Web Developer.';
    const typedGreeting = useTypewriter(rawGreeting, 100, 3000);

    return (
        <div className={isDarkMode ? 'dark' : ''}>
            <div className="min-h-screen bg-gray-50 dark:bg-[#0B0F19] text-gray-900 dark:text-white font-sans selection:bg-indigo-500 selection:text-white overflow-x-hidden transition-colors duration-300">
            <Head>
                <title>{`${hero?.full_name || 'Jaka Kurnia'} - Jasa Pembuatan Website & Konsultan IT`}</title>
                <meta name="description" content="Layanan jasa pembuatan website profesional, cepat, dan responsif. Jaka Kurnia adalah Web Developer & Konsultan IT yang siap membangun aplikasi web custom untuk bisnis Anda." />
                <meta name="keywords" content="jasa pembuatan website, jasa buat web, bikin website murah, web developer indonesia, konsultan IT, jasa bikin website, programmer freelance, full stack developer, pembuatan aplikasi web, Jaka Kurnia" />
                <meta name="author" content="Jaka Kurnia" />
                <meta name="robots" content="index, follow" />
                
                {/* Open Graph / Social Media */}
                <meta property="og:type" content="website" />
                <meta property="og:title" content={`${hero?.full_name || 'Jaka Kurnia'} - Jasa Pembuatan Website Profesional`} />
                <meta property="og:description" content="Butuh website profesional? Jaka Kurnia menyediakan jasa pembuatan website dan aplikasi web custom terpercaya untuk meningkatkan bisnis Anda." />
                
                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={`${hero?.full_name || 'Jaka Kurnia'} - Jasa Pembuatan Website`} />
                <meta name="twitter:description" content="Layanan web developer profesional dan konsultan IT. Hubungi sekarang untuk pembuatan website bisnis Anda." />

                {/* Schema.org Structured Data */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@graph": [
                            {
                                "@type": "ProfessionalService",
                                "name": `Jasa Pembuatan Website - ${hero?.full_name || 'Jaka Kurnia'}`,
                                "description": "Layanan Jasa Pembuatan Website dan Web Developer Profesional.",
                                "image": "/img/logo.png",
                                "priceRange": "$$",
                                "address": {
                                    "@type": "PostalAddress",
                                    "addressCountry": "ID"
                                }
                            },
                            {
                                "@type": "Person",
                                "name": hero?.full_name || "Jaka Kurnia",
                                "jobTitle": "Full-Stack Web Developer & Konsultan IT",
                                "url": "https://github.com/Jaka-kurnia",
                                "image": "/img/logo.png",
                                "sameAs": [
                                    hero?.social_links?.linkedin || "https://www.linkedin.com/in/jaka-kurnia",
                                    "https://github.com/Jaka-kurnia",
                                    "https://www.instagram.com/im.jakaa/",
                                    "https://www.tiktok.com/@kurniaa.jsx"
                                ]
                            }
                        ]
                    })}
                </script>
                <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" />
            </Head>

            <Navbar hero={hero} auth={auth} canLogin={canLogin} isDarkMode={isDarkMode} toggleTheme={toggleTheme} />

            <main className="max-w-7xl mx-auto px-6 md:px-16 pb-24 overflow-hidden">
                <HeroSection hero={hero} typedGreeting={typedGreeting} />
                <AboutSection
                    hero={hero}
                    programmingSkills={programmingSkills}
                    softwareSkills={softwareSkills}
                    educationExperiences={educationExperiences}
                    organizationExperiences={organizationExperiences}
                    quotes={quotes}
                />
                <ProjectsSection projects={projects} onSelect={setSelectedProject} />
                {/* <CertificationsSection certifications={certifications} onSelect={setSelectedCertification} /> */}
            </main>

            {selectedProject && (
                <ProjectDetailModal project={selectedProject} onClose={() => setSelectedProject(null)} />
            )}
            {/* {selectedCertification && (
                <CertificationDetailModal certification={selectedCertification} onClose={() => setSelectedCertification(null)} />
            )} */}

            <Footer hero={hero} />
            </div>
        </div>
    );
}
