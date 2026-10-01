import { usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

const DISPLAY_MS = 4000;

/**
 * Notifikasi sukses hasil aksi admin (data tersimpan/dihapus).
 *
 * Sumbernya adalah `->with('success', ...)` di controller, yang dibagikan
 * ke seluruh halaman lewat HandleInertiaRequests::share().
 */
export default function FlashToast() {
    const message = usePage().props.flash?.success;
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (!message) {
            return;
        }

        setVisible(true);
        const timer = setTimeout(() => setVisible(false), DISPLAY_MS);

        return () => clearTimeout(timer);
    }, [message]);

    if (!message || !visible) {
        return null;
    }

    return (
        <div
            role="status"
            className="fixed top-4 right-4 z-[60] max-w-sm rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-800 shadow-lg"
        >
            {message}
        </div>
    );
}
