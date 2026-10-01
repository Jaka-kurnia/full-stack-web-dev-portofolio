import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import Table from '@/Components/Table';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import DangerButton from '@/Components/DangerButton';
import { useState } from 'react';

export default function Index({ projects }) {
    const { delete: destroy, processing } = useForm();
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deletingProject, setDeletingProject] = useState(null);
    
    const openDeleteModal = (project) => {
        setDeletingProject(project);
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setTimeout(() => setDeletingProject(null), 200);
    };

    const handleDelete = () => {
        destroy(route('admin.projects.destroy', deletingProject.id), {
            onSuccess: () => closeDeleteModal(),
        });
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Project Management</h2>}
        >
            <Head title="Projects" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    
                    <div className="mb-6 flex justify-end">
                        <Link
                            href={route('admin.projects.create')}
                            className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 focus:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                        >
                            Tambah Project Baru
                        </Link>
                    </div>

                    <Table>
                        <Table.Header>
                            <Table.HeaderCell>Project</Table.HeaderCell>
                            <Table.HeaderCell>Status</Table.HeaderCell>
                            <Table.HeaderCell>Featured</Table.HeaderCell>
                            <Table.HeaderCell>Skills</Table.HeaderCell>
                            <Table.HeaderCell>Aksi</Table.HeaderCell>
                        </Table.Header>
                        <Table.Body>
                            {projects.map((project) => (
                                <Table.Row key={project.id}>
                                    <Table.Cell>
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10">
                                                {project.thumbnail_path ? (
                                                    <img className="h-10 w-10 rounded object-cover" src={`/storage/${project.thumbnail_path}`} alt="" />
                                                ) : (
                                                    <div className="h-10 w-10 rounded bg-gray-200 flex items-center justify-center text-xs text-gray-500">No Img</div>
                                                )}
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-bold text-gray-900">{project.title}</div>
                                                <div className="text-xs text-gray-500">{project.slug}</div>
                                            </div>
                                        </div>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${project.is_published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                            {project.is_published ? 'Published' : 'Draft'}
                                        </span>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${project.is_featured ? 'bg-indigo-100 text-indigo-800' : 'bg-gray-100 text-gray-800'}`}>
                                            {project.is_featured ? 'Featured' : 'Standard'}
                                        </span>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <div className="flex flex-wrap gap-1">
                                            {project.skills && project.skills.map(skill => (
                                                <span key={skill.id} className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-gray-100 text-gray-800 uppercase tracking-wider">
                                                    {skill.name}
                                                </span>
                                            ))}
                                        </div>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Link href={route('admin.projects.edit', project.id)} className="text-indigo-600 hover:text-indigo-900 mr-4 font-medium">Edit</Link>
                                        <button onClick={() => openDeleteModal(project)} className="text-red-600 hover:text-red-900 font-medium">Hapus</button>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                            {projects.length === 0 && (
                                <Table.Row>
                                    <Table.Cell colSpan="5" className="text-center text-gray-500 py-8">
                                        Belum ada project.
                                    </Table.Cell>
                                </Table.Row>
                            )}
                        </Table.Body>
                    </Table>

                </div>
            </div>

            <Modal show={isDeleteModalOpen} onClose={closeDeleteModal} maxWidth="sm">
                <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">Konfirmasi Hapus</h2>
                    <p className="text-sm text-gray-600 mb-6">Apakah Anda yakin ingin menghapus project ini?</p>
                    <div className="flex justify-end gap-3">
                        <SecondaryButton onClick={closeDeleteModal}>Batal</SecondaryButton>
                        <DangerButton onClick={handleDelete} disabled={processing}>Hapus</DangerButton>
                    </div>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
