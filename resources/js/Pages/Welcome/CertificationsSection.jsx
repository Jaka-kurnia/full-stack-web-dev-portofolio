import SectionHeading from './SectionHeading';

export default function CertificationsSection({ certifications, onSelect }) {
    return (
        <section id="certifications" className="pt-24" data-aos="fade-up" data-aos-delay="300">
            <SectionHeading eyebrow="SERTIFIKASI & PENGHARGAAN" headingClassName="mb-10">
                My <span className="text-indigo-500">Certifications.</span>
            </SectionHeading>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {certifications && certifications.length > 0 ? certifications.map((cert, index) => (
                    <div
                        key={cert.id}
                        data-aos="fade-up"
                        data-aos-delay={index * 100}
                        onClick={() => onSelect(cert)}
                        className="bg-white dark:bg-[#131726] border border-gray-200 dark:border-gray-800 p-6 rounded-2xl cursor-pointer hover:border-indigo-500/50 hover:shadow-[0_0_20px_rgba(79,70,229,0.15)] transition-all flex flex-col items-center text-center group"
                    >
                        <div className="w-16 h-16 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-500 mb-4 group-hover:scale-110 transition-transform">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </div>
                        <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2">{cert.name}</h3>
                        <p className="text-indigo-400 text-sm mb-1">{cert.issuer}</p>
                        <p className="text-gray-500 text-xs">{new Date(cert.issue_date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long' })}</p>
                    </div>
                )) : (
                    <div className="col-span-4 text-center py-16 text-gray-500 border border-dashed border-gray-300 dark:border-gray-800 rounded-2xl">
                        Belum ada sertifikasi yang ditambahkan.
                    </div>
                )}
            </div>
        </section>
    );
}
