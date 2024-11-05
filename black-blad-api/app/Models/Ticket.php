<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Ticket extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'phone',
        'email',
        'price',
        'ticket_type_id',
        'transaction_id',
        'quantity',
        'scanned',
        'event_id',
    ];

    protected $casts = [
        'scanned' => 'boolean',
        'price' => 'decimal:2',
        'quantity' => 'integer',
    ];

    /**
     * Get the event that owns the ticket.
     */
    public function event(): BelongsTo
    {
        return $this->belongsTo(Events::class, 'event_id');
    }

    /**
     * Get the ticket type that owns the ticket.
     */
    public function ticketType(): BelongsTo
    {
        return $this->belongsTo(TicketType::class);
    }

    /**
     * Calculate the total price for the ticket.
     */
    public function getTotalPriceAttribute(): float
    {
        return $this->price * $this->quantity;
    }
}
