import { getIconClass } from './constants/icons';

export default function SkillsGrid({ items, emptyMessage }) {
    const skills = items || [];

    return (
        <div className="flex flex-wrap gap-8 items-center">
            {skills.map((skill, index) => (
                <div key={skill.id} className="flex flex-col items-center gap-2 group cursor-help" style={{ animationDelay: `${index * 50}ms` }}>
                    <div className="animate-float" style={{ animationDelay: `${(index % 3) * 0.5}s` }}>
                        <i className={`${getIconClass(skill.name)} text-5xl md:text-6xl group-hover:scale-110 transition-all duration-300 group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]`}></i>
                    </div>
                    <span className="text-xs font-semibold text-gray-700 dark:text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity absolute mt-20 bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-transparent px-2 py-1 rounded shadow-lg z-10">{skill.name}</span>
                </div>
            ))}
            {skills.length === 0 && <p className="text-gray-500 dark:text-gray-600 text-sm italic">{emptyMessage}</p>}
        </div>
    );
}
