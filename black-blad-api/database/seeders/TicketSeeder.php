<?php

namespace Database\Seeders;

use App\Models\Ticket;
use App\Models\Events;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class TicketSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get all events
        $events = Events::all();

        // Sample ticket types (assuming you have these IDs)
        $ticketTypes = [1, 2, 3]; // VIP, Regular, Early Bird, etc.

        foreach ($events as $event) {
            // Create 5-10 tickets for each event
            $numberOfTickets = rand(5, 10);

            for ($i = 0; $i < $numberOfTickets; $i++) {
                $quantity = rand(1, 4);
                $price = rand(50, 200);

                Ticket::create([
                    'name' => fake()->name(),
                    'phone' => fake()->phoneNumber(),
                    'email' => fake()->email(),
                    'price' => $price,
                    'ticket_type_id' => $ticketTypes[array_rand($ticketTypes)],
                    'transaction_id' => Str::uuid(),
                    'quantity' => $quantity,
                    'scanned' => fake()->boolean(20), // 20% chance of being scanned
                    'event_id' => $event->id,
                ]);
            }
        }

        // Create some specific tickets for testing
        Ticket::create([
            'name' => 'Test User',
            'phone' => '1234567890',
            'email' => 'test@example.com',
            'price' => 100.00,
            'ticket_type_id' => 1,
            'transaction_id' => 'TEST-TRANS-001',
            'quantity' => 2,
            'scanned' => false,
            'event_id' => $events->first()->id,
        ]);
    }
}
