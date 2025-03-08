<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\URL;
use Illuminate\Http\Request;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {

        // Force HTTPS on production or when using ngrok
        // if (app()->environment('production') || str_contains(env('APP_URL'), 'ngrok')) {
        //     URL::forceScheme('https');
        // }

        if (app()->environment('production') || str_contains(env('APP_URL'), 'ngrok')) {
            $this->app['request']->server->set('HTTPS','on');
        }

        // ✅ Trust ALL proxies (including 127.0.0.1 from ngrok)
        Request::setTrustedProxies(
            ['*'], // Trust every proxy
            Request::HEADER_X_FORWARDED_FOR |
            Request::HEADER_X_FORWARDED_HOST |
            Request::HEADER_X_FORWARDED_PORT |
            Request::HEADER_X_FORWARDED_PROTO // 🔑 Critical for HTTPS
        );

        Vite::prefetch(concurrency: 3);
  
    }
}
