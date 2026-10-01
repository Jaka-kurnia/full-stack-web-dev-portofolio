/**
 * Wadah standar halaman admin: padding + lebar maksimal + aksi kanan atas.
 *
 * @param {object} props
 * @param {import('react').ReactNode} [props.actions] tombol yang diletakkan di kanan atas
 * @param {import('react').ReactNode} props.children
 */
export default function PageContainer({ actions = null, children }) {
    return (
        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                {actions && <div className="mb-6 flex justify-end">{actions}</div>}
                {children}
            </div>
        </div>
    );
}
