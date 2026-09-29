<?php

namespace App\Http\Controllers;

use App\Exceptions\InvalidQuickwallConfigurationException;
use App\Services\Pricing\QuickwallPriceCalculator;
use App\Exceptions\InvalidWindowsProtectorConfigurationException;
use App\Services\Pricing\WindowsProtectorPriceCalculator;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use App\Models\Configuration;
use App\Http\Requests\StoreConfigurationRequest;
use App\Http\Requests\UpdateConfigurationRequest;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Product;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class ConfigurationController extends Controller
{
    public function __construct(
        private readonly QuickwallPriceCalculator
            $quickwallCalculator,

        private readonly WindowsProtectorPriceCalculator
            $windowsProtectorCalculator,
    ) {
    }


    public function index()
    {
        $configurations = Configuration::with('product')
            ->where('user_id', auth()->id())
            ->get();

        return Inertia::render('Configurations/Index', [
            'configurations' => $configurations
        ]);
    }

    public function create(
        Request $request,
        string $locale = 'en',
    ) {
        $supportedLocales = ['en', 'de', 'fr', 'es'];

        if (! in_array($locale, $supportedLocales, true)) {
            $locale = 'en';
        }

        app()->setLocale($locale);

        $shopMode = $request->query('mode') === 'shop';

        $initialProductSlug = $shopMode
            ? $request->query('product')
            : null;

        $shopProducts = [
            'quickwall',
            'windows-protector',
        ];

        if (
            $initialProductSlug !== null &&
            ! in_array($initialProductSlug, $shopProducts, true)
        ) {
            $initialProductSlug = null;
        }

        $products = Product::with([
            'productType.configurationSteps',
        ])->get();

        return Inertia::render(
            'Configurations/ConfigurationWizard',
            [
                'products' => $products,
                'existingConfiguration' => null,
                'locale' => $locale,
                'shopMode' => $shopMode,
                'initialProductSlug' => $initialProductSlug,
            ],
        );
    }

    public function store(StoreConfigurationRequest $request)
    {
        $validated = $request->validated();

        try {
            $product = Product::with('productType')
                ->findOrFail($validated['product_id']);

            $productSlug = Str::slug(
                $product->productType?->name ?? ''
            );

            $pricingBreakdown = null;
            $totalPrice = (float) $validated['total_price'];

            if ($productSlug === 'quickwall') {
                $pricingBreakdown =
                    $this->quickwallCalculator->calculate(
                        $validated['config_options'],
                    );

                // The current configurator displays prices
                // inclusive of 19% VAT.
                $totalPrice =
                    $pricingBreakdown['gross_price'];
            }

            if ($productSlug === 'windows-protector') {
                $pricingBreakdown =
                    $this->windowsProtectorCalculator
                        ->calculate(
                            $validated['config_options']
                        );

                $totalPrice =
                    $pricingBreakdown['gross_price'];

                $validated['config_options']['width'] =
                    $pricingBreakdown['product_width'];

                $validated['config_options']['height'] =
                    $pricingBreakdown['product_height'];
            }

            $isShopConfiguration =
                (bool) ($validated['shop_mode'] ?? false);

            $handoffToken = $isShopConfiguration
                ? Str::random(64)
                : null;

            $configuration = Configuration::create([
                'user_id' => $request->user()?->id,
                'product_id' => $product->id,
                'config_options' => $validated['config_options'],
                'total_price' => $totalPrice,
                'pricing_breakdown' => $pricingBreakdown,
                'source' => $isShopConfiguration
                    ? 'woocommerce'
                    : 'configurator',
                'current_step' =>
                    $validated['current_step'] ?? 1,

                'handoff_token_hash' => $handoffToken
                    ? hash('sha256', $handoffToken)
                    : null,

                'handoff_expires_at' => $handoffToken
                    ? now()->addMinutes(
                        config(
                            'services.tbs_woocommerce.'
                            .'handoff_lifetime',
                            15,
                        )
                    )
                    : null,
            ]);

            if ($isShopConfiguration) {
                $shopUrl = rtrim(
                    config('services.tbs_woocommerce.shop_url'),
                    '/'
                );

                $handoffUrl = $shopUrl
                    .'/?'.http_build_query([
                        'tbs_config_token' => $handoffToken,
                    ]);

                return response()->json([
                    'redirect_url' => $handoffUrl,
                ]);
            }

            return redirect()->route('orders.create', [
                'configuration_id' => $configuration->id,
            ]);
        } catch (
            InvalidQuickwallConfigurationException |
            InvalidWindowsProtectorConfigurationException
            $exception
        ) {
            throw ValidationException::withMessages([
                'config_options' => $exception->getMessage(),
            ]);
        } catch (\Throwable $exception) {
            Log::error('Failed to save configuration', [
                'error' => $exception->getMessage(),
                'product_id' =>
                    $validated['product_id'] ?? null,
                'user_id' => $request->user()?->id,
            ]);

            return back()->withErrors([
                'configuration' =>
                    'Failed to save configuration. Please try again.',
            ]);
        }
    }

    public function show(Configuration $configuration)
    {
        if ($configuration->user_id !== auth()->id()) {
            abort(403);
        }

        $configuration->load('product.productType.configurationSteps');

        return Inertia::render('Configurations/Show', [
            'configuration' => $configuration
        ]);
    }

    public function edit($locale, Configuration $configuration)
    {
        app()->setLocale($locale);

        if ($configuration->user_id !== auth()->id()) {
            abort(403);
        }

        $products = Product::with(['productType.configurationSteps'])->get();
        $configuration->load('product.productType.configurationSteps');

        return Inertia::render('Configurations/ConfigurationWizard', [
            'products' => $products,
            'existingConfiguration' => $configuration,
            'locale' => $locale,
        ]);
    }

    public function update(UpdateConfigurationRequest $request, Configuration $configuration)
    {
        if ($configuration->user_id !== auth()->id()) {
            abort(403);
        }

        try {
            $validated = $request->validate([
                'product_id' => 'required|exists:products,id',
                'config_options' => 'required|array',
                'total_price' => 'required|numeric',
                'current_step' => 'nullable|integer|min:1',
            ]);

            $configuration->update([
                'product_id' => $validated['product_id'],
                'config_options' => $validated['config_options'],
                'total_price' => $validated['total_price'],
                'current_step' => $validated['current_step'] ?? $configuration->current_step,
            ]);

            return redirect()->route('orders.create', [
                'configuration_id' => $configuration->id
            ]);
        } catch (\Exception $e) {
            \Log::error('Failed to update configuration:', [
                'error' => $e->getMessage()
            ]);

            return back()->withErrors('Failed to update configuration. Please try again.');
        }
    }

    public function destroy(Configuration $configuration)
    {
        //
    }
}