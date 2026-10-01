import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import ConfirmDeleteModal from '@/Components/Admin/ConfirmDeleteModal';
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

export default function Index({ certifications }) {
    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        name: '',
        issuer: '',
        issue_date: '',
        expiration_date: '',
        credential_url: '',
        badge_image: null,
        _method: 'POST',
    });

    const prepare = (cert = null) => {
        clearErrors();
        if (cert) {
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
            reset();
            setData('_method', 'POST');
        }
    };

    const crud = useCrudModal({ prepare, reset });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (crud.editing) {
            setData('_method', 'PUT');
            post(route('admin.certifications.update', crud.editing.id), {
                onSuccess: () => crud.closeForm(),
                forceFormData: true,
            });
        } else {
            setData('_method', 'POST');
            post(route('admin.certifications.store'), {
                onSuccess: () => crud.closeForm(),
                forceFormData: true,
            });
        }
    };

    return (
        <AuthenticatedLayout title="Sertifikasi Management">
            <Head title="Sertifikasi" />

            <PageContainer
                actions={
                    <PrimaryButton onClick={() => crud.openForm()}>
                        Tambah Sertifikasi
                    </PrimaryButton>
                }
            >
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
                                    <button onClick={() => crud.openForm(cert)} className="text-blue-600 hover:text-blue-900 mr-4 font-medium">Edit</button>
                                    <button onClick={() => crud.openDelete(cert)} className="text-red-600 hover:text-red-900 font-medium">Hapus</button>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                        {certifications.length === 0 && <EmptyRow colSpan={5} message="Belum ada sertifikasi." />}
                    </Table.Body>
                </Table>
            </PageContainer>

            {/* Modal Tambah/Edit */}
            <Modal show={crud.isFormOpen} onClose={crud.closeForm}>
                <form onSubmit={handleSubmit} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-6">
                        {crud.editing ? 'Edit Sertifikasi' : 'Tambah Sertifikasi'}
                    </h2>

                    <div className="space-y-4">
                        <FormField label="Nama Sertifikasi" htmlFor="name" error={errors.name}>
                            <TextInput
                                id="name"
                                className="mt-1 block w-full"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                            />
                        </FormField>

                        <FormField label="Penerbit (Issuer)" htmlFor="issuer" error={errors.issuer}>
                            <TextInput
                                id="issuer"
                                className="mt-1 block w-full"
                                value={data.issuer}
                                onChange={(e) => setData('issuer', e.target.value)}
                                required
                            />
                        </FormField>

                        <div className="grid grid-cols-2 gap-4">
                            <FormField label="Tanggal Terbit" htmlFor="issue_date" error={errors.issue_date}>
                                <TextInput
                                    id="issue_date"
                                    type="date"
                                    className="mt-1 block w-full"
                                    value={data.issue_date}
                                    onChange={(e) => setData('issue_date', e.target.value)}
                                    required
                                />
                            </FormField>

                            <FormField label="Tanggal Kedaluwarsa (Opsional)" htmlFor="expiration_date" error={errors.expiration_date}>
                                <TextInput
                                    id="expiration_date"
                                    type="date"
                                    className="mt-1 block w-full"
                                    value={data.expiration_date}
                                    onChange={(e) => setData('expiration_date', e.target.value)}
                                />
                            </FormField>
                        </div>

                        <FormField label="URL Kredensial (Opsional)" htmlFor="credential_url" error={errors.credential_url}>
                            <TextInput
                                id="credential_url"
                                className="mt-1 block w-full"
                                value={data.credential_url}
                                onChange={(e) => setData('credential_url', e.target.value)}
                            />
                        </FormField>

                        <FileField
                            label="Gambar/Badge Sertifikat (Opsional)"
                            htmlFor="badge_image"
                            error={errors.badge_image}
                            onChange={(e) => setData('badge_image', e.target.files[0])}
                        />
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
                onConfirm={() => crud.confirmDelete(route('admin.certifications.destroy', crud.deleting.id))}
                processing={processing}
                message="Apakah Anda yakin ingin menghapus data ini?"
            />
        </AuthenticatedLayout>
    );
}
