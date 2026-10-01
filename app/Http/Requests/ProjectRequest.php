<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProjectRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * FormData tidak mengirim array kosong sama sekali, sehingga "lepas
     * semua skill" dan "tidak mengirim skill" akan tampak identik.
     * Keduanya dinormalkan menjadi [] agar sinkronisasi pivot selalu jalan.
     */
    protected function prepareForValidation(): void
    {
        $this->merge([
            'skills' => $this->input('skills', []),
            'galleries' => $this->input('galleries', []),
        ]);
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'slug' => [
                'required',
                'string',
                'max:255',
                Rule::unique('projects', 'slug')->ignore($this->route('project')),
            ],
            'content' => ['nullable', 'string'],
            'demo_url' => ['nullable', 'url', 'max:255'],
            'github_url' => ['nullable', 'url', 'max:255'],
            'is_featured' => ['sometimes', 'boolean'],
            'status' => ['required', Rule::in(config('portfolio.project_statuses'))],
            'thumbnail' => ['nullable', 'image', 'max:'.config('portfolio.max_upload_kb.image')],
            'skills' => ['array'],
            'skills.*' => ['integer', 'exists:skills,id'],
            'galleries' => ['array'],
            'galleries.*' => ['file', 'image', 'max:'.config('portfolio.max_upload_kb.image')],
        ];
    }
}
