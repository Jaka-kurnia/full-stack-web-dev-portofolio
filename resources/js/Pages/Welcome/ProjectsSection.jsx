import SectionHeading from './SectionHeading';

export default function ProjectsSection({ projects, onSelect }) {
    return (
        <section id="projects" className="pt-10">
            <SectionHeading
                eyebrow="PROJECT YANG TELAH DIKERJAKAN"
                meta={<>CASE STUDIES / {new Date().getFullYear()}-{new Date().getFullYear()+1}</>}
                dividerClassName="mt-10"
            >
                Featured <span className="text-indigo-500">Projects.</span>
            </SectionHeading>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects && projects.length > 0 ? projects.map((project, index) => (
                    <div
                        key={project.id}
                        data-aos="fade-up"
                        data-aos-delay={index * 100}
                        onClick={() => onSelect(project)}
                        className="bg-white dark:bg-[#131726] border border-gray-200 dark:border-gray-800 rounded-[1.5rem] overflow-hidden cursor-pointer group hover:border-indigo-500/40 hover:shadow-[0_0_30px_rgba(79,70,229,0.1)] transition-all duration-300 flex flex-col h-full"
                    >
                        <div className="h-60 overflow-hidden bg-gray-100 dark:bg-gray-900 relative">
                            {project.thumbnail_path ? (
                                <img src={`/storage/${project.thumbnail_path}`} alt={project.title} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-700 font-medium">No Thumbnail</div>
                            )}
                        </div>
                        <div className="p-8 flex flex-col flex-grow">
                            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white group-hover:text-indigo-400 transition-colors">{project.title}</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-2 mb-8 flex-grow">
                                {project.content || 'Aplikasi berbasis web untuk memudahkan proses bisnis.'}
                            </p>
                            <div className="flex flex-wrap gap-2 pt-5 border-t border-gray-200 dark:border-gray-800/80">
                                {project.skills && project.skills.map(skill => (
                                    <span key={skill.id} className="px-3 py-1.5 border border-gray-300 dark:border-gray-700/80 bg-gray-100 dark:bg-gray-800/30 rounded text-[10px] font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                                        {skill.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                )) : (
                    <div className="col-span-3 text-center py-24 text-gray-500 border border-dashed border-gray-300 dark:border-gray-800 rounded-[2rem]">
                        Belum ada proyek yang dipublikasikan.
                    </div>
                )}
            </div>
        </section>
    );
}
