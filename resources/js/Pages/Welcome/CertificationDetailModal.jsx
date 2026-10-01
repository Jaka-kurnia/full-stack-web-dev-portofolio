import DialogShell from './DialogShell';

export default function CertificationDetailModal({ certification, onClose }) {
    return (
        <DialogShell
            onClose={onClose}
            panelClassName="max-w-2xl p-8 sm:p-10 flex flex-col items-center text-center"
        >
            <div className="w-24 h-24 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-500 mb-6">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>

            <h2 className="text-3xl font-bold mb-4 text-white">{certification.name}</h2>
            <p className="text-indigo-400 text-lg mb-2 font-semibold">{certification.issuer}</p>
            <p className="text-gray-400 mb-6 border-b border-gray-800 pb-6 w-full">Diterbitkan: {new Date(certification.issue_date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </DialogShell>
    );
}
