import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import FileField from '@/Components/Admin/FileField';
import FormField from '@/Components/Admin/FormField';
import PageContainer from '@/Components/Admin/PageContainer';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useEffect } from 'react';

export default function Form({ project, allSkills, statuses }) {
    const isEdit = !!project.id;

    const { data, setData, post, processing, errors } = useForm({
        title: project.title || '',
        slug: project.slug || '',
        thumbnail: null,
        content: project.content || '',
        demo_url: project.demo_url || '',
        github_url: project.github_url || '',
        is_featured: project.is_featured || false,
        status: project.status || 'Draft',
        skills: project.skills ? project.skills.map(s => s.id) : [],
        galleries: [],
        _method: isEdit ? 'PUT' : 'POST'
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const routeName = isEdit ? route('admin.projects.update', project.id) : route('admin.projects.store');
        post(routeName, { forceFormData: true });
    };

    const handleSkillToggle = (skillId) => {
        if (data.skills.includes(skillId)) {
            setData('skills', data.skills.filter(id => id !== skillId));
        } else {
            setData('skills', [...data.skills, skillId]);
        }
    };

    // Auto-generate slug from title
    useEffect(() => {
        if (!isEdit && data.title) {
            const generatedSlug = data.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)+/g, '');
            setData('slug', generatedSlug);
        }
    }, [data.title, isEdit]);

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        {isEdit ? 'Edit Project' : 'Create Project'}
                    </h2>
                    <Link
                        href={route('admin.projects.index')}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        Back to List
                    </Link>
                </div>
            }
        >
            <Head title={isEdit ? 'Edit Project' : 'Create Project'} />

            <PageContainer>
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField label="Project Title" htmlFor="title" error={errors.title}>
                                <TextInput
                                    id="title"
                                    className="mt-1 block w-full"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    required
                                />
                            </FormField>
                            <FormField label="Slug" htmlFor="slug" error={errors.slug}>
                                <TextInput
                                    id="slug"
                                    className="mt-1 block w-full"
                                    value={data.slug}
                                    onChange={(e) => setData('slug', e.target.value)}
                                    required
                                />
                            </FormField>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField label="Demo URL (Optional)" htmlFor="demo_url" error={errors.demo_url}>
                                <TextInput
                                    id="demo_url"
                                    type="url"
                                    className="mt-1 block w-full"
                                    value={data.demo_url}
                                    onChange={(e) => setData('demo_url', e.target.value)}
                                />
                            </FormField>
                            <FormField label="GitHub URL (Optional)" htmlFor="github_url" error={errors.github_url}>
                                <TextInput
                                    id="github_url"
                                    type="url"
                                    className="mt-1 block w-full"
                                    value={data.github_url}
                                    onChange={(e) => setData('github_url', e.target.value)}
                                />
                            </FormField>
                        </div>

                        <div>
                            <FileField
                                label="Thumbnail Image"
                                htmlFor="thumbnail"
                                error={errors.thumbnail}
                                onChange={(e) => setData('thumbnail', e.target.files[0])}
                            />
                            {isEdit && project.thumbnail_path && (
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500">Current Thumbnail:</p>
                                    <img src={`/storage/${project.thumbnail_path}`} alt="Thumbnail" className="h-32 object-cover mt-1 rounded" />
                                </div>
                            )}
                        </div>

                        <FormField label="Skills / Technologies Used" error={errors.skills}>
                            <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-2">
                                {allSkills.map(skill => (
                                    <label key={skill.id} className="inline-flex items-center">
                                        <input
                                            type="checkbox"
                                            className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                            checked={data.skills.includes(skill.id)}
                                            onChange={() => handleSkillToggle(skill.id)}
                                        />
                                        <span className="ml-2 text-sm text-gray-700">{skill.name}</span>
                                    </label>
                                ))}
                            </div>
                        </FormField>

                        <FormField label="Project Content (Markdown supported)" htmlFor="content" error={errors.content}>
                            <textarea
                                id="content"
                                className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm font-mono text-sm"
                                rows="10"
                                value={data.content}
                                onChange={(e) => setData('content', e.target.value)}
                            />
                        </FormField>

                        <div>
                            <FileField
                                label="Additional Gallery Images (Optional)"
                                htmlFor="galleries"
                                multiple
                                error={errors.galleries}
                                onChange={(e) => setData('galleries', Array.from(e.target.files))}
                            />
                            {isEdit && project.galleries && project.galleries.length > 0 && (
                                <div className="mt-4">
                                    <p className="text-sm text-gray-500 mb-2">Current Gallery Images:</p>
                                    <div className="flex flex-wrap gap-4">
                                        {project.galleries.map(img => (
                                            <div key={img.id} className="relative">
                                                <img src={`/storage/${img.image_path}`} alt="Gallery" className="h-24 w-24 object-cover rounded" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="flex items-center gap-6">
                            <label className="inline-flex items-center">
                                <input
                                    type="checkbox"
                                    className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                    checked={data.is_featured}
                                    onChange={(e) => setData('is_featured', e.target.checked)}
                                />
                                <span className="ml-2 text-sm text-gray-700">Featured Project</span>
                            </label>

                            <div>
                                <select
                                    className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                    value={data.status}
                                    onChange={(e) => setData('status', e.target.value)}
                                >
                                    {statuses.map((status) => (
                                        <option key={status} value={status}>{status}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <PrimaryButton disabled={processing}>
                                {isEdit ? 'Update Project' : 'Create Project'}
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </PageContainer>
        </AuthenticatedLayout>
    );
}
