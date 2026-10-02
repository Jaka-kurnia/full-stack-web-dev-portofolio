import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import ConfirmDeleteModal from '@/Components/Admin/ConfirmDeleteModal';
import Pagination from '@/Components/Admin/Pagination';
import EmptyRow from '@/Components/Admin/EmptyRow';
import PageContainer from '@/Components/Admin/PageContainer';
import Table from '@/Components/Table';
import useCrudModal from '@/Hooks/useCrudModal';

export default function Index({ projects }) {
    const crud = useCrudModal();

    return (
        <AuthenticatedLayout title="Project Management">
            <Head title="Projects" />

            <PageContainer
                actions={
                    <Link
                        href={route('admin.projects.create')}
                        className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 focus:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                    >
                        Tambah Project Baru
                    </Link>
                }
            >
                <Table>
                    <Table.Header>
                        <Table.HeaderCell>No</Table.HeaderCell>
                        <Table.HeaderCell>Project</Table.HeaderCell>
                        <Table.HeaderCell>Status</Table.HeaderCell>
                        <Table.HeaderCell>Featured</Table.HeaderCell>
                        <Table.HeaderCell>Skills</Table.HeaderCell>
                        <Table.HeaderCell>Aksi</Table.HeaderCell>
                    </Table.Header>
                    <Table.Body>
                        {projects.data.map((project) => (
                            <Table.Row key={project.id}>
                                <Table.Cell className="font-bold text-gray-900">{projects.data.indexOf(project) + 1}</Table.Cell>
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
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${project.status === 'Published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                        {project.status === 'Published' ? 'Published' : 'Draft'}
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
                                    <button onClick={() => crud.openDelete(project)} className="text-red-600 hover:text-red-900 font-medium">Hapus</button>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                        {projects.data.length === 0 && <EmptyRow colSpan={5} message="Belum ada project." />}
                    </Table.Body>
                </Table>
                <Pagination links={projects.links} />
            </PageContainer>

            {/* Modal Hapus */}
            <ConfirmDeleteModal
                show={crud.isDeleteOpen}
                onCancel={crud.closeDelete}
                onConfirm={() => crud.confirmDelete(route('admin.projects.destroy', crud.deleting.id))}
                message="Apakah Anda yakin ingin menghapus project ini?"
            />
        </AuthenticatedLayout>
    );
}
