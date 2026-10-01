import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import Badge from '@/Components/Admin/Badge';
import ConfirmDeleteModal from '@/Components/Admin/ConfirmDeleteModal';
import EmptyRow from '@/Components/Admin/EmptyRow';
import FormField from '@/Components/Admin/FormField';
import PageContainer from '@/Components/Admin/PageContainer';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import Table from '@/Components/Table';
import useCrudModal from '@/Hooks/useCrudModal';

export default function Index({ quotes }) {
    const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm({
        content: '',
        is_active: true,
    });

    const prepare = (quote = null) => {
        clearErrors();
        if (quote) {
            setData({
                content: quote.content,
                is_active: quote.is_active,
            });
        } else {
            reset();
        }
    };

    const crud = useCrudModal({ prepare, reset });

    const submit = (e) => {
        e.preventDefault();
        if (crud.editing) {
            put(route('admin.quotes.update', crud.editing.id), {
                onSuccess: () => crud.closeForm(),
            });
        } else {
            post(route('admin.quotes.store'), {
                onSuccess: () => crud.closeForm(),
            });
        }
    };

    return (
        <AuthenticatedLayout title="Quotes Management">
            <Head title="Quotes" />

            <PageContainer
                actions={
                    <PrimaryButton onClick={() => crud.openForm()}>
                        Tambah Quote Baru
                    </PrimaryButton>
                }
            >
                <Table>
                    <Table.Header>
                        <Table.HeaderCell>Kutipan (Quote)</Table.HeaderCell>
                        <Table.HeaderCell>Status</Table.HeaderCell>
                        <Table.HeaderCell>Aksi</Table.HeaderCell>
                    </Table.Header>
                    <Table.Body>
                        {quotes.map((quote) => (
                            <Table.Row key={quote.id}>
                                <Table.Cell>
                                    <div className="text-sm text-gray-900 italic">"{quote.content}"</div>
                                </Table.Cell>
                                <Table.Cell>
                                    <Badge tone={quote.is_active ? 'green' : 'red'}>
                                        {quote.is_active ? 'Aktif' : 'Tidak Aktif'}
                                    </Badge>
                                </Table.Cell>
                                <Table.Cell>
                                    <button onClick={() => crud.openForm(quote)} className="text-blue-600 hover:text-blue-900 mr-4 font-medium">Edit</button>
                                    <button onClick={() => crud.openDelete(quote)} className="text-red-600 hover:text-red-900 font-medium">Hapus</button>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                        {quotes.length === 0 && <EmptyRow colSpan={3} message="Belum ada quote." />}
                    </Table.Body>
                </Table>
            </PageContainer>

            <Modal show={crud.isFormOpen} onClose={crud.closeForm}>
                <form onSubmit={submit} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-6">
                        {crud.editing ? 'Edit Quote' : 'Tambah Quote'}
                    </h2>

                    <div className="space-y-4">
                        <FormField label="Isi Quote" htmlFor="content" error={errors.content}>
                            <textarea
                                id="content"
                                className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                rows="4"
                                value={data.content}
                                onChange={(e) => setData('content', e.target.value)}
                            />
                        </FormField>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="is_active"
                                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                checked={data.is_active}
                                onChange={(e) => setData('is_active', e.target.checked)}
                            />
                            <label htmlFor="is_active" className="ml-2 block text-sm text-gray-900">
                                Tampilkan di Portofolio
                            </label>
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end gap-3">
                        <SecondaryButton onClick={crud.closeForm}>Batal</SecondaryButton>
                        <PrimaryButton disabled={processing}>{crud.editing ? 'Simpan' : 'Tambah'}</PrimaryButton>
                    </div>
                </form>
            </Modal>

            {/* Modal Hapus */}
            <ConfirmDeleteModal
                show={crud.isDeleteOpen}
                onCancel={crud.closeDelete}
                onConfirm={() => crud.confirmDelete(route('admin.quotes.destroy', crud.deleting.id))}
                processing={processing}
                message="Apakah Anda yakin ingin menghapus quote ini?"
            />
        </AuthenticatedLayout>
    );
}
