<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\EventsController;
use App\Http\Controllers\TicketController;
use App\Http\Controllers\TicketTypeController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


// If you need the CSRF token route in your API:
Route::get('/csrf-token', function () {
    return response()->json(['token' => csrf_token()]);
});


Route::apiResource('users', UserController::class);

Route::apiResource('events', EventsController::class);

Route::apiResource('tickets', TicketController::class);
Route::post('tickets/{ticket}/scan', [TicketController::class, 'scan']);
Route::get('events/{event}/tickets', [TicketController::class, 'getEventTickets']);

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('ticket-types', TicketTypeController::class);
    Route::get('events/{event}/ticket-types', [TicketTypeController::class, 'getEventTicketTypes']);
    Route::patch('ticket-types/{ticketType}/toggle-active', [TicketTypeController::class, 'toggleActive']);
});
