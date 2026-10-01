<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class SkillRequest extends FormRequest
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
            'name' => ['required', 'string', 'max:255'],
            'category' => ['required', Rule::in(config('portfolio.skill_categories'))],
            'icon_identifier' => ['nullable', 'string', 'max:255'],
            'image' => ['nullable', 'image', 'max:'.config('portfolio.max_upload_kb.image')],
            'proficiency_level' => ['required', 'integer', 'min:0', 'max:100'],
            'is_active' => ['sometimes', 'boolean'],
        ];
    }
}
