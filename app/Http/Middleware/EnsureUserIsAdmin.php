<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Gerbang otorisasi untuk seluruh rute /admin/*.
 *
 * Autentikasi (auth) dan verifikasi email (verified) sudah ditangani
 * middleware rute; tugas middleware ini hanya memastikan role-nya admin.
 */
class EnsureUserIsAdmin
{
    public function handle(Request $request, Closure $next): Response
    {
        if (! $request->user()?->isAdmin()) {
            abort(403, 'Anda tidak memiliki akses ke halaman admin.');
        }

        return $next($request);
    }
}
