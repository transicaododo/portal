<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthenticationFlowTest extends TestCase
{
    use RefreshDatabase;

    public function test_complete_authentication_flow(): void
    {
        $user = User::factory()->create([
            'password' => bcrypt('12345678'),
        ]);

        // Origin é o que Sanctum usa (EnsureFrontendRequestsAreStateful::
        // fromFrontend()) para reconhecer a origem como "frontend
        // stateful" e ativar sessão/cookie — todo browser real envia esse
        // header em requests cross-origin, então o teste precisa simular
        // isso para exercitar o mesmo caminho que a SPA usa de verdade.
        $headers = [
            'Accept' => 'application/json',
            'X-Requested-With' => 'XMLHttpRequest',
            'Origin' => 'http://localhost:5173',
        ];

        $csrfResponse = $this->withHeaders($headers)
            ->get('/sanctum/csrf-cookie')
            ->assertNoContent();

        $loginResponse = $this->withHeaders($headers)
            ->withCookies($this->responseCookies($csrfResponse))
            ->postJson('/api/login', [
                'email' => $user->email,
                'password' => '12345678',
            ])->assertSuccessful();

        $this->withHeaders($headers)
            ->withCookies($this->responseCookies($loginResponse))
            ->getJson('/api/me')
            ->assertOk()
            ->assertJsonPath('data.email', $user->email);
    }

    /**
     * @return array<string, string>
     */
    private function responseCookies(\Illuminate\Testing\TestResponse $response): array
    {
        $cookies = [];

        foreach ($response->headers->getCookies() as $cookie) {
            $cookies[$cookie->getName()] = $cookie->getValue();
        }

        return $cookies;
    }
}
