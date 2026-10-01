import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

export default function Edit({ heroSetting }) {
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
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.hero.update'), {
            preserveScroll: true,
        });
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Hero Settings</h2>}
        >
            <Head title="Hero Settings" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <form onSubmit={submit} className="space-y-6">
                            
                            <div>
                                <InputLabel htmlFor="greeting" value="Greeting" />
                                <TextInput
                                    id="greeting"
                                    className="mt-1 block w-full"
                                    value={data.greeting}
                                    onChange={(e) => setData('greeting', e.target.value)}
                                />
                                <InputError className="mt-2" message={errors.greeting} />
                            </div>

                            <div>
                                <InputLabel htmlFor="full_name" value="Full Name" />
                                <TextInput
                                    id="full_name"
                                    className="mt-1 block w-full"
                                    value={data.full_name}
                                    onChange={(e) => setData('full_name', e.target.value)}
                                />
                                <InputError className="mt-2" message={errors.full_name} />
                            </div>

                            <div>
                                <InputLabel htmlFor="short_bio" value="Hero Bio (Short Description)" />
                                <textarea
                                    id="short_bio"
                                    className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                    rows="4"
                                    value={data.short_bio}
                                    onChange={(e) => setData('short_bio', e.target.value)}
                                />
                                <InputError className="mt-2" message={errors.short_bio} />
                            </div>

                            <div>
                                <InputLabel htmlFor="about_text" value="About Me (Tentang Saya) Description" />
                                <textarea
                                    id="about_text"
                                    className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                    rows="6"
                                    value={data.about_text}
                                    onChange={(e) => setData('about_text', e.target.value)}
                                />
                                <InputError className="mt-2" message={errors.about_text} />
                            </div>

                            <div>
                                <InputLabel htmlFor="availability_status" value="Availability Status" />
                                <select
                                    id="availability_status"
                                    className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                    value={data.availability_status}
                                    onChange={(e) => setData('availability_status', e.target.value)}
                                >
                                    <option value="Available">Available</option>
                                    <option value="Busy">Busy</option>
                                    <option value="Not Looking">Not Looking</option>
                                </select>
                                <InputError className="mt-2" message={errors.availability_status} />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <InputLabel htmlFor="cta_text" value="CTA Text" />
                                    <TextInput
                                        id="cta_text"
                                        className="mt-1 block w-full"
                                        value={data.cta_text}
                                        onChange={(e) => setData('cta_text', e.target.value)}
                                    />
                                    <InputError className="mt-2" message={errors.cta_text} />
                                </div>
                                <div>
                                    <InputLabel htmlFor="cta_link" value="CTA Link" />
                                    <TextInput
                                        id="cta_link"
                                        className="mt-1 block w-full"
                                        value={data.cta_link}
                                        onChange={(e) => setData('cta_link', e.target.value)}
                                    />
                                    <InputError className="mt-2" message={errors.cta_link} />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <InputLabel htmlFor="profile_image" value="Profile Image (Leave blank to keep current)" />
                                    <input
                                        type="file"
                                        id="profile_image"
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('profile_image', e.target.files[0])}
                                    />
                                    <InputError className="mt-2" message={errors.profile_image} />
                                    {heroSetting.profile_image_path && (
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">Current Image:</p>
                                            <img src={`/storage/${heroSetting.profile_image_path}`} alt="Profile" className="h-20 object-cover mt-1 rounded" />
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <InputLabel htmlFor="cv_file" value="CV File (PDF, Leave blank to keep current)" />
                                    <input
                                        type="file"
                                        id="cv_file"
                                        accept=".pdf"
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('cv_file', e.target.files[0])}
                                    />
                                    <InputError className="mt-2" message={errors.cv_file} />
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
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
