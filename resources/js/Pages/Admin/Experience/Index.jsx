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

const TYPE_LABELS = {
    'Full-time': 'Full-time (Sekolah/Reguler)',
    Freelance: 'Freelance / Organisasi',
};

export default function Index({ experiences, types }) {
    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
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

    const prepare = (exp = null) => {
        clearErrors();
        if (exp) {
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
            reset();
            setData('_method', 'post');
        }
    };

    const crud = useCrudModal({ prepare, reset });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (crud.editing) {
            post(route('admin.experiences.update', crud.editing.id), {
                onSuccess: () => crud.closeForm(),
                forceFormData: true,
            });
        } else {
            post(route('admin.experiences.store'), {
                onSuccess: () => crud.closeForm(),
                forceFormData: true,
            });
        }
    };

    return (
        <AuthenticatedLayout title="Latar Pendidikan / Experience">
            <Head title="Latar Pendidikan" />

            <PageContainer
                actions={
                    <PrimaryButton onClick={() => crud.openForm()}>
                        Tambah Latar Pendidikan
                    </PrimaryButton>
                }
            >
                <Table>
                    <Table.Header>
                        <Table.HeaderCell>Logo</Table.HeaderCell>
                        <Table.HeaderCell>Institusi/Perusahaan</Table.HeaderCell>
                        <Table.HeaderCell>Detail</Table.HeaderCell>
                        <Table.HeaderCell>Durasi</Table.HeaderCell>
                        <Table.HeaderCell>Aksi</Table.HeaderCell>
                    </Table.Header>
                    <Table.Body>
                        {experiences.data.map((exp) => (
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
                                    <Badge tone="blue">{exp.type}</Badge>
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
                                    <button onClick={() => crud.openForm(exp)} className="text-blue-600 hover:text-blue-900 mr-4 font-medium">Edit</button>
                                    <button onClick={() => crud.openDelete(exp)} className="text-red-600 hover:text-red-900 font-medium">Hapus</button>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                        {experiences.data.length === 0 && <EmptyRow colSpan={5} message="Belum ada data latar pendidikan." />}
                    </Table.Body>
                </Table>
                <Pagination links={experiences.links} />
            </PageContainer>

            {/* Modal Tambah/Edit */}
            <Modal show={crud.isFormOpen} onClose={crud.closeForm}>
                <form onSubmit={handleSubmit} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-6">
                        {crud.editing ? 'Edit Latar Pendidikan' : 'Tambah Latar Pendidikan Baru'}
                    </h2>

                    <div className="space-y-4">
                        <FormField label="Nama Sekolah / Perusahaan" htmlFor="company_name" error={errors.company_name}>
                            <TextInput
                                id="company_name"
                                className="mt-1 block w-full"
                                value={data.company_name}
                                onChange={(e) => setData('company_name', e.target.value)}
                                required
                            />
                        </FormField>

                        <FormField label="Jurusan / Jabatan" htmlFor="job_title" error={errors.job_title}>
                            <TextInput
                                id="job_title"
                                className="mt-1 block w-full"
                                value={data.job_title}
                                onChange={(e) => setData('job_title', e.target.value)}
                                required
                            />
                        </FormField>

                        <FormField label="Tipe" htmlFor="type" error={errors.type}>
                            <select
                                id="type"
                                className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                value={data.type}
                                onChange={(e) => setData('type', e.target.value)}
                            >
                                {types.map((type) => (
                                    <option key={type} value={type}>{TYPE_LABELS[type] ?? type}</option>
                                ))}
                            </select>
                        </FormField>

                        <div className="grid grid-cols-2 gap-4">
                            <FormField label="Tanggal Mulai" htmlFor="start_date" error={errors.start_date}>
                                <TextInput
                                    id="start_date"
                                    type="date"
                                    className="mt-1 block w-full"
                                    value={data.start_date}
                                    onChange={(e) => setData('start_date', e.target.value)}
                                    required
                                />
                            </FormField>

                            <FormField label="Tanggal Selesai (Kosongkan jika masih)" htmlFor="end_date" error={errors.end_date}>
                                <TextInput
                                    id="end_date"
                                    type="date"
                                    className="mt-1 block w-full"
                                    value={data.end_date}
                                    onChange={(e) => setData('end_date', e.target.value)}
                                />
                            </FormField>
                        </div>

                        <FormField label="Deskripsi (Opsional)" htmlFor="description" error={errors.description}>
                            <textarea
                                id="description"
                                className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                rows="3"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                            />
                        </FormField>

                        <FileField
                            label="Logo Sekolah / Perusahaan (Gambar)"
                            htmlFor="image"
                            error={errors.image}
                            currentPath={crud.editing?.image_path}
                            previewLabel="Logo saat ini:"
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
                onConfirm={() => crud.confirmDelete(route('admin.experiences.destroy', crud.deleting.id))}
                processing={processing}
                message="Apakah Anda yakin ingin menghapus latar pendidikan ini? Tindakan ini tidak dapat dibatalkan."
            />
        </AuthenticatedLayout>
    );
}
