<?php

namespace App\Http\Controllers;

use App\Http\Requests\QuoteRequest;
use App\Models\Quote;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class QuoteController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Quote/Index', [
            'quotes' => Quote::all(),
        ]);
    }

    public function store(QuoteRequest $request): RedirectResponse
    {
        Quote::create($request->validated());

        return back()->with('success', 'Quote created.');
    }

    public function update(QuoteRequest $request, Quote $quote): RedirectResponse
    {
        $quote->update($request->validated());

        return back()->with('success', 'Quote updated.');
    }

    public function destroy(Quote $quote): RedirectResponse
    {
        $quote->delete();

        return back()->with('success', 'Quote deleted.');
    }
}
