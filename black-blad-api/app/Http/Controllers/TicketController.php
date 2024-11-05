<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;

class TicketController extends Controller
{
    /**
     * Display a listing of the tickets.
     */
    public function index()
    {
        $tickets = Ticket::with(['event', 'ticketType'])->paginate(10);
        return response()->json($tickets);
    }

    /**
     * Store a newly created ticket in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'email' => 'required|email',
            'price' => 'required|numeric|min:0',
            'ticket_type_id' => 'required|exists:ticket_types,id',
            'quantity' => 'required|integer|min:1',
            'event_id' => 'required|exists:events,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $ticket = Ticket::create($request->all());

        return response()->json($ticket, 201);
    }

    /**
     * Display the specified ticket.
     */
    public function show(Ticket $ticket): JsonResponse
    {
        return response()->json($ticket->load(['event', 'ticketType']));
    }

    /**
     * Update the specified ticket in storage.
     */
    public function update(Request $request, Ticket $ticket): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|string|max:255',
            'phone' => 'sometimes|string|max:20',
            'email' => 'sometimes|email',
            'price' => 'sometimes|numeric|min:0',
            'ticket_type_id' => 'sometimes|exists:ticket_types,id',
            'quantity' => 'sometimes|integer|min:1',
            'event_id' => 'sometimes|exists:events,id',
            'scanned' => 'sometimes|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $ticket->update($request->all());

        return response()->json($ticket);
    }

    /**
     * Remove the specified ticket from storage.
     */
    public function destroy(Ticket $ticket): JsonResponse
    {
        $ticket->delete();
        return response()->json(null, 204);
    }

    /**
     * Scan a ticket.
     */
    public function scan(Ticket $ticket): JsonResponse
    {
        if ($ticket->scanned) {
            return response()->json(['error' => 'Ticket already scanned'], 400);
        }

        $ticket->update(['scanned' => true]);

        return response()->json(['message' => 'Ticket scanned successfully']);
    }

    /**
     * Get tickets for a specific event.
     */
    public function getEventTickets(Request $request, $eventId): JsonResponse
    {
        $tickets = Ticket::where('event_id', $eventId)
            ->with(['ticketType'])
            ->paginate(10);

        return response()->json($tickets);
    }
}
