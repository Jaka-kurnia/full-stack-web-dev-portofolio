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

export default function Index({ experiences }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [editingExp, setEditingExp] = useState(null);
    const [deletingExp, setDeletingExp] = useState(null);

    const { data, setData, post, delete: destroy, processing, errors, reset, clearErrors } = useForm({
        company_name: '',
        job_title: '',
        type: 'Full-time',
        start_date: '',
        end_date: '',
        description: '',
        image: null,
        is_active: true,
        _method: 'post',
    });

    const openModal = (exp = null) => {
        clearErrors();
        if (exp) {
            setEditingExp(exp);
            setData({
                company_name: exp.company_name,
                job_title: exp.job_title,
                type: exp.type,
                start_date: exp.start_date ? exp.start_date.substring(0, 10) : '',
                end_date: exp.end_date ? exp.end_date.substring(0, 10) : '',
                description: exp.description || '',
                image: null,
                is_active: exp.is_active,
                _method: 'put',
            });
        } else {
            setEditingExp(null);
            reset();
            setData('_method', 'post');
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setTimeout(() => {
            reset();
            setEditingExp(null);
        }, 200);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingExp) {
            post(route('admin.experiences.update', editingExp.id), {
                onSuccess: () => closeModal(),
                forceFormData: true,
            });
        } else {
            post(route('admin.experiences.store'), {
                onSuccess: () => closeModal(),
                forceFormData: true,
            });
        }
    };

    const openDeleteModal = (exp) => {
        setDeletingExp(exp);
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setTimeout(() => setDeletingExp(null), 200);
    };

    const handleDelete = () => {
        destroy(route('admin.experiences.destroy', deletingExp.id), {
            onSuccess: () => closeDeleteModal(),
        });
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Latar Pendidikan / Experience</h2>}
        >
            <Head title="Latar Pendidikan" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    
                    <div className="mb-6 flex justify-end">
                        <PrimaryButton onClick={() => openModal()}>
                            Tambah Latar Pendidikan
                        </PrimaryButton>
                    </div>

                    <Table>
                        <Table.Header>
                            <Table.HeaderCell>Logo</Table.HeaderCell>
                            <Table.HeaderCell>Institusi/Perusahaan</Table.HeaderCell>
                            <Table.HeaderCell>Detail</Table.HeaderCell>
                            <Table.HeaderCell>Durasi</Table.HeaderCell>
                            <Table.HeaderCell>Aksi</Table.HeaderCell>
                        </Table.Header>
                        <Table.Body>
                            {experiences.map((exp) => (
                                <Table.Row key={exp.id}>
                                    <Table.Cell>
                                        {exp.image_path ? (
                                            <img src={`/storage/${exp.image_path}`} alt="Logo" className="w-12 h-12 rounded object-cover border border-gray-200" />
                                        ) : (
                                            <div className="w-12 h-12 rounded bg-gray-100 flex items-center justify-center text-gray-400 border border-gray-200 text-xs">No Img</div>
                                        )}
                                    </Table.Cell>
                                    <Table.Cell>
                                        <div className="font-bold text-gray-900">{exp.company_name}</div>
                                        <div className="text-sm text-gray-500">{exp.job_title}</div>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                            {exp.type}
                                        </span>
                                        <div className="text-xs text-gray-400 mt-1">
                                            {exp.is_active ? 'Aktif' : 'Tidak Aktif'}
                                        </div>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <div className="text-sm text-gray-900">
                                            {new Date(exp.start_date).toLocaleDateString('id-ID', { year: 'numeric', month: 'short' })} - 
                                            {exp.end_date ? new Date(exp.end_date).toLocaleDateString('id-ID', { year: 'numeric', month: 'short' }) : ' Sekarang'}
                                        </div>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <button onClick={() => openModal(exp)} className="text-blue-600 hover:text-blue-900 mr-4 font-medium">Edit</button>
                                        <button onClick={() => openDeleteModal(exp)} className="text-red-600 hover:text-red-900 font-medium">Hapus</button>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                            {experiences.length === 0 && (
                                <Table.Row>
                                    <Table.Cell className="text-center text-gray-500 py-8" colSpan="5">
                                        Belum ada data latar pendidikan.
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
                        {editingExp ? 'Edit Latar Pendidikan' : 'Tambah Latar Pendidikan Baru'}
                    </h2>

                    <div className="space-y-4">
                        <div>
                            <InputLabel htmlFor="company_name" value="Nama Sekolah / Perusahaan" />
                            <TextInput
                                id="company_name"
                                className="mt-1 block w-full"
                                value={data.company_name}
                                onChange={(e) => setData('company_name', e.target.value)}
                                required
                            />
                            <InputError className="mt-2" message={errors.company_name} />
                        </div>

                        <div>
                            <InputLabel htmlFor="job_title" value="Jurusan / Jabatan" />
                            <TextInput
                                id="job_title"
                                className="mt-1 block w-full"
                                value={data.job_title}
                                onChange={(e) => setData('job_title', e.target.value)}
                                required
                            />
                            <InputError className="mt-2" message={errors.job_title} />
                        </div>

                        <div>
                            <InputLabel htmlFor="type" value="Tipe" />
                            <select
                                id="type"
                                className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                value={data.type}
                                onChange={(e) => setData('type', e.target.value)}
                            >
                                <option value="Full-time">Full-time (Sekolah/Reguler)</option>
                                <option value="Freelance">Freelance / Organisasi</option>
                            </select>
                            <InputError className="mt-2" message={errors.type} />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <InputLabel htmlFor="start_date" value="Tanggal Mulai" />
                                <TextInput
                                    id="start_date"
                                    type="date"
                                    className="mt-1 block w-full"
                                    value={data.start_date}
                                    onChange={(e) => setData('start_date', e.target.value)}
                                    required
                                />
                                <InputError className="mt-2" message={errors.start_date} />
                            </div>

                            <div>
                                <InputLabel htmlFor="end_date" value="Tanggal Selesai (Kosongkan jika masih)" />
                                <TextInput
                                    id="end_date"
                                    type="date"
                                    className="mt-1 block w-full"
                                    value={data.end_date}
                                    onChange={(e) => setData('end_date', e.target.value)}
                                />
                                <InputError className="mt-2" message={errors.end_date} />
                            </div>
                        </div>

                        <div>
                            <InputLabel htmlFor="description" value="Deskripsi (Opsional)" />
                            <textarea
                                id="description"
                                className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                rows="3"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                            />
                            <InputError className="mt-2" message={errors.description} />
                        </div>

                        <div>
                            <InputLabel htmlFor="image" value="Logo Sekolah / Perusahaan (Gambar)" />
                            <input
                                id="image"
                                type="file"
                                accept="image/*"
                                className="mt-1 block w-full border border-gray-300 rounded p-2 text-sm"
                                onChange={(e) => setData('image', e.target.files[0])}
                            />
                            <InputError className="mt-2" message={errors.image} />
                            {editingExp && editingExp.image_path && (
                                <div className="mt-2">
                                    <p className="text-xs text-gray-500 mb-1">Logo saat ini:</p>
                                    <img src={`/storage/${editingExp.image_path}`} alt="Current Logo" className="h-16 rounded border" />
                                </div>
                            )}
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
                        <PrimaryButton disabled={processing}>
                            {editingExp ? 'Simpan Perubahan' : 'Tambah'}
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>

            {/* Modal Hapus */}
            <Modal show={isDeleteModalOpen} onClose={closeDeleteModal} maxWidth="sm">
                <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">
                        Konfirmasi Hapus
                    </h2>
                    <p className="text-sm text-gray-600 mb-6">
                        Apakah Anda yakin ingin menghapus latar pendidikan ini? Tindakan ini tidak dapat dibatalkan.
                    </p>
                    <div className="flex justify-end gap-3">
                        <SecondaryButton onClick={closeDeleteModal}>Batal</SecondaryButton>
                        <DangerButton onClick={handleDelete} disabled={processing}>
                            Hapus
                        </DangerButton>
                    </div>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
