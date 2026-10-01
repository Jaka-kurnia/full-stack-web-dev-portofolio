import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import FlashToast from '@/Components/FlashToast';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

/**
 * Satu daftar menu untuk sidebar desktop maupun menu mobile,
 * sehingga penambahan menu admin cukup dilakukan di satu tempat.
 */
const NAV_ITEMS = [
    { routeName: 'dashboard', label: 'Dashboard' },
    { routeName: 'admin.hero.edit', label: 'Pengaturan Profil' },
    { routeName: 'admin.skills.index', label: 'Skill & Software' },
    { routeName: 'admin.projects.index', label: 'Project', wildcard: true },
    { routeName: 'admin.experiences.index', label: 'Latar Pendidikan' },
    { routeName: 'admin.certifications.index', label: 'Sertifikasi' },
    { routeName: 'admin.quotes.index', label: 'Quotes' },
];

const isCurrent = ({ routeName, wildcard }) =>
    route().current(wildcard ? `${routeName}*` : routeName);

export default function AuthenticatedLayout({ title, header, children }) {
    const user = usePage().props.auth.user;
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    const resolvedHeader =
        header ??
        (title ? (
            <h2 className="font-semibold text-xl text-gray-800 leading-tight">{title}</h2>
        ) : null);

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar Desktop */}
            <aside className="hidden md:flex flex-col w-64 bg-blue-800 shadow-xl">
                <div className="flex items-center justify-center h-16 border-b border-blue-900 bg-blue-900/30">
                    <Link href="/" className="flex items-center gap-2">
                        <ApplicationLogo className="block h-9 w-auto fill-current text-white" />
                        <span className="font-bold text-lg text-white">Portfolio CMS</span>
                    </Link>
                </div>

                <div className="flex flex-col flex-1 py-4 overflow-y-auto">
                    <nav className="flex-1">
                        {NAV_ITEMS.map((item) => (
                            <Link
                                key={item.routeName}
                                href={route(item.routeName)}
                                className={`flex items-center px-6 py-3 mt-1 text-sm font-medium transition-colors border-l-4 ${
                                    isCurrent(item)
                                        ? 'bg-blue-900 border-yellow-400 text-yellow-400'
                                        : 'border-transparent text-blue-200 hover:bg-blue-700 hover:text-white'
                                }`}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex flex-col flex-1 w-full">
                {/* Topbar */}
                <header className="flex items-center justify-between h-16 px-6 bg-white border-b border-gray-200 md:justify-end">
                    {/* Mobile menu button & logo */}
                    <div className="flex items-center md:hidden">
                        <button
                            onClick={() => setShowingNavigationDropdown(!showingNavigationDropdown)}
                            className="p-2 text-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                        >
                            <span className="sr-only">Open sidebar</span>
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                        <Link href="/" className="ml-4">
                            <ApplicationLogo className="block h-8 w-auto fill-current text-indigo-600" />
                        </Link>
                    </div>

                    {/* User Dropdown */}
                    <div className="relative">
                        <Dropdown>
                            <Dropdown.Trigger>
                                <span className="inline-flex rounded-md">
                                    <button
                                        type="button"
                                        className="inline-flex items-center px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out bg-white border border-transparent rounded-md hover:text-gray-700 focus:outline-none"
                                    >
                                        {user.name}

                                        <svg
                                            className="ml-2 -mr-0.5 h-4 w-4"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </button>
                                </span>
                            </Dropdown.Trigger>

                            <Dropdown.Content>
                                <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                <Dropdown.Link href={route('logout')} method="post" as="button">
                                    Log Out
                                </Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                </header>

                {/* Mobile Navigation Menu */}
                {showingNavigationDropdown && (
                    <div className="md:hidden bg-white border-b border-gray-200">
                        <div className="pt-2 pb-3 space-y-1">
                            {NAV_ITEMS.map((item) => (
                                <ResponsiveNavLink
                                    key={item.routeName}
                                    href={route(item.routeName)}
                                    active={isCurrent(item)}
                                >
                                    {item.label}
                                </ResponsiveNavLink>
                            ))}
                        </div>
                        <div className="pt-4 pb-1 border-t border-gray-200">
                            <div className="px-4">
                                <div className="text-base font-medium text-gray-800">{user.name}</div>
                                <div className="text-sm font-medium text-gray-500">{user.email}</div>
                            </div>
                            <div className="mt-3 space-y-1">
                                <ResponsiveNavLink href={route('profile.edit')}>Profile</ResponsiveNavLink>
                                <ResponsiveNavLink method="post" href={route('logout')} as="button">Log Out</ResponsiveNavLink>
                            </div>
                        </div>
                    </div>
                )}

                {/* Page Content */}
                <div className="flex-1 overflow-y-auto">
                    <FlashToast />
                    {resolvedHeader && (
                        <header className="bg-white shadow">
                            <div className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
                                {resolvedHeader}
                            </div>
                        </header>
                    )}
                    <main className="p-4 md:p-6 lg:p-8">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
}
