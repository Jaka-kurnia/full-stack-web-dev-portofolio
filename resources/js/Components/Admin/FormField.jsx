import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';

/**
 * Pasangan label + kontrol + pesan error.
 *
 * `children` adalah elemen input-nya sendiri (TextInput, select, textarea, dsb).
 */
export default function FormField({ label, htmlFor, error, hint, children }) {
    return (
        <div>
            <InputLabel htmlFor={htmlFor} value={label} />
            {children}
            {hint && <p className="text-xs text-gray-500 mt-1">{hint}</p>}
            <InputError className="mt-2" message={error} />
        </div>
    );
}
