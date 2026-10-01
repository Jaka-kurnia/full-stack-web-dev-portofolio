import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import DangerButton from '@/Components/DangerButton';
import Table from '@/Components/Table';
import { useState } from 'react';

export default function Index({ quotes }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [editingQuote, setEditingQuote] = useState(null);
    const [deletingQuote, setDeletingQuote] = useState(null);

    const { data, setData, post, put, delete: destroy, processing, errors, reset, clearErrors } = useForm({
        content: '',
        is_active: true,
    });

    const openModal = (quote = null) => {
        clearErrors();
        if (quote) {
            setEditingQuote(quote);
            setData({
                content: quote.content,
                is_active: quote.is_active,
            });
        } else {
            setEditingQuote(null);
            reset();
            setData('is_active', true);
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setTimeout(() => {
            reset();
            setEditingQuote(null);
        }, 200);
    };

    const submit = (e) => {
        e.preventDefault();
        if (editingQuote) {
            put(route('admin.quotes.update', editingQuote.id), {
                onSuccess: () => closeModal(),
            });
        } else {
            post(route('admin.quotes.store'), {
                onSuccess: () => closeModal(),
            });
        }
    };

    const openDeleteModal = (quote) => {
        setDeletingQuote(quote);
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setTimeout(() => setDeletingQuote(null), 200);
    };

    const handleDelete = () => {
        destroy(route('admin.quotes.destroy', deletingQuote.id), {
            onSuccess: () => closeDeleteModal(),
        });
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Quotes Management</h2>}
        >
            <Head title="Quotes" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    
                    <div className="mb-6 flex justify-end">
                        <PrimaryButton onClick={() => openModal()}>
                            Tambah Quote Baru
                        </PrimaryButton>
                    </div>

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
                                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${quote.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                            {quote.is_active ? 'Aktif' : 'Tidak Aktif'}
                                        </span>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <button onClick={() => openModal(quote)} className="text-blue-600 hover:text-blue-900 mr-4 font-medium">Edit</button>
                                        <button onClick={() => openDeleteModal(quote)} className="text-red-600 hover:text-red-900 font-medium">Hapus</button>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                            {quotes.length === 0 && (
                                <Table.Row>
                                    <Table.Cell className="text-center text-gray-500 py-8" colSpan="3">
                                        Belum ada quote.
                                    </Table.Cell>
                                </Table.Row>
                            )}
                        </Table.Body>
                    </Table>
                </div>
            </div>

            <Modal show={isModalOpen} onClose={closeModal}>
                <form onSubmit={submit} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-6">
                        {editingQuote ? 'Edit Quote' : 'Tambah Quote'}
                    </h2>
                    
                    <div className="space-y-4">
                        <div>
                            <InputLabel htmlFor="content" value="Isi Quote" />
                            <textarea
                                id="content"
                                className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                rows="4"
                                value={data.content}
                                onChange={(e) => setData('content', e.target.value)}
                            />
                            <InputError message={errors.content} className="mt-2" />
                        </div>
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
                        <SecondaryButton onClick={closeModal}>Batal</SecondaryButton>
                        <PrimaryButton disabled={processing}>{editingQuote ? 'Simpan' : 'Tambah'}</PrimaryButton>
                    </div>
                </form>
            </Modal>

            <Modal show={isDeleteModalOpen} onClose={closeDeleteModal} maxWidth="sm">
                <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">Konfirmasi Hapus</h2>
                    <p className="text-sm text-gray-600 mb-6">Apakah Anda yakin ingin menghapus quote ini?</p>
                    <div className="flex justify-end gap-3">
                        <SecondaryButton onClick={closeDeleteModal}>Batal</SecondaryButton>
                        <DangerButton onClick={handleDelete} disabled={processing}>Hapus</DangerButton>
                    </div>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
