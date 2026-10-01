<?php

namespace Tests\Feature\Admin;

use App\Models\Quote;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\Concerns\PortfolioAdmin;
use Tests\TestCase;

class QuoteManagementTest extends TestCase
{
    use PortfolioAdmin;
    use RefreshDatabase;

    public function test_quote_can_be_created_and_updated(): void
    {
        $admin = $this->createAdmin();

        $this->actingAs($admin)
            ->post(route('admin.quotes.store'), ['content' => 'Selamat datang.', 'is_active' => '1'])
            ->assertSessionHasNoErrors();

        $quote = Quote::firstOrFail();

        $this->actingAs($admin)
            ->put(route('admin.quotes.update', $quote), ['content' => 'Baru.', 'is_active' => '0'])
            ->assertSessionHasNoErrors();

        $this->assertSame('Baru.', $quote->refresh()->content);
        $this->assertFalse($quote->is_active);
    }

    public function test_quote_requires_content(): void
    {
        $this->actingAs($this->createAdmin())
            ->post(route('admin.quotes.store'), ['content' => ''])
            ->assertSessionHasErrors('content');
    }

    public function test_deleting_a_quote_removes_it(): void
    {
        $quote = Quote::factory()->create();

        $this->actingAs($this->createAdmin())
            ->delete(route('admin.quotes.destroy', $quote))
            ->assertSessionHasNoErrors();

        $this->assertDatabaseMissing('quotes', ['id' => $quote->id]);
    }
}
