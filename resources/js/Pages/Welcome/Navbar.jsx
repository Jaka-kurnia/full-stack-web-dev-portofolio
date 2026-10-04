import { Link } from "@inertiajs/react";
import { useState, useEffect } from "react";

export default function Navbar({
    hero,
    auth,
    canLogin,
    isDarkMode,
    toggleTheme,
}) {
    const [activeSection, setActiveSection] = useState("home");
    const [isScrolled, setIsScrolled] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Logic for auto-hide
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsVisible(false); // Hide on scroll down
            } else {
                setIsVisible(true); // Show on scroll up
            }
            setLastScrollY(currentScrollY);

            setIsScrolled(currentScrollY > 20);

            const sections = [
                "home",
                "about",
                "projects",
                "certifications",
                "contact",
            ];
            let current = "home";
            for (const section of sections) {
                const element = document.getElementById(section);
                if (element && window.scrollY >= element.offsetTop - 300) {
                    current = section;
                }
            }
            setActiveSection(current);
        };
        window.addEventListener("scroll", handleScroll);
        // Trigger once on load
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    const navLinks = [
        { name: "Beranda", href: "#home", id: "home" },
        { name: "Tentang Saya", href: "#about", id: "about" },
        { name: "Proyek Saya", href: "#projects", id: "projects" },
        { name: "Sertifikasi", href: "#certifications", id: "certifications" },
    ];

    const getLinkClass = (id) => {
        const isActive = activeSection === id;
        return `relative pb-1 transition-colors ${
            isActive
                ? "text-gray-900 dark:text-white font-bold"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
        }`;
    };

    const activeUnderline = (
        <span className="absolute left-0 -bottom-1 w-full h-[3px] bg-gradient-to-r from-[#2563EB] to-[#3B82F6] dark:from-[#3B82F6] dark:to-[#38BDF8] rounded-full shadow-[0_2px_8px_rgba(37,99,235,0.4)] dark:shadow-[0_2px_8px_rgba(56,189,248,0.4)]"></span>
    );

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
                isVisible ? "translate-y-0" : "-translate-y-full"
            } ${
                isScrolled
                    ? "bg-white/90 dark:bg-[#080B14]/90 backdrop-blur-md shadow-sm dark:shadow-gray-900/50 py-3 border-b border-gray-200 dark:border-gray-800"
                    : "bg-transparent py-5"
            }`}
            data-aos="fade-down"
        >
            <nav className="flex justify-between items-center px-6 md:px-16 max-w-7xl mx-auto">
                <div className="flex items-center">
                    {/* Logo untuk Light Mode */}
                    <img
                        src="/img/logo2.png"
                        alt="Logo Light"
                        className="h-10 w-auto dark:hidden"
                    />

                    {/* Logo untuk Dark Mode */}
                    <img
                        src="/img/logo.png"
                        alt="Logo Dark"
                        className="hidden h-10 w-auto dark:block"
                    />
                </div>
                <div className="hidden md:flex items-center gap-8 text-sm font-medium">
                    {navLinks.map((link) => (
                        <a
                            key={link.id}
                            href={link.href}
                            className={getLinkClass(link.id)}
                        >
                            {link.name}
                            {activeSection === link.id && activeUnderline}
                        </a>
                    ))}

                    <a
                        href="https://www.tiktok.com/@kurniaa.jsx"
                        className="px-6 py-2.5 rounded-full font-bold transition-all transform hover:scale-105 bg-gradient-to-r from-[#2563EB] to-[#3B82F6] hover:from-[#1D4ED8] hover:to-[#1D4ED8] text-white shadow-[0_4px_14px_rgba(37,99,235,0.3)] dark:from-[#3B82F6] dark:to-[#38BDF8] dark:hover:from-[#60A5FA] dark:hover:to-[#60A5FA] dark:text-white dark:shadow-[0_4px_14px_rgba(56,189,248,0.25)]"
                    >
                        Hubungi Saya
                    </a>
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors flex items-center justify-center w-10 h-10 shadow"
                        title="Toggle Theme"
                    >
                        {isDarkMode ? (
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                                />
                            </svg>
                        ) : (
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                                />
                            </svg>
                        )}
                    </button>
                </div>
            </nav>
        </header>
    );
}
