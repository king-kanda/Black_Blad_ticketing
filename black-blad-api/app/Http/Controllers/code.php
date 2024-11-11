<?php

namespace App\Http\Controllers;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
use Illuminate\Http\Request;

class Code extends Controller
{
    public function generateQRCode() {

    $image = QrCode::size(200)
        ->backgroundColor(255, 255, 255)
        ->generate('https://www.example.com');

    return view('code', ['image' => $image]);

    }

}
