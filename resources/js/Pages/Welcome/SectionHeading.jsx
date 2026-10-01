export default function SectionHeading({ eyebrow, children, meta, headingClassName = '', dividerClassName = '' }) {
    const headingClasses = ['text-5xl md:text-[4rem] font-bold tracking-tight', headingClassName].filter(Boolean).join(' ');
    const dividerClasses = ['w-full h-[1px] bg-gray-800/80', dividerClassName].filter(Boolean).join(' ');

    return (
        <div className="mb-14">
            <p className="text-xs font-semibold text-indigo-500 uppercase tracking-[0.2em] mb-4 flex items-center gap-4">
                <span className="w-10 h-[1px] bg-gray-700"></span> {eyebrow}
            </p>
            {meta ? (
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <h2 className={headingClasses}>{children}</h2>
                    <p className="text-gray-400 text-xs font-bold tracking-[0.2em] uppercase pb-2">
                        {meta}
                    </p>
                </div>
            ) : (
                <h2 className={headingClasses}>{children}</h2>
            )}
            <div className={dividerClasses}></div>
        </div>
    );
}
