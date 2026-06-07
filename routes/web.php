<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ConfigurationController;
use App\Http\Controllers\OrderController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Http\Request;


// Route::get('/', [ConfigurationController::class, 'create'])->name('configurations.create');

Route::get('/', function () {
    return redirect('/en/configurations/create');
});

Route::prefix('{locale}')
    ->where(['locale' => 'en|de'])
    ->group(function () {
        Route::get('/configurations/create', [ConfigurationController::class, 'create'])
            ->name('localized.configurations.create');
    });

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

    Route::get('/{locale}/configurations/{configuration}/edit', [ConfigurationController::class, 'edit'])
    ->whereIn('locale', ['en', 'de'])
    ->name('configurations.edit');
    Route::put('/configurations/{configuration}', [ConfigurationController::class, 'update'])->name('configurations.update');


// Routes for Orders

    Route::get('/orders/create', [OrderController::class, 'create'])->name('orders.create');
    Route::get('/order-confirmation', [OrderController::class, 'confirmation'])->name('order.confirmation');
    Route::get('/orders', [OrderController::class, 'index'])->name('orders.index');
    Route::post('/orders', [OrderController::class, 'store'])->name('orders.store');
    Route::get('/orders/{order}', [OrderController::class, 'show'])->name('orders.show');      


require __DIR__.'/auth.php';
