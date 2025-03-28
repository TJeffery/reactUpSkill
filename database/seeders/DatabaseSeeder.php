<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Task;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $user = User::factory()
            ->has(Task::factory()->count(5))
            ->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => bcrypt('321654'),
        ]);



    }
}
