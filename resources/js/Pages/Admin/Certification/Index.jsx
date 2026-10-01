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

export default function Index({ certifications }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [editingCert, setEditingCert] = useState(null);
    const [deletingCert, setDeletingCert] = useState(null);

    const { data, setData, post, delete: destroy, processing, errors, reset, clearErrors } = useForm({
        name: '',
        issuer: '',
        issue_date: '',
        expiration_date: '',
        credential_url: '',
        badge_image: null,
        _method: 'POST',
    });

    const openModal = (cert = null) => {
        clearErrors();
        if (cert) {
            setEditingCert(cert);
            setData({
                name: cert.name,
                issuer: cert.issuer,
                issue_date: cert.issue_date ? cert.issue_date.substring(0, 10) : '',
                expiration_date: cert.expiration_date ? cert.expiration_date.substring(0, 10) : '',
                credential_url: cert.credential_url || '',
                badge_image: null,
                _method: 'PUT',
            });
        } else {
            setEditingCert(null);
            reset();
            setData('_method', 'POST');
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setTimeout(() => {
            reset();
            setEditingCert(null);
        }, 200);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingCert) {
            setData('_method', 'PUT');
            post(route('admin.certifications.update', editingCert.id), {
                onSuccess: () => closeModal(),
                forceFormData: true,
            });
        } else {
            setData('_method', 'POST');
            post(route('admin.certifications.store'), {
                onSuccess: () => closeModal(),
                forceFormData: true,
            });
        }
    };

    const openDeleteModal = (cert) => {
        setDeletingCert(cert);
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setTimeout(() => setDeletingCert(null), 200);
    };

    const handleDelete = () => {
        destroy(route('admin.certifications.destroy', deletingCert.id), {
            onSuccess: () => closeDeleteModal(),
        });
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Sertifikasi Management</h2>}
        >
            <Head title="Sertifikasi" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    
                    <div className="mb-6 flex justify-end">
                        <PrimaryButton onClick={() => openModal()}>
                            Tambah Sertifikasi
                        </PrimaryButton>
                    </div>

                    <Table>
                        <Table.Header>
                            <Table.HeaderCell>Badge</Table.HeaderCell>
                            <Table.HeaderCell>Sertifikasi</Table.HeaderCell>
                            <Table.HeaderCell>Penerbit</Table.HeaderCell>
                            <Table.HeaderCell>Tanggal</Table.HeaderCell>
                            <Table.HeaderCell>Aksi</Table.HeaderCell>
                        </Table.Header>
                        <Table.Body>
                            {certifications.map((cert) => (
                                <Table.Row key={cert.id}>
                                    <Table.Cell>
                                        {cert.badge_image_path ? (
                                            <img src={`/storage/${cert.badge_image_path}`} alt="Badge" className="w-12 h-12 rounded object-cover" />
                                        ) : (
                                            <div className="w-12 h-12 rounded bg-gray-100 flex items-center justify-center text-gray-400 text-xs">No Img</div>
                                        )}
                                    </Table.Cell>
                                    <Table.Cell>
                                        <div className="font-bold text-gray-900">{cert.name}</div>
                                        {cert.credential_url && (
                                            <a href={cert.credential_url} target="_blank" rel="noreferrer" className="text-xs text-indigo-600 hover:underline">
                                                Lihat Kredensial
                                            </a>
                                        )}
                                    </Table.Cell>
                                    <Table.Cell>
                                        <div className="text-sm text-gray-900">{cert.issuer}</div>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <div className="text-sm text-gray-900">
                                            Terbit: {new Date(cert.issue_date).toLocaleDateString()}
                                            {cert.expiration_date && (
                                                <div className="text-xs text-gray-500">Exp: {new Date(cert.expiration_date).toLocaleDateString()}</div>
                                            )}
                                        </div>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <button onClick={() => openModal(cert)} className="text-blue-600 hover:text-blue-900 mr-4 font-medium">Edit</button>
                                        <button onClick={() => openDeleteModal(cert)} className="text-red-600 hover:text-red-900 font-medium">Hapus</button>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                            {certifications.length === 0 && (
                                <Table.Row>
                                    <Table.Cell className="text-center text-gray-500 py-8" colSpan="5">
                                        Belum ada sertifikasi.
                                    </Table.Cell>
                                </Table.Row>
                            )}
                        </Table.Body>
                    </Table>

                </div>
            </div>

            {/* Modal Tambah/Edit */}
            <Modal show={isModalOpen} onClose={closeModal}>
                <form onSubmit={handleSubmit} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-6">
                        {editingCert ? 'Edit Sertifikasi' : 'Tambah Sertifikasi'}
                    </h2>

                    <div className="space-y-4">
                        <div>
                            <InputLabel htmlFor="name" value="Nama Sertifikasi" />
                            <TextInput
                                id="name"
                                className="mt-1 block w-full"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                            />
                            <InputError className="mt-2" message={errors.name} />
                        </div>

                        <div>
                            <InputLabel htmlFor="issuer" value="Penerbit (Issuer)" />
                            <TextInput
                                id="issuer"
                                className="mt-1 block w-full"
                                value={data.issuer}
                                onChange={(e) => setData('issuer', e.target.value)}
                                required
                            />
                            <InputError className="mt-2" message={errors.issuer} />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <InputLabel htmlFor="issue_date" value="Tanggal Terbit" />
                                <TextInput
                                    id="issue_date"
                                    type="date"
                                    className="mt-1 block w-full"
                                    value={data.issue_date}
                                    onChange={(e) => setData('issue_date', e.target.value)}
                                    required
                                />
                                <InputError className="mt-2" message={errors.issue_date} />
                            </div>

                            <div>
                                <InputLabel htmlFor="expiration_date" value="Tanggal Kedaluwarsa (Opsional)" />
                                <TextInput
                                    id="expiration_date"
                                    type="date"
                                    className="mt-1 block w-full"
                                    value={data.expiration_date}
                                    onChange={(e) => setData('expiration_date', e.target.value)}
                                />
                                <InputError className="mt-2" message={errors.expiration_date} />
                            </div>
                        </div>

                        <div>
                            <InputLabel htmlFor="credential_url" value="URL Kredensial (Opsional)" />
                            <TextInput
                                id="credential_url"
                                className="mt-1 block w-full"
                                value={data.credential_url}
                                onChange={(e) => setData('credential_url', e.target.value)}
                            />
                            <InputError className="mt-2" message={errors.credential_url} />
                        </div>

                        <div>
                            <InputLabel htmlFor="badge_image" value="Gambar/Badge Sertifikat (Opsional)" />
                            <input
                                id="badge_image"
                                type="file"
                                accept="image/*"
                                className="mt-1 block w-full border border-gray-300 rounded p-2 text-sm"
                                onChange={(e) => setData('badge_image', e.target.files[0])}
                            />
                            <InputError className="mt-2" message={errors.badge_image} />
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end gap-3">
                        <SecondaryButton onClick={closeModal}>Batal</SecondaryButton>
                        <PrimaryButton disabled={processing}>
                            {editingCert ? 'Simpan Perubahan' : 'Tambah'}
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>

            {/* Modal Hapus */}
            <Modal show={isDeleteModalOpen} onClose={closeDeleteModal} maxWidth="sm">
                <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">Konfirmasi Hapus</h2>
                    <p className="text-sm text-gray-600 mb-6">Apakah Anda yakin ingin menghapus data ini?</p>
                    <div className="flex justify-end gap-3">
                        <SecondaryButton onClick={closeDeleteModal}>Batal</SecondaryButton>
                        <DangerButton onClick={handleDelete} disabled={processing}>Hapus</DangerButton>
                    </div>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
