<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(): void
    {
        // Create a default admin user
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'email_verified_at' => now(),
            'password' => Hash::make('password'),
            'remember_token' => Str::random(10),
        ]);

        // Create some example users
        User::factory()->count(10)->create();

        // Create some verified users
        User::factory()->count(5)
            ->state([
                'email_verified_at' => now(),
            ])
            ->create();

        // Create some unverified users
        User::factory()->count(5)
            ->state([
                'email_verified_at' => null,
            ])
            ->create();
    }
}
