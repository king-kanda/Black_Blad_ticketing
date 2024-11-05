<?php

namespace Database\Seeders;

use App\Models\Events;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class EventsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get some user IDs to associate with events
        $userIds = User::pluck('id')->toArray();

        $events = [
            [
                'name' => 'Tech Conference 2024',
                'Description' => 'Annual technology conference featuring the latest innovations and industry leaders.',
                'event_date' => Carbon::now()->addDays(30)->toDateString(),
                'start_time' => '09:00:00',
                'end_time' => '17:00:00',
                'image_url' => 'events/tech-conference.jpg',
                'user_id' => $userIds[array_rand($userIds)],
                'location' => 'Convention Center, Downtown',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Summer Music Festival',
                'Description' => 'Open-air music festival featuring local and international artists.',
                'event_date' => Carbon::now()->addDays(45)->toDateString(),
                'start_time' => '14:00:00',
                'end_time' => '23:00:00',
                'image_url' => 'events/music-festival.jpg',
                'user_id' => $userIds[array_rand($userIds)],
                'location' => 'Central Park',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Art Exhibition Opening',
                'Description' => 'Opening night of contemporary art exhibition featuring local artists.',
                'event_date' => Carbon::now()->addDays(15)->toDateString(),
                'start_time' => '18:00:00',
                'end_time' => '21:00:00',
                'image_url' => 'events/art-exhibition.jpg',
                'user_id' => $userIds[array_rand($userIds)],
                'location' => 'City Art Gallery',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Startup Networking Event',
                'Description' => 'Connect with entrepreneurs and investors in the startup ecosystem.',
                'event_date' => Carbon::now()->addDays(7)->toDateString(),
                'start_time' => '17:30:00',
                'end_time' => '20:30:00',
                'image_url' => 'events/networking.jpg',
                'user_id' => $userIds[array_rand($userIds)],
                'location' => 'Innovation Hub',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Food & Wine Festival',
                'Description' => 'Culinary experience featuring local restaurants and wineries.',
                'event_date' => Carbon::now()->addDays(60)->toDateString(),
                'start_time' => '12:00:00',
                'end_time' => '22:00:00',
                'image_url' => 'events/food-festival.jpg',
                'user_id' => $userIds[array_rand($userIds)],
                'location' => 'Waterfront Plaza',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        foreach ($events as $event) {
            Events::create($event);
        }



    }
}
