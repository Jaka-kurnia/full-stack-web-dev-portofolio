import DangerButton from '@/Components/DangerButton';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';

/**
 * Dialog konfirmasi hapus yang dipakai seluruh halaman admin.
 */
export default function ConfirmDeleteModal({
    show,
    onCancel,
    onConfirm,
    processing = false,
    title = 'Konfirmasi Hapus',
    message = 'Apakah Anda yakin ingin menghapus data ini? Tindakan ini tidak dapat dibatalkan.',
}) {
    return (
        <Modal show={show} onClose={onCancel} maxWidth="sm">
            <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">{title}</h2>
                <p className="text-sm text-gray-600 mb-6">{message}</p>
                <div className="flex justify-end gap-3">
                    <SecondaryButton onClick={onCancel}>Batal</SecondaryButton>
                    <DangerButton onClick={onConfirm} disabled={processing}>
                        Hapus
                    </DangerButton>
                </div>
            </div>
        </Modal>
    );
}
