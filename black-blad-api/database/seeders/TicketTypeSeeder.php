<?php

namespace Database\Seeders;

use App\Models\Events;
use App\Models\TicketType;
use App\Models\User;
use Illuminate\Database\Seeder;

class TicketTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get all events
        $events = Events::all();
        $users = User::all();

        // Common ticket type names
        $ticketTypes = [
            [
                'name' => 'VIP',
                'price_range' => [150, 300]
            ],
            [
                'name' => 'Early Bird',
                'price_range' => [50, 100]
            ],
            [
                'name' => 'Regular',
                'price_range' => [100, 200]
            ],
            [
                'name' => 'Standard',
                'price_range' => [80, 150]
            ],
            [
                'name' => 'Premium',
                'price_range' => [200, 400]
            ]
        ];

        // Create ticket types for each event
        foreach ($events as $event) {
            // Randomly select 2-4 ticket types for each event
            $selectedTypes = array_rand($ticketTypes, rand(2, 4));

            // Convert to array if only one type selected
            if (!is_array($selectedTypes)) {
                $selectedTypes = [$selectedTypes];
            }

            foreach ($selectedTypes as $typeIndex) {
                $type = $ticketTypes[$typeIndex];
                TicketType::create([
                    'name' => $type['name'],
                    'price' => rand($type['price_range'][0], $type['price_range'][1]),
                    'active' => true,
                    'user_id' => $users->random()->id,
                    'event_id' => $event->id,
                ]);
            }
        }

        // Create some inactive ticket types for testing
        foreach ($events->random(3) as $event) {
            TicketType::create([
                'name' => 'Expired ' . $ticketTypes[array_rand($ticketTypes)]['name'],
                'price' => rand(50, 300),
                'active' => false,
                'user_id' => $users->random()->id,
                'event_id' => $event->id,
            ]);
        }

        // Create a specific ticket type for testing
        TicketType::create([
            'name' => 'Test VIP Pass',
            'price' => 199.99,
            'active' => true,
            'user_id' => $users->first()->id,
            'event_id' => $events->first()->id,
        ]);
    }
}
