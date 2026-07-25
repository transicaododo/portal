<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class SanctumAuthenticationSmokeTest extends TestCase
{
    use RefreshDatabase;

    public function test_public_health_endpoint(): void
    {
        $this->getJson('/api/health')
            ->assertStatus(200);
    }

    public function test_guest_receives_401(): void
    {
        $this->getJson('/api/me')
            ->assertStatus(401);
    }

    public function test_authenticated_user_can_access_me(): void
    {
        $user = User::factory()->create();

        Sanctum::actingAs($user);

        $this->getJson('/api/me')
            ->assertStatus(200);
    }

    public function test_authenticated_routes(): void
    {
        $user = User::factory()->create();

        Sanctum::actingAs($user);

        foreach ([
            '/api/parceiras',
            '/api/campanhas',
            '/api/marcas',
        ] as $route) {

            $response = $this->getJson($route);

            echo PHP_EOL;
            echo $route . ' => ' . $response->status() . PHP_EOL;

            $this->assertNotEquals(
                500,
                $response->status(),
                $route . ' retornou erro interno.'
            );
        }
    }
}
