<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ConfigurationController;
use App\Http\Controllers\OrderController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Http\Request;

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::get('/', function () {
    return Inertia::render('Landing'); // ✅ Show the landing page on "/"
})->name('landing');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


// Routes for Configurations

    Route::get('/configurations/create', [ConfigurationController::class, 'create'])->name('configurations.create');
    Route::post('/configurations', [ConfigurationController::class, 'store'])->name('configurations.store');
    Route::get('/configurations', [ConfigurationController::class, 'index'])->name('configurations.index');
    Route::get('/configurations/{configuration}', [ConfigurationController::class, 'show'])->name('configurations.show');


// Routes for Orders
Route::middleware(['auth'])->group(function () {
    Route::get('/orders/create', [OrderController::class, 'create'])->name('orders.create');
    Route::get('/order-confirmation', [OrderController::class, 'confirmation'])->name('order.confirmation');
    Route::get('/orders', [OrderController::class, 'index'])->name('orders.index');
    Route::post('/orders', [OrderController::class, 'store'])->name('orders.store');
    Route::get('/orders/{order}', [OrderController::class, 'show'])->name('orders.show');      
});


// Route::get('/debug-url', function () {
//     dd(config('app.url'), request()->getScheme());
// });

// Route::get('/debug-headers', function (Request $request) {
//     dd($request->headers->all());
// });

// Route::get('/debug-trust', function (Request $request) {
//     \Log::info('Forwarded Headers:', $request->headers->all());
//     \Log::info('Trusted Proxies:', Request::getTrustedProxies());
//     dd(Request::getTrustedProxies());
// });

// Route::get('/debug-ip', function (Request $request) {
//     dd($request->getClientIp());
// });



// Route::fallback(function () {
//     return response()->json([
//         'error' => 'Route not found',
//         'requested_url' => request()->url(),
//         'available_routes' => collect(Route::getRoutes())->map(fn($route) => $route->uri()),
//     ], 404);
// });

require __DIR__.'/auth.php';
