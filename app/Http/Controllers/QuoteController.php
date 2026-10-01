<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Quote;

class QuoteController extends Controller
{
    public function index()
    {
        $quotes = Quote::all();
        return inertia('Admin/Quote/Index', ['quotes' => $quotes]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'content' => 'required|string',
            'is_active' => 'boolean'
        ]);

        Quote::create($validated);
        return redirect()->back()->with('success', 'Quote created.');
    }

    public function update(Request $request, Quote $quote)
    {
        $validated = $request->validate([
            'content' => 'required|string',
            'is_active' => 'boolean'
        ]);

        $quote->update($validated);
        return redirect()->back()->with('success', 'Quote updated.');
    }

    public function destroy(Quote $quote)
    {
        $quote->delete();
        return redirect()->back()->with('success', 'Quote deleted.');
    }
}
