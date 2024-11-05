<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tickets', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('phone');
            $table->string('email');
            $table->decimal('price', 10, 2);
            $table->foreignId('ticket_type_id')->constrained('ticket_types');
            $table->string('transaction_id');
            $table->integer('quantity');
            $table->boolean('scanned')->default(false);
            $table->foreignId('event_id')->constrained('events');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tickets');
    }
};
