import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';

/**
 * Input file tunggal: label + input + error + pratinjau file yang sudah ada.
 *
 * Pratinjau opsional (`currentPath`) dipakai halaman yang hanya punya satu
 * gambar; halaman dengan galeri bisa mengabaikannya dan merender sendiri.
 */
export default function FileField({
    label,
    htmlFor,
    accept = 'image/*',
    multiple = false,
    error,
    hint,
    currentPath,
    previewLabel = 'Gambar saat ini:',
    onChange,
}) {
    return (
        <div>
            <InputLabel htmlFor={htmlFor} value={label} />
            <input
                id={htmlFor}
                type="file"
                accept={accept}
                multiple={multiple}
                className="mt-1 block w-full border border-gray-300 rounded p-2 text-sm"
                onChange={onChange}
            />
            {hint && <p className="text-xs text-gray-500 mt-1">{hint}</p>}
            <InputError className="mt-2" message={error} />
            {currentPath && (
                <div className="mt-2">
                    <p className="text-xs text-gray-500 mb-1">{previewLabel}</p>
                    <img
                        src={`/storage/${currentPath}`}
                        alt={previewLabel}
                        className="h-16 rounded border object-contain"
                    />
                </div>
            )}
        </div>
    );
}
