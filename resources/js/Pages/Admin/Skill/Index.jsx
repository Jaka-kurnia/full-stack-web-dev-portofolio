import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import Badge from '@/Components/Admin/Badge';
import ConfirmDeleteModal from '@/Components/Admin/ConfirmDeleteModal';
import Pagination from '@/Components/Admin/Pagination';
import EmptyRow from '@/Components/Admin/EmptyRow';
import FileField from '@/Components/Admin/FileField';
import FormField from '@/Components/Admin/FormField';
import PageContainer from '@/Components/Admin/PageContainer';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import Table from '@/Components/Table';
import TextInput from '@/Components/TextInput';
import useCrudModal from '@/Hooks/useCrudModal';

export default function Index({ skills, categories }) {
    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        name: '',
        category: 'Frontend',
        icon_identifier: '',
        image: null,
        proficiency_level: 50,
        is_active: true,
        _method: 'POST',
    });

    const prepare = (skill = null) => {
        clearErrors();
        if (skill) {
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
            reset();
            setData('_method', 'POST');
        }
    };

    const crud = useCrudModal({ prepare, reset });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (crud.editing) {
            setData('_method', 'PUT');
            post(route('admin.skills.update', crud.editing.id), {
                onSuccess: () => crud.closeForm(),
                forceFormData: true,
            });
        } else {
            setData('_method', 'POST');
            post(route('admin.skills.store'), {
                onSuccess: () => crud.closeForm(),
                forceFormData: true,
            });
        }
    };

    return (
        <AuthenticatedLayout title="Skill & Software Management">
            <Head title="Skill & Software" />

            <PageContainer
                actions={
                    <PrimaryButton onClick={() => crud.openForm()}>
                        Tambah Skill / Software
                    </PrimaryButton>
                }
            >
                <Table>
                    <Table.Header>
                      
                        <Table.HeaderCell>No</Table.HeaderCell>
                        <Table.HeaderCell>Nama Skill</Table.HeaderCell>
                        <Table.HeaderCell>Kategori</Table.HeaderCell>
                        <Table.HeaderCell>Level Penguasaan</Table.HeaderCell>
                        <Table.HeaderCell>Status</Table.HeaderCell>
                        <Table.HeaderCell>Aksi</Table.HeaderCell>
                    </Table.Header>
                    <Table.Body>
                        {skills.data.map((skill) => (
                            <Table.Row key={skill.id}>
                                <Table.Cell className="font-bold text-gray-900">{skills.data.indexOf(skill) + 1}</Table.Cell>
                                <Table.Cell>
                                    <div className="font-bold text-gray-900">{skill.name}</div>
                                    {skill.icon_identifier && !skill.image_path && (
                                        <div className="text-xs text-gray-500">Icon: {skill.icon_identifier}</div>
                                    )}
                                </Table.Cell>
                                <Table.Cell>
                                    <Badge tone="blue">{skill.category}</Badge>
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
                                    <Badge tone={skill.is_active ? 'green' : 'red'}>
                                        {skill.is_active ? 'Aktif' : 'Tidak Aktif'}
                                    </Badge>
                                </Table.Cell>
                                <Table.Cell>
                                    <button onClick={() => crud.openForm(skill)} className="text-blue-600 hover:text-blue-900 mr-4 font-medium">Edit</button>
                                    <button onClick={() => crud.openDelete(skill)} className="text-red-600 hover:text-red-900 font-medium">Hapus</button>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                        {skills.data.length === 0 && <EmptyRow colSpan={6} message="Belum ada skill yang ditambahkan." />}
                    </Table.Body>
                </Table>
                <Pagination links={skills.links} />
            </PageContainer>

            {/* Modal Tambah/Edit */}
            <Modal show={crud.isFormOpen} onClose={crud.closeForm}>
                <form onSubmit={handleSubmit} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-6">
                        {crud.editing ? 'Edit Skill / Software' : 'Tambah Skill / Software Baru'}
                    </h2>

                    <div className="space-y-4">
                        <FormField label="Nama Skill/Software" htmlFor="name" error={errors.name}>
                            <TextInput
                                id="name"
                                className="mt-1 block w-full"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                            />
                        </FormField>

                        <FormField label="Kategori" htmlFor="category" error={errors.category}>
                            <select
                                id="category"
                                className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                value={data.category}
                                onChange={(e) => setData('category', e.target.value)}
                            >
                                {categories.map((c) => (
                                    <option key={c} value={c}>{c}</option>
                                ))}
                            </select>
                        </FormField>

                        <FormField label="Tingkat Kemampuan (%)" htmlFor="proficiency_level" error={errors.proficiency_level}>
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
                        </FormField>

                        <FormField
                            label="ID Ikon (Misal: devicon-html5-plain)"
                            htmlFor="icon_identifier"
                            error={errors.icon_identifier}
                            hint="Gunakan ikon devicon, ATAU unggah gambar di bawah ini."
                        >
                            <TextInput
                                id="icon_identifier"
                                className="mt-1 block w-full"
                                value={data.icon_identifier}
                                onChange={(e) => setData('icon_identifier', e.target.value)}
                            />
                        </FormField>

                        <FileField
                            label="Gambar / Ikon Kustom (Abaikan jika menggunakan ID Ikon)"
                            htmlFor="image"
                            error={errors.image}
                            currentPath={crud.editing?.image_path}
                            onChange={(e) => setData('image', e.target.files[0])}
                        />

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
                        <PrimaryButton disabled={processing}>
                            {crud.editing ? 'Simpan Perubahan' : 'Tambah'}
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>

            {/* Modal Hapus */}
            <ConfirmDeleteModal
                show={crud.isDeleteOpen}
                onCancel={crud.closeDelete}
                onConfirm={() => crud.confirmDelete(route('admin.skills.destroy', crud.deleting.id))}
                processing={processing}
            />
        </AuthenticatedLayout>
    );
}
