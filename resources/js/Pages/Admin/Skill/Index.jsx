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

export default function Index({ skills }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [editingSkill, setEditingSkill] = useState(null);
    const [deletingSkill, setDeletingSkill] = useState(null);

    const { data, setData, post, delete: destroy, processing, errors, reset, clearErrors } = useForm({
        name: '',
        category: 'Frontend',
        icon_identifier: '',
        image: null,
        proficiency_level: 50,
        is_active: true,
        _method: 'POST',
    });

    const openModal = (skill = null) => {
        clearErrors();
        if (skill) {
            setEditingSkill(skill);
            setData({
                name: skill.name,
                category: skill.category,
                icon_identifier: skill.icon_identifier || '',
                image: null,
                proficiency_level: skill.proficiency_level,
                is_active: skill.is_active,
                _method: 'PUT',
            });
        } else {
            setEditingSkill(null);
            reset();
            setData('_method', 'POST');
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setTimeout(() => {
            reset();
            setEditingSkill(null);
        }, 200);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingSkill) {
            setData('_method', 'PUT');
            post(route('admin.skills.update', editingSkill.id), {
                onSuccess: () => closeModal(),
                forceFormData: true,
            });
        } else {
            setData('_method', 'POST');
            post(route('admin.skills.store'), {
                onSuccess: () => closeModal(),
                forceFormData: true,
            });
        }
    };

    const openDeleteModal = (skill) => {
        setDeletingSkill(skill);
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setTimeout(() => setDeletingSkill(null), 200);
    };

    const handleDelete = () => {
        destroy(route('admin.skills.destroy', deletingSkill.id), {
            onSuccess: () => closeDeleteModal(),
        });
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Skill & Software Management</h2>}
        >
            <Head title="Skill & Software" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    
                    <div className="mb-6 flex justify-end">
                        <PrimaryButton onClick={() => openModal()}>
                            Tambah Skill / Software
                        </PrimaryButton>
                    </div>

                    <Table>
                        <Table.Header>
                            <Table.HeaderCell>Ikon / Gambar</Table.HeaderCell>
                            <Table.HeaderCell>Nama Skill</Table.HeaderCell>
                            <Table.HeaderCell>Kategori</Table.HeaderCell>
                            <Table.HeaderCell>Level Penguasaan</Table.HeaderCell>
                            <Table.HeaderCell>Status</Table.HeaderCell>
                            <Table.HeaderCell>Aksi</Table.HeaderCell>
                        </Table.Header>
                        <Table.Body>
                            {skills.map((skill) => (
                                <Table.Row key={skill.id}>
                                    <Table.Cell>
                                        {skill.image_path ? (
                                            <img src={`/storage/${skill.image_path}`} alt="Icon" className="w-10 h-10 object-contain rounded" />
                                        ) : (
                                            <div className="text-2xl text-gray-700">
                                                <i className={skill.icon_identifier}></i>
                                            </div>
                                        )}
                                    </Table.Cell>
                                    <Table.Cell>
                                        <div className="font-bold text-gray-900">{skill.name}</div>
                                        {skill.icon_identifier && !skill.image_path && (
                                            <div className="text-xs text-gray-500">Icon: {skill.icon_identifier}</div>
                                        )}
                                    </Table.Cell>
                                    <Table.Cell>
                                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                            {skill.category}
                                        </span>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <div className="flex items-center">
                                            <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2 max-w-[100px]">
                                                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: skill.proficiency_level + '%' }}></div>
                                            </div>
                                            <span className="text-xs text-gray-500">{skill.proficiency_level}%</span>
                                        </div>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${skill.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                            {skill.is_active ? 'Aktif' : 'Tidak Aktif'}
                                        </span>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <button onClick={() => openModal(skill)} className="text-blue-600 hover:text-blue-900 mr-4 font-medium">Edit</button>
                                        <button onClick={() => openDeleteModal(skill)} className="text-red-600 hover:text-red-900 font-medium">Hapus</button>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                            {skills.length === 0 && (
                                <Table.Row>
                                    <Table.Cell className="text-center text-gray-500 py-8" colSpan="6">
                                        Belum ada skill yang ditambahkan.
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
                        {editingSkill ? 'Edit Skill / Software' : 'Tambah Skill / Software Baru'}
                    </h2>

                    <div className="space-y-4">
                        <div>
                            <InputLabel htmlFor="name" value="Nama Skill/Software" />
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
                            <InputLabel htmlFor="category" value="Kategori" />
                            <select
                                id="category"
                                className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                value={data.category}
                                onChange={(e) => setData('category', e.target.value)}
                            >
                                <option value="Frontend">Frontend</option>
                                <option value="Backend">Backend</option>
                                <option value="Database">Database</option>
                                <option value="Tools">Tools (Software)</option>
                                <option value="Soft Skill">Soft Skill</option>
                            </select>
                            <InputError className="mt-2" message={errors.category} />
                        </div>

                        <div>
                            <InputLabel htmlFor="proficiency_level" value="Tingkat Kemampuan (%)" />
                            <TextInput
                                id="proficiency_level"
                                type="number"
                                min="0"
                                max="100"
                                className="mt-1 block w-full"
                                value={data.proficiency_level}
                                onChange={(e) => setData('proficiency_level', e.target.value)}
                                required
                            />
                            <InputError className="mt-2" message={errors.proficiency_level} />
                        </div>

                        <div>
                            <InputLabel htmlFor="icon_identifier" value="ID Ikon (Misal: devicon-html5-plain)" />
                            <TextInput
                                id="icon_identifier"
                                className="mt-1 block w-full"
                                value={data.icon_identifier}
                                onChange={(e) => setData('icon_identifier', e.target.value)}
                            />
                            <p className="text-xs text-gray-500 mt-1">Gunakan ikon devicon, ATAU unggah gambar di bawah ini.</p>
                            <InputError className="mt-2" message={errors.icon_identifier} />
                        </div>

                        <div>
                            <InputLabel htmlFor="image" value="Gambar / Ikon Kustom (Abaikan jika menggunakan ID Ikon)" />
                            <input
                                id="image"
                                type="file"
                                accept="image/*"
                                className="mt-1 block w-full border border-gray-300 rounded p-2 text-sm"
                                onChange={(e) => setData('image', e.target.files[0])}
                            />
                            <InputError className="mt-2" message={errors.image} />
                            {editingSkill && editingSkill.image_path && (
                                <div className="mt-2">
                                    <p className="text-xs text-gray-500 mb-1">Gambar saat ini:</p>
                                    <img src={`/storage/${editingSkill.image_path}`} alt="Current" className="h-16 rounded border object-contain" />
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
                            {editingSkill ? 'Simpan Perubahan' : 'Tambah'}
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
                        Apakah Anda yakin ingin menghapus data ini? Tindakan ini tidak dapat dibatalkan.
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
