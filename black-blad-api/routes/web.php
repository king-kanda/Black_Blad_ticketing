<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\code;

Route::get('/', function () {
    return view('welcome');
});


Route::get('/my-code' , [Code::class , 'generateQRCode'] );
