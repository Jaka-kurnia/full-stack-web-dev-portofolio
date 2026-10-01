import { Link } from '@inertiajs/react';

export default function Pagination({ links }) {
    if (!links || links.length <= 3) return null;

    return (
        <div className="flex flex-wrap items-center justify-center gap-1 mt-6 mb-2">
            {links.map((link, index) => {
                if (link.url === null) {
                    return (
                        <div
                            key={index}
                            className="px-4 py-2 text-sm text-gray-500 border rounded bg-gray-50"
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    );
                }

                return (
                    <Link
                        key={index}
                        href={link.url}
                        className={`px-4 py-2 text-sm border rounded hover:bg-indigo-50 focus:border-indigo-500 focus:text-indigo-500 ${
                            link.active ? 'bg-indigo-600 text-white border-indigo-600 hover:bg-indigo-700' : 'bg-white text-gray-700 hover:text-indigo-600'
                        }`}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                        preserveState
                        preserveScroll
                    />
                );
            })}
        </div>
    );
}
