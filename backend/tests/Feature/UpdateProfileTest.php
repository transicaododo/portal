<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class UpdateProfileTest extends TestCase
{
    use RefreshDatabase;

    public function test_usuario_atualiza_o_proprio_nome(): void
    {
        $user = User::factory()->create(['name' => 'Nome Antigo']);
        Sanctum::actingAs($user);

        $response = $this->patchJson('/api/me', ['name' => 'Nome Novo']);

        $response->assertOk();
        $response->assertJsonPath('data.name', 'Nome Novo');
        $this->assertSame('Nome Novo', $user->fresh()->name);
    }

    public function test_usuario_troca_a_propria_senha_informando_a_senha_atual(): void
    {
        $user = User::factory()->create(['password' => bcrypt('senha-atual')]);
        Sanctum::actingAs($user);

        $response = $this->patchJson('/api/me', [
            'name' => $user->name,
            'current_password' => 'senha-atual',
            'password' => 'senha-nova-123',
            'password_confirmation' => 'senha-nova-123',
        ]);

        $response->assertOk();
        $this->assertTrue(\Illuminate\Support\Facades\Hash::check('senha-nova-123', $user->fresh()->password));
    }

    public function test_troca_de_senha_exige_senha_atual_correta(): void
    {
        $user = User::factory()->create(['password' => bcrypt('senha-atual')]);
        Sanctum::actingAs($user);

        $response = $this->patchJson('/api/me', [
            'name' => $user->name,
            'current_password' => 'senha-errada',
            'password' => 'senha-nova-123',
            'password_confirmation' => 'senha-nova-123',
        ]);

        $response->assertUnprocessable();
        $response->assertJsonValidationErrors('current_password');
    }
}
