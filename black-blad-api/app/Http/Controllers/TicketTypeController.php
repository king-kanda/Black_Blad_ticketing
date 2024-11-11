<?php

namespace App\Http\Controllers;

use App\Models\TicketType;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class TicketTypeController extends Controller
{
    /**
     * Display a listing of ticket types.
     *
     * @return JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        $query = TicketType::with(['event', 'user']);

        // Filter by event if provided
        if ($request->has('event_id')) {
            $query->where('event_id', $request->event_id);
        }

        // Filter by active status if provided
        if ($request->has('active')) {
            $query->where('active', $request->boolean('active'));
        }

        // Filter by price range if provided
        if ($request->has('min_price')) {
            $query->where('price', '>=', $request->min_price);
        }
        if ($request->has('max_price')) {
            $query->where('price', '<=', $request->max_price);
        }

        $ticketTypes = $query->paginate(10);

        return response()->json([
            'status' => 'success',
            'data' => $ticketTypes
        ]);
    }

    /**
     * Store a newly created ticket type.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'active' => 'boolean',
            'event_id' => 'required|exists:events,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $ticketType = TicketType::create([
                ...$request->all(),
                'user_id' => Auth::id(),
                'active' => $request->input('active', true),
            ]);

            return response()->json([
                'status' => 'success',
                'message' => 'Ticket type created successfully',
                'data' => $ticketType->load(['event', 'user'])
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to create ticket type',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified ticket type.
     *
     * @param TicketType $ticketType
     * @return JsonResponse
     */
    public function show(TicketType $ticketType): JsonResponse
    {
        return response()->json([
            'status' => 'success',
            'data' => $ticketType->load(['event', 'user', 'tickets'])
        ]);
    }

    /**
     * Update the specified ticket type.
     *
     * @param Request $request
     * @param TicketType $ticketType
     * @return JsonResponse
     */
    public function update(Request $request, TicketType $ticketType): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|string|max:255',
            'price' => 'sometimes|numeric|min:0',
            'active' => 'sometimes|boolean',
            'event_id' => 'sometimes|exists:events,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            // Check if user has permission to update
            if ($ticketType->user_id !== Auth::id()) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Unauthorized to update this ticket type'
                ], 403);
            }

            $ticketType->update($request->all());

            return response()->json([
                'status' => 'success',
                'message' => 'Ticket type updated successfully',
                'data' => $ticketType->load(['event', 'user'])
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to update ticket type',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified ticket type.
     *
     * @param TicketType $ticketType
     * @return JsonResponse
     */
    public function destroy(TicketType $ticketType): JsonResponse
    {
        try {
            // Check if user has permission to delete
            if ($ticketType->user_id !== Auth::id()) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Unauthorized to delete this ticket type'
                ], 403);
            }

            // Check if there are any tickets sold for this ticket type
            if ($ticketType->tickets()->exists()) {
                // Instead of deleting, we'll just deactivate it
                $ticketType->update(['active' => false]);

                return response()->json([
                    'status' => 'success',
                    'message' => 'Ticket type has existing tickets. It has been deactivated instead of deleted.'
                ]);
            }

            $ticketType->delete();

            return response()->json([
                'status' => 'success',
                'message' => 'Ticket type deleted successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to delete ticket type',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get active ticket types for an event.
     *
     * @param int $eventId
     * @return JsonResponse
     */
    public function getEventTicketTypes(int $eventId): JsonResponse
    {
        $ticketTypes = TicketType::where('event_id', $eventId)
            ->active()
            ->with(['event'])
            ->get();

        return response()->json([
            'status' => 'success',
            'data' => $ticketTypes
        ]);
    }

    /**
     * Toggle the active status of a ticket type.
     *
     * @param TicketType $ticketType
     * @return JsonResponse
     */
    public function toggleActive(TicketType $ticketType): JsonResponse
    {
        try {
            // Check if user has permission
            if ($ticketType->user_id !== Auth::id()) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Unauthorized to modify this ticket type'
                ], 403);
            }

            $ticketType->update(['active' => !$ticketType->active]);

            return response()->json([
                'status' => 'success',
                'message' => 'Ticket type status updated successfully',
                'data' => $ticketType->fresh()
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to update ticket type status',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
