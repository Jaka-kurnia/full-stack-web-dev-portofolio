import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import FileField from '@/Components/Admin/FileField';
import FormField from '@/Components/Admin/FormField';
import PageContainer from '@/Components/Admin/PageContainer';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

export default function Edit({ heroSetting, availabilityStatuses }) {
    const { data, setData, post, processing, errors, recentlySuccessful } = useForm({
        greeting: heroSetting.greeting || '',
        full_name: heroSetting.full_name || '',
        short_bio: heroSetting.short_bio || '',
        about_text: heroSetting.about_text || '',
        availability_status: heroSetting.availability_status || 'Available',
        cta_text: heroSetting.cta_text || 'Contact Me',
        cta_link: heroSetting.cta_link || '#contact',
        profile_image: null,
        cv_file: null,
        _method: 'PUT',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.hero.update'), {
            preserveScroll: true,
            forceFormData: true,
        });
    };

    return (
        <AuthenticatedLayout title="Hero Settings">
            <Head title="Hero Settings" />

            <PageContainer>
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                    <form onSubmit={submit} className="space-y-6">

                        <FormField label="Greeting" htmlFor="greeting" error={errors.greeting}>
                            <TextInput
                                id="greeting"
                                className="mt-1 block w-full"
                                value={data.greeting}
                                onChange={(e) => setData('greeting', e.target.value)}
                            />
                        </FormField>

                        <FormField label="Full Name" htmlFor="full_name" error={errors.full_name}>
                            <TextInput
                                id="full_name"
                                className="mt-1 block w-full"
                                value={data.full_name}
                                onChange={(e) => setData('full_name', e.target.value)}
                            />
                        </FormField>

                        <FormField label="Hero Bio (Short Description)" htmlFor="short_bio" error={errors.short_bio}>
                            <textarea
                                id="short_bio"
                                className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                rows="4"
                                value={data.short_bio}
                                onChange={(e) => setData('short_bio', e.target.value)}
                            />
                        </FormField>

                        <FormField label="About Me (Tentang Saya) Description" htmlFor="about_text" error={errors.about_text}>
                            <textarea
                                id="about_text"
                                className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                rows="6"
                                value={data.about_text}
                                onChange={(e) => setData('about_text', e.target.value)}
                            />
                        </FormField>

                        <FormField label="Availability Status" htmlFor="availability_status" error={errors.availability_status}>
                            <select
                                id="availability_status"
                                className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                value={data.availability_status}
                                onChange={(e) => setData('availability_status', e.target.value)}
                            >
                                {availabilityStatuses.map((status) => (
                                    <option key={status} value={status}>{status}</option>
                                ))}
                            </select>
                        </FormField>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField label="CTA Text" htmlFor="cta_text" error={errors.cta_text}>
                                <TextInput
                                    id="cta_text"
                                    className="mt-1 block w-full"
                                    value={data.cta_text}
                                    onChange={(e) => setData('cta_text', e.target.value)}
                                />
                            </FormField>
                            <FormField label="CTA Link" htmlFor="cta_link" error={errors.cta_link}>
                                <TextInput
                                    id="cta_link"
                                    className="mt-1 block w-full"
                                    value={data.cta_link}
                                    onChange={(e) => setData('cta_link', e.target.value)}
                                />
                            </FormField>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <FileField
                                    label="Profile Image (Leave blank to keep current)"
                                    htmlFor="profile_image"
                                    error={errors.profile_image}
                                    onChange={(e) => setData('profile_image', e.target.files[0])}
                                />
                                {heroSetting.profile_image_path && (
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">Current Image:</p>
                                        <img src={`/storage/${heroSetting.profile_image_path}`} alt="Profile" className="h-20 object-cover mt-1 rounded" />
                                    </div>
                                )}
                            </div>
                            <div>
                                <FileField
                                    label="CV File (PDF, Leave blank to keep current)"
                                    htmlFor="cv_file"
                                    accept=".pdf"
                                    error={errors.cv_file}
                                    onChange={(e) => setData('cv_file', e.target.files[0])}
                                />
                                {heroSetting.cv_file_path && (
                                    <div className="mt-2">
                                        <a href={`/storage/${heroSetting.cv_file_path}`} target="_blank" className="text-indigo-600 hover:text-indigo-900 text-sm">
                                            View Current CV
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <PrimaryButton disabled={processing}>Save Changes</PrimaryButton>

                            {recentlySuccessful && <p className="text-sm text-gray-600">Saved.</p>}
                        </div>
                    </form>
                </div>
            </PageContainer>
        </AuthenticatedLayout>
    );
}
