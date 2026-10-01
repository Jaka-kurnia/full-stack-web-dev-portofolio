import { useCallback, useState } from 'react';
import { router } from '@inertiajs/react';

/**
 * State bersama untuk halaman CRUD berbasis modal.
 *
 * Menangani dua siklus yang selama ini di-copy-paste ke 5 halaman admin:
 * modal tambah/edit dan modal konfirmasi hapus.
 *
 * @param {object} [options]
 * @param {(item: object | null) => void} [options.prepare]  dijalankan saat form dibuka (isi/reset data)
 * @param {() => void} [options.reset]                       dijalankan 200ms setelah form ditutup
 * @param {() => void} [options.afterDelete]                 dijalankan setelah hapus berhasil
 */
export default function useCrudModal({ prepare, reset, afterDelete } = {}) {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editing, setEditing] = useState(null);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [deleting, setDeleting] = useState(null);

    const openForm = useCallback(
        (item = null) => {
            setEditing(item);
            prepare?.(item);
            setIsFormOpen(true);
        },
        [prepare],
    );

    const closeForm = useCallback(() => {
        setIsFormOpen(false);
        setTimeout(() => {
            setEditing(null);
            reset?.();
        }, 200);
    }, [reset]);

    const openDelete = useCallback((item) => {
        setDeleting(item);
        setIsDeleteOpen(true);
    }, []);

    const closeDelete = useCallback(() => {
        setIsDeleteOpen(false);
        setTimeout(() => setDeleting(null), 200);
    }, []);

    const confirmDelete = useCallback(
        (url) => {
            router.delete(url, {
                onSuccess: () => {
                    closeDelete();
                    afterDelete?.();
                },
            });
        },
        [afterDelete, closeDelete],
    );

    return {
        isFormOpen,
        editing,
        openForm,
        closeForm,
        isDeleteOpen,
        deleting,
        openDelete,
        closeDelete,
        confirmDelete,
    };
}
