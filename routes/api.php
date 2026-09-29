<?php

use App\Http\Controllers\Api\WooCommerceConfigurationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('throttle:60,1')
    ->get(
        '/woocommerce/configurations/{token}',
        [
            WooCommerceConfigurationController::class,
            'show',
        ],
    )
    ->where('token', '[A-Za-z0-9]{64}')
    ->name('api.woocommerce.configurations.show');
