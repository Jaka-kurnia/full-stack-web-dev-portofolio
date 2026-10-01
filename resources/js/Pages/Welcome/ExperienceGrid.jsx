export default function ExperienceGrid({ items, emptyMessage }) {
    const experiences = items || [];

    return (
        <div className="flex flex-wrap gap-8 items-center">
            {experiences.length > 0 ? experiences.map((exp, index) => (
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
                <p className="text-gray-600 text-sm italic">{emptyMessage}</p>
            )}
        </div>
    );
}
