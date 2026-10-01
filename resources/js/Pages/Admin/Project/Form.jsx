import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useEffect } from 'react';

export default function Form({ project, allSkills }) {
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
        post(routeName);
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

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <InputLabel htmlFor="title" value="Project Title" />
                                    <TextInput
                                        id="title"
                                        className="mt-1 block w-full"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        required
                                    />
                                    <InputError className="mt-2" message={errors.title} />
                                </div>
                                <div>
                                    <InputLabel htmlFor="slug" value="Slug" />
                                    <TextInput
                                        id="slug"
                                        className="mt-1 block w-full"
                                        value={data.slug}
                                        onChange={(e) => setData('slug', e.target.value)}
                                        required
                                    />
                                    <InputError className="mt-2" message={errors.slug} />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <InputLabel htmlFor="demo_url" value="Demo URL (Optional)" />
                                    <TextInput
                                        id="demo_url"
                                        type="url"
                                        className="mt-1 block w-full"
                                        value={data.demo_url}
                                        onChange={(e) => setData('demo_url', e.target.value)}
                                    />
                                    <InputError className="mt-2" message={errors.demo_url} />
                                </div>
                                <div>
                                    <InputLabel htmlFor="github_url" value="GitHub URL (Optional)" />
                                    <TextInput
                                        id="github_url"
                                        type="url"
                                        className="mt-1 block w-full"
                                        value={data.github_url}
                                        onChange={(e) => setData('github_url', e.target.value)}
                                    />
                                    <InputError className="mt-2" message={errors.github_url} />
                                </div>
                            </div>

                            <div>
                                <InputLabel htmlFor="thumbnail" value="Thumbnail Image" />
                                <input
                                    type="file"
                                    id="thumbnail"
                                    accept="image/*"
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('thumbnail', e.target.files[0])}
                                />
                                <InputError className="mt-2" message={errors.thumbnail} />
                                {isEdit && project.thumbnail_path && (
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">Current Thumbnail:</p>
                                        <img src={`/storage/${project.thumbnail_path}`} alt="Thumbnail" className="h-32 object-cover mt-1 rounded" />
                                    </div>
                                )}
                            </div>

                            <div>
                                <InputLabel value="Skills / Technologies Used" />
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
                                <InputError className="mt-2" message={errors.skills} />
                            </div>

                            <div>
                                <InputLabel htmlFor="content" value="Project Content (Markdown supported)" />
                                <textarea
                                    id="content"
                                    className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm font-mono text-sm"
                                    rows="10"
                                    value={data.content}
                                    onChange={(e) => setData('content', e.target.value)}
                                />
                                <InputError className="mt-2" message={errors.content} />
                            </div>

                            <div>
                                <InputLabel htmlFor="galleries" value="Additional Gallery Images (Optional)" />
                                <input
                                    type="file"
                                    id="galleries"
                                    accept="image/*"
                                    multiple
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('galleries', Array.from(e.target.files))}
                                />
                                <InputError className="mt-2" message={errors.galleries} />
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
                                        <option value="Draft">Draft</option>
                                        <option value="Published">Published</option>
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
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
