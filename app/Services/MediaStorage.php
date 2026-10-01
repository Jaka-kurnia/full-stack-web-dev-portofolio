<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

/**
 * Satu-satunya tempat unggahan gambar/dokumen diproses.
 *
 * Menangani simpan, ganti (hapus file lama lalu simpan baru) dan hapus,
 * sehingga controller tidak perlu mengulang logika guard-and-delete.
 */
class MediaStorage
{
    private string $disk;

    public function __construct()
    {
        $this->disk = (string) config('portfolio.disk', 'public');
    }

    /**
     * Simpan satu file dan kembalikan path-nya.
     */
    public function store(UploadedFile $file, string $directory): string
    {
        return $file->store($directory, $this->disk);
    }

    /**
     * Simpan banyak sekaligus, mempertahankan urutan array masukan.
     *
     * @return list<string>
     */
    public function storeMany(iterable $files, string $directory): array
    {
        $paths = [];

        foreach ($files as $file) {
            if ($file instanceof UploadedFile) {
                $paths[] = $this->store($file, $directory);
            }
        }

        return $paths;
    }

    /**
     * Terapkan unggahan ke array data validasi.
     *
     * - Kolom file asli (`$field`) dilepas dari data karena bukan kolom database.
     * - `$pathField` hanya diisi bila ada file baru, sehingga update tanpa
     *   unggahan tidak menyentuh path lama.
     * - File lama (`$currentPath`) dihapus begitu file baru tersimpan.
     *
     * @param  array<string, mixed>  $data
     * @return array<string, mixed>
     */
    public function withUpload(
        array $data,
        string $field,
        string $pathField,
        string $directory,
        ?string $currentPath = null,
    ): array {
        $file = $data[$field] ?? null;
        unset($data[$field]);

        if ($file instanceof UploadedFile) {
            $this->delete($currentPath);
            $data[$pathField] = $this->store($file, $directory);
        }

        return $data;
    }

    public function delete(?string $path): void
    {
        if ($path !== null && $path !== '') {
            Storage::disk($this->disk)->delete($path);
        }
    }

    /**
     * @param  iterable<string|null>  $paths
     */
    public function deleteAll(iterable $paths): void
    {
        foreach ($paths as $path) {
            $this->delete($path);
        }
    }
}
