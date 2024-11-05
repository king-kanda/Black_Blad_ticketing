<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class events extends Model
{
    //
    protected $fillable = [
        'name',
        'Description',
        'event_date',
        'start_time',
        'end_time',
        'image_url',
        'user_id',
        'location'
    ];

}
