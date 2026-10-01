const TONES = {
    blue: 'bg-blue-100 text-blue-800',
    green: 'bg-green-100 text-green-800',
    red: 'bg-red-100 text-red-800',
    amber: 'bg-amber-100 text-amber-800',
    gray: 'bg-gray-100 text-gray-800',
};

/**
 * Badge status seragam (aktif/tidak aktif, draft/published, kategori, dsb).
 */
export default function Badge({ tone = 'blue', className = '', children }) {
    return (
        <span
            className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${TONES[tone]} ${className}`}
        >
            {children}
        </span>
    );
}
