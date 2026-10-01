<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class HeroSettingRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'greeting' => ['required', 'string', 'max:255'],
            'full_name' => ['required', 'string', 'max:255'],
            'short_bio' => ['required', 'string'],
            'about_text' => ['nullable', 'string'],
            'availability_status' => ['required', Rule::in(config('portfolio.availability_statuses'))],
            'cta_text' => ['required', 'string', 'max:255'],
            'cta_link' => ['required', 'string', 'max:255'],
            'social_links' => ['nullable', 'array'],
            'profile_image' => ['nullable', 'image', 'max:'.config('portfolio.max_upload_kb.image')],
            'cv_file' => ['nullable', 'file', 'mimes:pdf', 'max:'.config('portfolio.max_upload_kb.cv')],
        ];
    }
}
