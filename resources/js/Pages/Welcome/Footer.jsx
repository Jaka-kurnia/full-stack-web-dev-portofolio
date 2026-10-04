export default function Footer({ hero }) {
    return (
        <footer
            id="contact"
            className="text-center py-10 mt-12 border-t border-gray-200 dark:border-gray-800/80 bg-white dark:bg-[#080B14] scroll-mt-28"
            data-aos="fade-up"
        >
            <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
                <img
                    src="/img/logo2.png"
                    alt="Logo Light"
                    className="h-10 w-auto dark:hidden"
                />

                {/* Logo untuk Dark Mode (Sembunyi di Light Mode) */}
                <img
                    src="/img/logo.png"
                    alt="Logo Dark"
                    className="hidden h-10 w-auto dark:block"
                />
                <div className="flex gap-4 mb-8">
                    {hero?.social_links?.linkedin && (
                        <a
                            href={hero.social_links.linkedin}
                            target="_blank"
                            className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-white hover:bg-gray-300 dark:hover:bg-indigo-600 transition-all"
                        >
                            <i className="devicon-linkedin-plain"></i>
                        </a>
                    )}
                    {hero?.social_links?.email && (
                        <a
                            href={`mailto:${hero.social_links.email}`}
                            className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-white hover:bg-gray-300 dark:hover:bg-indigo-600 transition-all"
                        >
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
                                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                />
                            </svg>
                        </a>
                    )}
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-600">
                    &copy; {new Date().getFullYear()}{" "}
                    {hero?.full_name || "Portfolio"}. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
