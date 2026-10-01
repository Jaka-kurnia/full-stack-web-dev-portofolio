import { Head } from '@inertiajs/react';
import { useState } from 'react';
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
        <div className="min-h-screen bg-[#0B0F19] text-white font-sans selection:bg-indigo-500 selection:text-white overflow-x-hidden">
            <Head>
                <title>{hero?.full_name || 'Portfolio'}</title>
                <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" />
            </Head>

            <Navbar hero={hero} auth={auth} canLogin={canLogin} />

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
                <CertificationsSection certifications={certifications} onSelect={setSelectedCertification} />
            </main>

            {selectedProject && (
                <ProjectDetailModal project={selectedProject} onClose={() => setSelectedProject(null)} />
            )}
            {selectedCertification && (
                <CertificationDetailModal certification={selectedCertification} onClose={() => setSelectedCertification(null)} />
            )}

            <Footer hero={hero} />
        </div>
    );
}
