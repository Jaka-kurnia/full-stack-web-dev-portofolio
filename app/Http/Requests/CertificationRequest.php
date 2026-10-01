<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CertificationRequest extends FormRequest
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
            'issuer' => ['required', 'string', 'max:255'],
            'issue_date' => ['required', 'date'],
            'expiration_date' => ['nullable', 'date', 'after_or_equal:issue_date'],
            'credential_url' => ['nullable', 'url', 'max:255'],
            'badge_image' => ['nullable', 'image', 'max:'.config('portfolio.max_upload_kb.image')],
        ];
    }
}
