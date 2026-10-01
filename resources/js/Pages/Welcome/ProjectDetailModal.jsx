import DialogShell from './DialogShell';

export default function ProjectDetailModal({ project, onClose }) {
    return (
        <DialogShell
            onClose={onClose}
            panelClassName="max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col"
            closeClassName="backdrop-blur"
        >
            <div className="w-full h-72 sm:h-96 bg-gray-900 relative">
                {project.thumbnail_path ? (
                    <img src={`/storage/${project.thumbnail_path}`} alt={project.title} className="w-full h-full object-cover object-top" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-700">No Image</div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#131726] via-transparent to-transparent"></div>
            </div>

            <div className="p-8 sm:p-12 -mt-20 relative z-10">
                <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-white drop-shadow-md">{project.title}</h2>
                <div className="flex flex-wrap gap-2 mb-10">
                    {project.skills && project.skills.map(skill => (
                        <span key={skill.id} className="px-4 py-1.5 bg-indigo-500/10 border border-indigo-500/30 rounded-md text-xs font-bold text-indigo-400 uppercase tracking-wider">
                            {skill.name}
                        </span>
                    ))}
                </div>
                <div className="prose prose-invert prose-lg prose-indigo max-w-none mb-12">
                    {project.content ? (
                        <div className="text-gray-300 whitespace-pre-wrap leading-relaxed text-justify">{project.content}</div>
                    ) : (
                        <p className="text-gray-500 text-justify">Tidak ada deskripsi detail untuk proyek ini.</p>
                    )}
                </div>
                {project.galleries && project.galleries.length > 0 && (
                    <div className="mb-12">
                        <h4 className="text-xl font-bold mb-6 text-white border-b border-gray-800 pb-2 inline-block">Galeri Proyek</h4>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                            {project.galleries.map(gallery => (
                                <a href={`/storage/${gallery.image_path}`} target="_blank" rel="noreferrer" key={gallery.id} className="rounded-xl overflow-hidden border border-gray-800 hover:border-indigo-500 transition-colors block">
                                    <img src={`/storage/${gallery.image_path}`} className="w-full h-40 object-cover hover:scale-105 transition-transform duration-500" alt="Gallery item" />
                                </a>
                            ))}
                        </div>
                    </div>
                )}
                <div className="flex flex-wrap gap-4 pt-8 border-t border-gray-800/80">
                    {project.demo_url && (
                        <a href={project.demo_url} target="_blank" className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-full transition-all flex items-center gap-2 transform hover:-translate-y-1">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                            Kunjungi Website
                        </a>
                    )}
                    {project.github_url && (
                        <a href={project.github_url} target="_blank" className="px-8 py-3 bg-gray-800 hover:bg-gray-700 text-white font-bold rounded-full transition-all flex items-center gap-2 border border-gray-700 transform hover:-translate-y-1">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                            Lihat Kode (GitHub)
                        </a>
                    )}
                </div>
            </div>
        </DialogShell>
    );
}
